import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scene/Loading';
import Main from './scene/Main'
import Game from './scene/game/Game';
import HomeButton from './scene/button/HomeButton';
import GameUI from './scene/interface/GameUI';
import GameInfoUI from './scene/interface/GameInfoUI';
import GameScore from './scene/game/GameScore';
import PauseButton from './scene/button/PauseButton';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:900,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [/* Loading,*/ Main, Game, GameUI, GameInfoUI, HomeButton, PauseButton, GameScore],
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