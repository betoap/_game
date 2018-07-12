import { State } from 'phaser-ce';

export class Word extends State {

  constructor( game ) {
    super();
    const settings = game.cache.getJSON('settingsMap');
    console.log(settings);
  }
}
