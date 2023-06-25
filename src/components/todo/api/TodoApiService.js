import { apiClient } from "./ApiClient";

export const retrieveTodosForUsername = (username) =>
    apiClient.get(`/users/${username}/todos`);

export const deleteTodosByIdAndUsernameApi = (username, id) =>
    apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoByIdApi = (username, id) =>
    apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoByIdApi = (username, id, todo) =>
    apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createTodoByIdApi = (username, todo) =>
    apiClient.post(`/users/${username}/todos`, todo);