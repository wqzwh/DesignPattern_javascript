/**
 *
 * 工厂模式
 *
 */

const _hamburger = Symbol('_hamburger')
const _cola = Symbol('_cola')
const _frenchFries = Symbol('_frenchFries')

class MDL {
  constructor() {
  }

  hamburger(num) {
    return this[_hamburger](num)
  }

  [_hamburger](num = 1) {
    console.log(`取${num}个汉堡`)
  }

  cola(num) {
    return this[_cola](num)
  }

  [_cola](num = 1) {
    console.log(`取${num}杯可乐`)
  }

  frenchFries(num) {
    return this[_frenchFries](num)
  }

  [_frenchFries](num = 1) {
    console.log(`取${num}盒薯条`)
  }

  setMeal() {
    this[_hamburger]()
    this[_cola]()
    this[_frenchFries]()
  }
}

class Factory {
  static create() {
    return new MDL()
  }
}


// 示例
const zhangsan = Factory.create()
zhangsan.hamburger(1)
zhangsan.cola(1)
zhangsan.frenchFries(1)
