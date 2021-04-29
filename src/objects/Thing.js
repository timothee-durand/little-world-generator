import {
  Group,
} from 'three';
import helpers from "./helpers";


export default class Thing extends Group {

  constructor() {
    super();

  }

  setWorldPosition(earth, altitude) {
    let i = 3;
    let l = 1;
    const phi =  helpers.getRandBtw(10, 500);
    const theta = helpers.getRandBtw(10, 500);

    this.position.setFromSphericalCoords( earth.earth.geometry.parameters.radius + altitude, phi, theta);

    this.lookAt( earth.position );
    this.rotateX( -0.5*Math.PI );

  }

  update(timeStamp) {

  }
}
