// 单例模式的核心是确保只有一个实例，并提供全局访问。
// 惰性单例,惰性单例指的是在需要的时候才创建对象实例。
// 缺点：创建对象和管理单例的逻辑都放在 createLoginLayer对象内部，代码复用差，如果创建iframe或者script就得重新复制。
// 写一个通用的惰性函数
const getSingle = (fn) => {
  let result
  return () => {
    return result || (result = fn.apply(this, arguments))
  }
}

const createLoginLayer = () => {
  const div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = () => {
  const loginLayer = createSingleLoginLayer()
  loginLayer.style.display = 'block'
}

const createSingleIframe = getSingle(() => {
  const iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  return iframe
})

document.getElementById('loginBtn').onclick = () => {
  const loginLayer = createSingleIframe()
  loginLayer.src = 'http://baidu.com'
}
