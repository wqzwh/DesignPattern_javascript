// 表单验证
// 封装验证策略
// 给某个文本输入框添加多种校验规则
/***********************策略对象**************************/
const strategies = {
  isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}
/***********************Validator 类**************************/
class Validator {
  constructor() {
    this.cache = []
  }

  add(dom, rules) {
    for (let i = 0, rule; rule = rules[i++];) {
      ((rule) => {
        const strategyAry = rule.strategy.split(':')
        const errorMsg = rule.errorMsg
        this.cache.push(function () {
          const strategy = strategyAry.shift()
          strategyAry.unshift(dom.value)
          strategyAry.push(errorMsg)
          return strategies[strategy].apply(dom, strategyAry)
        })
      })(rule)
    }
  }

  start() {
    for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      const errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}

/***********************客户调用代码**************************/
const registerForm = document.getElementById('registerForm')
const validataFunc = () => {
  const validator = new Validator()
  validator.add(registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能小于 10 位'
  }])
  validator.add(registerForm.password, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于 6 位'
  }])
  validator.add(registerForm.phoneNumber, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }])
  const errorMsg = validator.start()
  return errorMsg
}
registerForm.onsubmit = () => {
  const errorMsg = validataFunc()
  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}
