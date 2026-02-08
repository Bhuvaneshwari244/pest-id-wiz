/**
 * Mock ML Detection Engine
 * Simulates YOLOv8-based peanut crop pest/disease detection.
 * In production, this would be replaced by a trained model inference pipeline.
 * 
 * Dataset: Custom peanut leaf dataset (see /ml/dataset/ and /ml/train.py)
 * Model: YOLOv8n fine-tuned on peanut disease classes
 */

export interface DetectionResult {
  detection_type: "pest" | "disease" | "healthy" | "not_peanut";
  result_title: string;
  result_description: string;
  scientific_name?: string;
  severity: "low" | "medium" | "high" | "info";
  confidence_level: number;
  cultural_recommendations?: string;
  chemical_recommendations?: string;
  biological_recommendations?: string;
  recommendations?: string;
}

type DetectionType = "insect" | "damage" | "comprehensive";

// Simulated model class labels from YOLOv8 training
const PEST_DATABASE: DetectionResult[] = [
  {
    detection_type: "pest",
    result_title: "Aphid Infestation (Aphis craccivora)",
    result_description: "Dense colonies of dark-brown to black aphids detected on the undersides of peanut leaves and tender stems. Aphids cause direct damage by sucking plant sap, leading to leaf curling, stunted growth, and yellowing. They also transmit Groundnut Rosette Virus (GRV), a devastating viral disease. Heavy infestations result in sooty mold growth on honeydew secretions.",
    scientific_name: "Aphis craccivora Koch",
    severity: "high",
    confidence_level: 92,
    cultural_recommendations: "Practice crop rotation with non-legume crops (cereals like maize or sorghum) for at least 2 seasons. Remove and destroy volunteer peanut plants and weed hosts. Use reflective mulches to repel aphids. Plant early-maturing varieties to escape peak aphid season. Maintain field sanitation by removing crop residues after harvest.",
    chemical_recommendations: "Apply Imidacloprid 17.8% SL at 0.3 mL/L as a foliar spray. Alternatively, use Thiamethoxam 25% WG at 0.3 g/L or Dimethoate 30% EC at 1.7 mL/L. For seed treatment, use Imidacloprid 600 FS at 3 mL/kg seed before planting. Rotate insecticide groups to prevent resistance development.",
    biological_recommendations: "Encourage natural predators like ladybird beetles (Coccinella septempunctata), lacewings (Chrysoperla carnea), and hoverfly larvae. Release parasitoid wasps (Lysiphlebus testaceipes) at 5,000/ha. Apply neem oil (Azadirachtin 1500 ppm) at 5 mL/L as a deterrent. Use yellow sticky traps for monitoring population levels."
  },
  {
    detection_type: "pest",
    result_title: "Thrips Damage (Thrips palmi)",
    result_description: "Silvery-white feeding scars observed on upper leaf surfaces, characteristic of thrips rasping damage. Thrips feed by scraping leaf cells and sucking the released contents. Severe infestations cause leaf distortion, bronzing, and premature leaf drop. Thrips also vector Tomato Spotted Wilt Virus (TSWV) and Groundnut Bud Necrosis Virus (GBNV).",
    scientific_name: "Thrips palmi Karny",
    severity: "medium",
    confidence_level: 87,
    cultural_recommendations: "Use blue or white sticky traps for early monitoring (25 traps/ha). Practice intercropping with tall cereals like sorghum or pearl millet to create a physical barrier. Avoid consecutive planting of susceptible crops. Deep summer plowing exposes thrips pupae to desiccation and predation. Maintain adequate irrigation to reduce plant stress.",
    chemical_recommendations: "Spray Fipronil 5% SC at 1.5 mL/L or Spinosad 45% SC at 0.3 mL/L during early infestation. Lambda-cyhalothrin 5% EC at 0.5 mL/L provides knockdown effect. Systemic option: Acephate 75% SP at 1 g/L. Apply during cooler hours (early morning or late evening) when thrips are most active on leaf surfaces.",
    biological_recommendations: "Release predatory mites (Amblyseius swirskii) at 50-100/plant. Encourage minute pirate bugs (Orius insidiosus) which are voracious thrips predators. Apply entomopathogenic fungi Beauveria bassiana at 5 g/L (containing 10^8 CFU/g). Conserve natural enemies by avoiding broad-spectrum insecticides."
  },
  {
    detection_type: "pest",
    result_title: "Tobacco Caterpillar (Spodoptera litura)",
    result_description: "Large irregular holes and skeletonized leaves indicate feeding damage by tobacco caterpillar larvae. Young larvae feed gregariously on leaf undersides, creating window-like damage. Mature larvae (40-50mm) feed voraciously and can defoliate entire plants overnight. Heavy infestations during pod-filling stage cause significant yield loss of 20-40%.",
    scientific_name: "Spodoptera litura (Fabricius)",
    severity: "high",
    confidence_level: 89,
    cultural_recommendations: "Install pheromone traps (Spodolure) at 12 traps/ha for monitoring and mass trapping. Hand-pick and destroy egg masses and gregarious young larvae. Use light traps (mercury vapor) to attract and kill adult moths. Practice deep plowing after harvest to destroy pupae. Grow trap crops like castor around field borders.",
    chemical_recommendations: "Apply Chlorantraniliprole 18.5% SC (Coragen) at 0.3 mL/L for young larvae. For older larvae, use Emamectin benzoate 5% SG at 0.4 g/L. Nuclear Polyhedrosis Virus (SlNPV) at 250 LE/ha is highly effective and selective. Avoid pyrethroids which may cause pest resurgence by killing natural enemies.",
    biological_recommendations: "Release egg parasitoid Trichogramma chilonis at 1.5 lakh/ha at 15-day intervals. Apply Bacillus thuringiensis var. kurstaki (Bt) at 2 g/L during early larval stages. Encourage predatory ground beetles (Carabidae) and earwigs. Use NPV (Nuclear Polyhedrosis Virus) specific to S. litura at 1.5 × 10^12 POBs/ha."
  }
];

