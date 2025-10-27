import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user } = useSelector(
    ({ user }) => ({ user: user.user }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} logout={onLogout} />;
};

export default HeaderContainer;

/**
 * [컨테이너 컴포넌트] useDispatch와 useSelector 함수를 사용하여 프레젠테이션 컴포넌트와 리덕스 연동
 */
