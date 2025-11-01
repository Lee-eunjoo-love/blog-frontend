import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  if (error) {
    if (error.response && error.response.state === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }

    return <PostViewerBlock>예기치 않은 오류 발생!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, user, publishedData, tags } = post;

  return (
    <>
      <Helmet>
        <title>{title} - REACTERS</title>
      </Helmet>
      <PostViewerBlock>
        <PostHead>
          <h1>{title}</h1>
          <SubInfo username={user.username} publishedDate={publishedData} />
          <Tags tags={tags} />
        </PostHead>
        {actionButtons}
        <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      </PostViewerBlock>
    </>
  );
};

export default PostViewer;

/**
 * dangerouslySetInnerHTML : 리액트에서 HRML을 그대로 렌더링하는 형태로 JSX를 작성하면
 *                           HTML 태그가 적용되지 않고 텍스트 형태로 나타나므로
 *                           HTML 적용을 위해 dangerouslySetInnerHTML 라는 props 설정 필요
 */
