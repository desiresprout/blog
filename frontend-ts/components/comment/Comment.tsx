import { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import CommentWrite from '@components/comment/CommentWrite';
import CommentCard from '@components/comment/CommentCard';

const Comments = ({}) => {
  return (
    <div
      css={css`
        padding-left: 1rem;
        padding-right: 1rem;
      `}
    >
      <CommentWrite />
      <CommentCard />
    </div>
  );
};

export default Comments;
