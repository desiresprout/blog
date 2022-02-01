import { GetStaticPropsContext } from 'next';
import { css } from '@emotion/react';
import { QueryClient, dehydrate, useInfiniteQuery, InfiniteQueryObserverResult } from 'react-query';
import { loadPosts } from './api/posts';
import { HTTPError } from 'ky';
import { useIntersect } from '../hooks/useIntersect';
import IPost from '../types/interface/post';
import PostCard from './components/PostCard';
import UserCard from './components/UserCard';
import media from '../lib/mediaQuery';
import { Fragment } from 'react';

const Recent = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<IPost[], HTTPError>(
    'recentPosts',
    ({ pageParam = '' }) => {
      return loadPosts(pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
      },
    }
  );

  const recentPosts = data?.pages.flat();
  const isEmpty = data?.pages[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1]?.length < 10);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !isLoading;

  const [setRef] = useIntersect<InfiniteQueryObserverResult<IPost[], HTTPError>>(fetchNextPage);

  if (isLoading) {
    return <div>로딩 중......</div>;
  }

  return (
    <Fragment>
      <div
        css={css`
          display: inline-block;
          background: #ffffff;
          ${media.xlarge} {
            width: 38.7rem;
          }
        `}
      >
        <UserCard />
        <div>
          {recentPosts?.map((post) => {
            return <PostCard key={post.key} post={post} />;
          })}
        </div>
      </div>
      <div
        ref={readToLoad ? setRef : undefined}
        css={css`
          border: 1px solid green;
          height: 1px;
        `}
      />
    </Fragment>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery('recentPosts', () => loadPosts());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Recent;
