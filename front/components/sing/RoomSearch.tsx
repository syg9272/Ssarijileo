import React, { useState } from 'react';
import Image from 'next/image';
import * as hangul from 'hangul-js';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import type { OptionItem, RoomInfo } from '@/components/sing/RoomList';

import styles from '@/styles/common/Search.module.scss';

function RoomSearch(props: {
  optionItem: OptionItem[];
  rooms: RoomInfo[];
  setFilteredRoom: React.Dispatch<React.SetStateAction<RoomInfo[]>>;
  setPage: any;
}) {
  const { optionItem, rooms, setFilteredRoom, setPage } = props;
  // 다크모드 상태 관리
  const storeTheme = useSelector((state: RootState) => state.theme);
  const { theme } = storeTheme;

  const toggle = `img/common/${theme}/${theme}_toggle_open_image.svg`;

  const [sortType, setSortType] = useState('Default');
  const [searchText, setSearchText] = useState('');

  const changeMode = (e: React.MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;
    setSortType(eventTarget.innerText);
    let modeType = '';
    if (eventTarget.innerText === '일반모드') {
      modeType = 'N';
    } else if (eventTarget.innerText === '퍼펙트스코어') {
      modeType = 'P';
    } else if (eventTarget.innerText === '가사맞추기') {
      modeType = 'O';
    }
    const sortedData =
      eventTarget.innerText !== 'Default'
        ? rooms.filter(room => room.mode === modeType)
        : rooms;
    const filteredData =
      searchText !== ''
        ? sortedData.filter(
            room =>
              hangul.search(room.title, searchText) !== -1 ||
              room.title.toLowerCase().includes(searchText.toLowerCase()),
          )
        : sortedData;
    setFilteredRoom(filteredData);
    setPage(1);
  };

  const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const sortedData =
      sortType !== 'Default'
        ? rooms.filter(room => room.mode === sortType)
        : rooms;
    if (e.target.value === '') {
      setFilteredRoom(sortedData);
      return;
    }
    const filteredData = sortedData.filter(
      room =>
        hangul.search(room.title, e.target.value) !== -1 ||
        room.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredRoom(filteredData);
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

export default RoomSearch;
