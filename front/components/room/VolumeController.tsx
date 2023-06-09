import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from '@/styles/room/VolumeController.module.scss';

import MicControlBar from '../common/MicControlBar';
import EchoControlBar from '../common/EchoControlBar';
import { getCookie } from '@/util/cookie';
import { RootState } from '@/redux/store';
import { setEcho } from '@/redux/store/echoSlice';
import { setVolume } from '@/redux/store/volumeSlice';

function VolumeController({ setVolumeModal }: any) {
  const [echoInfo, setEchoInfo] = useState(0.5);
  const [volumeInfo, setVolumeInfo] = useState(0.5);
  const storeEcho = useSelector((state: RootState) => state.echo);
  const storeVolume = useSelector((state: RootState) => state.volume);
  const dispatch = useDispatch();

  useEffect(() => {
    setEchoInfo(storeEcho.echo);
  }, [storeEcho]);

  useEffect(() => {
    setVolumeInfo(storeVolume.volume);
  }, [storeVolume]);

  return (
    <div className={styles.layout}>
      <input
        type="button"
        className={styles.back}
        onClick={() => {
          setVolumeModal(false);
        }}
      />
      <div className={styles.container}>
        <div className={styles.context}>
          <div className={styles.title}>마이크 볼륨</div>
          <div className={styles.bar}>
            <MicControlBar />
          </div>
          <div className={styles.beat}>
            <div className={styles.text}>0%</div>
            <div className={styles.text}>100%</div>
          </div>
          <div className={styles.title}>에코</div>
          <div className={styles.bar}>
            <EchoControlBar />
          </div>
          <div className={styles.beat}>
            <div className={styles.text}>0%</div>
            <div className={styles.text}>100%</div>
          </div>
        </div>
        <button
          className={styles.btn}
          type="button"
          onClick={() => {
            axios
              .put(
                'api/v1/song-setting',
                {
                  eco: echoInfo,
                  volume: volumeInfo,
                },
                {
                  headers: {
                    Authorization: `${getCookie('Authorization')}`,
                    refreshToken: `${getCookie('refreshToken')}`,
                  },
                },
              )
              .then(() => {
                dispatch(setEcho(echoInfo));
                dispatch(setVolume(volumeInfo));
              });
            setVolumeModal(false);
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default VolumeController;
