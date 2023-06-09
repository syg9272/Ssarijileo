import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';

import Title from '@/components/common/Title';

import styles from '@/styles/sing/SingTop.module.scss';

function SingTop() {
  const slideContent = [
    {
      id: 1,
      main: '원하는 노래를\n마음껏 불러봐요',
      sub: '친구들과 노래를 선정해서 불러봐요.\n언제 어디서나 즐길 수 있습니다.',
      img: 'img/room/nomal_image.svg',
    },
    {
      id: 2,
      main: '원하는 노래를\n정확히 불러봐요',
      sub: '정확한 음정과 박자를 맞춰 노래를 부르면\n높은 점수를 얻을 수 있습니다.',
      img: 'img/room/perfect_image.svg',
    },
    {
      id: 3,
      main: '흩어진 가사를\n맞춰보세요',
      sub: '여기저기 흩어진 가사를\n원곡에 맞게 순서대로 맞춰보세요.',
      img: 'img/room/guess_singer_image.svg',
    },
  ];

  const swiperSlide = slideContent.map(slide => {
    return (
      <SwiperSlide key={slide.id} className={styles.swiperSlide}>
        <Title main={slide.main} sub={slide.sub} />
        <Image
          src={slide.img}
          width={600}
          height={358}
          alt="img"
          className={styles.topImg}
        />
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className={styles.swiper}
    >
      {swiperSlide}
    </Swiper>
  );
}

export default SingTop;
