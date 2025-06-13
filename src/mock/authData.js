// Datos de usuarios de prueba
export const mockUsers = [
  {
    id: 1,
    email: "usuario@test.com",
    password: "password123",
    name: "Usuario de Prueba",
    role: "user",
  },
  {
    id: 2,
    email: "admin@test.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
];

// Función para simular delay de red
export const simulateNetworkDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// Función para generar un token simulado
export const generateMockToken = (user) => {
  return `mock-jwt-token-${user.id}-${Date.now()}`;
};

// Función para validar credenciales
export const validateCredentials = (email, password) => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return null;

  // Crear una copia del usuario sin la contraseña
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
