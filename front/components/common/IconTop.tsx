import { MouseEvent, useRef, useState } from 'react';
import NextImage from 'next/image';
import { useClientWidthHeight } from '@/hooks/useClientWidthHeight';
import { useCanvas } from '@/hooks/useCanvas';
import { useAnimation } from '@/hooks/useAnimation';

import Title from '@/components/main/Title';
import TopImg from '@/components/common/TopImg';

import styles from '@/styles/common/IconTop.module.scss';

function IconTop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clientRect = useClientWidthHeight(containerRef);
  const canvasWidth = clientRect.width;
  const canvasHeight = clientRect.height;
  const noteImages = (num: number) =>
    `img/common/common_music_note${num}_image.svg`;
  const noteWindow: {
    speed: {
      x: number;
      y: number;
    };
    start: {
      x: number;
      y: number;
    };
    specific: number;
    size: number;
    life: number;
  }[] = [];

  const animate = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < noteWindow.length; i++) {
      noteWindow[i].start.x += noteWindow[i].speed.x;
      noteWindow[i].start.y += noteWindow[i].speed.y;
      noteWindow[i].size -= 1;
      noteWindow[i].life -= 1;
      if (noteWindow[i].life < 0) {
        noteWindow.splice(i, 1);
      }
    }

    if (noteWindow.length < 0) {
      const note = {
        speed: {
          x: Math.random() * -5,
          y: Math.random() * -5 - 5,
        },
        start: {
          x: Math.random() * canvasWidth,
          y: 300,
        },
        specific: Math.floor(Math.random() * 3) + 1,
        life: Math.random() * 10 + 10,
        size: 0,
      };
      note.size = note.life + 30;
      noteWindow.push(note);
    }

    for (let i = 0; i < noteWindow.length; i++) {
      const img = new Image();
      img.src = noteImages(noteWindow[i].specific);
      ctx.drawImage(
        img,
        noteWindow[i].start.x,
        noteWindow[i].start.y,
        noteWindow[i].size,
        noteWindow[i].size,
      );
    }
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight);
  useAnimation(animate, 0);
  const onClickParticle = (e: MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      const note = {
        speed: {
          x: Math.random() * 4 - 2,
          y: Math.random() * 4 - 2,
        },
        start: {
          x: e.clientX - rect!.left,
          y: e.clientY - rect!.top,
        },
        specific: Math.floor(Math.random() * 3) + 1,
        life: Math.random() * 10 + 10,
        size: 0,
      };
      note.size = note.life + 10;
      noteWindow.push(note);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onClick={onClickParticle}
      />
      <NextImage
        src="img/common/common_microphone_image.svg"
        width={350}
        height={350}
        alt="mic"
        className={styles.mic}
      />
      <Title />
      <TopImg />
    </div>
  );
}

export default IconTop;
