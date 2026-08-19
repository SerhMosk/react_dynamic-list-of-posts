import { request } from './api';

export const getAllUsers = () => request('/users', { method: 'GET' });
