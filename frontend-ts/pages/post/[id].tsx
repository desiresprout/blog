import { GetStaticPropsContext } from 'next';
import { useState, useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { HTTPError } from 'ky';
import { loadPost } from '../api/posts';
import { useRouter } from 'next/router';
import IPost from '../../types/interface/post';

const UserPosts = () => {
  const router = useRouter();
  const { id: userID } = router.query;

  //   const { data } = useQuery<IPosts>(['loadPost', userID], () =>
  //     loadPost(userID)));

  //   const { data: singlePost } = useQuery<IPost>(['loadPost'], () =>
  //     loadPost(userID),
  //   );

  const { data: singlePost } = useQuery<IPost>('loadPost', () =>
    loadPost(userID),
  );

  //   const userPosts = data?.pages?.flat() || [];

  //   console.log('data', data);

  //   console.log('userPosts', userPosts);
  return <div>hi</div>;
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

  await queryClient.prefetchQuery(['loadPost', userID], () => loadPost(userID));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default UserPosts;
