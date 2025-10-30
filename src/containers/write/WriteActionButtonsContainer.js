import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
    shallowEqual,
  );

  // #. 포스트 등록/수정 (originalPostId 가 유효하면 수정, 아니면 등록)
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
      return;
    }

    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  // #. 포스트 등록 취소
  const onCancel = () => {
    navigate(-1);
  };

  // #. 성공 또는 실패시 처리
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/posts/${user.username}/${_id}`);
    }
    if (postError) {
    }
  }, [navigate, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;

/**
 * 포스트 등록 : 현재 리덕스 스토어 안에 있는 값을 사용하여 새 포스트 작성.
 *             포스트 등록에 성공하면 서버에서 응답한 포스트 정보의 _id와 username 을 참조하여 포스트를 읽을 수 있는 경로를 만들고 history.push 를 사용해 해 경로로 이동
 * 취소 : 브로우저 뒤로가기를 통해 글쓰기 초기화. 라우트가 아닌 컴포넌트에서 history 객체를 사용하기 위해 useNavigate 사용
 *
 */
