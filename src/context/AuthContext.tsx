import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the structure of the user object after decoding the JWT
interface DecodedToken {
  email: string;
  exp: number; // expiration time
  iat: number; // issued at time
  // add more fields if needed based on your JWT payload
}

// Define the context interface for better type safety
interface AuthContextProps {
  user: DecodedToken | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Define the provider props interface
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Function to log in
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post('/api/login', { email, password });
      Cookies.set('token', data.token);
      // const decodedToken: DecodedToken = jwtDecode(data.token);
      // setUser(decodedToken);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login failed:', error.response.data?.message);
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  // Function to log out
  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  // Auto-login user if token exists in cookies
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      // setUser(decodedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;