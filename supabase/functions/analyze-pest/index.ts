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
    const { image } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Step 1: Validate if it's a peanut leaf
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
            content: "You are an expert botanist specializing in peanut plants. Analyze if the image is a peanut leaf or plant."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Is this a peanut (groundnut/Arachis hypogaea) leaf or plant? Answer with just 'YES' or 'NO'."
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
              name: "validate_peanut_leaf",
              description: "Validate if image contains peanut leaf",
              parameters: {
                type: "object",
                properties: {
                  is_peanut_leaf: { type: "boolean" },
                  detected_plant: { type: "string" }
                },
                required: ["is_peanut_leaf"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "validate_peanut_leaf" } }
      }),
    });

    if (!validationResponse.ok) {
      throw new Error("Validation failed");
    }

    const validationData = await validationResponse.json();
    const validationArgs = JSON.parse(
      validationData.choices[0].message.tool_calls[0].function.arguments
    );

    if (!validationArgs.is_peanut_leaf) {
      const detectedPlant = validationArgs.detected_plant || "unknown plant";
      return new Response(
        JSON.stringify({
          detection_type: "not_peanut",
          result_title: "Not a Peanut Leaf",
          result_description: `This appears to be ${detectedPlant}, not a peanut leaf. Please upload an image of a peanut plant for accurate pest detection.`,
          severity: "info",
          confidence_level: 0
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Detect pests/diseases using YOLO-style analysis
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
            content: `You are a YOLO-based agricultural AI system specializing in peanut pest and disease detection. 
            Analyze the image using object detection principles: identify pests, diseases, or symptoms on the peanut leaf.
            Provide scientific names, severity assessment, and treatment recommendations.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this peanut leaf for pests and diseases using YOLO detection methodology."
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

    await fetch(`${supabaseUrl}/rest/v1/detection_history`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        ...detectionResult,
        image_url: image.substring(0, 500) // Store truncated base64
      })
    });

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
