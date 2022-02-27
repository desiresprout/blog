import { GetStaticPropsContext } from 'next';
import { css } from '@emotion/react';
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query';
import { HTTPError } from 'ky';
import { loadPosts } from '@api/posts';
import { useRouter } from 'next/router';
import { useIntersect } from '@hooks/useIntersect';
import IPost from '@typing/interface/post';

const UserPosts = () => {
  const router = useRouter();
  const { id: userID } = router.query;

  const { data, isLoading, fetchNextPage } = useInfiniteQuery<IPost[], HTTPError>(
    ['userPosts', userID],
    ({ pageParam = 0 }) => {
      return loadPosts(pageParam, userID as string);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
      },
    }
  );

  const [setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchNextPage();
    observer.observe(entry.target);
  }, {});

  const userPosts = data?.pages?.flat() || [];

  if (isLoading) {
    return <div>로딩 중......</div>;
  }

  console.log('userPosts', userPosts);
  return userPosts.map((v) => (
    <div
      key={v.key}
      ref={setRef}
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border: 1px solid bisque;
      `}
    >
      <div>유저 이메일 : {v.user.email}</div>
      <div>포스트 ID : {v.id}</div>
      <div>포스트 제목 : {v.title}</div>
      <div>포스트 내용 : {v.body}</div>
      <div>댓글 갯수 : {v.commentsCount}</div>
      <div>날짜 {v.created_at}</div>
      <div>삭제여부 : {v.isDeleted ? '삭제' : '미삭제'}</div>
      <div>Private여부 : {v.isPrivate ? '비공개' : '공개'}</div>
    </div>
  ));
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();
  const userID = context.params?.id as string;

  if (!userID) {
    return {
      redirect: {
        destination: '/recent', // 유저아이디 없으면 path /로
        permanent: false, // http status 300 Permanent Redirect
      },
    };
  }

  await queryClient.prefetchQuery(['userPosts', userID], () => loadPosts('0', userID));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default UserPosts;
