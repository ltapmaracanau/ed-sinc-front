import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface JwtPayload {
  categorias: string[];
}

interface ProtectedRouteProps {
  element: React.ReactElement;
  categorias: string[];
}

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const getRolesFromToken = (): string[] => {
  const token = getToken();
  if (!token) return [];

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.categorias || [];
  } catch (error) {
    console.error('Invalid token', error);
    return [];
  }
};

const hasRole = (categorias: string[]): boolean => {
  const userRoles = getRolesFromToken();
  return categorias.some(categoria => userRoles.includes(categoria));
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, categorias }) => {
  return hasRole(categorias) ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
