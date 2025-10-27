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

    // Step 1: Validate if it's a peanut plant or any plant part (leaf, stem, flower, pod, shell, seed)
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
            content: `You are an expert botanist and agricultural scientist specializing in peanut (groundnut/Arachis hypogaea) identification.
            
            CRITICAL TASK: Determine if the image contains ANY part of a peanut plant. Return TRUE for peanut parts, FALSE for non-peanut items.
            
            ACCEPT AS PEANUT (return is_peanut_plant_or_part = true):
            - Leaves: Compound leaves with 4 oval leaflets
            - Stems: Green to reddish-brown stems  
            - Flowers: Small yellow pea-like flowers
            - Roots: Underground root system
            - Pods/Shells: Wrinkled beige/tan shells (dirty, in soil, or cleaned)
            - Seeds/Kernels: Oval seeds with OR without papery skin, whole or split, fresh/dried/damaged, 1-2 per pod
            
            PEANUT SEEDS APPEAR AS:
            - Light brown/tan with thin papery skin
            - Pale cream/yellow without skin (blanched)
            - Whole, split in half, or broken
            - Fresh, dried, moldy, or damaged
            - Clean or with soil/debris attached
            
            REJECT AS NON-PEANUT (return is_peanut_plant_or_part = false):
            - Other crop plants (corn, wheat, rice, beans, etc.)
            - Other legume seeds (chickpeas, lentils, soybeans, etc.)
            - Tree nuts (almonds, cashews, walnuts, etc.)
            - Unrelated objects
            
            BE GENEROUS: If it looks like it could be a peanut part, classify it as peanut.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image carefully. Is this a peanut plant part (leaf, stem, flower, root, pod, shell, OR seed)? Return TRUE if it's any peanut part, FALSE only if it's not peanut-related at all."
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
              name: "validate_peanut_plant_or_part",
              description: "Return TRUE if image contains ANY peanut part (leaf/stem/flower/root/pod/shell/seed), FALSE if not peanut",
              parameters: {
                type: "object",
                properties: {
                  is_peanut_plant_or_part: { 
                    type: "boolean",
                    description: "TRUE if peanut part detected, FALSE if not peanut"
                  },
                  detected_part_type: { 
                    type: "string",
                    description: "What peanut part was detected (e.g., 'seed', 'pod', 'leaf', 'shell') or what non-peanut item"
                  }
                },
                required: ["is_peanut_plant_or_part", "detected_part_type"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "validate_peanut_plant_or_part" } }
      }),
    });

    if (!validationResponse.ok) {
      throw new Error("Validation failed");
    }

    const validationData = await validationResponse.json();
    console.log("Validation response:", JSON.stringify(validationData, null, 2));
    
    const toolCall = validationData.choices?.[0]?.message?.tool_calls?.[0];
    const validationArgs = toolCall ? JSON.parse(toolCall.function.arguments) : {};
    const isPeanut = validationArgs.is_peanut_plant_or_part === true;
    const detectedPartType = validationArgs.detected_part_type || "unknown item";

    console.log("Validation result - isPeanut:", isPeanut, "detectedPartType:", detectedPartType);

    if (!isPeanut) {
      const errorMessage = `This appears to be ${detectedPartType}, not a peanut plant part. Please upload an image of a peanut plant (leaf, seed, pod, shell, flower, stem, or root) for accurate pest and disease detection.`;
      
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
            result_title: "Not a Peanut Plant Part",
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
          result_title: "Not a Peanut Plant Part",
          result_description: errorMessage,
          severity: "info",
          confidence_level: 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
