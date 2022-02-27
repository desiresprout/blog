import { useState, useCallback } from 'react';
import { css } from '@emotion/react';

const CommentWrite = ({}) => {
  return (
    <div
      css={css`
        textarea {
          width: 100%;
          height: 7rem;
          padding: 1rem 1rem 1.5rem;
          border: 1px solid #f1f3f5;
          resize: none;
          outline: none;
          font-size: 1.6rem;
          border-radius: 4px;
          color: black;
          line-height: 1.75;
        }
      `}
    >
      <textarea></textarea>
    </div>
  );
};

export default CommentWrite;
