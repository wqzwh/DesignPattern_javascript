/**
 *
 * 状态机模式
 *
 * 1、promise有三种状态， 等待（pending）、已完成（fulfilled）、已拒绝（rejected）
 * 2、promise的状态只能从“等待”转到“完成”或者“拒绝”，不能逆向转换，同时“完成”和“拒绝”也不能相互转换
 * 3、promise必须有一个then方法，而且要返回一个promise，供then的链式调用
 * 4、then接受俩个回调(成功与拒绝),在相应的状态转变时触发，回调可返回promise，等待此promise被resolved后，继续触发then链
 *
*/

const status = Symbol('status')
const resolve = Symbol('resolve')
const reject = Symbol('reject')
const sucCallBacks = Symbol('sucCallBacks')
const errCallBacks = Symbol('errCallBacks')

class MyPromise {
  constructor(fn) {
    if (typeof fn !== 'function') return '参数必须是一个函数'
    this[status] = 'pending'
    this[sucCallBacks] = []
    this[errCallBacks] = []

    fn((value) => {
      this[resolve](value)
    }, (error) => {
      this[reject](error)
    })
  }

  [resolve](value) {
    this[status] = 'fulfilled'
    setTimeout(() => {
      this[sucCallBacks].forEach(cb => {
        cb(value)
      })
    }, 0)
  }

  [reject](error) {
    this[status] = 'rejected'
    setTimeout(() => {
      this[errCallBacks].forEach(cb => {
        cb(error)
      })
    }, 0)
  }

  then(sucFn, errFn) {
    if (this[status] === 'fulfilled') {
      this[sucCallBacks].push(sucFn)
    }

    if (this[status] === 'rejected') {
      this[errCallBacks].push(errFn)
    }

    return this
  }
}

function getName(str) {
  const promise = new MyPromise((resolve, reject) => {
    if (str === '123') {
      resolve(str)
    } else {
      reject('失败')
    }
  })
  return promise
}

const aa = getName('123')
aa.then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})
