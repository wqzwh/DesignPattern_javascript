/**
 *
 * 装饰器模式
 *
 * 只能改变对象原型上的属性
 *
 * 首先创建一个普通的Man类，它的防御值 2，攻击力为 3，血量为 3；
 * 然后我们让其带上钢铁侠的盔甲，这样他的抵御力增加 100，变成 102；
 * 让其带上光束手套，攻击力增加 50，变成 53；
 * 最后让他增加“飞行”能力
 *
 */


const fly = Symbol('fly')
const addFly = () => {
  return (target, key, descriptor) => {
    target.prototype[fly] = '飞行能力'
    const method = target.prototype.show
    target.prototype.show = (...args) => {
      const str = method.apply(target.prototype, args)
      console.log(`${str}${target.prototype[fly]}`)
    }
  }
}

const helmet = (def) => {
  return (target, key, descriptor) => {
    /**
     *
     * configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
     * enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举, 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
     * value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
     * writable 为 true 时，value 才能被赋值运算符改变。默认为 false。
     * get 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
     * set 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。
     *
     */
    const method = descriptor.value
    let ret
    descriptor.value = (...args) => {
      args[0] += def
      ret = method.apply(target, args)
      return ret
    }
  }
}


const gloves = (attack) => {
  return (target, key, descriptor) => {
    /**
     *
     * configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
     * enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举, 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。
     * value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
     * writable 为 true 时，value 才能被赋值运算符改变。默认为 false。
     * get 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
     * set 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。
     *
     */
    const method = descriptor.value
    let ret
    descriptor.value = (...args) => {
      args[1] += attack
      ret = method.apply(target, args)
      return ret
    }
  }
}

@addFly()
class Man {
  constructor(def = 2, attack = 3, hp = 3) {
    this.init(def, attack, hp)
  }

  @helmet(100)
  @gloves(50)
  init(def, attack, hp) {
    this.def = def
    this.attack = attack
    this.hp = hp
  }

  show() {
    return `防御力为${this.def},攻击力为${this.attack},血量为${this.hp}`
  }
}

const man = new Man()
man.show()
