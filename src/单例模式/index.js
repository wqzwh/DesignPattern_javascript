/**
 *
 * 单例模式
 * 对象只会被实例化一次
 *
 */

const _login = Symbol('_login')
const _instance = Symbol('_instance')
class Singleton {
  constructor() {
    this[_login] = false
    this[_instance] = null
  }

  static getInstance() {
    return (() => {
      if(!this[_instance]) {
        this[_instance] = new Singleton()
      }
      return this[_instance]
    })()
  }

  toLogin() {
    if(this[_login]) {
      console.log('已经登陆')
      return
    }
    this[_login] = true
    console.log('登陆成功')
  }
}

const obj1 = Singleton.getInstance()
obj1.toLogin() // 登陆成功

const obj2 = Singleton.getInstance()
obj2.toLogin() // 已经登陆

obj1 === obj2 // true
