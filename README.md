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
✅ Sistema de roles (cliente, freelancer, admin)  
✅ Solicitudes de estatus freelancer con aprobación admin  
✅ Sistema de contactos y notificaciones  
✅ Reseñas y valoraciones  
✅ Internacionalización (i18n) - Español e Inglés  

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
- i18next para internacionalización

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

## 🧪 Guía de Pruebas y Verificación

### Credenciales de Prueba

**Contraseña para todos los usuarios: `12312312`**

#### Usuarios Predefinidos:

1. **Admin (ID: 1)**
   - Email: `adminskillagora1@gmail.com`
   - Rol: `admin`
   - Funciones: Gestionar solicitudes de freelancer, ver estadísticas

2. **Clientes**
   - `cliente1@test.com` (Juan Pérez)
   - `cliente2@test.com` (Laura Rodríguez)
   - `cliente3@test.com` (Miguel González)
   - Rol: `client`
   - Funciones: Buscar servicios, contactar freelancers

3. **Freelancers**
   
   - `ana.garcia@test.com` (Ana García)
   - `carlos.martinez@test.com` (Carlos Martínez)
   - `maria.lopez@test.com` (María López)
   - `david.fernandez@test.com` (David Fernández)
   - `laura.sanchez@test.com` (Laura Sánchez)
   - `sergio.ruiz@test.com` (Sergio Ruiz)
   - `elena.jimenez@test.com` (Elena Jiménez)
   - `alberto.torres@test.com` (Alberto Torres)
   - Rol: `freelancer`
   - Funciones: Crear servicios, recibir contactos

### 🔍 Verificación de Funcionalidades Frontend

#### 1. Landing Page y Navegación
- **URL**: `http://localhost:5173/`
- **Verificar**:
  - Hero section con animaciones
  - Botón flotante "¿Quieres ser freelancer?" (aparece después de 5s para clientes)
  - Sección "¿Cómo funciona?" con 3 pasos
  - Navegación responsive
  - Cambio de idioma (ES/EN)

#### 2. Sistema de Registro
- **URL**: `http://localhost:5173/register`
- **Verificar**:
  - Formulario con validaciones
  - Campos traducidos correctamente (Nombre, Apellido, Correo electrónico, Contraseña)
  - Envío de código de validación por email
  - Redirección a validación

#### 3. Validación de Usuario
- **URL**: `http://localhost:5173/validate-user/:code`
- **Verificar**:
  - Página de validación con animaciones
  - Códigos de prueba: cualquier código que termine en "123"
  - Mensajes de éxito/error traducidos
  - Redirección automática después de validación

#### 4. Login y Autenticación
- **URL**: `http://localhost:5173/login`
- **Verificar**:
  - Login con usuarios predefinidos
  - Manejo de errores de autenticación
  - Redirección según rol del usuario
  - Persistencia de sesión

#### 5. Sistema de Roles y Permisos

**Como Cliente:**
- No puede acceder a "Crear Servicio"
- Puede buscar y contactar freelancers
- Botón "¿Quieres ser freelancer?" en perfil
- Modal de advertencia al intentar crear servicio

**Como Freelancer:**
- Puede crear, editar y eliminar servicios
- Recibe solicitudes de contacto
- Acceso completo a funcionalidades de servicios

**Como Admin:**
- Panel de notificaciones con solicitudes de freelancer
- Botones "Aceptar" y "Rechazar" para solicitudes
- Estadísticas del sistema

#### 6. Solicitud de Estatus Freelancer
1. **Iniciar sesión como cliente**
2. **Ir al perfil** → Botón "¿Quieres ser freelancer?"
3. **Hacer clic** → Solicitud enviada automáticamente
4. **Cambiar a admin** → Ver notificación en panel
5. **Aceptar/Rechazar** → Usuario recibe notificación

#### 7. Gestión de Servicios
- **Crear servicio** (solo freelancers):
  - URL: `http://localhost:5173/services/create`
  - Formulario completo con categorías
  - Subida de imágenes
  - Validaciones en tiempo real

- **Ver servicios**:
  - URL: `http://localhost:5173/services`
  - Filtros por categoría, precio, ubicación
  - Búsqueda por texto
  - Paginación

#### 8. Sistema de Contacto
- **Contactar freelancer**:
  - Modal de contacto desde perfil de freelancer
  - Mensaje predefinido editable
  - Confirmación de envío

- **Ver contactos** (admin):
  - Panel de notificaciones
  - Lista de solicitudes pendientes
  - Respuestas a mensajes

#### 9. Perfil de Usuario
- **URL**: `http://localhost:5173/profile`
- **Funcionalidades**:
  - Editar información personal
  - Subir foto de perfil
  - Ver historial de servicios/órdenes
  - Solicitar estatus freelancer (clientes)

#### 10. Internacionalización (i18n)
- **Cambiar idioma**: Botón en header
- **Verificar traducciones**:
  - Todos los textos cambian correctamente
  - Formularios traducidos
  - Mensajes de error/success
  - Navegación completa

### 🎨 Elementos UI/UX a Verificar

