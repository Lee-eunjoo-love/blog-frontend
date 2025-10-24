import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto; /* 중앙 정렬 */

  /* 브라우저 크기에 따라 가로 크기 변경 */
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  // #. style, className, onClick, onMouseMove 등의 props 를 사용할 수 있도록 ...rest 를 사용하여 ResponsiveBlock 에 전달
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;

/**
 * style-components 로 만든 컴포넌트인
 * StyledButton 을 바로 내보내기하면
 * 자동 import 가 제대로 작동하지 않으므로
 * Button 리액트 컴포넌트를 만들고
 * 그 안에 StyledButton 을 렌더링하여
 * 자동 import 되도록 함.
 */
