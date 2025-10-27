import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const buttonStyle = css`
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

// #. useNavigate 사용하영 페이지 이동하는 컴포넌트
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['cyan'].includes(prop) && !['fullWidth'].includes(prop),
})`
  ${buttonStyle}
`;

// #. useNavigate 대신 Link 컴포넌트 직접 사용으로 페이지 이동하는 컴포넌트
const StyledLink = styled(Link)`
  ${buttonStyle}
`;

/*const Button = ({ to, ...rest }) => {
  const navigate = useNavigate();
  const onClick = (e) => {
    // #. to 값이 props 로 전달된 경우 to 페이지로 이동
    if (to) {
      navigate(to);
    }

    // #. onClick 이벤트가 props 로 전달된 경우 props의 onClick 이벤트 트리거
    if (rest.onClick) {
      rest.onClick(e);
    }
  };

  return <StyledButton {...rest} onClick={onClick} />;
};*/
const Button = (props) => {
  // #. props 에 to 값이 전달되면 Link 를 사용하여 페이지 이동하는 컴포넌트
  // #. props 에 to 값이 전달되지 않으면 Button 을 사용하여 페이지 이동하는 컴포넌트
  // #. [React UI 경고 해결]styled-components: it looks like an unknown prop "cyan" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via <StyleSheetManager shouldForwardProp= ...
  // #.   1. styled.button.withConfig({ shouldForwardProp: (prop) => !['cyan'].includes(prop) && !['fullWidth'].includes(prop),})`${buttonStyle}`;
  // #.   2. DOM 요소에 없는 속성인 cyan과 fullWidth의 boolean 값은 true 값을 넘기면 true(1) 아니면 null(속성 제거) 로 설정
  return props.to ? (
    <>
      <StyledLink
        {...props}
        cyan={String(props.cyan || false) === 'true' ? 1 : null}
        fullWidth={String(props.fullWidth || true) === 'true' ? 1 : null}
      />
    </>
  ) : (
    <>
      <StyledButton
        {...props}
        cyan={String(props.cyan || false) === 'true' ? 1 : null}
        fullWidth={String(props.fullWidth || true) === 'true' ? 1 : null}
      />
    </>
  );
};

export default Button;

/**
 * style-components 로 만든 컴포넌트인
 * StyledButton 을 바로 내보내기하면
 * 자동 import 가 제대로 작동하지 않으므로
 * Button 리액트 컴포넌트를 만들고
 * 그 안에 StyledButton 을 렌더링하여
 * 자동 import 되도록 함.
 */

/**
 * StyledLink
 * props.cyan 값을 숫자 1과 0으로 변환해준 이유?
 * styled() 함수로 감싸 만든 컴포넌트의 경우 임의 props 가 필터링되지 않기 때문
 * (styled.button 으로 만든 컴포넌트의 경우 cyan 같은 임의 props는 자동으로 필터링되어 스타일을 만드는 용도로만 사용되고 실제 button 엘리번트 속성에 전달되지 않음)
 * 필터링이 되지 않으면 cyan={true} 라는 값이 Link 에서 사용하는 a태그에 그대로 전달되는데 a태그는 boolean 값이 임의 props로 설정되는 것이 허용되지 않고 숫자 문자열만 허용하므로 변환해 줌.
 *
 * Button 보다 Link 사용 권장.
 */
