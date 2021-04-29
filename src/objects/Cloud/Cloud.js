import {
  Mesh,
  MeshPhongMaterial,
  Object3D, SphereGeometry,
  Vector3
} from 'three';
import helpers from "../helpers";
import params from "../../params";
import Thing from "../Thing";

export default class Cloud extends Thing {
  constructor(color) {
    super();
    console.log("Cloud CREATED")
    this.getCarac();


    const material = new MeshPhongMaterial({
      reflectivity : 0,
      shininess : 0.2,
      color : color,
      wireframe: params.wireframe
    })
    //on calcule la longueur totale du nuage
    let length = 0;
    this.spheresRadius.forEach(radius => {length += radius * 2})
    //on calcule le premier point d'apparition
    let apparitionPoint = -length/2;

    //console.log({length, apparitionPoint})

    for (let i = 0; i < this.numberOfSphere; i++) {
      const sphere = new SphereGeometry(this.spheresRadius[i], 32, 32);
      const mesh = new Mesh(sphere, material)
      mesh.position.set(0, this.spheresRadius[i], apparitionPoint )
      this.add(mesh);
      apparitionPoint += this.spheresRadius[i];
    }
  }

  update(timeStamp) {

  }

  getCarac() {
    this.numberOfSphere = helpers.getRandBtw(params.cloud.numberOfSphere.min, params.cloud.numberOfSphere.max);
    this.spheresRadius = [];
    for (let i = 0; i < this.numberOfSphere; i++) {
      this.spheresRadius[i] = this.getSpereRadius()
    }
  }

  getSpereRadius() {
    return helpers.getRandBtw(params.cloud.sphereRadius.min, params.cloud.sphereRadius.max)
  }
}
