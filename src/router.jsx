import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProviderDetail from './pages/ProviderDetail';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/provider/:id',
    element: <ProviderDetail />,
  },
]);

export default router;
