// 定义电灯开关状态
// 用状态模式改写上面的例子
// 如果灯的形式很多，将每种形式的灯封装成状态，例如：强光（StrongLight）、弱光（WeakLight）、关灯(OffLight)三种形式，通过（press）下来切换三种状态

class StrongLight {
  constructor(light) {
    this.light = light
  }

  press() {
    this.light.setState(this.light.OffLight)
    console.log(`强光，当前状态${this.light.currState}`)
  }
}

class WeakLight {
  constructor(light) {
    this.light = light
  }

  press() {
    this.light.setState(this.light.WeakLight)
    console.log(`弱光，当前状态${this.light.currState}`)
  }
}

class OffLight {
  constructor(light) {
    this.light = light
  }

  press() {
    this.light.setState(this.light.OffLight)
    console.log(`关闭，当前状态${this.light.currState}`)
  }
}

class Light {
  constructor() {
    this.StrongLight = new StrongLight(this)
    this.WeakLight = new WeakLight(this)
    this.OffLight = new OffLight(this)
    this.currState = null // 定义开关所处的状态
    this.init()
  }

  init() {
    this.currState = this.OffLight
  }

  setState(newState) {
    this.currState = newState
  }
}

const light = new Light()
light.StrongLight.press()
light.WeakLight.press()
light.OffLight.press()
