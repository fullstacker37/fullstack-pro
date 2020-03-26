class Bank {
  constructor() {
    if (new.target === Bank) throw new Error("抽象类不能直接实例化!");
  }
  createBankCard() {
    throw new Error("抽象工厂类不允许直接调用，请重写实现!");
  }
  saveMoney() {
    throw new Error("抽象工厂类不允许直接调用，请重写实现!");
  }
}
new Bank();

class Icbc extends Bank {
  createBankCard(type) {
    switch (type) {
      case "debit":
        return new DebitCard();
      case "credit":
        return new CreditCard();
      default:
        throw new Error("暂时没有这个产品!");
    }
  }
}

class Card {
  buy() {
    throw new Error("抽象产品方法不允许直接调用，请重新实现！");
  }
  transfer() {
    throw new Error("抽象产品方法不允许直接调用，请重新实现！");
  }
}

class DebitCard extends Card {
  buy() {
    console.log("您可以使用工行借记卡进行消费了！");
  }
}

class CreditCard extends Card {
  buy() {
    console.log("您可以使用工行信用卡进行消费了！");
  }
}
const myBank = new Icbc();
const myCard = myBank.createBankCard();
myCard.buy();
