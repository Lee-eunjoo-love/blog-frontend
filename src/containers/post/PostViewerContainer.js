import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  // #. 수정
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  // #. 삭제
  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  // #. 글쓴이와 현재 로그인 사용자 동일 여부
  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default PostViewerContainer;

/**
 * PostActionButtons 컴포넌트를 PostViewer 컴포넌트에서 직접 렌더링하면 PostActionButtons 에서 props 를 전달할 때 무조건 PostViewer 컴포넌트를 거쳐 전달해야 하는데,
 * PostViewer 컴포넌트에서는 PostActionButtons 의 props 를 사용하지 않고 PostActionButtons 내부에서만 사용하므로
 *   첫번째 방법) PostActionButtons 의 컴테이너 컴포넌트를 만들고 PostViewer 컴포넌트 내부에서 바로 렌더링(예: TagBox 와 TagBoxContainer)하거나,
 *   두번째 방법) props 를 JSX 형태로 받아 렌더링(예: actionButtons={<PostActionButtons />}) 하는 방법이 있는데
 *              두번째 방법은 컨테이너 컴포넌트를 별도로 만들지 않고 기존 PostViewerContainer 컴포넌트에서 필요 로직을 구현하면 된다.
 * PostActionButtons 는 두번째 방법으로 구현.
 */
