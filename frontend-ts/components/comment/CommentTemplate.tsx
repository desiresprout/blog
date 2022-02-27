import { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import media from '@lib/mediaQuery';

const CommentTemplate = ({ children }) => {
  return (
    <div
      css={css`
        ${media.xlarge} {
          width: calc(100% - 38.7rem);
        }
      `}
    >
      {children}
    </div>
  );
};

export default CommentTemplate;
