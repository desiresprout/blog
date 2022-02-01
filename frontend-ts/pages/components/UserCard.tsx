import React, { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import { FiUser } from 'react-icons/fi';
import { AiOutlinePushpin } from 'react-icons/Ai';
import { AiFillPushpin } from 'react-icons/Ai';

const UserCard = ({}) => {
  const [isPinned, setPinned] = useState(true);

  const onToggle = useCallback(() => {
    setPinned(!isPinned);
  }, [isPinned]);

  return (
    <div
      css={css`
        padding: 0 3rem 0 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8.4rem;

        ${isPinned &&
        css`
          position: sticky;
          top: 0;

          svg {
            color: white;
          }
        `}

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          border: 1px solid #f0f0f3;
        }

        svg {
          width: 3.6rem;
          height: 3.6rem;
        }

        & > div {
          display: flex;

          div {
            display: flex;
            flex-direction: column;

            & :first-of-type {
              font-size: 2.4rem;
            }
          }
        }

        button {
          background: transparent;
          border: 1px solid transparent;
          svg {
            color: #5e81f4;
          }
        }
      `}
    >
      <div>
        <FiUser />
        <div>
          <span>유저아이디</span>
          <span>유저이름</span>
        </div>
      </div>
      <button onClick={onToggle}>{isPinned ? <AiFillPushpin /> : <AiOutlinePushpin />}</button>
    </div>
  );
};

export default UserCard;
