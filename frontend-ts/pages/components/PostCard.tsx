import React, { useState, useCallback } from 'react';
import { css } from '@emotion/react';

const PostCard = ({}) => {
  return (
    <div
      css={css`
        padding: 1.6rem;
        opacity: 1;
        background: transparent;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
      `}
    >
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
      </div>

      <div>작성일자</div>
      <div>댓글갯수</div>
      <div>작성자닉네임</div>
    </div>
  );
};

export default PostCard;
