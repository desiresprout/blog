import React, { useState, useCallback, VFC } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import IPost from '../../types/interface/post';

dayjs.locale('ko');

const PostCard: VFC<{ post: IPost }> = ({ post }) => {
  return (
    <div
      css={css`
        padding: 1.6rem;
        display: flex;
        flex-direction: column;

        svg {
          width: 3.8rem;
          height: 3.8rem;
        }

        & > div {
          display: flex;
          background: rgba(245, 245, 250, 0.4);
          border-radius: 1.2rem;

          div {
            margin-left: 1.9rem;
            flex-basis: 90%;
            display: flex;
            flex-direction: column;

            h4 {
              font-size: 2rem;
              color: #1c1d21;
              word-break: break-word;
              overflow-wrap: break-word;
              margin-bottom: 0.25rem;
            }

            p {
              font-size: 1.5rem;
              line-height: 1.5;
              word-break: break-word;
              overflow-wrap: break-word;
              color: #8181a5;
              height: 7rem;
              overflow: hidden;
              margin-bottom: 1rem;
            }

            span {
              font-size: 1.5rem;
              color: rgb(134, 142, 150);

              &:not(:last-child) {
                margin-bottom: 0.5rem;
              }
            }
          }
        }
      `}
    >
      <div>
        <BiUserCircle />
        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <span>{dayjs(post.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
          <span>댓글갯수 : {post.commentsCount}</span>
          <span
            css={css`
              color: rgb(52, 58, 64) !important;
            `}
          >
            작성자닉네임 : {post.user.userName}
          </span>
          <span>포스트 아이디 : {post.id}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
