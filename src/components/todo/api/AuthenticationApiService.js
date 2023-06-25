import { apiClient } from "./ApiClient";

export function executeBaicAuthService(token) {
    return apiClient.get('/basicauth');
}


export function executeJwtAuthService(username, password) {
    return apiClient.post('/authenticate', { username, password });
}

