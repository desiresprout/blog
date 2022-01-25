import React, { useState, useCallback, VFC } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
// import moment from 'dayjs';
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

// moment.locale('ko');

const PostCard = ({}) => {
  const queryClient = useQueryClient();

  return (
    <div
      css={css`
        padding: 1.6rem;
        opacity: 1;
        background: transparent;
        color: rgb(52, 71, 103);
      `}
    >
      <div>hi</div>
      <div>bye</div>
    </div>
  );
};

export default PostCard;
