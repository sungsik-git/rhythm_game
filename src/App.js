import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Loding from './Scene/Loding';

function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1920,
      height: 1080,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [Loding],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
}

export default App;