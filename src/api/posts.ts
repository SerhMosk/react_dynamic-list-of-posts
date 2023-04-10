import { request } from './api';

export const getAllPosts = () => request('/posts', { method: 'GET' });
export const getUserPosts = (userId: string) => request(`/posts?userId=${userId}`, { method: 'GET' });
export const getPostDetails = (postId: number) => request(`/posts/${postId}`, { method: 'GET' });
