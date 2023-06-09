import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import * as hangul from 'hangul-js';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from 'react-spring';

import RoomReservItem from '@/components/room/RoomReservItem';
import Pagination from '@/components/common/Pagination';

import styles from '@/styles/room/RoomReserv.module.scss';
import { getCookie } from '@/util/cookie';

interface SongData {
  songId: number;
  title: string;
  singer: string;
  album: string;
  image: string;
  // releaseDate: string;
}

function RoomReserv(props: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session: any;
}) {
  const { setModalOpen, session } = props;

  //  페이지
  const [page, setPage] = useState(1);
  //  노래 목록이 보일 개수
  const limit = 5;

  const [allMusicList, setAllMusicList] = useState<SongData[]>([]);
  const [musicList, setMusicList] = useState<SongData[]>([]);

  useEffect(() => {
    // 모든 노래 정보
    axios({
      method: 'GET',
      url: 'api/v1/song',
      headers: {
        Authorization: `${getCookie('Authorization')}`,
        refreshToken: `${getCookie('refreshToken')}`,
      },
    }).then(res => {
      setAllMusicList(res.data);
      setMusicList(res.data);
    });
  }, []);

  const offset = (page - 1) * limit;

  const searchMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setMusicList(allMusicList);
      return;
    }
    const userInput = hangul.disassemble(e.target.value).join('');
    const searchData = allMusicList.filter(item => {
      const title = hangul.disassemble(item.title, true);
      const singer = hangul.disassemble(item.singer, true);
      const titleInitial = title
        .map((t: string[]) => {
          return t[0];
        })
        .join('');
      const singerInitial = singer
        .map((t: string[]) => {
          return t[0];
        })
        .join('');
      return (
        hangul.search(item.title, userInput) !== -1 ||
        hangul.search(item.singer, userInput) !== -1 ||
        titleInitial.startsWith(userInput) ||
        singerInitial.startsWith(userInput) ||
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.singer.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setMusicList(searchData);
  };

  const postData = musicList.slice(offset, offset + limit);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    { bounds: { left: -120, bottom: 0, top: -160, right: 760 } },
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
        <div className={styles.title}>
          <div>노래 검색</div>
          <Image
            src="img/common/common_close_image.svg"
            width={25}
            height={25}
            alt="close"
            onClick={() => {
              setModalOpen(false);
            }}
            className={styles.close}
          />
        </div>
        <div className={styles.top}>
          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="검색어를 입력하세요..."
              onChange={searchMusic}
            />
            <Image
              src="img/common/light/light_common_find_image.svg"
              width={37}
              height={37}
              alt="find"
              className={styles.find}
            />
          </div>
        </div>
        <div className={styles.chart}>
          {postData.map(item => {
            return (
              <div className={styles.item} key={item.songId}>
                <RoomReservItem item={item} session={session} />
              </div>
            );
          })}
        </div>
        <div className={styles.page}>
          <Pagination
            limit={limit}
            page={page}
            totalPosts={musicList.length}
            setPage={setPage}
          />
        </div>
      </animated.div>
    </div>
  );
}

export default RoomReserv;
