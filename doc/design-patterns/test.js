function Person() {}
var friend = new Person();
Person.prototype = {
  constructor: Person,
  name: "ming",
  age: 22,
  job: "code",
  sayName: function () {
    console.log(this.name);
  },
};
friend.sayName(); // TypeError: friend.sayName is not a function
