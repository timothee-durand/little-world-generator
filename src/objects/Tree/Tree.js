import {ConeGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, Vector3} from 'three';
import helpers from "../helpers";
import params from "../../params";

export default class Tree extends Group {



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

    this.add( trunk );
    const heightTop = height - heightTrunk
    const topGeometry = new ConeGeometry( radius, heightTop, 32);
    const topMaterial = new MeshPhongMaterial( {color: leafColor, wireframe:params.wireframe} );
    const top = new Mesh( topGeometry, topMaterial );
    this.add( top );

    top.position.y =  ((heightTop) / 2) + ((heightTrunk) / 2)

    helpers.log("TREE INITIALIZED", {
      heightTrunk,
      radiusTrunk,
      heightTop,
      radius,
      top,
      trunk
    })

    console.log("up", this.up)

  this.up = new Vector3(0, 0, 1)

    this.height = height;

 /*   helpers.addNumberToGUI(top.position, "y", 0, 100)
    helpers.addNumberToGUI(this.params.trunkProportions, "min", 0, 1)
    helpers.addNumberToGUI(this.params.trunkProportions, "max", 0, 1)*/


  }

  setWorldPosition(earth, numberOfTree) {
    let i = 3;
    let l = 1;
    const phi = 500;
    const theta = 300;

    this.position.setFromSphericalCoords( earth.earth.geometry.parameters.radius +(this.height / 2), phi, theta);
    //vector.copy( earth.position ).multiplyScalar( 2 );

    const vector = new Vector3(0,0 , 1)


    this.lookAt(vector);

  //  helpers.addNumberToGUI(vector, "y", 0, 100)
   // helpers.addNumberToGUI(vector, "x", 0, 100)
   // helpers.addNumberToGUI(vector, "z", 0, 100)
  }

  update(timeStamp) {
   // this.rotation.y = timeStamp / 10000;
  }
}
