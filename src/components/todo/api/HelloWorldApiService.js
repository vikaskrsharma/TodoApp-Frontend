import { useAuth } from "../security/AuthContext";
import { apiClient } from "./ApiClient";

export function retrieveHelloWorld() {
    return apiClient.get('/hello-world', {
        headers: {
            Authorization: 'Basic dXNlcjpwYXNz'
        }
    });
}

export const retrieveHelloWorldBean = (token) =>
    apiClient.get('/hello-world-bean');

export const retrieveHelloWorldBeanWithPathVariable = (username, token) =>
    apiClient.get(`/hello-world/path-variable/${username}`);


