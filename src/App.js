import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scenes/game/Loading';
import Game from './scenes/game/Game';
import HomeButton from './scenes/button/HomeButton';
import GameUI from './scenes/interface/GameUI';
import GameInfoUI from './scenes/interface/GameInfoUI';
import GameScore from './scenes/game/GameScore';
import PauseButton from './scenes/button/PauseButton';
import Main from './scenes/game/Main';
import SoundBar from './scenes/button/SoundBar';
import RestartButton from './scenes/button/RestartButton';
import Test from './scenes/node/Test';
import Coordinate from './scenes/theme/Coordinate';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:900,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [ 
        //Page
        /*Loading,*/ Main, Game, 
        //Interface
        GameUI, GameInfoUI, Coordinate,
        //Component
        HomeButton, PauseButton, GameScore, SoundBar, RestartButton,
        //Test
        // Test, Coordinate
      ],
      
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: '#f4f0ff'
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