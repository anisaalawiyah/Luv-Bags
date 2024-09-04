import { createContext, useState, useContext } from 'react';

// Membuat UserContext
const UserContext = createContext();

// Membuat provider untuk UserContext
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan informasi pengguna

  // Fungsi untuk login
  const login = (userData) => {
    setUser(userData);
  };

  // Fungsi untuk logout
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook untuk menggunakan UserContext
export const useUser = () => useContext(UserContext);
