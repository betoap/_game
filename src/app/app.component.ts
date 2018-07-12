import { Component } from '@angular/core';
import { Gamex } from './game/game';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    const g = new Gamex();
  }

}
