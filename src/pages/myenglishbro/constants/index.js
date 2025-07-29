
import {
  Home,
  BookOpen,
  User2,

  Star,
  Rocket,
  ShieldCheck
} from "lucide-react";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];





export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const 

benefits = [
   {
    id: "0",
    title: "CELPIP Prep Course",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/QjHmb4c1/Chat-GPT-Image-4-jul-2025-15-19-30.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/celpip",
    details: {
      features: [
        { text: "Feedback 1:1 con expertos", icon: <User2 size={16} /> },
        { text: "Soporte prioritario", icon: <ShieldCheck size={16} /> }
      ],
      price: "S/.420 Nuevos Soles",
      enlace:
        "https://learnibox.vercel.app/celpip",
    },
  },
  {
    id: "1",
    title: "CELPIP Prep Course",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/QjHmb4c1/Chat-GPT-Image-4-jul-2025-15-19-30.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/celpip",
    details: {
      features: [
        { text: "Material exclusivo cada mes", icon: <Rocket size={16} /> },
        { text: "Feedback 1:1 con expertos", icon: <User2 size={16} /> },
        { text: "Repositorio 30 días", icon: <BookOpen size={16} /> },
        { text: "Soporte prioritario", icon: <ShieldCheck size={16} /> }
      ],
      price: "S/.470 Nuevos Soles",
      enlace:
        "https://learnibox.vercel.app/celpip",
    },
  },
  {
    id: "0",
    title: "Cambridge Prep Course",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/5W6ZMH6b/Chat-GPT-Image-4-jul-2025-15-48-59.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        { text: "Certificación oficial Cambridge", icon: <Star size={16} /> },
        { text: "Material exclusivo cada mes", icon: <Rocket size={16} /> },
        { text: "Feedback 1:1 con expertos", icon: <User2 size={16} /> },
        { text: "Aula virtual 24/7", icon: <BookOpen size={16} /> },
        { text: "Soporte prioritario", icon: <ShieldCheck size={16} /> }
      ],
      price: "S/.590 Nuevos Soles",
      enlace:
        "https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
    },
  },
  {
    id: "1",
    title: "Paquete Premium",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/MyFH0rND/Chat-GPT-Image-4-jul-2025-16-25-38.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅ Clases Personalizadas + Material de Clase",
        "✅ Asesoria 24/7", 
        "✅ Incluye preparacion para Exámenes Internacionales",
        "❌ No hay Reprogramaciones",
      ],
      price: "S/.420 Nuevos Soles",
      enlace:
        "https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
    },
  },
  {
    id: "1",
    title: "Paquete Standard 10 horas",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    imgGif:
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/BH2knmK0/Chat-GPT-Image-4-jul-2025-15-14-44.png",
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅ Clases Personalizadas + Material de Clase",
        "✅ Asesoria 24/7",       
        "❌ Puedes hacer preguntas al profe por wsp directamente",
        "❌ Incluye preparacion para Exámenes Internacionales",
        "❌ No hay Reprogramaciones",
        "❌ Acceso al Roadmap con Material Exclusivo",
       
      ],
      price: "S/.390 Nuevos Soles",
      enlace:
        "https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
    },
  },
  {
    id: "2",
    title: "Paquete Básico",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
      imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/x8qsfY5C/Chat-GPT-Image-4-jul-2025-16-31-56.png",
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅ Clases Personalizadas + Material de Clase",
        "❌ Asesoria 24/7",  
        "❌ Puedes hacer preguntas al profe por wsp directamente",
        "❌ Incluye preparacion para Exámenes Internacionales",
        "❌ No hay Reprogramaciones",
        "❌ Acceso al Roadmap con Material Exclusivo",
      ],
      price: "S/.350 Nuevos Soles",
      enlace:
        "https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
    },
  },
  {
    id: "3",
    title: "Paquete Standard 20 horas",
    text: "Este paquete de clases cuenta con 20 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
   
      imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/Q7pKqT32/Chat-GPT-Image-Jun-4-2025-10-13-49-AM.png",
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅Tu clase se graba y se envia por correo a cada correo",
        "✅ Google Meet Premium",
        "✅ Clases Personalizadas + Material de Clase",
        "❌ Puedes hacer preguntas al profe por wsp directamente",
        "❌ Incluye preparacion para Exámenes Internacionales",
        "❌ No hay Reprogramaciones",
        "❌ Acceso al Roadmap con Material Exclusivo",
        "❌ Código de Descarga Roadmap",
        "❌ Talleres los fines de semana Sábados y Domingo",
      ],
      price: "S/.700 Nuevos Soles",
      enlace:
        "https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
    },
  },
  {
    id: "4",
    title: "RoadMap A1",
    text: "Domina lo esencial para comunicarte con confianza en situaciones cotidianas simples. ¡Empieza tu camino hacia la fluidez aquí! 🚀",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    
    imgGif:
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/0R16wVz3/Chat-GPT-Image-4-jul-2025-15-06-26.png",
    iconLink: "https://learnibox.vercel.app/RoadMapA1",
    details: {
      features: [
        "Técnicas básicas de pronunciación 🗣️",
        "Reglas gramaticales fundamentales 📚",
        "Vocabulario esencial 📝",
        "Ejercicios interactivos 🎮",
        "Tarjetas didácticas para aprendizaje rápido 📖",
        "Clases grabadas y lecciones en video 🎥",
        "Cuestionarios y exámenes finales 📝",
      ],
      price: "Suscripcion Mensual S/.30 Nuevos Soles",
    },
  },
  {
    id: "5",
    title: "Ruta Autónoma A2",
    text: "Cierra la brecha hacia la comunicación intermedia. Habla y entiende expresiones comunes con confianza. 💬",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    
      imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/Z6WcNLDR/Chat-GPT-Image-4-jul-2025-14-52-20.png",
    iconLink: "https://learnibox.vercel.app/RoadMapA2",
    details: {
      features: [
        "Estructuras simples para el día a día 🌟",
        "Expresiones y frases comunes 🗨️",
        "Diálogos prácticos 👫",
        "Ejercicios interactivos y tarjetas didácticas 🧩",
        "Lecciones en video para mayor claridad 📹",
        "Clases grabadas y evaluaciones 📝",
      ],
      price: "Suscripcion Mensual S/.30 Nuevos Soles",
    },
  },
  {
    id: "6",
    title: "Ruta Autónoma B1",
    text: "Lleva tus habilidades a un nuevo nivel. Maneja conversaciones detalladas y mejora tu escritura. ✍️",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/bgmjf5RB/Chat-GPT-Image-4-jul-2025-14-55-55.png",
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "Técnicas básicas de escritura 🖋️",
        "Conversaciones detalladas 🗨️",
        "Dominio de gramática intermedia 📖",
        "Tarjetas didácticas y práctica interactiva 🔄",
        "Lecciones completas en video 🎬",
        "Exámenes para medir tu progreso 📝",
      ],
      price: "Suscripcion Mensual S/.30 Nuevos Soles",
    },
  },
  {
    id: "7",
    title: "Ruta Autónoma B2",
    text: "¡Prepárate para alcanzar el nivel B2 de manera efectiva y a tu ritmo! Nuestra plataforma está diseñada para brindarte recursos exclusivos y explicaciones claras sobre más de 90 temas esenciales.",
    backgroundUrl: "./src/assets/benefits/card-7.svg",
    
      imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/cKwYVGwB/Chat-GPT-Image-4-jul-2025-14-58-15.png",
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "Gramática esencial: Aprende las diferencias y mucho más.",
        "Phrasal verbs y expresiones fundamentales.",
        "Estructuras avanzadas para expresarte con fluidez y precisión.",
        "Clases grabadas 🎥",
        "Pruebas simuladas 📝",
        "Actividades interactivas 🧩",
      ],
      price: "Suscripcion Mensual S/.45 Nuevos Soles",
    },
  },
  
  {
    id: "8",
    title: "Ruta Autónoma C1",
    text: "Logra un dominio profesional del inglés. Realiza presentaciones, escribe con precisión y conversa con facilidad. 💼",
    backgroundUrl: "./src/assets/benefits/card-8.svg",
    
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/5XjhWbzg/Chat-GPT-Image-4-jul-2025-15-00-48.png",
    iconLink: "https://learnibox.vercel.app/RoadMapC1",
    details: {
      features: [
        "Gramática esencial: Aprende las diferencias y mucho más.",
        "Phrasal verbs y expresiones fundamentales.",
        "Estructuras avanzadas para expresarte con fluidez y precisión.",
        "Clases grabadas 🎥",
        "Pruebas simuladas 📝",
        "Actividades interactivas 🧩",
      ],
      price: "Suscripcion Mensual S/.45 Nuevos Soles",
    },
  },
  {
    id: "9",
    title: "Ruta Autónoma C2",
    text: "Domina el idioma inglés con vocabulario avanzado, tonos profesionales y matices culturales. 🏆",
    backgroundUrl: "./src/assets/benefits/card-9.svg",
    
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/JFgyH9wP/Chat-GPT-Image-4-jul-2025-15-03-34.png",
    // No se define iconLink para este plan
    details: {
      features: [
        "Vocabulario avanzado y frases 🔝",
        "Expresiones fluidas y nativas 🗣️",
        "Dominio del tono profesional 📈",
        "Tarjetas didácticas y clases grabadas 🎥",
        "Escenarios interactivos y evaluaciones 🔄",
        "Preparación para aplicaciones en el mundo real 🌐",
      ],
      price: "Suscripcion Mensual S/.55 Nuevos Soles",
    },
  },
];




export const navLinks = [
  { title: "Home", path: "/myenglishbro", icon: <Home size={18} strokeWidth={2.2} /> },
 
  { title: "Courses", path: "/Store", icon: <BookOpen  size={18} strokeWidth={2.2} /> },


  
  
];





