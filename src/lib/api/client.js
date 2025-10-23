import axios from 'axios';

const client = axios.create();

/* 
[ 글로벌 설정 예시 ]

// #. API 주소 설정
client.defaults.baseURL = 'https://external-api-server.com';

// # 헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

// #. 인터셉터 설정
axios.intercepter.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});
*/

export default client;

/**
 * [ axios 인스턴스 생성 ]
 * axios 인스턴스를 만들면 추후 API 클라이언트에 공통된 설정을 쉽게 넣을 수 있다.
 * 추후 axios 를 사용하지 않는 상황이 오면 쉽게 클라이언트 교체가 가능하다.
 * (인스턴스를 만들지 않으면 애플리케이션에서 발생하는 모든 요청에 대해 설정해야 되므로 또 다른 API 서버 사용이 필요한 경우 어려움이 있을 수 있다.)
 */
