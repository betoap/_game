import { Tilemap } from 'phaser-ce';

export interface ILayer {
  alpha: Number;
  bodies: Array<any>;
  callbacks: Array<any>;
  data: Array<number>;
  height: number;
  name: string;
  opacity: number;
  properties: any;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  offsetx: number;
  offsety: number;
  objects: Array<Prefab>;
}

export class Prefab {

  height: number;
  id: number;
  name: string;
  properties: any;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  private map: Tilemap;

  constructor( data, map?: Tilemap ) {
    this.height = data.height;
    this.id = data.id;
    this.name = data.name;
    this.properties = data.properties;
    this.rotation = data.rotation;
    this.type = data.type;
    this.visible = data.visible;
    this.width = data.width;
    this.x = data.x;
    this.y = data.y;
    this.map = map;
  }

  getCenter(): number {
    if ( this.map && this.map.hasOwnProperty('tileHeight') ) {
      return this.map.tileHeight / 2;
    }
    return 0;
  }

  setX(): void {
    this.x = this.x + this.getCenter();
  }

  setY(): void {
    this.y = this.y - this.getCenter();
  }

}

export interface ITileset {
    columns: Number;
    drawCoords: Array<Number>;
    firstgid: Number;
    image: Number;
    name: String;
    properties: any;
    rows: Number;
    tileheight: Number;
    tileMargin: Number;
    tileproperties: any;
    tileSpacing: Number;
    tilewidth: Number;
    total: Number;
}

export interface IWord {
    height: number;
    infinite: boolean;
    layers: Array<ILayer>;
    nextobjectid: number;
    orientation: string;
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilesets: Array<ITileset>;
    tilewidth: number;
    type: string;
    version: number;
    width: number;
}

export class Word implements IWord {

    public height: number;
    public infinite: boolean;
    public layers: Array<ILayer>;
    public nextobjectid: number;
    public orientation: string;
    public renderorder: string;
    public tiledversion: string;
    public tileheight: number;
    public tilesets: Array<ITileset>;
    public tilewidth: number;
    public type: string;
    public version: number;
    public width: number;

    constructor( data: IWord ) {
        this.height = data.height;
        this.infinite = data.infinite;
        this.layers = data.layers;
        this.nextobjectid = data.nextobjectid;
        this.orientation = data.orientation;
        this.renderorder = data.renderorder;
        this.tiledversion = data.tiledversion;
        this.tileheight = data.tileheight;
        this.tilesets = data.tilesets;
        this.tilewidth = data.tilewidth;
        this.type = data.type;
        this.version = data.version;
        this.width = data.width;
    }
}

export class Tile {

  id: number;
  height: number;
  x: number;
  y: number;
  width: number;

  constructor( tile ) {
    this.id = tile.id;
    this.height = tile.height;
    this.x = tile.x;
    this.y = tile.y;
    this.width = tile.width;
  }
}
export class LoaderObject {
  source?: string;
  name?: string;
  type?: string = 'image';
  key?: string;
  imagewidth?: number;
  imageheight?: number;
  frames?: number;
  properties?: any;
  margin?: number;
  spacing?: number;
  auto_decode?: boolean = true;
  overwrite?: boolean = true;
  loadEvent?: string;
  asBlob?: boolean;
  image?: string;
  tilewidth: number;
  tileheight: number;

  constructor( item: LoaderObject ) {
    this.type = item.type;
    this.source = item.source;
    this.imagewidth = item.imagewidth;
    this.imageheight = item.imageheight;
    this.tilewidth = item.tilewidth;
    this.tileheight = item.tileheight;
    this.frames = item.frames;
    this.properties = item.properties;
    this.margin = item.margin;
    this.spacing = item.spacing;
    this.auto_decode = item.auto_decode;
    this.overwrite = item.overwrite;
    this.loadEvent = item.loadEvent;
    this.asBlob = item.asBlob;
    this.name = item.name;
    this.key =  item.name;
    this.typeDefinition( item );
    this.setSource( item );
  }

  typeDefinition ( item ) {
    this.type = item.type;
    if (
      item.hasOwnProperty('image') &&
      item.hasOwnProperty('tilewidth') &&
      item.hasOwnProperty('tileheight')
    ) {
      this.type = 'spritesheet';
    }
  }

  setSource( item ) {
    if ( item.image ) {
      this.source = item.image;
    }
  }

}
