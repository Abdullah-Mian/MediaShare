import { createContext, useState, useContext } from 'react';

// Simple UUID generator function
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
 
  const signUp = ({ name, email, password }) => {
    const userExists = users.some(user => user.email === email);
    if (userExists) return false; 
    console.log("users:", users);

    const newUser = {
      id: generateId(),
      name,
      email,
      password,
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    console.log("users:", users);

    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ users, currentUser, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
