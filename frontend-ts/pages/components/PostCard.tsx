import React, { useState, useCallback } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { css } from '@emotion/react';

const PostCard = ({}) => {
  return (
    <div
      css={css`
        padding: 1.6rem;
        display: flex;
        flex-direction: column;
        background: rgba(245, 245, 250, 0.4);
        border-radius: 1.2rem;

        svg {
          width: 3.8rem;
          height: 3.8rem;
        }

        & > div {
          display: flex;

          div {
            margin-left: 1.9rem;
          }
        }
      `}
    >
      <div>
        <BiUserCircle />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            h4 {
              font-size: 2rem;
              color: #1c1d21;
            }

            p {
              font-size: 1.5rem;
              line-height: 1.5;
              word-break: break-word;
              overflow-wrap: break-word;
              color: #8181a5;
            }
          `}
        >
          <h4>포스트제목</h4>
          <p>포스트내용</p>
          <span>작성일자</span>
          <span>댓글갯수</span>
          <span>작성자닉네임</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
