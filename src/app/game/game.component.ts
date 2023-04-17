import { Component, OnInit, OnDestroy } from '@angular/core';
import Phaser, { Physics } from 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
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
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scale: {
        parent: 'gamediv2',
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
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

  player: any;
  platforms: any;
  stars: any;
  bombs: any;
  score = 0;
  scoreText: any;
  gameOver = false;

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100,450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start:0, end:3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start:5, end:8}),
      frameRate: 10,
      repeat: -1
    });

    this.physics.add.collider(this.player, this.platforms);

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70}
    });

    this.stars.children.iterate(function (child: { setBounceY: (arg0: number) => void; }) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px'});

    this.bombs = this.physics.add.group();

    // this.physics.add.collider(this.bombs, this.player);

    this.physics.add.collider(this.bombs, this.player, this.hitBomb, undefined, this);

  }
  override update() {
    var cursors = this.input.keyboard.createCursorKeys();

    if (this.gameOver)
    {
      return;
    }
    if (cursors.left.isDown) 
    {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } 
    else if (cursors.right.isDown)
    {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else 
    {
      this.player.setVelocityX(-0);
      this.player.anims.play('turn');
    }
    if (cursors.up.isDown && this.player.body.touching.down)
    {
      this.player.setVelocityY(-330);
    }
  }
  collectStar(player: any, star: any) {

    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0)
    {
      this.stars.children.iterate( function (child: { enableBody: (arg0: boolean, arg1: any, arg2: number, arg3: boolean, arg4: boolean) => void; x: any; }) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }

  }

  hitBomb(player: any, bomb: any) {

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }
}