#### Animaciones y Transiciones
- Botón flotante con aparición suave
- Modales con animaciones de entrada/salida
- Transiciones entre páginas
- Loading states en formularios

#### Responsive Design
- **Desktop**: Layout completo
- **Tablet**: Navegación adaptada
- **Mobile**: Menú hamburguesa, formularios optimizados

#### Estados de Interfaz
- Loading states
- Error states con mensajes claros
- Success states con confirmaciones
- Empty states para listas vacías

### 🔧 Configuración de Pruebas

#### Validación por Email
- **Códigos de prueba**: Cualquier código que termine en "123"
- **Ejemplos**: `123123`, `456123`, `789123`
- **Página de validación**: `/validate-user/:code`

#### Notificaciones
- **Toast notifications** para acciones exitosas
- **Error boundaries** para errores inesperados
- **Loading spinners** para operaciones asíncronas

#### Almacenamiento
- **localStorage**: Tokens JWT, preferencias de usuario
- **Session management**: Manejo automático de expiración

---

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── admin/         # Componentes específicos de admin
│   ├── freelancers/   # Componentes de freelancers
│   ├── hero/          # Componentes de landing page
│   ├── layout/        # Header, Footer, navegación
│   ├── services/      # Componentes de servicios
│   ├── shared/        # Componentes compartidos
│   └── UI/            # Componentes de interfaz base
├── config/            # Configuración general (API, endpoints)
├── constants/         # Constantes globales (roles, estados)
├── context/           # Contextos React (Auth, Theme)
├── hooks/             # Custom hooks (useAuth, useFilters, etc.)
├── i18n/              # Configuración i18next y traducciones
│   └── locales/
│       ├── en/        # Traducciones en inglés
│       └── es/        # Traducciones en español
├── pages/             # Páginas completas
├── services/          # Lógica para consumir APIs
├── styles/            # Archivos CSS / Tailwind
├── utils/             # Funciones utilitarias
├── App.jsx            # Componente raíz con rutas
└── main.jsx           # Punto de entrada React
```

---

## Rutas Disponibles

| Ruta                        | Descripción                                     | Acceso |
|----------------------------|-------------------------------------------------|---------|
| `/`                        | Landing page con búsqueda y servicios destacados | Público |
| `/login`                   | Página de inicio de sesión                      | Público |
| `/register`                | Registro de nuevos usuarios                     | Público |
| `/validate-user/:code`     | Validación por email + código                   | Público |
| `/freelancers`             | Listado de freelancers                          | Público |
| `/services`                | Listado de servicios                            | Público |
| `/services/create`         | Creación de servicios (solo freelancers)        | Freelancer |
| `/profile`                 | Perfil de usuario                               | Autenticado |
| `/notifications`           | Panel de notificaciones                         | Autenticado |
| `/contact`                 | Página de contacto                              | Público |
| `/help`                    | Centro de ayuda                                 | Público |
| `*`                        | Página 404 personalizada                        | Público |

---

## Autenticación y Validación

- Al iniciar sesión se guarda el token JWT en `localStorage`.
- Se extrae información con `jwt-decode`.
- Protecciones:
  - Código de validación con expiración (5 minutos)
  - 3 intentos máximos
  - Máximo 5 solicitudes cada 15 minutos
- Rutas y servicios protegidos usan headers `Authorization`.
- Validación de roles para acciones específicas.

---

## Hooks y Contexto

- `useAuth`: Manejo de sesión (login, logout, usuario)
- `useServiceFilters`: Hook para manejar filtros de búsqueda
- `useTheme`: Para soporte de temas
- `useFreelancerModal`: Gestión de modales de freelancer
- `useServiceModal`: Gestión de modales de servicios

---

## Servicios y APIs

Servicios agrupados por dominio:

```js
// Autenticación
authApi.login(credentials)
authApi.register(userData)
authApi.validateUser(code)

// Servicios
servicesApi.getFeaturedServices()
servicesApi.createService(serviceData)
servicesApi.updateService(id, data)

// Usuarios
userApi.getCurrentUserFromToken()
userApi.updateProfile(data)
userApi.uploadPhoto(file)

// Contacto
contactApi.sendContactRequest(formData)
contactApi.replyToMessage(messageId, reply)
```

Ejemplo de headers con autenticación:

```js
{
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
}
```

---

## Manejo de Errores

Centralizado con `errorHandler.js`:

```js
import { handleError } from '../utils/errorHandler';

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

## Internacionalización (i18n)

Configurado con `react-i18next`:

```js
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
t('formRegister.firstName') // "Nombre"
```

**Idiomas soportados:**
- Español (es)
- Inglés (en)

**Cambiar idioma:**
```js
import i18n from 'i18next';
i18n.changeLanguage('en');
```

---

## Estilos Personalizados

Usa Tailwind CSS extendido con clases como:

```css
.line-clamp-3          /* Para truncar texto a 3 líneas */
.animate-smooth-pulse  /* Para efectos suaves en fondos */
.bg-gradient-brand     /* Gradiente personalizado de SkillAgora */
```

---

## Licencia

Este proyecto está bajo la Licencia MIT.  
© 2025 [SkillAgora Team](https://github.com/Nuriazas/SkillAgora-FrontEnd)