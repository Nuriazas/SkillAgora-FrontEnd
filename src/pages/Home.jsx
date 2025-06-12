import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-green-600">
        Bienvenido al Home
      </h1>

      <div className="bg-white shadow p-6 rounded-xl text-center">
        <p className="text-lg mb-2">Hola, <span className="font-semibold">{user?.name}</span></p>

        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;

