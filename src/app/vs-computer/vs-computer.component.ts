import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser, { Physics } from 'phaser';

@Component({
  selector: 'app-vs-computer',
  templateUrl: './vs-computer.component.html',
  styleUrls: ['./vs-computer.component.css']
})
export class VsComputerComponent implements OnDestroy, OnInit{
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
      },
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    }
  }

  ngOnInit() { 
    this.phaserGame = new Phaser.Game(this.config);
  }
  ngOnDestroy() {
      this.phaserGame.destroy(true, false);
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  grid: any;

  preload() {
    this.load.image('bg', 'assets/aiBackground.png');
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.grid = this.add.grid()

  }

  override update() {
      
  }
}
