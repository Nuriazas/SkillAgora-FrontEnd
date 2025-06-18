# SkillAgora-FrontEnd
#  SkillAgora - Plataforma de Servicios Freelance

SkillAgora es una plataforma web donde los usuarios pueden buscar, ofrecer y contratar servicios freelance de forma eficiente y segura. La aplicación está desarrollada con **React 19**, **Vite**, **Tailwind CSS**, y utiliza un backend RESTful.

---

## Características Principales

✅ Registro y login con validación por correo electrónico  
✅ Creación y visualización de servicios freelance  
✅ Filtro por categorías, lugar y precio  
✅ Validación de usuario por token o código  
✅ Autenticación segura con JWT  
✅ Protección por intentos fallidos, expiración y rate limit  
✅ Interfaz adaptable y moderna con animaciones suaves  
✅ Manejo centralizado de errores y notificaciones  

---

## Tecnologías Utilizadas

- React 19 + React Router v7
- Tailwind CSS 4
- Vite 6
- Context API + Hooks personalizados
- Toastify para notificaciones
- Framer Motion para animaciones
- JWT para autenticación
- Fetch API + estructura modular de servicios

---

## Instalación y Ejecución

```bash
git clone https://github.com/Nuriazas/SkillAgora-FrontEnd.git
cd SkillAgora-FrontEnd
npm install
npm run dev
```

🔧 Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
VITE_API_URL=http://localhost:3000
```

---

## Estructura del Proyecto

```
src/
├── Components/ # Componentes reutilizables
├── config/ # Configuración general (e.g. API base, endpoints)
├── constants/ # Constantes globales (roles, estados, etc.)
├── context/ # Contextos React (Auth, Theme, etc.)
├── hooks/ # Custom hooks (useAuth, useFilters, etc.)
├── i18n/ # Configuración de i18next y archivos de traducción
├── pages/ # Páginas completas (Landing, Login, Validación, etc.)
├── services/ # Lógica para consumir APIs
├── styles/ # Archivos CSS / Tailwind personalizados
│ └── main.css
├── utils/ # Funciones utilitarias (manejo de errores, tokens, etc.)
├── App.jsx # Componente raíz con rutas
├── main.jsx # Punto de entrada React
```

---

## Rutas Disponibles

| Ruta                        | Descripción                                     |
|----------------------------|-------------------------------------------------|
| `/`                        | Landing page con búsqueda y servicios destacados |
| `/login`                   | Página de inicio de sesión                      |
| `/users/register`          | Registro de nuevos usuarios                     |
| `/validacion`              | Validación por email + código                   |
| `/freelancers`             | Listado de freelancers                          |
| `/services/create`         | Creación de servicios por freelancers           |
| `*`                        | Página 404 personalizada                        |

---

## Autenticación y Validación

- Al iniciar sesión se guarda el token JWT en `localStorage`.
- Se extrae información con `jwt-decode`.
- Protecciones:
  - Código de validación con expiración (5 minutos)
  - 3 intentos máximos
  - Máximo 5 solicitudes cada 15 minutos
- Rutas y servicios protegidos usan headers `Authorization`.

---

## Hooks y Contexto

- `useAuth`: Manejo de sesión (login, logout, usuario)
- `useServiceFilters`: Hook para manejar filtros de búsqueda
- `useTheme`: (opcional) para soporte de temas

---

## Servicios y APIs

Servicios agrupados por dominio:

```js
servicesApi.getFeaturedServices()
userApi.getCurrentUserFromToken()
contactApi.sendContactRequest(formData)
```

Ejemplo de headers con autenticación:

```js
{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}
```

---

## Manejo de Errores

Centralizado con `handleError.js`:

```js
import { handleError } from '../utils/handleError';

try {
  await someApiCall();
} catch (err) {
  handleError(err); 
}
```

También disponibles:
- `handleSuccess(msg)`
- `handleWarning(msg)`
- `handleInfo(msg)`

---

## Estilos Personalizados

Usa Tailwind CSS extendido con clases como:

```css
.line-clamp-3          /* Para truncar texto a 3 líneas */
.animate-smooth-pulse  /* Para efectos suaves en fondos */
```
---

## Licencia

Este proyecto está bajo la Licencia MIT.  
© 2025 [SkillAgora Team](https://github.com/Nuriazas/SkillAgora-FrontEnd)

---