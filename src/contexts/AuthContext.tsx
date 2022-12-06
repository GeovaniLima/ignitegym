import { createContext, ReactNode, useState, useEffect } from "react";

import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (usuario: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  //fetchModule: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  const token = 'eyJhbGciOiJFUzI1NiJ9.eyJzdWIiOiJjeC5kaGllZ28uc2FudG9zIiwiaXNzIjoiY3N3U2VydmVyIiwiaWF0IjoxNjY4Nzc5NjU3LCJhdWQiOiJjc3dWaWV3IiwiY3N3VG9rZW4iOiJ0WHJQY0xzN1o0UmNvdnY2VGo2a3h3IiwiZGJOYW1lU3BhY2UiOiJzaXN0ZW1hcyJ9.Z6usyCyYXDl8yAQbfkDbritv-bCHvgqL7Ehu9FtCGMpBB4FC2SY9v4qOCZGswjTf6qKVotmbgZCARxx_FmfWMw';

  async function signIn(usuario: string, senha: string) {

    try {
      const { data } = await api.get(`/componentes/v10/autenticacaoUsuario?usuario=${usuario}&senha=${senha}`, { 
        headers: {
          'Authorization': `${token}`
        }
       });
       
      if(data){
        setUser(data);
        storageUserSave(data);
      }
    } catch (error) {
      throw error;
    }
    
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);

      await storageUserRemove();
    } catch (error) {
      throw error; 
    } finally {
      setIsLoadingUserStorageData(false);
    }

  }

  async function loadUserData() {

    try {
      const userLogged = await storageUserGet();

      if(userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }

  }

  async function fetchModule(usuario: string, senha: string) {
    try {
      const { data } = await api.get(`/componentes/v10/autenticacaoUsuario?usuario=${usuario}&senha=${senha}`, { 
        headers: {
          'Authorization': `${token}`
        }
      });
      
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  },[]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn,
      signOut,
      //fetchModule,
      isLoadingUserStorageData
    }}>
      { children }
    </AuthContext.Provider>
  )
}