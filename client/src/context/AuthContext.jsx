import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // === Load user if exists in localStorage ===
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // === LOGIN: save both user and token ===
  const login = (userData, token) => {
    // Объединяем userData и token в один объект
    const userWithToken = { ...userData, token };

    setUser(userWithToken);
    setToken(token);

    // Сохраняем и юзера, и токен в localStorage
    localStorage.setItem("user", JSON.stringify(userWithToken));
    localStorage.setItem("token", token);
  };

  // === LOGOUT ===
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
