import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-contnet: space-between;
  margin-bottom: 3rem;
`;

const PageNumber = styled.div`
  margin: 0.5rem;
`;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });

  return username ? `/posts/${username}?${query}` : `/posts/${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
        fullWidth="false"
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
        fullWidth="false"
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
