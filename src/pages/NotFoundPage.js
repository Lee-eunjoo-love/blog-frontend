import styled from 'styled-components';
import HeaderContainer from '../containers/common/HeaderContainer';

const NotFoundBlock = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const NotFoundPage = () => {
  return (
    <>
      <HeaderContainer />
      <NotFoundBlock>404 Not Found.</NotFoundBlock>
    </>
  );
};

export default NotFoundPage;
