import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loading from './scene/Loading';
import Main from './scene/Main'
import Game1 from './scene/game/Game1';
import Game2 from './scene/game/Game2';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:900,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [Loading, Main, Game1, Game2],
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