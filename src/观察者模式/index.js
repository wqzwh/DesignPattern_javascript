/**
 *
 * 观察者模式
 *
 * 1、有三个报纸出版社，报社一、报社二、报社三，
 * 2、有两个订报人，分别是:订阅者1，订阅者2。
 * 3、在这里出版社就是被观察者，订报人就是观察者
 *
 */

class Newspaper {
  constructor(name) {
    this.name = name
    this.substriber = []
  }

  on(name) {
    this.substriber.push(name)
    console.log(`${name}订阅${this.name}成功！`)
  }

  off(name) {
    for (const v of Object.keys(this.substriber)) {
      if (this.substriber[v] === name) {
        this.substriber.splice(v, 1)
        break
      }
    }
    console.log(`${name}取消${this.name}订阅`)
  }

  showSub() {
    console.log(`${this.name}所有订阅的人：${this.substriber.join()}`)
  }
}

class Man {
  constructor(name) {
    this.name = name
  }

  subscribe(newspaper) {
    newspaper.on(this.name)
  }

  unsubscribe(newspaper) {
    newspaper.off(this.name)
  }
}

const ns1 = new Newspaper('报社1')
const ns2 = new Newspaper('报社2')
const ns3 = new Newspaper('报社3')

const m1 = new Man('张三')
const m2 = new Man('李四')

m1.subscribe(ns1)
m1.subscribe(ns2)
m1.subscribe(ns3)
m2.subscribe(ns1)
m2.subscribe(ns2)
m2.subscribe(ns3)

ns1.showSub()
ns2.showSub()
ns3.showSub()
