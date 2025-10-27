import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, detectionType = "comprehensive" } = await req.json();
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
      
      // Store invalid attempts
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        await fetch(`${supabaseUrl}/rest/v1/detection_history`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            detection_type: "not_peanut",
            result_title: "Not Peanut-Related",
            result_description: errorMessage,
            severity: "info",
            confidence_level: 0,
            image_url: image.substring(0, 500),
          }),
        });
      } catch (e) {
        console.error("Failed to store invalid detection in history:", e);
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
    
    switch (detectionType) {
      case "insect":
        systemPrompt = `You are an expert entomologist specializing in agricultural pests, particularly those affecting peanut crops.
        Analyze the image to identify ANY insects, bugs, or arthropods present on or near the peanut plant part.
        Provide the insect's common and scientific names, describe the threat level, and recommend appropriate control measures.`;
        userPrompt = "Identify any insects, bugs, beetles, aphids, caterpillars, or other arthropods in this image. Focus on insect identification, not disease symptoms.";
        break;
      
      case "damage":
        systemPrompt = `You are a plant pathologist specializing in peanut diseases and physiological disorders.
        Analyze the image to identify disease symptoms, nutrient deficiencies, physical damage, or other non-insect problems affecting the peanut plant part.
        Provide the disease/condition name, severity, and treatment recommendations. Do NOT focus on insects.`;
        userPrompt = "Identify any disease symptoms, leaf spots, wilting, discoloration, nutrient deficiencies, or physical damage on this peanut plant part. Focus on disease/damage, not insects.";
        break;
      
      case "comprehensive":
      default:
        systemPrompt = `You are a comprehensive agricultural AI system specializing in peanut crop health analysis.
        Analyze the image using advanced detection methodology to identify ANY issues: insect pests, diseases, nutrient deficiencies, or physical damage affecting the peanut plant part.
        Provide scientific identification, severity assessment, and detailed treatment recommendations.`;
        userPrompt = "Perform a comprehensive analysis of this peanut plant part. Identify any insects, pests, diseases, nutrient deficiencies, or damage present. Provide complete diagnosis and recommendations.";
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
              description: "Detect pests or diseases on peanut leaf",
              parameters: {
                type: "object",
                properties: {
                  detection_type: {
                    type: "string",
                    enum: ["pest", "disease", "healthy"]
                  },
                  result_title: { type: "string" },
                  result_description: { type: "string" },
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
                  recommendations: { type: "string" }
                },
                required: [
                  "detection_type",
                  "result_title",
                  "result_description",
                  "severity",
                  "confidence_level"
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

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const historyResp = await fetch(`${supabaseUrl}/rest/v1/detection_history`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        ...detectionResult,
        image_url: image.substring(0, 500), // Store truncated base64 to avoid huge payloads
      }),
    });

    if (!historyResp.ok) {
      const errText = await historyResp.text();
      console.error("Failed to insert detection history:", historyResp.status, errText);
    }

    return new Response(
      JSON.stringify(detectionResult),
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
