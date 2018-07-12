import { State } from 'phaser-ce';
import { Loading } from './loading.state';

export class Boot extends State {

  private level_file: string;
  private loading: Loading;

  init ( level_file: string ) {
    this.level_file = level_file;
    this.loading = new Loading( this );
  }

  preload () {
    this.loading.loadFile(
      {
        name: 'settingsMap',
        type: 'json',
        source: this.level_file
      }
    );
  }

  create () {
      const level_data = this.game.cache.getJSON('settingsMap');
      this.game.state.start('LoadingState', true, false, level_data);
  }
}
