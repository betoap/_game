import { State } from 'phaser-ce';

import { ILayer, ITileset, IWord, Word } from './utils';

export class Render extends State {

  private _layers: Array<ILayer>;
  private _tileset: ITileset;
  private _word: IWord;

  init( settings ) {
    this._layers = settings.layers;
    this._tileset = settings.tilesets;
    this._word = new Word( settings );
    this.renderLayers();
  }

  renderLayers() {
    this._layers.forEach( this.renderLayersHandle );
  }

  renderLayersHandle( layer: ILayer ) {
    console.log( layer );
  }

}
