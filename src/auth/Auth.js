import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

const useAuth = () => {
  const [user, setUser] = useState();
  const [authed, setAuthed] = useState(Boolean(localStorage.getItem('u_token')));

  return {
    user,
    authed,
    setUser,
    login(token, user){
      setUser(user);
      setAuthed(true);
      localStorage.setItem('u_token', token);
    },
    logout() {
      localStorage.removeItem('u_token');
      setAuthed(false);
      setUser(null);
    }
  }

}

export const AuthProvider = ({children}) => {
  const auth = useAuth();

  useEffect(() => {
    fetch(`/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('u_token')}`
      }
    }).then(res => res.json())
      .then(data => {
        if (data) {
          auth.setUser(data);
        }
      })
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext);
}