import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('./api/posts', { title, body, tags });

/**
 * 포스트에 관련된 API 요청 함수
 */
