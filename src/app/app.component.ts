import { Component } from '@angular/core';
import {slideInAnimation} from './animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'Dashboard';

  getAnimationData(outlet: RouterOutlet) {
    // The getAnimationData function returns the animation property from the data provided through the ActivatedRoute
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
