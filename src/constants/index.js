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
      title: "Certificacion",
      path: "/Certificacion"
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