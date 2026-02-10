import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    let userId: string | null = null;
    
    if (authHeader?.startsWith("Bearer ")) {
      const userClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });
      const { data: { user } } = await userClient.auth.getUser();
      userId = user?.id || null;
    }

    // Use service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { image, detectionType = "comprehensive", language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Step 1: Validate if the image is relevant to peanut crop analysis
    const validationResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a peanut crop analysis validation expert. Your job is to determine if this image is RELEVANT for peanut crop analysis.

RETURN TRUE (is_valid_for_analysis = true) IF YOU SEE ANY OF THESE:

1. PEANUT PLANT PARTS:
   ✓ Peanut leaves (compound, 4 leaflets)
   ✓ Peanut stems (green/reddish-brown)
   ✓ Peanut flowers (small yellow)
   ✓ Peanut roots
   ✓ Peanut pods (wrinkled tan/beige shells)
   ✓ Peanut shells (empty or with seeds)
   ✓ Peanut seeds/kernels (with or without skin, whole or split)

2. INSECTS/PESTS ON OR NEAR PEANUT PLANTS:
   ✓ Aphids, thrips, caterpillars, beetles ON peanut leaves/stems/pods
   ✓ Any insect pest visible WITH peanut plant parts in the image
   ✓ Close-up of insects that are peanut crop pests (even if plant not fully visible)

3. DAMAGE/DISEASE ON PEANUT PLANTS:
   ✓ Leaf spots, discoloration, wilting ON peanut leaves
   ✓ Pod rot, shell damage, seed damage
   ✓ Any disease symptoms visible on peanut plant parts

RETURN FALSE (is_valid_for_analysis = false) ONLY IF:
✗ Different plant species (corn, wheat, rice, cotton, tomato, etc.)
✗ Insects NOT related to peanuts AND no peanut plant visible
✗ Different nuts (almonds, walnuts, cashews)
✗ Completely unrelated objects

