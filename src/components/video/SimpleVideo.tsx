import { FC, useEffect, useRef, useState } from 'react';
import useOnScreen from 'src/hooks/useIsVisiable';
import {
  addInViewPortVideo,
  getInViewPortVideos,
  getPlayingVideos,
  removeInViewPortVideo,
  removePlayingVideo,
  setPlayingVideo,
} from 'src/redux/slices/homePage';
import { useDispatch, useSelector } from 'src/redux/store';

interface ISimpleVideoProps {
  autoShow?: boolean;
  src: string;
}

const SimpleVideo: FC<ISimpleVideoProps> = (props) => {
  const dispatch = useDispatch();
  const inViewVideos = useSelector(getInViewPortVideos);
  const playingVideos = useSelector(getPlayingVideos);
  const videoRef = useRef(null);
  const { autoShow, src } = props;
  const ref = useRef<HTMLDivElement>();
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, ref.current ? `-${ref.current.offsetHeight}px` : '');
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  useEffect(() => {
    if (onScreen && autoShow) {
      dispatch(addInViewPortVideo({ link: src, positionTop: ref.current.offsetTop }));
    } else if (!onScreen && autoShow) {
      pauseVideo();
      dispatch(removePlayingVideo(src));
      dispatch(removeInViewPortVideo(src));
    }
  }, [onScreen]);

  useEffect(() => {
    if (inViewVideos.length === 0) {
      return;
    }
    if (inViewVideos[0] && inViewVideos[0].link === src) {
      if (!autoPlay) {
        setAutoPlay(true);
        videoRef.current.play();
        dispatch(setPlayingVideo(src));
      }
    }
  }, [inViewVideos]);

  useEffect(() => {
    const videoIndex = playingVideos.findIndex((i) => i === src);
    if (videoIndex >= 0) {
      if (inViewVideos[0] && inViewVideos[0].link !== src) {
        pauseVideo();
        dispatch(removePlayingVideo(src));
      }
    }
  }, [playingVideos]);

  const pauseVideo = () => {
    setAutoPlay(false);
    videoRef.current.pause();
  };

  // useEffect(() => {
  //   if (onScreen && autoShow) {
  //     setAutoPlay(true);
  //     videoRef.current.play();
  //   } else {
  //     setAutoPlay(false);
  //     videoRef.current.pause();
  //   }
  // }, [onScreen]);

  return (
    <div ref={ref}>
      <video muted={autoShow} controls autoPlay={autoPlay} width="100%" ref={videoRef}>
        <source src={src} />
      </video>
    </div>
  );
};

export default SimpleVideo;
