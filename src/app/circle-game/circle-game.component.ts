import { Component, OnInit, OnDestroy } from '@angular/core';
import Phaser, { Physics, Scene } from 'phaser';

@Component({
  selector: 'app-circle-game',
  templateUrl: './circle-game.component.html',
  styleUrls: ['./circle-game.component.css']
})

export class CircleGameComponent implements OnDestroy, OnInit{ 
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
          gravity: { y: 0 },
          debug: false
        }
      },
      scale: {
        parent: 'gamediv',
        autoCenter: Phaser.Scale.CENTER_BOTH,
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
  player : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  bombs: Phaser.Physics.Arcade.Group;  
  timer: any;
  text: any;
  emmitter: Phaser.Time.TimerEvent;

  preload() {
    this.load.image('bckgrnd', 'assets/background-neon.png');
    this.load.spritesheet('spaceman', 'assets/spaceman.png', {frameWidth: 16, frameHeight: 16})
    this.load.image('bombs', 'assets/bomb.png');
  }

  create() {
    this.add.image(400, 300, 'bckgrnd');

    this.player = this.physics.add.sprite(400,300, 'spaceman').setScale(2).refreshBody();

    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);
    this.bombs = this.physics.add.group();
    
    this.timer = this.add.text(16, 16, 'Time: ', { fontSize: '24px' });
    this.text = this.add.text(16, 48, 'Bombs: ', { fontSize: '24px' });
    this.emmitter = this.time.addEvent({args: [this.player, this.bombs, this.text], delay: 5000, callback: this.bombsAway, loop:true})
    
    this.physics.add.collider(this.player, this.bombs, this.gameOver, undefined, this);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('spaceman', {start:1, end:2}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('spaceman', {start:8, end:9}),
      frameRate: 10,
      repeat: -1     
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('spaceman', {start:11, end:12}),
      frameRate: 10,
      repeat: -1     
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('spaceman', {start:4, end:6}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'dead',
      frames: [{ key:'spaceman', frame: 14}],
      frameRate: 10,
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'spaceman', frame: 4}],
      frameRate: 20,
    });
  }
  override update() {
    this.gameOver;
    var cursor = this.input.keyboard.createCursorKeys();

    if (cursor.left.isDown) {

      this.player.setVelocityX(-150);
      // this.player.anims.play('left', true);
    } else if (cursor.right.isDown)
    {
      this.player.setVelocityX(150);
      // this.player.anims.play('right', true);
    } else 
    {
      this.player.setVelocityX(0);
    }
    if (cursor.down.isDown)
    {
      this.player.setVelocityY(150);
      // this.player.anims.play('down', true);
    } else if (cursor.up.isDown)
    {
      this.player.setVelocityY(-150);
      // this.player.anims.play('up', true);
    } else 
    {
      this.player.setVelocityY(0);
    }
    if(cursor.left.isDown)
    {
      this.player.anims.play('left', true);
    } else if(cursor.right.isDown)
    {
      this.player.anims.play('right', true);
    } else if(cursor.up.isDown)
    {
      this.player.anims.play('up', true);
    } else if(cursor.down.isDown)
    {
      this.player.anims.play('down', true);
    } else if (!cursor.up.isDown && !cursor.down.isDown && !cursor.left.isDown && !cursor.right.isDown) 
    {
      this.player.anims.play('turn');
    }

    var gameRunTime = Math.round(this.time.now * 0.001) - 1;
    var s = gameRunTime % 60;
    gameRunTime = (gameRunTime - s);
    var m = gameRunTime / 60;
    var totalTime = m + ':' + s;


    this.timer.setText(['Time: ' + totalTime])
    this.text.setText(['Bombs: ' + this.bombs.countActive()])
  }
  bombsAway(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, bombs: Phaser.Physics.Arcade.Group, text: any){
    console.log("time loop working");
    for (let i = 0; i < 3; i ++) {
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var y = (player.y < 300) ? Phaser.Math.Between(300, 600) : Phaser.Math.Between(0, 300);
      var bomb = bombs.create(x, y, 'bombs');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity((Phaser.Math.Between(-1, 1) > 0 ? -300: 200), (Phaser.Math.Between(-1, 1) > 0 ? -200: 300));
      bomb.allowGravity = false;
    }
  }
  gameOver(text: any, timer: any) {
    this.player.setTint(0xff0000);
    let score = this.add.text(225, 500, 'Final Time: ${score}', { fontSize: '36px'}) 
    score.setText(["Final Score: " + this.bombs.countActive() * 10]);
    this.timer.setText([""]);
    this.text.setText([""]);
    this.player.anims.play("dead");
    this.scene.pause();
  }
}
