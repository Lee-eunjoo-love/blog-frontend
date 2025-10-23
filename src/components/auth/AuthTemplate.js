import styled from 'styled-components';

/**
 * 회원가입 / 로그인 페이지 레이아웃 담당 컴포넌트
 */

const AuthTemplateBlock = styled.div``;

const AuthTemplate = () => {
  return <AuthTemplateBlock></AuthTemplateBlock>;
};

export default AuthTemplate;

/**
 * style-components 로 만든 컴포넌트인
 * AuthTemplateBlock 을 바로 내보내기하면
 * 자동 import 가 제대로 작동하지 않으므로
 * AuthTemplate 리액트 컴포넌트를 만들고
 * 그 안에 AuthTemplateBlock 을 렌더링하여
 * 자동 import 되도록 함.
 */
