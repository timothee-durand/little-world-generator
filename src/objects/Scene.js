import {
  Color,
  CylinderBufferGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SphereGeometry
} from 'three';
import BasicLights from './Lights.js';
import Earth from "./Earth/Earth";
import Tree from "./Tree/Tree";
import helpers from "./helpers";
import params from "../params";
import Cloud from "./Cloud/Cloud";




export default class SeedScene extends Group {


  constructor() {
    super();
    this.init()

    const regenerer = {
      REGENERER : () => {
        this.init()
      }
    }

    helpers.addButtonToGUI(regenerer, "REGENERER");
  }

  update(timeStamp) {
    this.rotation.y = timeStamp / 10000;
  }

  init() {
    this.children = [];
    const earth = new Earth(10, "#471717");
    const tree = new Tree(4, 1)
    tree.setWorldPosition(earth, 0)

    const lights = new BasicLights();
    console.log(earth, tree)

    const numberOfCloud = helpers.getRandBtw(params.cloud.numberofCloud.min, params.cloud.numberofCloud.max)
    for (let i = 0; i < numberOfCloud; i++) {
      const cloud = new Cloud("#ffffff")
      cloud.setWorldPosition(earth, 10)
      this.add(cloud)
    }

    this.add(earth, lights, tree);
    //this.setHelper()
  }

  setHelper() {
    const geometry = new SphereGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( {color: 0xffff00, side: DoubleSide, wireframe:params.wireframe} );
    const plane = new Mesh( geometry, material );
    this.add( plane );

    const x = new Mesh(new CylinderGeometry(1, 1, 200), material)
    const y = new Mesh(new CylinderGeometry(1, 1, 200), material)
    const z = new Mesh(new CylinderGeometry(1, 1, 200), material)

    x.rotation.x = Math.PI / 2
    x.material = material.clone()
    x.material.color = new Color(255, 255, 255)
    y.rotation.y = Math.PI / 2
    y.material = material.clone()
    y.material.color = new Color(0, 0, 255)
    z.rotation.z = Math.PI / 2
    this.add(x, y , z)
  }
}
