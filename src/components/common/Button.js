import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;

/**
 * style-components 로 만든 컴포넌트인
 * StyledButton 을 바로 내보내기하면
 * 자동 import 가 제대로 작동하지 않으므로
 * Button 리액트 컴포넌트를 만들고
 * 그 안에 StyledButton 을 렌더링하여
 * 자동 import 되도록 함.
 */
