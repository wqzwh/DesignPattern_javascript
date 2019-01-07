// 透明的单例模式
// 使用 CreateDiv 单例类，它的作用是负责在页面中创建唯一的 div 节点
// 缺点: CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始化 init 方法，第二是保证只有一个对象
// 用代理实现单例模式

const _instance = Symbol('_instance')
class CreateDiv {
  constructor() {
    this[_instance] = null
    this.init()
  }

  static getInstance(html) {
    this.html = html
    return (() => {
      if (!this[_instance]) {
        this[_instance] = new CreateDiv()
      }
      return this[_instance]
    })()
  }

  init() {
    const div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
  }
}

// 引入代理类 proxySingletonCreateDiv来判断是否存在实例
const ProxySingletonCreateDiv = (() => {
  let instance
  return function(html) {
    if (!instance) {
      instance = CreateDiv.getInstance(html)
    }
    return instance
  }
})()

const a2 = new ProxySingletonCreateDiv('sven1')
const b2 = new ProxySingletonCreateDiv('sven2')
console.log(a2 === b2) // true
