import {Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, SphereGeometry} from 'three';
import helpers from "../helpers";
import params from "../../params";

export default class Earth extends Group {
  constructor(radius, color) {

    super();

    this.name = 'earth';

  /*  const earth = new SphereGeometry(radius, 20, 20);
    const material = new MeshPhongMaterial({
      color: color,
      shininess: 0,
      reflectivity: 0
    })
    this.earth = new Mesh(earth, material);*/

    const geometry = new SphereGeometry( radius, 32, 32 );
    const material = new MeshPhongMaterial( {color: color, shininess:0, reflectivity:0,wireframe:params.wireframe} );
    this.earth = new Mesh( geometry, material );

    helpers.addNumberToGUI(this.earth.position, "y", -100, 100)

    this.add(this.earth)
  }
}
