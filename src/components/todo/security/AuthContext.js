import { createContext, useContext, useState } from "react";
import { executeBaicAuthService, executeJwtAuthService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

// 1. Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2. Share the context with all components
export default function AuthProvider({ children }) {

    // 3. Put some state in context
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // function login(username, password) {
    //     if ((username === 'nick' || username === 'vikas') && password === 'nnnn') {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    async function login(username, password) {

        // const baToken = 'Basic ' + window.btoa(username + ":" + password);
        try {
            // const response = await executeBaicAuthService(baToken);
            const response = await executeJwtAuthService(username, password);
            const token = 'Bearer ' + response.data.token;
            console.log(token);
            if (response.status === 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(token);

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting request and adding authorization token');
                        config.headers.Authorization = token;
                        return config;
                    }
                )

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            console.log(error);
            logout();
            return false;
        }

    }

    function logout() {
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )
}