import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  es: {
    translation: {
      header: {
        freelancers: "Freelancers",
        createService: "Crear Servicio",
        administrator: "Skill Agora Administrator",
      },
      search: {
        placeholder: "Buscar por nombre, especialidad o ubicación...",
        allSpecialties: "Todas las especialidades",
        sortByRating: "Ordenar por valoración",
        sortByPrice: "Ordenar por precio",
        searchFreelancers: "Buscar freelancers",
        filterBySpecialty: "Filtrar por especialidad",
        sortBy: "Ordenar por",
      },
      freelancerCard: {
        perHour: "€ / hora",
        location: "Ubicación",
        rating: "Valoración",
      },
      modal: {
        contact: "Contactar",
        close: "Cerrar",
        location: "Ubicación",
        hourlyRate: "Tarifa por hora",
        rating: "Valoración",
      },
      createService: {
        title: "Crear Nuevo Servicio",
        serviceTitle: "Título del Servicio",
        serviceTitlePlaceholder: "Ej: Desarrollo Web Frontend",
        description: "Descripción",
        descriptionPlaceholder: "Describe tu servicio en detalle...",
        pricePerHour: "Precio por Hora (€)",
        pricePlaceholder: "Ej: 35",
        category: "Categoría",
        selectCategory: "Selecciona una categoría",
        categories: {
          webDev: "Desarrollo Web",
          uiUx: "Diseño UI/UX",
          backend: "Desarrollo Backend",
          devops: "DevOps",
          digitalMarketing: "Marketing Digital",
          cybersecurity: "Ciberseguridad",
        },
        location: "Ubicación",
        locationPlaceholder: "Ej: Madrid, España",
        backToFreelancers: "Volver a Freelancers",
        cancel: "Cancelar",
        create: "Crear Servicio",
        creating: "Creando...",
      },
      common: {
        loading: "Cargando...",
        error: "Error",
        success: "Éxito",
        save: "Guardar",
        delete: "Eliminar",
        edit: "Editar",
        view: "Ver",
        search: "Buscar",
        filter: "Filtrar",
        sort: "Ordenar",
        all: "Todos",
        none: "Ninguno",
        select: "Seleccionar",
        cancel: "Cancelar",
        confirm: "Confirmar",
        back: "Volver",
        next: "Siguiente",
        previous: "Anterior",
        finish: "Finalizar",
      },
      freelancers: {
        specialties: {
          frontend: "Desarrollo Web Frontend",
          uiUx: "Diseño UI/UX",
          backend: "Desarrollo Backend",
          devops: "DevOps",
          marketing: "Marketing Digital",
          cybersecurity: "Ciberseguridad",
        },
        descriptions: {
          frontend:
            "Desarrolladora Frontend con más de 5 años de experiencia en React, Vue y Angular. Especializada en la creación de interfaces modernas, responsivas y accesibles. Experiencia en optimización de rendimiento y SEO.",
          uiUx: "Diseñador UI/UX con amplia experiencia en productos digitales y experiencia de usuario. Especializado en investigación de usuarios, wireframing, prototipado y diseño de interfaces intuitivas y atractivas.",
          backend:
            "Desarrollador Backend especializado en Node.js y Python. Experto en arquitecturas microservicios, APIs RESTful y GraphQL. Amplia experiencia en bases de datos SQL y NoSQL.",
          devops:
            "Ingeniero DevOps con experiencia en AWS, Docker y Kubernetes. Especializado en automatización de procesos, CI/CD, monitoreo y seguridad en la nube. Certificado en AWS Solutions Architect.",
          marketing:
            "Especialista en Marketing Digital con enfoque en campañas de Google Ads y estrategias en redes sociales. Experiencia en SEO, email marketing y análisis de datos para optimización de conversiones.",
          cybersecurity:
            "Consultor senior en ciberseguridad con más de 8 años de experiencia. Especializado en auditorías de seguridad, pentesting, análisis de vulnerabilidades y formación en seguridad para empresas.",
        },
      },
    },
  },
  en: {
    translation: {
      header: {
        freelancers: "Freelancers",
        createService: "Create Service",
        administrator: "Skill Agora Administrator",
      },
      search: {
        placeholder: "Search by name, specialty or location...",
        allSpecialties: "All specialties",
        sortByRating: "Sort by rating",
        sortByPrice: "Sort by price",
        searchFreelancers: "Search freelancers",
        filterBySpecialty: "Filter by specialty",
        sortBy: "Sort by",
      },
      freelancerCard: {
        perHour: "€ / hour",
        location: "Location",
        rating: "Rating",
      },
      modal: {
        contact: "Contact",
        close: "Close",
        location: "Location",
        hourlyRate: "Hourly rate",
        rating: "Rating",
      },
      createService: {
        title: "Create New Service",
        serviceTitle: "Service Title",
        serviceTitlePlaceholder: "Ex: Frontend Web Development",
        description: "Description",
        descriptionPlaceholder: "Describe your service in detail...",
        pricePerHour: "Price per Hour (€)",
        pricePlaceholder: "Ex: 35",
        category: "Category",
        selectCategory: "Select a category",
        categories: {
          webDev: "Web Development",
          uiUx: "UI/UX Design",
          backend: "Backend Development",
          devops: "DevOps",
          digitalMarketing: "Digital Marketing",
          cybersecurity: "Cybersecurity",
        },
        location: "Location",
        locationPlaceholder: "Ex: Madrid, Spain",
        backToFreelancers: "Back to Freelancers",
        cancel: "Cancel",
        create: "Create Service",
        creating: "Creating...",
      },
      common: {
        loading: "Loading...",
        error: "Error",
        success: "Success",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        view: "View",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        all: "All",
        none: "None",
        select: "Select",
        cancel: "Cancel",
        confirm: "Confirm",
        back: "Back",
        next: "Next",
        previous: "Previous",
        finish: "Finish",
      },
      freelancers: {
        specialties: {
          frontend: "Frontend Web Development",
          uiUx: "UI/UX Design",
          backend: "Backend Development",
          devops: "DevOps",
          marketing: "Digital Marketing",
          cybersecurity: "Cybersecurity",
        },
        descriptions: {
          frontend:
            "Frontend Developer with over 5 years of experience in React, Vue, and Angular. Specialized in creating modern, responsive, and accessible interfaces. Expertise in performance optimization and SEO.",
          uiUx: "UI/UX Designer with extensive experience in digital products and user experience. Specialized in user research, wireframing, prototyping, and designing intuitive and attractive interfaces.",
          backend:
            "Backend Developer specialized in Node.js and Python. Expert in microservices architectures, RESTful and GraphQL APIs. Extensive experience with SQL and NoSQL databases.",
          devops:
            "DevOps Engineer with experience in AWS, Docker, and Kubernetes. Specialized in process automation, CI/CD, cloud monitoring, and security. AWS Solutions Architect certified.",
          marketing:
            "Digital Marketing Specialist focused on Google Ads campaigns and social media strategies. Experience in SEO, email marketing, and data analysis for conversion optimization.",
          cybersecurity:
            "Senior Cybersecurity Consultant with over 8 years of experience. Specialized in security audits, pentesting, vulnerability analysis, and corporate security training.",
        },
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
