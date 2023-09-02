import { facebook, instagram, linkedin, www ,star,shield,send } from "../assets";

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
      title: "Precios",
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
      title: "Politicas",
      path: "/PoliticasClase"
    },
    
   
   {
      title: "Career Path",
      path: "/Speaking",
      dropdown: true,
      dropdownLinks: [
        {
          title: "Hospitality",
          path: "/HospitalityAndTour"
        },
        {
          title: "Dentestry",
          path: "/RoadMap"
        },
        {
          title: "Medicine",
          path: "/Clases/Aleman"
        }
      ]
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
      title: "Clases Gratuitas",
      value: "3800+",
    },
    {
      id: "stats-2",
      title: "Estudiantes Beneficiados",
      value: "230+",
    },
    {
      id: "stats-3",
      title: "Nos Recomendiendan",
      value: "98%",
    },
  ];

  export const features = [
    {
      id: "feature-1",
      icon: star,
      title: "Acceso Gratuito para Todos",
      content: "Nuestro compromiso es brindar oportunidades educativas a personas de todos los ámbitos. Tanto docentes como estudiantes pueden acceder de manera gratuita a una amplia variedad de materiales de alta calidad. Todos los documentos, clases y recursos están disponibles para su descarga sin costo alguno, garantizando que el aprendizaje esté al alcance de todos, sin importar sus recursos económicos.",
    },
    {
      id: "feature-2",
      icon: shield,
      title: "Rutas de Aprendizaje para Todos",
      content: "En nuestro repositorio, encontrarás rutas de aprendizaje diseñadas para abordar diversas áreas de conocimiento. Independientemente de tus intereses o nivel educativo, hay rutas de aprendizaje que se adaptan a ti. Creemos que todos merecen una educación completa y enriquecedora, sin importar sus circunstancias.",
    },
    {
      id: "feature-3",
      icon: send,
      title: "Apoya el Aprendizaje al Comprar en Udemy",
      content:
        "Cada vez que decides invertir en tu propio aprendizaje a través de la compra de un curso en Udemy, también estás apoyando a nuestra causa. Los fondos generados se reinvierten para crear y compartir más contenido educativo gratuito para quienes no tienen los medios para acceder a cursos pagados. Tu inversión no solo te beneficia, sino que también ayuda a construir un mundo educativo más equitativo y accesible para todos.",
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