import { useState, useEffect } from "react";

const ADMIN_CREDENTIALS = {
  username: "Admin12",
  password: "LinoTvtAcces145787125",
};

const AUTH_KEY = "lino_portfolio_auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const { timestamp } = JSON.parse(stored);
        // Session expires after 24 hours
        const twentyFourHours = 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < twentyFourHours) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (username: string, password: string): boolean => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const authData = {
        timestamp: Date.now(),
        user: username,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
