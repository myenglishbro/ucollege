import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

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

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
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

export const benefits = [
   {
    id: "0",
    title: "CELPIP Prep Course",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl:benefitIcon1,
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/nNp7wb22/Chat-GPT-Image-4-jul-2025-17-24-37.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/celpip",
    details: {
      features: [
        " Clases personalizadas y material exclusivo en cada sesión",
        "Soporte y acompañamiento 24/7 vía WhatsApp ",
        "Acceso exclusivo al Roadmap, simuladores y herramientas prácticas",
      ],
      price: "S/.420 Nuevos Soles",
      enlace:
        "https://learnibox.vercel.app/celpip",
    },
  },
  {
    id: "0",
    title: "Cambridge Prep Course",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl:benefitIcon1,
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/5W6ZMH6b/Chat-GPT-Image-4-jul-2025-15-48-59.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅Tu clase se graba y se envia por correo a cada correo",
        "✅ Google Meet Premium",
        "✅ Clases Personalizadas + Material de Clase",
        "✅Puedes hacer preguntas al profe por wsp directamente",
        "✅ Incluye preparacion para Exámenes Internacionales",
        "✅ 03 Reprogramaciones",
        "✅ Acceso al Roadmap con Material Exclusivo (A1 to C1 90 días)",
        "✅ Código de Descarga Roadmap",
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
    iconUrl:benefitIcon1,
    imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/MyFH0rND/Chat-GPT-Image-4-jul-2025-16-25-38.png",
    // Se usa la propiedad "ruta" como enlace del icono
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅Tu clase se graba y se envia por correo a cada correo",
        "✅ Google Meet Premium",
        "✅ Clases Personalizadas + Material de Clase",
        "✅Puedes hacer preguntas al profe por wsp directamente",
        "✅ Incluye preparacion para Exámenes Internacionales",
        "✅ 03 Reprogramaciones",
        "✅ Acceso al Roadmap con Material Exclusivo (A1 to C1 90 días)",
        "✅ Código de Descarga Roadmap",
      ],
      price: "S/.590 Nuevos Soles",
      enlace:
        "https://docs.google.com/spreadsheets/d/1jpKL_kwxAWuqo9v6aVBSiKpiAij6i3E3ysPSxlajgRY/preview",
    },
  },
  {
    id: "1",
    title: "Paquete Standard 10 horas",
    text: "Este paquete de clases cuenta con 10 horas de clases en vivo",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl:benefitIcon1,
    imgGif:
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/BH2knmK0/Chat-GPT-Image-4-jul-2025-15-14-44.png",
    iconLink: "https://learnibox.vercel.app/RoadMapB2",
    details: {
      features: [
        "✅ Clases Personalizadas + Material de Clase",
        "✅ Material de Clase",

        "✅Puedes hacer preguntas al profe por wsp directamente",
        "✅ Incluye preparacion para Exámenes Internacionales",
        "❌ No hay Reprogramaciones - si faltas no se recuperan",
        "❌ Acceso al Roadmap con Material Exclusivo(30 días)",
        "❌ Código de Descarga Roadmap",
       
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
    iconUrl:
      benefitIcon1,
      imgGif:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZuazNnd2N5ODNrbHJmNmd6MXZ0eGt3cjJ5bjN5M2lxaTc4eGl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3WLuO5QRLyAV9MWEM/giphy.gif",
    imageUrl:
      "https://i.ibb.co/x8qsfY5C/Chat-GPT-Image-4-jul-2025-16-31-56.png",
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
    iconUrl:
      benefitIcon1,
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
    iconUrl:benefitIcon1,
    
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
    iconUrl:
      benefitIcon1,
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
    iconUrl:benefitIcon1,
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
    iconUrl:
      benefitIcon1,
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
    iconUrl:
    benefitIcon1,
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
    iconUrl:
    benefitIcon1,
    
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
  { title: "Home", path: "/myenglishbro" },
 
  { title: "Cursos",       path: "/Store" },


  
  
];




export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
