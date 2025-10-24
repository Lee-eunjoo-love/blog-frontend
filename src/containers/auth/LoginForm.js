import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // #. INPUT 변경 이벤트
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // #. FORM 로그인 이벤트
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (!username || !password) {
      alert('로그인 정보를 정확히 입력해 주세요.');
      return;
    }

    dispatch(login({ username, password }));
  };

  // #. 컴포넌트가 처음 렌더링될 때 FORM 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // #. 로그인 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }

    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // #. 로그인 사용자 정보 유효성 확인
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;

/**
 * [컨테이너 컴포넌트] useDispatch와 useSelector 함수를 사용하여 프레젠테이션 컴포넌트와 리덕스 연동
 */
