import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UsuarioAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      navigate('/')
    }  
  }, [])

  if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
    return null
  }
};
