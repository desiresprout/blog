import { GetStaticPropsContext } from 'next';
import { useState, useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import {
  useQuery,
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from 'react-query';
import { useRouter } from 'next/router';
import ky from 'ky';

interface IPosts {
  key: string;
  id: number;
  title: string;
  body: string;
  isDeleted: string;
  isPrivate: boolean;
  created_at: string;
  comments: IComment[];
  commentsCount: number;
  user: IUser;
}

interface IUser {
  email: string;
}

interface IComment {
  id: number;
  comment: string;
  created_at: string;
}

function loadPosts(userID?: string): Promise<IPosts[]> {
  return ky.get(`http://localhost:4000/posts?cursor=${userID}`).json();
}

const baseOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};
const useIntersect = (onIntersect: any, option: any) => {
  const [ref, setRef] = useState<HTMLElement | null | undefined>(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [setRef];
};

const Recent = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<IPosts[]>(
    'recentPosts',
    ({ pageParam = 0 }) => {
      return loadPosts(pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
        // return lastPage?.[0]?.id;
      },
    },
  );

  const [setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchNextPage();
    observer.observe(entry.target);
  }, {});

  const recentPosts = data?.pages?.flat() || [];

  return recentPosts?.map((v) => (
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
  const userID = context.params?.userID as string;
  // if (!userID) {
  //   return {
  //     redirect: {
  //       destination: '/', // 유저아이디 없으면 path /로
  //       permanent: false, // http status 300 Permanent Redirect
  //     },
  //   };
  // }
  // await queryClient.prefetchQuery('recentPosts', () => loadPosts());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Recent;