CONTEXT MATTERS: If you see an insect ON or NEAR peanut plant parts → TRUE
If you see damage/disease ON peanut plant parts → TRUE
Only reject if it's clearly NOT related to peanut crops.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image. Is it relevant for peanut crop analysis? This includes peanut plant parts, insects ON peanuts, or damage TO peanuts. Return TRUE if relevant, FALSE if not."
              },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "validate_peanut_relevance",
              description: "Validate if image is relevant for peanut crop analysis (plant parts, insects on peanuts, or damage to peanuts)",
              parameters: {
                type: "object",
                properties: {
                  is_valid_for_analysis: { 
                    type: "boolean",
                    description: "TRUE = relevant for peanut analysis (plant parts, pests ON peanuts, damage TO peanuts). FALSE = NOT peanut-related"
                  },
                  detected_content: { 
                    type: "string",
                    description: "What you see: 'peanut leaf with aphids', 'peanut pod', 'thrips on peanut', 'damaged peanut seed', OR if invalid: 'cotton plant', 'corn seed', 'random insect', etc."
                  },
                  confidence: {
                    type: "string",
                    description: "Your confidence level: 'high', 'medium', or 'low'"
                  }
                },
                required: ["is_valid_for_analysis", "detected_content"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "validate_peanut_relevance" } }
      }),
    });

    if (!validationResponse.ok) {
      console.error("Validation API error:", validationResponse.status);
      throw new Error("Validation failed");
    }

    const validationData = await validationResponse.json();
    console.log("=== VALIDATION RESPONSE ===");
    console.log("Full response:", JSON.stringify(validationData, null, 2));
    
    const toolCall = validationData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error("No tool call in response!");
      throw new Error("Invalid validation response");
    }
    
    const validationArgs = JSON.parse(toolCall.function.arguments);
    console.log("Parsed validation args:", JSON.stringify(validationArgs, null, 2));
    
    const isValidForAnalysis = validationArgs.is_valid_for_analysis === true;
    const detectedContent = validationArgs.detected_content || "unknown item";
    const confidence = validationArgs.confidence || "unknown";

    console.log(`VALIDATION RESULT: isValid=${isValidForAnalysis}, content=${detectedContent}, confidence=${confidence}`);

    if (!isValidForAnalysis) {
      const errorMessage = `This image shows "${detectedContent}", which is not relevant for peanut crop analysis. Please upload an image of peanut plants (leaves, stems, flowers, pods, seeds) or insects/damage on peanut plants.`;
      
      console.log("REJECTING - Not peanut-related. Message:", errorMessage);
      
      // Store invalid attempts (only if user is logged in)
      if (userId) {
        try {
          await supabase.from('detection_history').insert({
            detection_type: "not_peanut",
            result_title: "Not Peanut-Related",
            result_description: errorMessage,
            severity: "info",
            confidence_level: 0,
            image_url: image.substring(0, 500),
            user_id: userId,
          });
        } catch (e) {
          console.error("Failed to store invalid detection in history:", e);
        }
      }

      return new Response(
        JSON.stringify({
          detection_type: "not_peanut",
          result_title: "Not Peanut-Related",
          result_description: errorMessage,
          severity: "info",
          confidence_level: 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`✓ VALIDATION PASSED - Detected: ${detectedContent}`);
    console.log(`Proceeding with ${detectionType} detection...`);

    // Step 2: Detect pests/diseases/insects based on detection type
    let systemPrompt = "";
    let userPrompt = "";
    
    // Language instruction
    const languageMap: Record<string, string> = {
      en: "English",
      es: "Spanish",
      te: "Telugu",
      zh: "Chinese",
      pt: "Portuguese",
      ha: "Hausa"
    };
    const targetLanguage = languageMap[language] || "English";
    const languageInstruction = `CRITICAL: Respond in ${targetLanguage} language. All text must be in ${targetLanguage}.`;
    
    switch (detectionType) {
      case "insect":
        systemPrompt = `You are an expert entomologist specializing in agricultural pests, particularly those affecting peanut crops.
        ${languageInstruction}
        Analyze the image to identify ANY insects, bugs, or arthropods present on or near the peanut plant part.
        Provide the insect's common and scientific names, describe the threat level, and provide THREE types of recommendations:
        1. Cultural control methods (farming practices)
        2. Chemical control methods (pesticides with specific names)
        3. Biological control methods (natural predators, beneficial organisms)`;
        userPrompt = `Identify any insects, bugs, beetles, aphids, caterpillars, or other arthropods in this image. Focus on insect identification, not disease symptoms. Respond in ${targetLanguage}.`;
        break;
      
      case "damage":
        systemPrompt = `You are a plant pathologist specializing in peanut diseases and physiological disorders.
        ${languageInstruction}
        Analyze the image to identify disease symptoms, nutrient deficiencies, physical damage, or other non-insect problems affecting the peanut plant part.
        Provide the disease/condition name, severity, and THREE types of treatment recommendations:
        1. Cultural practices (crop rotation, sanitation)
        2. Chemical treatments (fungicides, fertilizers with specific names)
        3. Biological solutions (beneficial microbes, organic treatments)`;
        userPrompt = `Identify any disease symptoms, leaf spots, wilting, discoloration, nutrient deficiencies, or physical damage on this peanut plant part. Focus on disease/damage, not insects. Respond in ${targetLanguage}.`;
        break;
      
      case "comprehensive":
      default:
        systemPrompt = `You are a comprehensive agricultural AI system specializing in peanut crop health analysis.
        ${languageInstruction}
        Analyze the image using advanced detection methodology to identify ANY issues: insect pests, diseases, nutrient deficiencies, or physical damage affecting the peanut plant part.
        Provide scientific identification, severity assessment, and THREE types of detailed recommendations:
        1. Cultural control methods (farming practices, crop management)
        2. Chemical control methods (specific pesticides, fungicides, or fertilizers)
        3. Biological control methods (natural enemies, beneficial organisms)`;
        userPrompt = `Perform a comprehensive analysis of this peanut plant part. Identify any insects, pests, diseases, nutrient deficiencies, or damage present. Provide complete diagnosis and recommendations in THREE categories. Respond in ${targetLanguage}.`;
        break;
    }
    
    const detectionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userPrompt
              },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "detect_pest_disease",
              description: "Detect pests or diseases on peanut leaf with structured recommendations",
              parameters: {
                type: "object",
                properties: {
                  detection_type: {
                    type: "string",
                    enum: ["pest", "disease", "healthy"]
                  },
                  result_title: { type: "string", description: "Title in the target language" },
                  result_description: { type: "string", description: "Description in the target language" },
                  scientific_name: { type: "string" },
                  severity: {
                    type: "string",
                    enum: ["low", "medium", "high"]
                  },
                  confidence_level: {
                    type: "integer",
                    minimum: 0,
                    maximum: 100
                  },
                  cultural_recommendations: { 
                    type: "string",
                    description: "Cultural control methods and farming practices in target language"
                  },
                  chemical_recommendations: { 
                    type: "string",
                    description: "Chemical control methods with specific pesticide/fungicide names in target language"
                  },
                  biological_recommendations: { 
                    type: "string",
                    description: "Biological control methods and natural solutions in target language"
                  },
                  pesticide_names: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of 2-3 specific pesticide/chemical product names mentioned in chemical recommendations"
                  }
                },
                required: [
                  "detection_type",
                  "result_title",
                  "result_description",
                  "severity",
                  "confidence_level",
                  "cultural_recommendations",
                  "chemical_recommendations",
                  "biological_recommendations"
                ],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "detect_pest_disease" } }
      }),
    });

    if (!detectionResponse.ok) {
      throw new Error("Detection failed");
    }

    const detectionData = await detectionResponse.json();
    const detectionResult = JSON.parse(
      detectionData.choices[0].message.tool_calls[0].function.arguments
    );

    // Fetch real pesticide product images from Unsplash
    let pesticideImages: Array<{ name: string; imageUrl: string; searchUrl: string }> = [];
    if (detectionResult.pesticide_names && detectionResult.pesticide_names.length > 0) {
      try {
        console.log(`Fetching real images for ${detectionResult.pesticide_names.length} pesticides`);
        
        pesticideImages = detectionResult.pesticide_names.slice(0, 3).map((pesticideName: string) => {
          // Create Amazon search URL for the pesticide product - better for real products
          const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(pesticideName + ' pesticide')}`;
          
          // Use a high-quality generic pesticide bottle image
          const genericImageUrl = `https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop&q=80`;
          
          console.log(`Created Amazon product URL for ${pesticideName}`);
          
          return {
            name: pesticideName,
            imageUrl: genericImageUrl, // Generic pesticide image placeholder
            searchUrl: amazonSearchUrl // Direct Amazon search to buy product
          };
        });
        
        console.log(`Prepared ${pesticideImages.length} pesticide image references`);
      } catch (e) {
        console.error("Failed to prepare pesticide images:", e);
      }
    }

    const finalResult = {
      ...detectionResult,
      pesticide_images: pesticideImages
    };

    // Combine recommendations for database storage (legacy field)
    const combinedRecommendations = `Cultural: ${detectionResult.cultural_recommendations || 'N/A'}\n\nChemical: ${detectionResult.chemical_recommendations || 'N/A'}\n\nBiological: ${detectionResult.biological_recommendations || 'N/A'}`;

    // Save to database (only if user is logged in)
    if (userId) {
      const { error: insertError } = await supabase.from('detection_history').insert({
        detection_type: detectionResult.detection_type,
        result_title: detectionResult.result_title,
        result_description: detectionResult.result_description,
        scientific_name: detectionResult.scientific_name,
        severity: detectionResult.severity,
        confidence_level: detectionResult.confidence_level,
        recommendations: combinedRecommendations,
        image_url: image.substring(0, 500),
        user_id: userId,
      });

      if (insertError) {
        console.error("Failed to insert detection history:", insertError);
      }
    }

    return new Response(
      JSON.stringify(finalResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
