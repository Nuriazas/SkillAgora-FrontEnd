import { loginWithApi } from '../context/AuthContext';

// Datos de prueba
const testCredentials = {
  email: 'cvieher@gmail.com',
  password: '123456'
};

// Función de prueba
async function testLoginConnection() {
  console.log('Iniciando prueba de conexión con la API...');
  
  try {
    console.log('Intentando login con credenciales de prueba...');
    const result = await loginWithApi(
      testCredentials.email,
      testCredentials.password,
      false
    );
    
    if (result.success) {
      console.log('✅ Prueba exitosa: Login funcionando correctamente');
      console.log('Token recibido:', result.token);
    } else {
      console.error('❌ Error en el login:', result.error);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

// Ejecutar la prueba
testLoginConnection(); 