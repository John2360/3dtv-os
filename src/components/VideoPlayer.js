import React, { useEffect, useState, useRef } from 'react'
import sample from '../assets/videos/sample1.mp4';

function VideoPlayer(props) {
  const { url, videoConfig, setVideoConfig, monitor } = props;
  const [time, setTime] = useState(0);
  const videoRef = useRef();

  useEffect(() => {    
    videoRef.current?.load();
  }, [url]);

  useEffect(() => {
    if (videoConfig['state'] === 'play') {
      videoRef.current?.play();
    } else { 
      videoRef.current?.pause();
    }

    // TODO: Fix this
    // if (monitor === 'back' && (Math.abs(videoConfig['time']-time) > 1)) {
    //   console.log('Setting time to:', videoConfig['time']);
    //   videoRef.current.currentTime = videoConfig['time'];
    // }
  }, [videoConfig]);

  // TODO: Fix this
  useEffect(() => {
      const videoElement = videoRef.current;
    
      const handleTimeUpdate = () => {
        if (monitor === 'front' && Math.abs(videoElement.currentTime-time) > 1) {
          // setVideoConfig((val) => ({...val, 'time': videoElement.currentTime}));
        }
        setTime(videoElement.currentTime);
      }
    
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
  }, []);

  // useEffect(() => {
  //   if (videoConfig['time']-time > 0.5 || videoConfig['time']-time < -0.5) {
  //     // videoRef.current.currentTime = videoConfig['time'];
  //   }
  // }, [time]);

  return (
    <video ref={videoRef} autoPlay loop muted>
      <source src={url === '' ? sample : url} />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;