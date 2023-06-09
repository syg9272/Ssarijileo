import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { setLike } from '@/redux/store/likeSlice';

import ContestListItem from './ContestListItem';
import Pagination from '../common/Pagination';
import ContestSearch from '@/components/contest/ContestSearch';

import styles from '@/styles/contest/ContestList.module.scss';
import { VideoInfo } from '@/pages/contest';

export interface OptionItem {
  mode: string;
}

function ContestList(props: { videoList: VideoInfo[] }) {
  const { videoList } = props;
  const [video] = useState(videoList);
  const [filteredVideo, setFilteredVideo] = useState(video);
  const [selectType, setSelectType] = useState('Default');

  //  페이지
  const [page, setPage] = useState(1);

  //  녹화본 목록이 보일 개수
  const limit = 9;

  //  녹화본 목록
  const sortType = [{ mode: 'Default' }, { mode: 'Like' }, { mode: 'Newest' }];

  // 게시할 부분만 잘라서 전달
  const offset = (page - 1) * limit;
  let postData = filteredVideo?.slice(offset, offset + limit);
  useEffect(() => {
    postData = filteredVideo?.slice(offset, offset + limit);
  }, [selectType, filteredVideo]);

  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.title}>
          노래자랑
          <Image
            src="img/contest/contest_mic_image.svg"
            width={35}
            height={35}
            alt="mic"
            className={styles.icon}
          />
        </div>
      </div>
      <ContestSearch
        optionItem={sortType}
        videos={video}
        setFilteredVideo={setFilteredVideo}
        selectType={selectType}
        setSelectType={setSelectType}
      />
      <div className={styles.addBtn}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => {
            dispatch(setLike('녹화본'));
            window.location.replace('like/');
          }}
        >
          <Image
            src="img/common/common_write_image.svg"
            width={20}
            height={26}
            alt="add"
            className={styles.img}
          />
          글작성
        </button>
      </div>
      <div className={styles.room}>
        {postData?.map(info => (
          <ContestListItem info={info} key={info.singingContestId} />
        ))}
      </div>
      <Pagination
        limit={limit}
        page={page}
        totalPosts={videoList?.length}
        setPage={setPage}
      />
    </div>
  );
}
export default ContestList;
