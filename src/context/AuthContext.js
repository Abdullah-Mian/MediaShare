import { createContext, useState, useContext, useEffect } from 'react';

const generateId = () => {
  return Math.random().toString(36);
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
        console.log('Loaded users from localStorage:', parsedUsers);
      } catch (error) {
        console.error('Error parsing users from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Saved users to localStorage:', users);
    }
  }, [users]);
 
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
  console.log("Current user:", currentUser);
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);

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
