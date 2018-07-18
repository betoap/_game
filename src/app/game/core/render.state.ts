import { State, Tilemap, Tileset, TilemapLayer, Tile, TileSprite, Group } from 'phaser-ce';

import { Prefab } from './utils';
import { Player } from './../player';

export class Render extends State {

  private _layers: Array<TilemapLayer>;
  private _tilesets: Array<Tileset>;
  private groups: Object;
  private tileLayers: Object;
  private settings: any;
  private map: Tilemap;
  private prefabs: any;
  private player;

  init( settings ) {
    this.map = this
                .game
                .add
                .tilemap(
                  'tilemap',
                  settings.tilewidth,
                  settings.tileheight,
                  settings.width,
                  settings.height
                );
    this.settings = settings;
    this._layers = this.map.layers;
    this._tilesets = this.map.tilesets;
    this.tileLayers = {};
    this.prefabs = {};
  }

  create() {
    //this.groups['door'] = this.add.group();
    this.addTiles();
    this.renderLayers();
    this.game.world.setBounds(0, 0, this.settings.tilewidth * this.settings.width, this.settings.tileheight * this.settings.height );
  }

  addTiles() {
    this._tilesets.forEach( tileset => {
      this.map.addTilesetImage( tileset.name, tileset.name );
    });
  }

  getLayer ( name ) {
    const index = this._layers.findIndex( layer => layer.name === name );
    return this._layers[ index ];
  }

  getTilesets ( tileIndex: number ) {
    if ( tileIndex <= 0 ) return;
    let i = this._tilesets.length - 1;
    for (i; i >= 0; i--) {
      if ( this._tilesets[i].firstgid <= tileIndex ) break;
    }
    return { mapTilesets: this._tilesets[i], tilesets: this.settings.tilesets[i] };
  }

  renderLayers() {
    this.settings.layers.forEach( ( settingLayer ) => {
      const layer = this.getLayer( settingLayer.name );
      if ( !settingLayer.visible ) return;
      this.renderLayersHandle( layer, settingLayer );
    });
  }

  setLayerType ( layer: TilemapLayer ) {
    if ( !layer ) return;
    this.settings.layers.find( _layer => {
      if ( _layer.name === layer.name ) {
        layer.type = _layer.type;
        return true;
      }
    });
  }

  renderLayersHandle( layer: TilemapLayer, settingLayer ) {
    this.setLayerType( layer );
    switch ( settingLayer.type ) {
      case 'imagelayer':
        this.renderImagelayer( settingLayer );
        break;
      case 'tilelayer':
        this.renderTileLayer( layer );
        break;
      case 'objectgroup':
        this.renderObjectLayer( settingLayer );
        break;
      default:
        break;
    }
  }

  renderImagelayer ( settingLayer ) {
    const x = settingLayer.x + ( settingLayer.offsetx || 0 );
    const y = settingLayer.y + ( settingLayer.offsety || 0 );
    this.add.sprite(x, y, settingLayer.name);
  }

  renderTileLayer( layer: TilemapLayer ) {
    const collisions: Array<number> = [];
    const doors: Array<number> = [];
    this.tileLayers[layer.name] = this.map.createLayer( layer.name );
    layer.data.forEach( ( data_row: any ) => {
      data_row.forEach( ( tile: Tile ) => {
        if ( tile && tile.index > 0 ) {
          if (layer.name === 'collide' ) {
            if ( collisions.indexOf( tile.index ) === -1) {
              this.setProperties( tile );
              collisions.push( tile.index );
              if (
                tile.properties.hasOwnProperty('door') &&
                doors.indexOf( tile.index ) === -1
              ) {
                //this.groups['door'] = '';
                doors.push( tile.index );
              }
            }
          } else {
            this.animateTile( tile );
          }
        }
      });
    });
    if (layer.name === 'collide' ) {
      this.map.setCollision(collisions, true, layer.name);
      this.map.setCollision(doors, true, layer.name);
      //this.tileLayers[layer.name].debug = true;
      //this.tileLayers[layer.name].debugSettings.forceFullRedraw = true;
    }
    this.tileLayers[layer.name].resizeWorld();
  }

  setProperties ( object ) {
    const tileset = this.getTilesets(object.index).tilesets;
    let firstgid: number = tileset.firstgid;
    let key: string;
    for ( key in tileset.tileproperties ) {
      firstgid += parseInt( key );
      object['tileproperties'] = tileset.tileproperties[key];
    }
  }

  renderObjectLayer ( layer ) {
    const group = this.add.group();
    group.enableBody = true;
    layer.objects.forEach( object => {
      if ( layer.name === 'personagens' ) {
        return this.createPrefab( object );
      }
      const _layer = this.getTilesets(object.gid);
      this.animateObject( object, _layer, group );
    });
  }

  createPrefab ( _element: any ) {
    let prefab: Prefab;
    prefab = new Prefab( _element, this.map );
    this.player = new Player(this.game, 280, 400, this.tileLayers);
    switch ( _element.type ) {
      case 'player':
          break;
      case 'enemy':
          break;
      case 'start':
          break;
      case 'goal':
          break;
    }
    this.prefabs[_element.name] = prefab;
  }

  animateObject( object, tileset, group ) {
    const firstgid: number = tileset.tilesets.firstgid;
    const animeId = object.gid - firstgid;
    const sprite: TileSprite = this.add.tileSprite(
      object.x,
      object.y,
      object.width,
      object.height,
      tileset.mapTilesets.name,
      object.gid - firstgid,
      group
    );
    if (
      tileset.tilesets.hasOwnProperty( 'tiles' ) &&
      tileset.tilesets.tiles.hasOwnProperty( animeId ) &&
      tileset.tilesets.tiles[animeId].hasOwnProperty( 'animation' ) &&
      ( object.gid - firstgid ) === animeId
    ) {
      this.animate( object.gid, tileset, sprite );
    }
  }

  animateTile( tile ) {
    const tileset = this.getTilesets(tile.index);
    if ( tileset.tilesets.hasOwnProperty( 'tiles' ) ) {
      let _tile: any;
      for ( _tile in tileset.tilesets.tiles ) {
        _tile = parseInt( _tile );
        const firstgid: number = tileset.tilesets.firstgid;
        if (
          tileset.tilesets.tiles[_tile].hasOwnProperty( 'animation' )
          && ( tile.index - firstgid ) === _tile
        ) {
          this.map.removeTile(tile.x, tile.y, tile.layer.name).destroy();
          const sprite: TileSprite = this.add.tileSprite(
            tile.x * tile.width,
            tile.y * tile.height,
            tile.width,
            tile.height,
            tileset.mapTilesets.name,
            tile.index - firstgid
          );
          this.animate( tile.index, tileset, sprite );
        }
      }
    }
  }

  animate( gid, tileset, sprite ) {
    const firstgid: number = tileset.tilesets.firstgid;
    const animeId = gid - firstgid;
    let time: number;
    const animations = tileset.tilesets.tiles[animeId].animation.map( anime => {
      time = anime.duration / 10;
      return anime.tileid;
    });
    sprite.animations.add(`animed-${gid}` , animations);
    sprite.animations.play(`animed-${gid}`, time, true);
  }

  render () {
    this.player.render();
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
    //this.game.debug.spriteCoords(this.player, 32, 350);
  }

}
