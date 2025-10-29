import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) =>
  client.get('/api/posts', { params: { page, username, tag } });

/**
 * 포스트에 관련된 API 요청 함수
 */
