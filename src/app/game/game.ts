import { Game, AUTO, CANVAS  } from 'phaser-ce';
import { Boot } from './core/boot.state';
import { Loading } from './core/loading.state';
import { Render } from './core/render.state';

export class Gamex  extends Game {

    constructor() {
      super(
        {
          width: '100%',
          height: '100%',
          renderer: CANVAS ,
          antialias: true,
          multiTexture: true,
          parent: 'content'
        }
      );
      this._create();
    }

    _create() {
      this.state.add('BootState', new Boot());
      this.state.add('LoadingState', new Loading());
      this.state.add('RenderState', new Render());
      this.state.start('BootState', true, false, 'assets/json/fase1.json');
    }
}
