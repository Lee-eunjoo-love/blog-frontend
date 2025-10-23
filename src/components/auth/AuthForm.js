import styled from 'styled-components';

/**
 * 회원가입 / 로그인 폼
 */

const AuthFormBlock = styled.div``;

const AuthForm = () => {
  return <AuthFormBlock>AuthForm</AuthFormBlock>;
};

export default AuthForm;

/**
 * style-components 로 만든 컴포넌트인
 * AuthFormBlock 을 바로 내보내기하면
 * 자동 import 가 제대로 작동하지 않으므로
 * AuthForm 리액트 컴포넌트를 만들고
 * 그 안에 AuthFormBlock 을 렌더링하여
 * 자동 import 되도록 함.
 */
