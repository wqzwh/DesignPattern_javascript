/**
 *
 * 代理模式
 *
 * 1、明星带有自己属性：姓名，年龄，电话号
 * 2、明星的电话号不能外露
 * 3、如果想联系明星只能先联系经纪人，经纪人会提供联系电话号码
 * 4、明星的出场费可以出价讨论，出场费最低120000，低于这个值不参加演出活动
 *
 */

class Start {
  constructor() {
    this.name = '张默默'
    this.age = 25
    this.phone = 18823459087
  }
}

const _start = Symbol('_start')
class Agent {
  constructor() {
    this[_start] = new Start()
    this.phone = 12345679876
    this.price = 120000
  }

  showPhone() {
    console.log(`经纪人电话:${this.phone}`)
  }

  showPrice(price) {
    if (price >= this.price) {
      console.log(`参加演出活动，演出活动的费用是${price}`)
    } else {
      console.log(`费用过低，不参加演出活动`)
    }
  }
}

const merchant = new Agent()
merchant.showPhone()
merchant.showPrice(200000)
merchant.showPrice(20000)

/**
 *
 * proxy 写法
 *
 */

const star = {
  name: '张默默',
  age: 25,
  phone: 18823459087
}

const agent = new Proxy(star, {
  get(target, key, receiver) {
    if (key === 'phone') {
      const phone = 12345679876
      console.log(`经纪人电话:${phone}`)
    } else if (key === 'price') {
      console.log(`参加演出活动，演出活动的费用是120000`)
    } else {
      console.log(target[key])
    }
  },

  set(target, key, value, receiver) {
    const price = 120000
    if (key === 'newPrice') {
      if (value >= price) {
        console.log(`参加演出活动，演出活动的费用是${value}`)
      } else {
        console.log(`费用过低，不参加演出活动`)
      }
    }
  }
})

agent.name
agent.phone
agent.price
agent.newPrice = 20000
agent.newPrice = 200000

/**
 *
 * 虚拟代理实现图片预加载
 *
 */
const myImage = (() => {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc(src) {
      imgNode.src = src
    }
  }
})()

// 定义一个代理函数
const proxyImage = (() => {
  const img = new Image()
  img.onload = () => {
    myImage.setSrc(this.src)
  }
  return {
    setSrc(src) {
      myImage.setSrc('loading.gif')
      img.src = src
    }
  }
})()
proxyImage.setSrc('large.jpg')
