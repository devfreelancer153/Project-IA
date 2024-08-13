// hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    logout();
    navigate('/authentication/sign-in'); // Redireciona após o logout
  };
};

export default useLogout;
