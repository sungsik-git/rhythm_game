import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scenes/game/Loading';
import Game from './scenes/game/Game';
import HomeButton from './scenes/component/HomeButton';
import GameUI from './scenes/interface/GameUI';
import GameInfoUI from './scenes/interface/GameInfoUI';
import GameScore from './scenes/game/GameScore';
import PauseButton from './scenes/component/PauseButton';
import Main from './scenes/game/Main';
import SoundBar from './scenes/component/SoundBar';
import RestartButton from './scenes/component/RestartButton';
import Test from './scenes/node/Test';
import Result from './scenes/game/Result';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:1200,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [ 
        //Page
        Loading, Main, Game, Result,
        //Interface
        GameUI, GameInfoUI,
        //Component
        HomeButton, PauseButton, GameScore, SoundBar, RestartButton,
        //Test
        // Test, Coordinate
      ],
      
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: '#ffffff'
  };

    const game = new Phaser.Game(config);
    window.game = game

    return () => {

      game.destroy(true);
    };
  }, []);
 
  return <div />;
}

export default App;