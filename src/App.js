import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scene/Loading';
import Main from './scene/Main'
import Game1 from './scene/game/Game1';
import Game2 from './scene/game/Game2';
import Game3 from './scene/game/Game3';
import Game4 from './scene/game/Game4';
import Game5 from './scene/game/Game5';
import GameUI from './scene/GameUI';
import HomeButton from './scene/HomeButton';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:900,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [Loading, Main, Game1, Game2, Game3, Game4, Game5, GameUI, HomeButton],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: 0xFFFFFF
    };

    const game = new Phaser.Game(config);

    return () => {

      game.destroy(true);
    };
  }, []);
 
  return <div />;
}

export default App;