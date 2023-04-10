import { request } from './api';

export const getPostComments = (postId: number) => request(`/comments?postId=${postId}`, { method: 'GET' });

// eslint-disable-next-line max-len
export const postComment = (postId: number, name: string, email: string, body: string) => request(
  '/comments',
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  },
);

export const removeComment = (id: number) => request(`/comments/${id}`, { method: 'DELETE' });
