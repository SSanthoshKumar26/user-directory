import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://user-directory-510a.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getUsers = (page = 1, limit = 10, search = '') =>
    api.get(`/users?page=${page}&limit=${limit}&search=${search}`);

export const getUser = (id) => api.get(`/users/${id}`);

export const createUser = (userData) => {
    const data = userData instanceof FormData ? userData : new FormData();
    if (!(userData instanceof FormData)) {
        for (const key in userData) {
            data.append(key, userData[key]);
        }
    }
    return api.post('/users', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const updateUser = (id, userData) => {
    const data = userData instanceof FormData ? userData : new FormData();
    if (!(userData instanceof FormData)) {
        for (const key in userData) {
            if (userData[key] !== undefined && userData[key] !== null) {
                data.append(key, userData[key]);
            }
        }
    }
    return api.put(`/users/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteUser = (id) => api.delete(`/users/${id}`);

export const exportUsers = () => {
    window.open(`${API_URL}/users/export-csv`, '_blank');
};

export default api;
