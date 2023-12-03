import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Controls from './components/Controls';
import VideoPlayer from './components/VideoPlayer';

import './App.css';

function App() {
  const [monitor, setMonitor] = useState('front');
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoConfig, setVideoConfig] = useState({'file-front': '', 'file-back': '', 'state': 'pause', 'time': '0'});
  const socket = io('http://localhost:3001');


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const monitorType = urlParams.get('monitor');

    if (monitorType && monitorType === 'back') {
      setMonitor('back');
      setIsLoaded(true);
      
      socket.on('playbackConfig', (config) => {
        setVideoConfig(config);
      });

      return () => {
        socket.disconnect();
      };
    }
    setIsLoaded(true);

  }, []);

  useEffect(() => {
    if (monitor === 'front' && isLoaded) {
      console.log('Sending playbackConfig:', videoConfig)
      socket.emit('playbackConfig', videoConfig);
    }
  }, [videoConfig]);

  return (
    <div className="App">
      {monitor === 'front' && <Controls videoConfig={videoConfig} setVideoConfig={setVideoConfig} />}
      <div className="video-container">
        <VideoPlayer url={monitor === 'front' ? videoConfig['file-front'] : videoConfig['file-back']} videoConfig={videoConfig} setVideoConfig={setVideoConfig} monitor={monitor} />
      </div>
    </div>
  );
}

export default App;
