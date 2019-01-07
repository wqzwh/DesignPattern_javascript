// 基于继承的设计模式——模板方法
// 模板方法模式是一种只需使用继承就可以实现的非常简单的模式。
// 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架， 包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

// 咖啡和茶的例子
// 定义一个饮料类
// 会有四个方法
// 1把水煮沸 boilWater()
// 2泡的方式 brew()
// 3倒进杯子的方法 pourInCup()
// 4加料的方法 addCondiments()
// 咖啡有以上四个步骤，查没有第四个步骤

class Beverage {
  boilWater() {
    console.log('把水煮沸')
  }

  brew() {

  }

  pourInCup() {

  }

  addCondiments() {

  }

  customerWantsCondiments() {
    return true
  }

  init() {
    this.boilWater()
    this.brew()
    this.pourInCup()
    if (this.customerWantsCondiments()) {
      this.addCondiments()
    }
  }
}

class Coffee extends Beverage {
  brew() {
    console.log('用沸水冲泡咖啡')
  }

  pourInCup() {
    console.log('把咖啡倒进杯子')
  }

  addCondiments() {
    console.log('加糖和牛奶')
  }

  customerWantsCondiments() {
    return true
  }
}

class Tea extends Beverage {
  brew() {
    console.log('用沸水冲泡茶')
  }

  pourInCup() {
    console.log('把茶倒进杯子')
  }

  customerWantsCondiments() {
    return false
  }
}

const coffee = new Coffee()
coffee.init()
console.log('--------------------')
const tea = new Tea()
tea.init()
