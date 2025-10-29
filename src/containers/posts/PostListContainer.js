import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams(); // #. 배열을 반환하므로 배열 해체 필요. [searchParams, setSearchParams]
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, error, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
    shallowEqual,
  );

  useEffect(() => {
    console.log(JSON.stringify(searchParams));
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, searchParams, username]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
