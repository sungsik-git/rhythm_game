import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scenes/Loading';
import Game from './scenes/game/Game';
import HomeButton from './scenes/button/HomeButton';
import GameUI from './scenes/interface/GameUI';
import GameInfoUI from './scenes/interface/GameInfoUI';
import GameScore from './scenes/game/GameScore';
import PauseButton from './scenes/button/PauseButton';
import Main from './scenes/Main';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:900,
      physics: {
        default: 'arcade',
        debug: true
      },
      // scene: [/* Loading,*/ Main, Game, GameUI, GameInfoUI, HomeButton, PauseButton, GameScore],
      scene: [Loading, Main, Game, GameUI, GameInfoUI, HomeButton, PauseButton, GameScore],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: '#f4f0ff'
    };

    const game = new Phaser.Game(config);

    return () => {

      game.destroy(true);
    };
  }, []);
 
  return <div />;
}

export default App;