const DISEASE_DATABASE: DetectionResult[] = [
  {
    detection_type: "disease",
    result_title: "Early Leaf Spot (Cercospora arachidicola)",
    result_description: "Circular to irregular brown spots (1-10mm diameter) with a distinct yellow halo observed on upper leaf surface. Lesions have a light brown center with dark brown margins. Early leaf spot typically appears 30-35 days after sowing and progresses upward from lower leaves. Severe infections cause premature defoliation, reducing pod yield by 15-50% and aflatoxin contamination risk increases.",
    scientific_name: "Cercospora arachidicola Hori",
    severity: "medium",
    confidence_level: 94,
    cultural_recommendations: "Practice 2-3 year crop rotation with non-host crops (cereals, cotton). Use certified disease-free seeds. Plant resistant varieties like ICGV 86699, GPBD-4, or TAG-24. Remove and destroy crop debris after harvest. Maintain proper spacing (30×10 cm) for adequate air circulation. Avoid overhead irrigation to reduce leaf wetness duration.",
    chemical_recommendations: "Apply Chlorothalonil 75% WP at 2 g/L at 35 days after sowing, followed by 2-3 sprays at 15-day intervals. Alternatively, use Mancozeb 75% WP at 2.5 g/L or Tebuconazole 25.9% EC at 1 mL/L. Combination spray of Carbendazim 12% + Mancozeb 63% WP at 2.5 g/L provides broad-spectrum protection.",
    biological_recommendations: "Apply Trichoderma viride at 5 g/kg as seed treatment. Foliar spray of Pseudomonas fluorescens at 10 g/L at 30 and 45 DAS. Use neem cake at 250 kg/ha at sowing for soil-borne inoculum suppression. Bacillus subtilis-based bioformulations can reduce disease incidence by 30-40%."
  },
  {
    detection_type: "disease",
    result_title: "Late Leaf Spot (Phaeoisariopsis personata)",
    result_description: "Dark brown to nearly black circular spots predominantly on the lower leaf surface, appearing rough due to sporulation. Unlike early leaf spot, lesions lack the prominent yellow halo and have darker pigmentation. Late leaf spot typically appears 45-60 days after sowing and is more destructive. Complete defoliation can occur within 2-3 weeks under favorable conditions (>25°C, >80% RH).",
    scientific_name: "Phaeoisariopsis personata (Berk. & M.A. Curtis)",
    severity: "high",
    confidence_level: 91,
    cultural_recommendations: "Deep plow to bury infected crop residues. Grow resistant varieties like ICGV 99029 or VRI-2. Adjust sowing date to avoid peak disease pressure period. Intercrop with cereals (pearl millet, sorghum) to reduce humidity in the canopy. Remove lower infected leaves when disease onset is detected early.",
    chemical_recommendations: "Spray Hexaconazole 5% EC at 2 mL/L starting at disease onset. Apply Propiconazole 25% EC at 1 mL/L for severe infections. Schedule 3-4 sprays at 10-14 day intervals during critical growth stages (flowering to pod maturity). Tank mix Mancozeb 75% WP (2.5 g/L) + Carbendazim 50% WP (1 g/L) for both contact and systemic protection.",
    biological_recommendations: "Seed treatment with Trichoderma harzianum at 10 g/kg seed. Foliar application of Bacillus subtilis strain QST 713 at 5 g/L. Apply compost tea enriched with beneficial microbes as foliar spray. Use vermicompost at 2 t/ha to enhance soil microbial diversity and plant immunity."
  },
  {
    detection_type: "disease",
    result_title: "Rust (Puccinia arachidis)",
    result_description: "Orange-brown pustules (uredinia) observed on the lower leaf surface, releasing powdery rust-colored spores (urediniospores). Corresponding pale green to yellow spots visible on the upper leaf surface. Rust spreads rapidly under cool, humid conditions (20-25°C, >90% RH) and can cause complete defoliation within 3-4 weeks. Yield losses of 50-70% have been recorded in severe epidemics.",
    scientific_name: "Puccinia arachidis Speg.",
    severity: "high",
    confidence_level: 93,
    cultural_recommendations: "Plant rust-resistant varieties such as ICGV 86590, GPBD-4, or Kadiri-6. Early sowing (before June 15th in kharif season) helps the crop escape severe rust pressure. Avoid late-planted crops. Practice 3-year crop rotation. Remove volunteer groundnut plants in the vicinity. Maintain balanced nutrition with adequate potassium.",
    chemical_recommendations: "Apply Triadimefon 25% WP at 1 g/L at first appearance of pustules. Alternatively, Hexaconazole 5% EC at 2 mL/L or Propiconazole 25% EC at 1 mL/L. Schedule 2-3 protective sprays at 15-day intervals. For combination treatment, use Tricyclazole 18% + Mancozeb 62% WP at 2.5 g/L for dual action against rust and leaf spots.",
    biological_recommendations: "Apply Trichoderma viride (2 × 10^6 CFU/g) as seed treatment at 10 g/kg. Foliar spray of Bacillus subtilis at 10 g/L at fortnightly intervals. Use plant extracts of Prosopis juliflora (5%) or Datura stramonium (10%) as botanical fungicides. Soil application of Pseudomonas fluorescens at 2.5 kg/ha enhances systemic resistance."
  },
  {
    detection_type: "disease",
    result_title: "Collar Rot (Aspergillus niger)",
    result_description: "Yellowing and wilting of seedlings with a characteristic black lesion at the collar region (soil line). The infected stem shows constriction and dark brown to black discoloration. Black spore masses of Aspergillus niger are visible on the lesion surface. Collar rot is a soil-borne disease favored by high soil moisture and poor drainage. Seedling mortality of 10-40% can occur within 2-3 weeks of sowing.",
    scientific_name: "Aspergillus niger van Tieghem",
    severity: "medium",
    confidence_level: 86,
    cultural_recommendations: "Use well-drained sandy loam soils for peanut cultivation. Avoid waterlogging by ensuring proper field drainage. Treat seeds with Thiram or Captan before sowing. Practice crop rotation with cereals. Avoid deep sowing (optimal depth: 5 cm). Apply gypsum at 400 kg/ha at flowering for calcium nutrition and disease suppression.",
    chemical_recommendations: "Seed treatment with Thiram 75% WP at 3 g/kg or Captan 75% WP at 3 g/kg seed. Alternatively, Carboxin 37.5% + Thiram 37.5% WP at 3 g/kg seed. For severe fields, drench soil around seedlings with Carbendazim 50% WP at 1 g/L. Mancozeb 75% WP seed treatment at 3 g/kg provides additional protection.",
    biological_recommendations: "Seed treatment with Trichoderma viride at 5-10 g/kg seed is highly effective. Apply Pseudomonas fluorescens at 10 g/kg seed as biocontrol agent. Soil application of Trichoderma harzianum at 2.5 kg mixed with 100 kg FYM/ha at sowing. Use neem cake at 250 kg/ha incorporated into soil to suppress A. niger population."
  }
];

