import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as hangul from 'hangul-js';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import type { OptionItem, VideoInfo } from '@/components/contest/ContestList';

import styles from '@/styles/common/Search.module.scss';

function ContestSearch(props: {
  optionItem: OptionItem[];
  videos: VideoInfo[];
  setFilteredVideo: React.Dispatch<React.SetStateAction<VideoInfo[]>>;
}) {
  const { optionItem, videos, setFilteredVideo } = props;
  // 다크모드 상태 관리
  const [themeMode, setThemeMode] = useState('light');
  const storeTheme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    setThemeMode(storeTheme.theme);
  }, [storeTheme]);

  const toggle = `img/common/${themeMode}/${themeMode}_toggle_open_image.svg`;

  const [sortType, setSortType] = useState('Default');
  const [searchText, setSearchText] = useState('');

  const changeMode = (e: React.MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;
    setSortType(eventTarget.innerText);
    const filteredData =
      searchText !== ''
        ? videos.filter(
            video =>
              hangul.search(video.title, searchText) !== -1 ||
              video.title.toLowerCase().includes(searchText.toLowerCase()),
          )
        : videos;
    if (eventTarget.innerText === 'Like') {
      filteredData.sort((a, b) => {
        return a.like - b.like;
      });
    }
    setFilteredVideo(filteredData);
  };

  const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const filteredData =
      searchText !== ''
        ? videos.filter(
            video =>
              hangul.search(video.title, searchText) !== -1 ||
              video.title.toLowerCase().includes(searchText.toLowerCase()),
          )
        : videos;
    if (e.target.value === '') {
      setFilteredVideo(filteredData);
      return;
    }
    if (sortType === 'like') {
      filteredData.sort((a, b) => {
        return a.like - b.like;
      });
    }
    setFilteredVideo(filteredData);
  };

  const optionList = optionItem.map((item: OptionItem) => (
    <button
      key={item.mode}
      type="button"
      className={styles.optionItem}
      onClick={changeMode}
    >
      {item.mode}
    </button>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.sort}>
          <div className={styles.context}>Sort By : </div>
          <div className={styles.select}>
            <div className={styles.type}>{sortType}</div>
            <Image src={toggle} width={15} height={15} alt="toggle" />
          </div>
          <div className={styles.option}>{optionList}</div>
        </div>
        <div className={styles.search}>
          <div className={styles.context}>Search : </div>
          <input
            className={styles.input}
            type="text"
            placeholder="제목을 입력하세요"
            value={searchText}
            onChange={changeSearchText}
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
    </div>
  );
}

export default ContestSearch;