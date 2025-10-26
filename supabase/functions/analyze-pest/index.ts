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
            content: `You are an expert botanist and agricultural scientist specializing in peanut (groundnut/Arachis hypogaea) plants. 
            Your task is to accurately identify if the image shows ANY part of a peanut plant.
            
            PEANUT PLANT PARTS TO RECOGNIZE:
            - Leaves: Compound leaves with 4 oval leaflets
            - Stems: Green to reddish-brown stems
            - Flowers: Small yellow pea-like flowers
            - Roots: Underground root system
            - Pods: Wrinkled beige/tan shells (can be dirty, in soil, or cleaned)
            - Seeds/Kernels: Oval-shaped seeds with reddish-brown or tan papery skin, usually 2 per pod
            - Shells: Empty peanut shells after removal of seeds
            
            IMPORTANT: Peanut seeds can appear:
            - With skin (light brown/tan/reddish papery coating)
            - Without skin (pale yellow/cream colored)
            - Whole or split in half
            - Fresh, dried, or showing damage/disease
            - Clean or with soil/debris
            
            Be GENEROUS in identification - if it could reasonably be a peanut part, classify it as peanut.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Carefully examine this image. Does it show a peanut plant or ANY of its parts (leaf, stem, flower, root, pod, shell, or seed)? Be thorough - peanut seeds can have skin on/off, be whole/split, fresh/dried, clean/dirty, or show damage."
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
              description: "Validate if image contains a peanut plant or any plant part (leaf, pod, seed, shell, etc.)",
              parameters: {
                type: "object",
                properties: {
                  is_peanut_plant_or_part: { type: "boolean" },
                  detected_plant: { type: "string" }
                },
                required: ["is_peanut_plant_or_part"],
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
    const toolCall = validationData.choices?.[0]?.message?.tool_calls?.[0];
    const validationArgs = toolCall ? JSON.parse(toolCall.function.arguments) : {};
    const isPeanut = (validationArgs.is_peanut_plant_or_part ?? validationArgs.is_peanut_leaf ?? false) as boolean;

    if (!isPeanut) {
      const detectedPlant = validationArgs.detected_plant || "unknown";

      // Also store invalid attempts so users can see their recent activity
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
            result_title: "Not a Peanut Plant",
            result_description: `This appears to be ${detectedPlant}, not a peanut plant part. Please upload a peanut plant or any of its parts (leaf/pod/seed/shell) for accurate detection.`,
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
          result_title: "Not a Peanut Plant",
          result_description: `This appears to be ${detectedPlant}, not a peanut plant part. Please upload a peanut plant or any of its parts (leaf/pod/seed/shell) for accurate detection.`,
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