const HEALTHY_RESULT: DetectionResult = {
  detection_type: "healthy",
  result_title: "Healthy Peanut Plant",
  result_description: "No significant pest infestation or disease symptoms detected on the analyzed peanut plant tissue. The leaf/plant part shows normal coloration, texture, and growth patterns consistent with a healthy Arachis hypogaea specimen. Continue regular monitoring and preventive practices to maintain plant health throughout the growing season.",
  scientific_name: "Arachis hypogaea L.",
  severity: "low",
  confidence_level: 96,
  cultural_recommendations: "Continue regular field scouting every 7-10 days. Maintain balanced fertilization (NPK 20:40:40 kg/ha + Gypsum 400 kg/ha). Practice crop rotation with cereals. Ensure proper spacing and weed management. Apply organic mulch to conserve soil moisture and suppress weeds.",
  chemical_recommendations: "No chemical treatment required at this time. For preventive protection, apply Mancozeb 75% WP at 2.5 g/L as a protective fungicide spray at 35-40 DAS. Seed treatment with Thiram 75% WP at 3 g/kg before next season sowing provides early-stage protection.",
  biological_recommendations: "Apply Trichoderma viride at 2.5 kg/ha mixed with FYM for soil health. Use Pseudomonas fluorescens foliar spray at 10 g/L for preventive bioprotection. Encourage beneficial insects by maintaining flowering border strips. Apply vermicompost at 2 t/ha to enhance soil microbial activity."
};

