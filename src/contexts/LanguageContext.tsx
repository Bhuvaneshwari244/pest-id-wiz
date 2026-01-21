import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'te' | 'zh' | 'pt' | 'ha';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'HOME',
    abstract: 'ABSTRACT',
    diseaseDetection: 'DISEASE DETECTION',
    technicalDetails: 'TECHNICAL DETAILS',
    
    // Home Page
    heroTitle: 'Peanut Disease Detection System',
    heroSubtitle: 'Protect your peanut crops with advanced YOLOv8 technology',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    whyChoose: 'Why Choose PeanutGuard?',
    accurateDetection: 'Accurate Detection',
    accurateDesc: 'YOLOv8-powered system identifies diseases with high precision',
    instantResults: 'Instant Results',
    instantDesc: 'Get real-time analysis and recommendations within seconds',
    expertGuidance: 'Expert Guidance',
    expertDesc: 'Receive detailed treatment recommendations from agricultural experts',
    easyToUse: 'Easy to Use',
    easyDesc: 'Simple interface designed for farmers and agricultural professionals',
    readyToProtect: 'Ready to Protect Your Crops?',
    startDetecting: 'Start Detecting Now',
    
    // Detection Page
    detectionType: 'Detection Type',
    insectIdentification: 'Insect Identification',
    insectDesc: 'Detect visible pests like aphids, thrips, caterpillars, and more',
    damageSymptom: 'Damage Symptom Analysis',
    damageDesc: 'Identify pest damage from symptoms like bite marks, discoloration, curling',
    comprehensive: 'Comprehensive Analysis',
    comprehensiveDesc: 'Complete scan for both visible pests and damage symptoms',
    analyzeImage: 'Analyze Image',
    uploadImage: 'Upload Image',
    uploadDesc: 'Upload a peanut leaf image for analysis',
    chooseImage: 'Choose Image',
    analyzing: 'Analyzing...',
    analyzeYOLO: 'Analyze with YOLO',
    clear: 'Clear',
    recentDetections: 'Recent Detections',
    records: 'Records',
    history: 'History',
    
    // Detection Results
    detectionResults: 'Detection Results',
    highSeverity: 'High Severity',
    mediumSeverity: 'Medium Severity',
    lowSeverity: 'Low Severity',
    confidenceLevel: 'Confidence Level',
    analysis: 'Analysis',
    recommendations: 'Recommendations',
    scientificName: 'Scientific Name',
    detectionMethod: 'Detection Method',
    
    // Abstract Page
    abstractTitle: 'Abstract',
    abstractContent: 'PeanutGuard is an advanced disease detection system that leverages YOLOv8 deep learning technology to identify and diagnose peanut crop diseases and pest infestations. Our system provides farmers with instant, accurate analysis and expert recommendations to protect their crops.',
    
    // Technical Page
    technicalTitle: 'Technical Details',
    technologyStack: 'Technology Stack',
    yoloModel: 'YOLOv8 Model',
    yoloDesc: 'State-of-the-art object detection for disease identification',
    cloudInfra: 'Cloud Infrastructure',
    cloudDesc: 'Scalable backend for real-time processing',

    // Common/Toasts
    invalidImage: 'Invalid Image',
    detectionComplete: 'Detection Complete',
    analysisSuccess: 'Analysis successful',
    errorTitle: 'Error',
    noHistory: 'No detection history yet',
    welcomeTitle: 'Welcome to Your Blank App',
    welcomeSubtitle: 'Start building your amazing project here!',
    notFoundTitle: '404',
    notFoundSubtitle: 'Oops! Page not found',
    goHome: 'Return to Home',
  },
  es: {
    // Navigation
    home: 'INICIO',
    abstract: 'RESUMEN',
    diseaseDetection: 'DETECCIÓN DE ENFERMEDADES',
    technicalDetails: 'DETALLES TÉCNICOS',
    
    // Home Page
    heroTitle: 'Sistema de Detección de Enfermedades del Maní',
    heroSubtitle: 'Proteja sus cultivos de maní con tecnología avanzada YOLOv8',
    getStarted: 'Comenzar',
    learnMore: 'Más Información',
    whyChoose: '¿Por Qué Elegir PeanutGuard?',
    accurateDetection: 'Detección Precisa',
    accurateDesc: 'Sistema con YOLOv8 identifica enfermedades con alta precisión',
    instantResults: 'Resultados Instantáneos',
    instantDesc: 'Obtenga análisis y recomendaciones en tiempo real en segundos',
    expertGuidance: 'Orientación Experta',
    expertDesc: 'Reciba recomendaciones detalladas de tratamiento de expertos agrícolas',
    easyToUse: 'Fácil de Usar',
    easyDesc: 'Interfaz simple diseñada para agricultores y profesionales agrícolas',
    readyToProtect: '¿Listo para Proteger Sus Cultivos?',
    startDetecting: 'Comenzar Detección Ahora',
    
    // Detection Page
    detectionType: 'Tipo de Detección',
    insectIdentification: 'Identificación de Insectos',
    insectDesc: 'Detectar plagas visibles como áfidos, trips, orugas y más',
    damageSymptom: 'Análisis de Síntomas de Daño',
    damageDesc: 'Identificar daños por plagas mediante síntomas como marcas de mordeduras, decoloración, rizado',
    comprehensive: 'Análisis Integral',
    comprehensiveDesc: 'Escaneo completo de plagas visibles y síntomas de daño',
    analyzeImage: 'Analizar Imagen',
    uploadImage: 'Subir Imagen',
    uploadDesc: 'Suba una imagen de hoja de maní para análisis',
    chooseImage: 'Elegir Imagen',
    analyzing: 'Analizando...',
    analyzeYOLO: 'Analizar con YOLO',
    clear: 'Limpiar',
    recentDetections: 'Detecciones Recientes',
    records: 'Registros',
    history: 'Historial',
    
    // Detection Results
    detectionResults: 'Resultados de Detección',
    highSeverity: 'Alta Severidad',
    mediumSeverity: 'Severidad Media',
    lowSeverity: 'Baja Severidad',
    confidenceLevel: 'Nivel de Confianza',
    analysis: 'Análisis',
    recommendations: 'Recomendaciones',
    scientificName: 'Nombre Científico',
    detectionMethod: 'Método de Detección',
    
    // Abstract Page
    abstractTitle: 'Resumen',
    abstractContent: 'PeanutGuard es un sistema avanzado de detección de enfermedades que aprovecha la tecnología de aprendizaje profundo YOLOv8 para identificar y diagnosticar enfermedades de cultivos de maní e infestaciones de plagas. Nuestro sistema proporciona a los agricultores análisis instantáneos y precisos y recomendaciones expertas para proteger sus cultivos.',
    
    // Technical Page
    technicalTitle: 'Detalles Técnicos',
    technologyStack: 'Stack Tecnológico',
    yoloModel: 'Modelo YOLOv8',
    yoloDesc: 'Detección de objetos de última generación para identificación de enfermedades',
    cloudInfra: 'Infraestructura en la Nube',
    cloudDesc: 'Backend escalable para procesamiento en tiempo real',

    // Common/Toasts
    invalidImage: 'Imagen inválida',
    detectionComplete: 'Detección completada',
    analysisSuccess: 'Análisis exitoso',
    errorTitle: 'Error',
    noHistory: 'Aún no hay historial de detecciones',
    welcomeTitle: 'Bienvenido a tu aplicación en blanco',
    welcomeSubtitle: '¡Comienza a construir tu proyecto aquí!',
    notFoundTitle: '404',
    notFoundSubtitle: '¡Vaya! Página no encontrada',
    goHome: 'Volver al inicio',
  },
  te: {
    // Navigation
    home: 'హోమ్',
    abstract: 'సారాంశం',
    diseaseDetection: 'వ్యాధి గుర్తింపు',
    technicalDetails: 'సాంకేతిక వివరాలు',
    
    // Home Page
    heroTitle: 'వేరుశెనగ వ్యాధి గుర్తింపు వ్యవస్థ',
    heroSubtitle: 'అధునాతన YOLOv8 సాంకేతికతతో మీ వేరుశెనగ పంటలను రక్షించండి',
    getStarted: 'ప్రారంభించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    whyChoose: 'PeanutGuard ను ఎందుకు ఎంచుకోవాలి?',
    accurateDetection: 'ఖచ్చితమైన గుర్తింపు',
    accurateDesc: 'YOLOv8-శక్తితో కూడిన వ్యవస్థ అధిక ఖచ్చితత్వంతో వ్యాధులను గుర్తిస్తుంది',
    instantResults: 'తక్షణ ఫలితాలు',
    instantDesc: 'సెకన్లలోనే నిజ-సమయ విశ్లేషణ మరియు సిఫార్సులను పొందండి',
    expertGuidance: 'నిపుణుల మార్గదర్శకత్వం',
    expertDesc: 'వ్యవసాయ నిపుణుల నుండి వివరమైన చికిత్స సిఫార్సులను పొందండి',
    easyToUse: 'ఉపయోగించడం సులభం',
    easyDesc: 'రైతులు మరియు వ్యవసాయ నిపుణుల కోసం రూపొందించిన సరళ ఇంటర్‌ఫేస్',
    readyToProtect: 'మీ పంటలను రక్షించడానికి సిద్ధంగా ఉన్నారా?',
    startDetecting: 'ఇప్పుడు గుర్తింపు ప్రారంభించండి',
    
    // Detection Page
    detectionType: 'గుర్తింపు రకం',
    insectIdentification: 'కీటక గుర్తింపు',
    insectDesc: 'అఫిడ్స్, థ్రిప్స్, గొంగళి పురుగులు మరియు మరిన్ని వంటి కనిపించే పెస్ట్‌లను గుర్తించండి',
    damageSymptom: 'నష్ట లక్షణ విశ్లేషణ',
    damageDesc: 'కాటు గుర్తులు, రంగు మారడం, ముడుచుకోవడం వంటి లక్షణాల నుండి పెస్ట్ నష్టాన్ని గుర్తించండి',
    comprehensive: 'సమగ్ర విశ్లేషణ',
    comprehensiveDesc: 'కనిపించే పెస్ట్‌లు మరియు నష్ట లక్షణాల కోసం పూర్తి స్కాన్',
    analyzeImage: 'చిత్రాన్ని విశ్లేషించండి',
    uploadImage: 'చిత్రాన్ని అప్‌లోడ్ చేయండి',
    uploadDesc: 'విశ్లేషణ కోసం వేరుశెనగ ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి',
    chooseImage: 'చిత్రాన్ని ఎంచుకోండి',
    analyzing: 'విశ్లేషిస్తోంది...',
    analyzeYOLO: 'YOLO తో విశ్లేషించండి',
    clear: 'క్లియర్',
    recentDetections: 'ఇటీవలి గుర్తింపులు',
    records: 'రికార్డులు',
    history: 'చరిత్ర',
    
    // Detection Results
    detectionResults: 'గుర్తింపు ఫలితాలు',
    highSeverity: 'అధిక తీవ్రత',
    mediumSeverity: 'మధ్యస్థ తీవ్రత',
    lowSeverity: 'తక్కువ తీవ్రత',
    confidenceLevel: 'విశ్వాస స్థాయి',
    analysis: 'విశ్లేషణ',
    recommendations: 'సిఫార్సులు',
    scientificName: 'శాస్త్రీయ నామం',
    detectionMethod: 'గుర్తింపు పద్ధతి',
    
    // Abstract Page
    abstractTitle: 'సారాంశం',
    abstractContent: 'PeanutGuard అనేది వేరుశెనగ పంట వ్యాధులు మరియు పెస్ట్ ముట్టడిని గుర్తించడానికి మరియు నిర్ధారించడానికి YOLOv8 డీప్ లెర్నింగ్ సాంకేతికతను ఉపయోగించే అధునాతన వ్యాధి గుర్తింపు వ్యవస్థ. మా వ్యవస్థ రైతులకు వారి పంటలను రక్షించడానికి తక్షణ, ఖచ్చితమైన విశ్లేషణ మరియు నిపుణుల సిఫార్సులను అందిస్తుంది.',
    
    // Technical Page
    technicalTitle: 'సాంకేతిక వివరాలు',
    technologyStack: 'సాంకేతిక స్టాక్',
    yoloModel: 'YOLOv8 మోడల్',
    yoloDesc: 'వ్యాధి గుర్తింపు కోసం అత్యాధునిక వస్తువు గుర్తింపు',
    cloudInfra: 'క్లౌడ్ మౌలిక సదుపాయం',
    cloudDesc: 'నిజ-సమయ ప్రాసెసింగ్ కోసం స్కేలబుల్ బ్యాకెండ్',

    // Common/Toasts
    invalidImage: 'చెల్లని చిత్రం',
    detectionComplete: 'గుర్తింపు పూర్తైంది',
    analysisSuccess: 'విశ్లేషణ విజయవంతం',
    errorTitle: 'లోపం',
    noHistory: 'ఇప్పటికీ గుర్తింపు చరిత్ర లేదు',
    welcomeTitle: 'మీ ఖాళీ యాప్‌కు స్వాగతం',
    welcomeSubtitle: 'ఇక్కడి నుంచి మీ ప్రాజెక్ట్‌ను ప్రారంభించండి!',
    notFoundTitle: '404',
    notFoundSubtitle: 'అయ్యో! పేజీ కనబడలేదు',
    goHome: 'హోమ్‌కు తిరుగు',
  },
  zh: {
    // Navigation
    home: '主页',
    abstract: '摘要',
    diseaseDetection: '病害检测',
    technicalDetails: '技术细节',
    
    // Home Page
    heroTitle: '花生病害检测系统',
    heroSubtitle: '使用先进的YOLOv8技术保护您的花生作物',
    getStarted: '开始使用',
    learnMore: '了解更多',
    whyChoose: '为什么选择PeanutGuard？',
    accurateDetection: '准确检测',
    accurateDesc: 'YOLOv8驱动的系统以高精度识别病害',
    instantResults: '即时结果',
    instantDesc: '在几秒钟内获得实时分析和建议',
    expertGuidance: '专家指导',
    expertDesc: '从农业专家那里获得详细的治疗建议',
    easyToUse: '易于使用',
    easyDesc: '为农民和农业专业人士设计的简单界面',
    readyToProtect: '准备好保护您的作物了吗？',
    startDetecting: '立即开始检测',
    
    // Detection Page
    detectionType: '检测类型',
    insectIdentification: '昆虫识别',
    insectDesc: '检测可见害虫，如蚜虫、蓟马、毛虫等',
    damageSymptom: '损害症状分析',
    damageDesc: '从咬痕、变色、卷曲等症状中识别害虫损害',
    comprehensive: '综合分析',
    comprehensiveDesc: '对可见害虫和损害症状进行完整扫描',
    analyzeImage: '分析图像',
    uploadImage: '上传图像',
    uploadDesc: '上传花生叶片图像进行分析',
    chooseImage: '选择图像',
    analyzing: '分析中...',
    analyzeYOLO: '使用YOLO分析',
    clear: '清除',
    recentDetections: '最近的检测',
    records: '记录',
    history: '历史',
    
    // Detection Results
    detectionResults: '检测结果',
    highSeverity: '高严重性',
    mediumSeverity: '中等严重性',
    lowSeverity: '低严重性',
    confidenceLevel: '置信度',
    analysis: '分析',
    recommendations: '建议',
    scientificName: '学名',
    detectionMethod: '检测方法',
    
    // Abstract Page
    abstractTitle: '摘要',
    abstractContent: 'PeanutGuard是一个先进的病害检测系统，利用YOLOv8深度学习技术识别和诊断花生作物病害和害虫侵扰。我们的系统为农民提供即时、准确的分析和专家建议，以保护他们的作物。',
    
    // Technical Page
    technicalTitle: '技术细节',
    technologyStack: '技术栈',
    yoloModel: 'YOLOv8模型',
    yoloDesc: '用于病害识别的最先进的物体检测',
    cloudInfra: '云基础设施',
    cloudDesc: '用于实时处理的可扩展后端',

    // Common/Toasts
    invalidImage: '无效的图片',
    detectionComplete: '检测完成',
    analysisSuccess: '分析成功',
    errorTitle: '错误',
    noHistory: '暂无检测历史',
    welcomeTitle: '欢迎使用你的空白应用',
    welcomeSubtitle: '从这里开始构建你的项目！',
    notFoundTitle: '404',
    notFoundSubtitle: '抱歉！页面未找到',
    goHome: '返回首页',
  },
  pt: {
    // Navigation
    home: 'INÍCIO',
    abstract: 'RESUMO',
    diseaseDetection: 'DETECÇÃO DE DOENÇAS',
    technicalDetails: 'DETALHES TÉCNICOS',
    
    // Home Page
    heroTitle: 'Sistema de Detecção de Doenças do Amendoim',
    heroSubtitle: 'Proteja suas plantações de amendoim com tecnologia avançada YOLOv8',
    getStarted: 'Começar',
    learnMore: 'Saiba Mais',
    whyChoose: 'Por Que Escolher PeanutGuard?',
    accurateDetection: 'Detecção Precisa',
    accurateDesc: 'Sistema com YOLOv8 identifica doenças com alta precisão',
    instantResults: 'Resultados Instantâneos',
    instantDesc: 'Obtenha análise e recomendações em tempo real em segundos',
    expertGuidance: 'Orientação Especializada',
    expertDesc: 'Receba recomendações detalhadas de tratamento de especialistas agrícolas',
    easyToUse: 'Fácil de Usar',
    easyDesc: 'Interface simples projetada para agricultores e profissionais agrícolas',
    readyToProtect: 'Pronto para Proteger Suas Plantações?',
    startDetecting: 'Começar Detecção Agora',
    
    // Detection Page
    detectionType: 'Tipo de Detecção',
    insectIdentification: 'Identificação de Insetos',
    insectDesc: 'Detectar pragas visíveis como pulgões, tripes, lagartas e mais',
    damageSymptom: 'Análise de Sintomas de Dano',
    damageDesc: 'Identificar danos por pragas através de sintomas como marcas de mordida, descoloração, enrolamento',
    comprehensive: 'Análise Abrangente',
    comprehensiveDesc: 'Varredura completa de pragas visíveis e sintomas de dano',
    analyzeImage: 'Analisar Imagem',
    uploadImage: 'Carregar Imagem',
    uploadDesc: 'Carregue uma imagem de folha de amendoim para análise',
    chooseImage: 'Escolher Imagem',
    analyzing: 'Analisando...',
    analyzeYOLO: 'Analisar com YOLO',
    clear: 'Limpar',
    recentDetections: 'Detecções Recentes',
    records: 'Registros',
    history: 'Histórico',
    
    // Detection Results
    detectionResults: 'Resultados da Detecção',
    highSeverity: 'Alta Severidade',
    mediumSeverity: 'Severidade Média',
    lowSeverity: 'Baixa Severidade',
    confidenceLevel: 'Nível de Confiança',
    analysis: 'Análise',
    recommendations: 'Recomendações',
    scientificName: 'Nome Científico',
    detectionMethod: 'Método de Detecção',
    
    // Abstract Page
    abstractTitle: 'Resumo',
    abstractContent: 'PeanutGuard é um sistema avançado de detecção de doenças que aproveita a tecnologia de aprendizado profundo YOLOv8 para identificar e diagnosticar doenças de culturas de amendoim e infestações de pragas. Nosso sistema fornece aos agricultores análise instantânea e precisa e recomendações especializadas para proteger suas plantações.',
    
    // Technical Page
    technicalTitle: 'Detalhes Técnicos',
    technologyStack: 'Stack de Tecnologia',
    yoloModel: 'Modelo YOLOv8',
    yoloDesc: 'Detecção de objetos de última geração para identificação de doenças',
    cloudInfra: 'Infraestrutura em Nuvem',
    cloudDesc: 'Backend escalável para processamento em tempo real',

    // Common/Toasts
    invalidImage: 'Imagem inválida',
    detectionComplete: 'Detecção concluída',
    analysisSuccess: 'Análise bem-sucedida',
    errorTitle: 'Erro',
    noHistory: 'Ainda não há histórico de detecções',
    welcomeTitle: 'Bem-vindo ao seu app em branco',
    welcomeSubtitle: 'Comece a construir seu projeto aqui!',
    notFoundTitle: '404',
    notFoundSubtitle: 'Ops! Página não encontrada',
    goHome: 'Voltar ao início',
  },
  ha: {
    // Navigation (Hausa - Nigerian language)
    home: 'GIDA',
    abstract: 'TAƘAITACCEN BAYANI',
    diseaseDetection: 'GANO CUTA',
    technicalDetails: 'CIKAKKUN BAYANAI',
    
    // Home Page
    heroTitle: 'Tsarin Gano Cutar Gyada',
    heroSubtitle: 'Kare amfanin gonakin gyada tare da fasahar YOLOv8 mai ci gaba',
    getStarted: 'Fara',
    learnMore: 'Ƙarin Koyo',
    whyChoose: 'Me Yasa Za Ku Zaɓi PeanutGuard?',
    accurateDetection: 'Ingantaccen Ganowa',
    accurateDesc: 'Tsarin YOLOv8 yana gano cututtuka tare da inganci',
    instantResults: 'Sakamakon Nan Take',
    instantDesc: 'Sami bincike da shawarwari nan take cikin ƙananan daƙiƙa',
    expertGuidance: 'Jagorancin Ƙwararru',
    expertDesc: 'Karɓi cikakkun shawarwarin magani daga ƙwararrun aikin gona',
    easyToUse: 'Sauƙi Don Amfani',
    easyDesc: 'Sauƙin dubawa wanda aka ƙera don manoma da ƙwararrun aikin gona',
    readyToProtect: 'Shirye Don Kare Amfanin Gonakin Ku?',
    startDetecting: 'Fara Ganowa Yanzu',
    
    // Detection Page
    detectionType: 'Nau\'in Ganowa',
    insectIdentification: 'Gano Kwari',
    insectDesc: 'Gano kwari masu ganewa kamar aphids, thrips, caterpillars, da dai sauransu',
    damageSymptom: 'Nazarin Alamun Lalacewa',
    damageDesc: 'Gano lalacewar kwari daga alamu kasu alamun cizo, canjin launi, murɗewa',
    comprehensive: 'Cikakken Bincike',
    comprehensiveDesc: 'Cikakken bincike na kwari masu ganewa da alamun lalacewa',
    analyzeImage: 'Bincika Hoto',
    uploadImage: 'Loda Hoto',
    uploadDesc: 'Loda hoton ganyen gyada don bincike',
    chooseImage: 'Zaɓi Hoto',
    analyzing: 'Ana Bincikewa...',
    analyzeYOLO: 'Bincika da YOLO',
    clear: 'Share',
    recentDetections: 'Abubuwan Da Aka Gano Kwanan Nan',
    records: 'Bayanan',
    history: 'Tarihi',
    
    // Detection Results
    detectionResults: 'Sakamakon Ganowa',
    highSeverity: 'Babban Matsananci',
    mediumSeverity: 'Matsakaicin Matsananci',
    lowSeverity: 'Ƙaramin Matsananci',
    confidenceLevel: 'Matakin Aminci',
    analysis: 'Bincike',
    recommendations: 'Shawarwari',
    scientificName: 'Sunan Kimiyya',
    detectionMethod: 'Hanyar Ganowa',
    
    // Abstract Page
    abstractTitle: 'Taƙaitaccen Bayani',
    abstractContent: 'PeanutGuard tsarin gano cuta ne mai ci gaba wanda ke amfani da fasahar koyo mai zurfi ta YOLOv8 don gano da bincika cututtukan amfanin gonakin gyada da annobar kwari. Tsarinmu yana ba manoma bincike nan take mai inganci da shawarwarin ƙwararru don kare amfanin gonakinsu.',
    
    // Technical Page
    technicalTitle: 'Cikakkun Bayanai',
    technologyStack: 'Tsarin Fasaha',
    yoloModel: 'Samfurin YOLOv8',
    yoloDesc: 'Gano abubuwa na zamani don gano cuta',
    cloudInfra: 'Tushen Gajimare',
    cloudDesc: 'Backend mai ƙarfi don sarrafa lokaci-lokaci',

    // Common/Toasts
    invalidImage: 'Hoto mara inganci',
    detectionComplete: 'An kammala gano wa',
    analysisSuccess: 'Bincike ya yi nasara',
    errorTitle: 'Kuskure',
    noHistory: 'Babu tarihin ganowa tukuna',
    welcomeTitle: 'Barka da zuwa aikace-aikacen ku mara komai',
    welcomeSubtitle: 'Fara gina aikin ku anan!',
    notFoundTitle: '404',
    notFoundSubtitle: 'Yi haƙuri! Shafin bai samu ba',
    goHome: 'Koma Gida',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
