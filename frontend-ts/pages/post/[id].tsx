import { Fragment } from 'react';
import { GetStaticPropsContext } from 'next';
import { useState, useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { HTTPError } from 'ky';
import { loadPost } from '../api/posts';
import { useRouter } from 'next/router';
import IPost from '../../types/interface/post';

const UserPost = () => {
  const router = useRouter();
  const { id: postID } = router.query;

  const { data: singlePost } = useQuery<IPost>(['loadPost', postID], () =>
    loadPost(postID),
  );

  console.log('singlePost', singlePost);

  return singlePost!.map((post) => (
    <Fragment>
      <div>포스트 ID : {post.id}</div>
      <div>포스트 내용 : {post.body}</div>
      <div>포스트 작성날짜 : {post.created_at}</div>
      <div>작성자 : {post.user.id}</div>
      <div>댓글 갯수 : {post.commentsCount}</div>
      <div>
        {post.comments.map((comment) => (
          <Fragment>
            <div>댓글 내용 : {comment.comment}</div>
            <div>댓글 작성일 : {comment.created_at}</div>
            {comment.isPrivate ? <div>프라이빗</div> : null}
          </Fragment>
        ))}
      </div>
    </Fragment>
  ));
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();
  const postID = context.params?.id as string;

  if (!postID) {
    return {
      redirect: {
        destination: '/recent',
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(['loadPost', postID], () => loadPost(postID));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default UserPost;
