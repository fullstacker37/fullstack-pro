function SpecialArray() {}
var arr = new SpecialArray();
SpecialArray.prototype = {
  say: function () {
    console.log(123);
  },
};
arr.say();
