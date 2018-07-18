import { State, Game } from 'phaser-ce';

import { Player } from './player';
import { Loading } from './core/loading.state';

export class Character extends State {

  private loading: Loading;

  constructor ( ) {
    super();
  }

  preload() {
    console.log( 'ok' );
    this.loading = new Loading( this );
    this.loading.loadFile({
      asset_key: 'simon',
      type: 'spritesheet',
      source: 'assets/chara_hero.png',
      frame_width: 16,
      frame_height: 16,
      frames: -1,
      margin: 16,
      spacing: 32
    });
    this.loading.loadFile({
      asset_key: 'settingsMap',
      type: 'json',
      source: 'assets/fase1.json'
    });
  }

  create() {
    const player = new Player(this.game, 130, 180);
  }

}
