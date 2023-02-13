import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

import styles from '@/styles/room/RoomChat.module.scss';

function RoomChat({ setModalOpen, sendChat, chatList }: any) {
  // 내 닉네임
  const myName = '이수민';

  // 현재 입력하는 채팅정보
  const [sendMessage, setChat] = useState('');
  const changeChat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventTarget = e.target as HTMLTextAreaElement;
    setChat(eventTarget.value);
  };

  // 채팅데이터 상태관리
  const [chatData, setChatData] = useState(chatList);

  useEffect(() => {
    setChatData([...chatList]);
  }, [chatList]);

  // 보낼 채팅 메세지 전달
  const upChat = () => {
    if (sendMessage.trim() === '') return;
    sendChat(sendMessage);
    setChat('');
    console.log('upChat', sendMessage);
  };

  const keyUpChat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      console.log(sendMessage);
      upChat();
    }
  };

  // 채팅리스트
  const chats = chatData.map((item: any) => {
    //   item.name을 주고 프로필이미지 받아오기
    //   내가 보낸 것과 다른 사람이 보낸 거 class로 차이 나타내기
    const chatClass = classNames({
      [styles.chat]: true,
      [styles.myChat]: myName === item.name,
      [styles.otherChat]: myName !== item.name,
    });

    return (
      <div className={chatClass} key={item.id}>
        <div className={styles.profileInfo}>
          <div className={styles.profile}>
            <Image
              src="icon/header/dark/dark_profile_icon.svg"
              width={20}
              height={20}
              alt="profile"
              className={styles.profileIcon}
            />
          </div>
          <div className={styles.name}>{item.name}</div>
        </div>
        <div className={styles.context}>{item.message}</div>
      </div>
    );
  });

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    { bounds: { bottom: 0, top: -120, right: 20, left: -1115 } },
  );

  return (
    <div className={styles.layout}>
      <input
        type="button"
        className={styles.back}
        onClick={() => {
          setModalOpen(false);
        }}
      />
      <animated.div
        {...bind()}
        style={{
          x,
          y,
        }}
        className={styles.container}
      >
        <div className={styles.top}>
          <Image
            src="img/common/common_close_image.svg"
            width={20}
            height={20}
            alt="close"
            onClick={() => {
              setModalOpen(false);
            }}
            className={styles.close}
          />
        </div>
        <div className={styles.main}>{chats}</div>
        <textarea
          id="send"
          className={styles.input}
          value={sendMessage}
          onChange={changeChat}
          onKeyDown={keyUpChat}
        />
        <button type="button" className={styles.btn} onClick={upChat}>
          전송
        </button>
      </animated.div>
    </div>
  );
}

export default RoomChat;
