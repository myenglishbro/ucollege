import { facebook, instagram, linkedin, www ,star,shield,send,nice,writing ,bullseye,teacher,mano,smirk} from "../assets";

export const navLinks =  [
    {
      title: "Home",
      path: "/",
     
    },
    {
      title: "About",
      path: "/About"
      
     
    },
    
    {
      title: "Info",
      path: "/Precios"
    },
    {
      title: "Library",
      path: "/Store"
  
    },
    {
      title: "Clases",
      path: "/Clases"
     
    },
    {
      title: "RoadMap",
      path: "/RoadMap"
  
    },
    {
      title: "Horario",
      path: "/Horario"
  
    },
    {
      title: "Extra",
      path: "/PoliticasClase"
    },
    
   
   {
      title: "B2/C1",
      path: "/RoadMapMed"
      
    }
    
    ,
    {
      title: "Devs",
      path: "/RoadMapDev"
      
    }
    
    ,
    {
      title: "Student Zone",
      dropdown: true,
      dropdownLinks: [
        {
          title: "My Portal",
          path: "/MyPortal"
        },
        {
          title: "Horario",
          path: "/Horario"
        
  
        },
        {
          title: "Politicas de Clases",
          path: "/PoliticasClase"
         
      
        },
        {
          title: "Pagos",
          path: "/Pagos"
      
        }
       ,
        {
          title: "Carlos Apolaya",
          path: "https://meb3.vercel.app/"
        }
      ]
      
  
    }
  ];

  export const footerLinks = [
    {
      title: "Useful Links",
      links: [
        {
          name: "Content",
          link: "https://www.hoobank.com/content/",
        },
        {
          name: "How it Works",
          link: "https://www.hoobank.com/how-it-works/",
        },
        {
          name: "Create",
          link: "https://www.hoobank.com/create/",
        },
        {
          name: "Explore",
          link: "https://www.hoobank.com/explore/",
        },
        {
          name: "Terms & Services",
          link: "https://www.hoobank.com/terms-and-services/",
        },
      ],
    },
    {
      title: "Community",
      links: [
        {
          name: "Help Center",
          link: "https://www.hoobank.com/help-center/",
        },
        {
          name: "Partners",
          link: "https://www.hoobank.com/partners/",
        },
        {
          name: "Suggestions",
          link: "https://www.hoobank.com/suggestions/",
        },
        {
          name: "Library",
          link: "https://ucollege-meb.vercel.app/Store",
        },
        {
          name: "Prices",
          link: "https://ucollege-meb.vercel.app/Store",
        },
      ],
    },
    {
      title: "Partner",
      links: [
        {
          name: "Our Partner",
          link: "https://www.hoobank.com/our-partner/",
        },
        {
          name: "Become a Partner",
          link: "https://www.hoobank.com/become-a-partner/",
        },
      ],
    },
  ];
  
  export const socialMedia = [
    {
      id: "social-media-1",
      icon: instagram,
      link: "https://www.instagram.com/",
    },
    {
      id: "social-media-2",
      icon: facebook,
      link: "https://www.facebook.com/",
    },
    {
      id: "social-media-3",
      icon: www,
      link: "https://ucollege-meb.vercel.app/Store",
    },
    {
      id: "social-media-4",
      icon: linkedin,
      link: "https://www.linkedin.com/",
    },
  ];

  export const stats = [
    {
      id: "stats-1",
      title: "Autodidacta",
      value: "RoadMap ",
      img:writing
    },
    {
      id: "stats-2",
      title: "Estudiantes ",
      value: "2604  ",
      img:nice
    },
    {
      id: "stats-3",
      title: "Nos Recomienda",
      value: "98%  ",
      img:bullseye
    },
  ];

  export const features = [
    {
      id: "feature-1",
      icon: teacher,
      title: "Clases en Vivo y Asesoramiento Constante",
      content: "Todas tus clases son personalizadas de acuerdo a tu nivel , responderé todas tus preguntas y te brindare todos los recursos necesario para poder hablar el ingles como un nativo ",
    },
    {
      id: "feature-2",
      icon: mano,
      title: "Roadmap",
      content: "Encontrarás material educativo para repasar o adelantarte ",
    },
    {
      id: "feature-3",
      icon: smirk,
      title: "After class",
      content:
        "Son clases adicionales a tu paquete de clases donde resolveré todas tus preguntas",
    },
  ];


  export const politicas = [
    {
      id: "politica-1",
      icon: star,
      title: "¿Puedo cambiar o cancelar mi clase programada?",
      content: " ¡Sí! Si no puedes asistir a la clase programada, cancélala con al menos 24 horas de anticipación.Entonces podrás programar otra clase para ese mismo día o para otro día de la misma semana. Alternativamente, puedes llamar inmediatamente a uno de los excelentes tutores que están en línea +51 926 922 032",
    },
    {
      id: "politica-2",
      icon: shield,
      title: "Ten en cuenta",
      content: "Siempre queremos recordar que tanto los estudiantes como los tutores deben valorar el tiempo de cada uno ⏰. Cuando reservas una clase, el tutor se prepara con anticipación para enseñarte y asegurarse de que tengas la mejor experiencia de aprendizaje posible 📚. Si cancelas una clase sin previo aviso, le estás dejando en el aire y eso puede ser una pérdida para ambos. Sin embargo, si cancelas con al menos 24 horas de anticipación, el tutor tendrá la posibilidad de trabajar con otro alumno y tú podrás volver a utilizar esos minutos en una clase futura 🤝."
    },{
      id: "politica-3",
      icon: send,
      title: "Mi tutor no llegó a la lección 🤔❌",
      content:" Lamentamos mucho que tu tutor no pudo asistir a tu clase programada. Sabemos que esto puede ser frustrante, pero debes recordar que los tutores también son seres humanos y pueden tener imprevistos personales o técnicos que los impidan llegar a tu lección a tiempo.Recuerda que en nuestro servicio, tú eres nuestra prioridad y haremos todo lo posible para asegurarnos de que recibas la mejor experiencia de aprendizaje. 🤗",   
     },{
      id: "politica-4",
      icon: send,
      title: "¿Qué ocurre si no asisto a mi reserva? 🤔❌",
      content:"Cuando haces una reserva, te comprometes a asistir a esa lección. Entendemos que las emergencias surgen y que hay muchas razones por las que un estudiante puede tener que perder una lección inesperadamente.Si resulta que no vas a poder asistir a tu lección programada, por favor, cancélala al menos con 24 horas de antelación.Después, puedes programar una nueva lección para el horario que más te convenga",   
     }

  ];