import React from "react";

/**
 * Componente Footer de la aplicación
 * Contiene enlaces organizados por secciones y información de la empresa
 */
const Footer = () => {
	// Configuración de las secciones del footer
	const footerSections = [
		{
			title: "Para Clientes",
			links: [
				{ name: "Buscar Servicios", href: "#" },
				{ name: "Publicar Trabajo", href: "#" },
				{ name: "Mis Órdenes", href: "#" },
			],
		},
		{
			title: "Para Freelancers",
			links: [
				{ name: "Crear Servicio", href: "#" },
				{ name: "Buscar Trabajos", href: "#" },
				{ name: "Mi Perfil", href: "#" },
			],
		},
		{
			title: "Soporte",
			links: [
				{ name: "Centro de Ayuda", href: "#" },
				{ name: "Contacto", href: "#" },
				{ name: "Términos", href: "#" },
			],
		},
	];

	return (
		<footer className="bg-gray-900/80 backdrop-blur-xl text-white py-12 border-t border-gray-800/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Grid principal del footer */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Sección de marca y descripción */}
					<div>
						<h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
							SkillAgora
						</h3>
						<p className="text-gray-400 leading-relaxed">
							La plataforma líder para conectar talento con oportunidades.
						</p>
					</div>

					{/* Secciones de enlaces dinámicas */}
					{footerSections.map((section) => (
						<div key={section.title}>
							<h4 className="font-semibold mb-4 text-white">{section.title}</h4>
							<ul className="space-y-2 text-gray-400">
								{section.links.map((link) => (
									<li key={link.name}>
										<a
											href={link.href}
											className="hover:text-purple-400 transition-colors"
											// TODO: Reemplazar href="#" con rutas reales cuando estén disponibles
											aria-label={`Ir a ${link.name}`}
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Copyright y línea divisoria */}
				<div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} SkillAgora. Todos los derechos
						reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
