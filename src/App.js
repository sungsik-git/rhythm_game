import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scenes/Loading'
import Game from './scenes/Game';
import GameUI from './interface/GameUI';
import GameInfoUI from './interface/GameInfoUI';
import Main from './scenes/Main';
import Result from './scenes/Result';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import KeyboardEvent from './input/KeyboardEvent';
import PauseModal from './modal/PauseModal';
import Test from './test/Test';
import HomeModal from './modal/HomeModal';
import RestartModal from './modal/RestartModal';
import FocusoutModal from './modal/FocusoutModal';


function App() {
  useEffect(() => {
    const gameWidth = isMobile() ? window.innerWidth : 1200;
    const gameheight = isMobile() ? window.innerHeight : 1080;

    const config = {
      type: Phaser.AUTO,
      width: gameWidth,
      // height:gameheight,
      // width: 1920,
      physics: {
        default: 'arcade',
        debug: true
      },
      input:{
        activePointers: 10,
      },
      scene: [ 
        // Page
        Loading, 
        Main, Game, Result, 
        //Interface
        GameUI, GameInfoUI,
        //Component
        KeyboardEvent, PauseModal, HomeModal, RestartModal, FocusoutModal,


        // // Test
        // Test,
      ],
      plugins: {
        scene: [
          {
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
          }
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
  
  return <div style={{ width: '100%', height: '100%' }} id="game-container" />;
}


const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default App;