import { State } from 'phaser-ce';

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
    assets.forEach( item => this.parseHandle(item) );
  }

  parseHandle( item: any ): void {
    item['asset_key'] = item['name'];
    if (
      item.hasOwnProperty('image') &&
      item.hasOwnProperty('tilewidth') &&
      item.hasOwnProperty('tileheight')
    ) {
      item['type'] = 'spritesheet';
      item['source'] = item['image'];
      this.loadFile( item );
    } else if (
      item.hasOwnProperty('image') &&
      item.hasOwnProperty('type') &&
      item.type === 'imagelayer'
    ) {
      item['source'] = item['image'];
      this.loadFile( item );
    }
    //console.log(this, item, item.hasOwnProperty('image'));
  }

  loadFile( asset: LoaderObject): void {
    switch ( asset.type ) {
      case 'imagelayer':
      case 'image':
        this
          .load
          .image(
            asset.asset_key,
            asset.source
          );
        break;
      case 'spritesheet':
        this
          .load
          .spritesheet(
            asset.asset_key,
            asset.source,
            asset.frame_width,
            asset.frame_height,
            asset.frames,
            asset.margin,
            asset.spacing
          );
        break;
      case 'tilemap':
        this
          .load
          .tilemap(
            asset.asset_key,
            asset.source,
            null,
            Phaser.Tilemap.TILED_JSON
          );
        break;
      case 'json':
        this
          .load
          .json(
            asset.asset_key,
            asset.source,
            asset.overwrite
          );
        break;
      case 'xml':
        this
          .load
          .xml(
            asset.asset_key,
            asset.source,
            asset.overwrite
          );
        break;
      case 'text':
        this
          .load
          .text(
            asset.asset_key,
            asset.source,
            asset.overwrite
          );
        break;
      case 'audio':
        this
          .load
          .audio(
            asset.asset_key,
            asset.source,
            asset.auto_decode
          );
        break;
      case 'video':
        this
          .load
          .video(
            asset.asset_key,
            asset.source,
            asset.loadEvent,
            asset.asBlob
          );
        break;
    }
  }

  create(): void {
    this.game.state.start('GameState', true, false, this.level_data);
  }

}

class LoaderObject {
  asset_key: string;
  type: string = 'image';
  source: string;
  frame_width?: number;
  frame_height?: number;
  frames?: number;
  margin?: number;
  spacing?: number;
  auto_decode?: boolean = true;
  overwrite?: boolean = true;
  loadEvent?: string;
  asBlob?: boolean;
}
