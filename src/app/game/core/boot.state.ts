import { State } from 'phaser-ce';
import { Loading } from './loading.state';
import { ScreenUtils } from './screenutils';

export class Boot extends State {

  private level_file: string;
  private loading: Loading;

  init ( level_file: string ) {
    this.config();
    this.level_file = level_file;
    this.loading = new Loading( this );
  }

  config () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = false;
    const screenDims = ScreenUtils.screenMetrics;

    if (this.game.device.desktop) {
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        //this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    } else {
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
    }
  }

  preload () {
    this.loading.loadFile(
      {
        name: 'settingsMap',
        type: 'json',
        source: this.level_file
      }
    );
    this.loading.loadFile(
      {
        name: 'tilemap',
        type: 'tilemap',
        source: this.level_file
      }
    );
    this.loading.loadFile({
      name: 'simon',
      type: 'spritesheet',
      source: 'assets/image/chara_hero.png',
      tilewidth: 48,
      tileheight: 48,
      frames: 42
    });
  }

  create () {
    this.stage.backgroundColor = 0x000000;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    const level_data = this.game.cache.getJSON('settingsMap');
    this.game.state.start('LoadingState', true, false, level_data);
  }
}
