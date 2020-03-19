class Car {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
}
class Trip {
    constructor(car) {
        this.car = car;
    }
    start() {
        console.log(`行程开始: 名称：${this.car.name}, 车牌号：${this.car.number}`);
    }
    end() {
        console.log('行程结束: 打车金额：', this.car.money * 5);
    }
}
class SpecialCar extends Car {
    constructor(name, number) {
        super(name, number);
        this.money = 2;
    }
}
class FastCar extends Car {
    constructor(name, number) {
        super(name, number);
        this.money = 1;
    }
}
const sCar = new SpecialCar('专车', '123456');
const trip = new Trip(sCar);
trip.start();
trip.end();