const NOT_PEANUT_RESULT: DetectionResult = {
  detection_type: "not_peanut",
  result_title: "Not Peanut-Related",
  result_description: "This image does not appear to contain peanut plant parts (leaves, stems, pods, or seeds) or peanut crop pests. Please upload a clear image of peanut plant tissue for accurate detection.",
  severity: "info",
  confidence_level: 0,
};

/**
 * Simulates ML model inference for peanut crop pest/disease detection.
 * In the real pipeline, this function would:
 * 1. Preprocess the image (resize to 640x640, normalize)
 * 2. Run YOLOv8 inference to detect bounding boxes + class labels
 * 3. Post-process detections (NMS, confidence thresholding)
 * 4. Map class labels to recommendation database
 */
export function runMockDetection(detectionType: DetectionType): DetectionResult {
  // Simulate processing delay variation (model inference time)
  const rand = Math.random();

  // 15% chance of healthy result
  if (rand < 0.15) {
    return { ...HEALTHY_RESULT };
  }

  let pool: DetectionResult[];
  
  switch (detectionType) {
    case "insect":
      pool = PEST_DATABASE;
      break;
    case "damage":
      pool = DISEASE_DATABASE;
      break;
    case "comprehensive":
    default:
      pool = [...PEST_DATABASE, ...DISEASE_DATABASE];
      break;
  }

  // Randomly select from the pool (simulating model classification)
  const selected = pool[Math.floor(Math.random() * pool.length)];
  
  // Add slight confidence variation (simulating real model behavior)
  const confidenceVariation = Math.floor(Math.random() * 8) - 4; // ±4%
  const adjustedConfidence = Math.min(99, Math.max(70, selected.confidence_level + confidenceVariation));

  return {
    ...selected,
    confidence_level: adjustedConfidence,
  };
}

export function getNotPeanutResult(): DetectionResult {
  return { ...NOT_PEANUT_RESULT };
}

/**
 * Simple heuristic check to see if the image might contain peanut-related content.
 * In the real pipeline, this would be a binary classifier or the first stage
 * of the YOLOv8 detection (checking if any peanut-class detections exist).
 * 
 * For the mock version, we always return true since we can't actually analyze
 * the image content in the browser without a real model.
 */
export function validatePeanutImage(_imageDataUrl: string): boolean {
  // In production, this runs through the validation model
  // For mock purposes, we accept all images
  return true;
}
