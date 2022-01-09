import { GetStaticPropsContext } from 'next';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import { useRouter } from 'next/router';
import ky from 'ky';
import dayjs from 'dayjs';

interface IPosts {
  id: number;
  title: string;
  body: string;
  created_at: string;
  comments: IComment[];
}

interface IComment {
  id: number;
  comment: string;
  created_at: string;
}

function loadPosts(): Promise<IPosts[]> {
  return ky.get('http://localhost:4000/posts').json();
}

const Recent = () => {
  const [isMount, setMount] = useState(false);
  const router = useRouter();
  const { userID } = router.query;
  const { isFetching, data } = useQuery<IPosts[]>('recentPosts', () =>
    loadPosts(),
  );

  console.log('data', data);

  return data?.map((v) => (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border: 1px solid bisque;
      `}
    >
      <div>포스트 ID : {v.id}</div>
      <div>{v.title}</div>
      <div>{v.body}</div>
      <div>날짜 {dayjs(v.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
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
  await queryClient.prefetchQuery('recentPosts', () => loadPosts());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Recent;
