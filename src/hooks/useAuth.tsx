import { useContext } from 'react';

import { AuthContext } from '@contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  //console.log("USUARIO LOGADO ->", context);

  return context;
}