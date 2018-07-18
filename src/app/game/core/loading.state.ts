import { State } from 'phaser-ce';

import { LoaderObject } from './utils';

export class Loading extends State {

  private level_data: any;

  constructor( state?: State ) {
    super();
    if ( state ) {
      this.load = state.load;
    }
  }

  init( level_data: any ): void {
    this.level_data = level_data;
  }

  preload(): void {
    const assetsLayers = this.level_data.layers;
    const tilesAssets = this.level_data.tilesets;
    this.parse(assetsLayers);
    this.parse(tilesAssets);
  }

  parse( assets: Array<any> ): void {
    assets.forEach( item => this.loadFile( item ) );
  }

  loadFile( asset ): void {
    asset = new LoaderObject( asset );
    switch ( asset.type ) {
      case 'imagelayer':
      case 'image':
        this
          .load
          .image(
            asset.key,
            asset.source
          );
        break;
      case 'spritesheet':
        this
          .load
          .spritesheet(
            asset.key,
            asset.source,
            asset.tilewidth,
            asset.tileheight,
            asset.frames,
            asset.margin,
            asset.spacing
          );
        break;
      case 'tilemap':
        this
          .load
          .tilemap(
            asset.key,
            asset.source,
            null,
            Phaser.Tilemap.TILED_JSON
          );
        break;
      case 'json':
        this
          .load
          .json(
            asset.key,
            asset.source,
            asset.overwrite
          );
        break;
      case 'xml':
        this
          .load
          .xml(
            asset.key,
            asset.source,
            asset.overwrite
          );
        break;
      case 'text':
        this
          .load
          .text(
            asset.key,
            asset.source,
            asset.overwrite
          );
        break;
      case 'audio':
        this
          .load
          .audio(
            asset.key,
            asset.source,
            asset.auto_decode
          );
        break;
      case 'video':
        this
          .load
          .video(
            asset.key,
            asset.source,
            asset.loadEvent,
            asset.asBlob
          );
        break;
    }
  }

  create(): void {
    this.game.state.start('RenderState', true, false, this.level_data);
  }

}
