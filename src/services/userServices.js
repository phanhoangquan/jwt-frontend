import axios from 'axios';

export const registerNewUser = (email, username, phone, password) => {
   return axios.post('http://localhost:8080/api/v1/register', { email, username, phone, password });
};

export const loginUser = (valueLogin, password) => {
   return axios.post('http://localhost:8080/api/v1/login', { valueLogin, password });
};

export const fetchAllUsers = (page, limit) => {
   return axios.get(`http://localhost:8080/api/v1/users/read?page=${page}&limit=${limit}`);
};

export const deleteUser = (user) => {
   return axios.delete(`http://localhost:8080/api/v1/users/delete`, { data: { id: user.id } });
};

export const fetchAllGroups = () => {
   return axios.get(`http://localhost:8080/api/v1/group/read`);
};
