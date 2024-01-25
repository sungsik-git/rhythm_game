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
import Test from './scenes/test/Test';
import Test2 from './scenes/test/Test2';
import Result from './scenes/game/Result';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Test3 from './scenes/test/Test3';
import Test4 from './scenes/test/Test4';
import Test5 from './scenes/test/Test5';


function App() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width:1200,
      // width: 1920,
      physics: {
        default: 'arcade',
        debug: true
      },
      scene: [ 
        //Page
        // Loading, 
        // Main, Game, Result,
        //Interface
        // GameUI, GameInfoUI,
        //Component
        // HomeButton, PauseButton, GameScore, SoundBar, RestartButton,
        // Test
        // Test2
        Test5
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
 
  return <div />;
}

export default App;