import { Game, Sprite } from 'phaser-ce';

export class Player extends Sprite {

  private face: String = 'down';

  constructor(game: Game, x: number, y: number) {
    super(game, x, y, 'simon', 0);
    this.game.physics.arcade.enableBody(this);
    this.anchor.setTo(0.5, 0);
    this.setAnimations();
    game.add.existing(this);
  }

  private setAnimations() {
    this.animations.add('walk-down', [8, 9, 10, 11], 10, true);
    this.animations.add('walk-horizontal', [12, 13, 14, 15], 10, true);
    this.animations.add('walk-up', [16, 17, 18, 19], 10, true);

    this.animations.add('attack-down', [20, 21, 22, 23], 150, false);
    this.animations.add('attack-horizontal', [24, 25, 26, 27], 10, true);
    this.animations.add('attack-up', [28, 29, 30, 31], 1, false);
  }

  update() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.move();
    this.attack();
  }

  move() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.face = 'horizontal';
      this.body.velocity.x = -150;
      this.animations.play('walk-horizontal');
      if (this.scale.x === 1) {
        this.scale.x = -1;
      }
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.face = 'horizontal';
      this.body.velocity.x = 150;
      this.animations.play('walk-horizontal');
      if (this.scale.x === -1) {
        this.scale.x = 1;
      }
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.face = 'down';
      this.body.velocity.y = 150;
      this.animations.play('walk-down');
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.face = 'UP';
      this.body.velocity.y = -150;
      this.animations.play('walk-up');
    } else {
      switch (this.face) {
        case 'horizontal':
          this.animations.frame = 12;
          break;
        case 'down':
          this.animations.frame = 8;
          break;
        case 'up':
          this.animations.frame = 16;
          break;
      }
    }
  }

  attack() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.animations.play('attack-' + this.face);
    }
  }

}
