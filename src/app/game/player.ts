import { Game, Sprite } from 'phaser-ce';

export class Player extends Sprite {

  private face: String = 'up';
  private layers: Object;
  private attacking: Boolean;
  public rangeAttack;

  constructor(game: Game, x: number, y: number, layers?: object) {
    super(game, x, y, 'simon', 16);
    this.layers = layers;
    this.attacking = false;
    this.game.physics.arcade.enable( this );
    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.setSize(12, 8, 18, 24);
    this.anchor.setTo(0.5, 0.5);
    this.setAnimations();
    this.createEspada();
    this.game.camera.follow( this );
    this.game.add.existing( this );
  }

  private createEspada() {
    this.rangeAttack = this.game.make.sprite(0, 8);
    this.rangeAttack.anchor.setTo(0.25, 0.5);
    this.game.physics.arcade.enable( this.rangeAttack );
    this.rangeAttack.body.setCircle(8);
    this.rangeAttack.body.enable = false;
    this.addChild( this.rangeAttack );
  }

  private setAnimations() {
    this.animations.add('walk-down', [8, 9, 10, 11], 10, true);
    this.animations.add('walk-horizontal', [12, 13, 14, 15], 10, true);
    this.animations.add('walk-up', [16, 17, 18, 19], 10, true);

    const attackDown = this.animations.add('attack-down', [20, 21, 22, 23], 10, false);
    const attackHorizontal = this.animations.add('attack-horizontal', [24, 25, 26, 27], 10, false);
    const attackUp = this.animations.add('attack-up', [28, 29, 30, 31], 10, false);
    attackDown.onComplete.add( this.attackFinish, this);
    attackHorizontal.onComplete.add( this.attackFinish, this);
    attackUp.onComplete.add( this.attackFinish, this);

    attackDown.enableUpdate = true;
    attackDown.onUpdate.add(this.onUpdate, this);
    attackHorizontal.enableUpdate = true;
    attackHorizontal.onUpdate.add(this.onUpdate, this);
    attackUp.enableUpdate = true;
    attackUp.onUpdate.add(this.onUpdate, this);
  }

  update() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.collideTile();
    this.move();
    this.attack();
  }

  collideTile() {
    let layer: string;
    for ( layer in this.layers ) {
      this.game.physics.arcade.collide( this, this.layers[layer] );
      //this.game.physics.arcade.overlap(this, this.layers[layer], collectCoin, null, this);
    }
  }

  move() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.attacking = false;
      this.rangeAttack.x = 8;
      this.rangeAttack.y = 8;
      this.face = 'horizontal';
      this.body.velocity.x = -150;
      this.animations.play('walk-horizontal');
      if (this.scale.x === 1) {
        this.scale.x = -1;
      }
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.attacking = false;
      this.rangeAttack.x = 8;
      this.rangeAttack.y = 8;
      this.face = 'horizontal';
      this.body.velocity.x = 150;
      this.animations.play('walk-horizontal');
      if (this.scale.x === -1) {
        this.scale.x = 1;
      }
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.attacking = false;
      this.rangeAttack.x = 0;
      this.rangeAttack.y = 16;
      this.face = 'down';
      this.body.velocity.y = 150;
      this.animations.play('walk-down');
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.attacking = false;
      this.rangeAttack.x = 0;
      this.rangeAttack.y = 0;
      this.face = 'up';
      this.body.velocity.y = -150;
      this.animations.play('walk-up');
    } else if ( !this.attacking ) {
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
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.attacking ) {
      this.rangeAttack.body.enable = true;
      this.attacking = true;
      this.animations.play('attack-' + this.face);
    }
  }

  attackFinish() {
    this.rangeAttack.body.enable = false;
    this.attacking = false;
  }

  render() {
    //this.game.debug.body(this);
    //this.game.debug.body( this.rangeAttack );
  }
  onUpdate(anim, frame) {
    //this.text.text = 'Frame ' + frame.index;
  }

}
