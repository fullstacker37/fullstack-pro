class Man {
  callWife() {
    console.log('已经给您的老婆小丽打电话');
  }
}

Man.getInstance = (function() {
  let instance = null;
  return function() {
    if(!instance) {
      instance = new Man();
    }
    return instance;
  }
})();

const man1 = Man.getInstance();
const man2 = Man.getInstance();

console.log(man1 === man2); // true