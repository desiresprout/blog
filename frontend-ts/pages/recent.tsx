import { Fragment } from 'react';
import { GetStaticPropsContext } from 'next';
import { css } from '@emotion/react';
import { QueryClient, dehydrate, useInfiniteQuery, InfiniteQueryObserverResult } from 'react-query';
import { loadPosts } from '@api/posts';
import { HTTPError } from 'ky';
import useVirtual from 'react-cool-virtual';
import { useIntersect } from '@hooks/useIntersect';
import IPost from '@typing/interface/post';
import PostCard from '@components/PostCard';
import UserCard from '@components/UserCard';
import CommentTemplate from '@components/comment/CommentTemplate';
import Comment from '@components/comment/Comment';
import media from '@lib/mediaQuery';

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
  const isReachBottom = isEmpty || (data && data.pages[data.pages.length - 1]?.length < 10);
  const isMoreRead = !isEmpty && !isReachBottom && !isLoading;

  const [setRef] = useIntersect<InfiniteQueryObserverResult<IPost[], HTTPError>>(fetchNextPage);

  const { outerRef, innerRef, items } = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount: recentPosts?.length || 0,
  });

  if (isLoading) {
    return <div>로딩 중......</div>;
  }

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          background: #ffffff;
          ${media.xlarge} {
            width: 38.7rem;
          }

          & .post-wrapper {
            height: 100vh;
            overflow: auto;
          }
        `}
      >
        <UserCard />
        <div ref={recentPosts ? outerRef : undefined} className="post-wrapper">
          <div ref={recentPosts ? innerRef : undefined}>
            {items.map(({ index, measureRef }) => {
              const post = recentPosts![index];

              return <PostCard ref={measureRef} key={post.key} post={post} />;
            })}
          </div>
          <div ref={isMoreRead ? setRef : undefined} />
        </div>
      </div>
      <CommentTemplate>
        <Comment />
      </CommentTemplate>
    </div>
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
