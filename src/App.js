import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scenes/game/Loading';
import Game from './scenes/game/Game';
import HomeButton from './scenes/component/HomeButton';
import GameUI from './scenes/interface/GameUI';
import GameInfoUI from './scenes/interface/GameInfoUI';
import PauseButton from './scenes/component/PauseButton';
import Main from './scenes/game/Main';
import RestartButton from './scenes/component/RestartButton';
import Result from './scenes/game/Result';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import KeyboardEvent from './scenes/input/KeyboardEvent';
import PauseModal from './scenes/component/PauseModal';
import Test from './scenes/test/Test';
import HomeModal from './scenes/component/HomeModal';
import RestartModal from './scenes/component/RestartModal';
import FocusoutModal from './scenes/component/FocusoutModal';


function App() {
  useEffect(() => {
    const gameWidth = isMobile() ? window.innerWidth : 1200;
    const gameheight = isMobile() ? window.innerHeight : 1080;

    const config = {
      type: Phaser.AUTO,
      width: gameWidth,
      height:gameheight,
      // width: 1920,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [ 
        //Page
        Loading, 
        Main, Game, Result, 
        //Interface
        GameUI, GameInfoUI,
        //Component
        HomeButton, PauseButton, RestartButton, KeyboardEvent, PauseModal, HomeModal, RestartModal, FocusoutModal,


        //Test
        // Test, PauseModal
      ],
      plugins: {
        scene: [
          {
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
          }
          // Add other plugins as needed
        ]
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      
      backgroundColor: '#000000'
  };

    const game = new Phaser.Game(config);
    window.game = game

    return () => {

      game.destroy(true);
    };
  }, []);
  
  return <div style={{ width: '100%', height: '60%' }} id="game-container" />;
}


const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default App;