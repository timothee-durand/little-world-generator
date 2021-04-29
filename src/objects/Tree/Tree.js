import {
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  Vector3
} from 'three';
import helpers from "../helpers";
import params from "../../params";
import Thing from "../Thing";

export default class Tree extends Thing {



  constructor(height, radius, leafColor = "#215d21", trunkColor = "#9d2a2a" ) {
    super();
    this.params = {
      trunkProportions: {
        min:0.2,
        max:0.4,
      },
      trunkRadiusProportions : {
        min:0.1,
        max:0.8
      }
    }
    const radiusTrunk = helpers.getRandBtw(this.params.trunkRadiusProportions.min, this.params.trunkRadiusProportions.max) * radius;
    const heightTrunk = helpers.getRandBtw(this.params.trunkProportions.min, this.params.trunkProportions.max) * height;

    const trunkGeometry = new CylinderGeometry( radiusTrunk, radiusTrunk, heightTrunk, 32 );
    const trunkMaterial = new MeshPhongMaterial( {color: trunkColor, wireframe:params.wireframe} );
    const trunk = new Mesh( trunkGeometry, trunkMaterial );
    trunk.position.y = heightTrunk/2
    this.add( trunk );

    const heightTop = height - heightTrunk
    const topGeometry = new ConeGeometry( radius, heightTop, 32);
    const topMaterial = new MeshPhongMaterial( {color: leafColor, wireframe:params.wireframe} );
    const top = new Mesh( topGeometry, topMaterial );
    top.position.y = heightTrunk + heightTop / 2
    this.add( top );

    helpers.log("TREE INITIALIZED", {
      heightTrunk,
      radiusTrunk,
      heightTop,
      radius,
      top,
      trunk
    })

    console.log("up", this.up)


    this.height = height;



  }

  update(timeStamp) {

  }
}
