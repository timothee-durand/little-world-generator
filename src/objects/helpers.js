import * as dat from 'dat.gui';

const gui = new dat.GUI();

export default  {
  getRandBtw(min, max) {
    return  min + (Math.random() * (max-min));
  },

  addStringToGUI(object, propertyName) {
    gui.add(object, propertyName)
  },

  addNumberToGUI(object, propertyName, min, max) {
    gui.add(object, propertyName, min, max)
  },

  addButtonToGUI(obj, methodName) {
    gui.add(obj,methodName);
  },

  log(name, values) {
    console.log(name, values)
  }
}
