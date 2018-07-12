export interface ILayer {
    data: Array<number>;
    height: number;
    name: string;
    opacity: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

export interface ITileset {
    columns: number;
    firstgid: number;
    image: string;
    imageheight: number;
    imagewidth: number;
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tileheight: number;
    tilewidth: number;
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


export class LoaderObject {
  source?: string;
  name?: string;
  type?: string = 'image';
  key?: string;
  frame_width?: number;
  frame_height?: number;
  frames?: number;
  margin?: number;
  spacing?: number;
  auto_decode?: boolean = true;
  overwrite?: boolean = true;
  loadEvent?: string;
  asBlob?: boolean;
  image?: string;

  constructor( item: LoaderObject ) {
    this.type = item.type;
    this.source = item.source;
    this.frame_width = item.frame_width;
    this.frame_height = item.frame_height;
    this.frames = item.frames;
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
