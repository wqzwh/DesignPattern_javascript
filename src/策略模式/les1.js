// 策略模式的定义是： 定义一系列的算法， 把它们一个个封装起来， 并且使它们可以相互替换。
// 策略模式计算奖金的函数
// 定义三种计算奖金的算法

class performanceS {
  calculate(salary) {
    return salary * 4
  }
}

class performanceA {
  calculate(salary) {
    return salary * 3
  }
}

class performanceB {
  calculate(salary) {
    return salary * 2
  }
}

// 定义奖金类
class Bonus {
  constructor() {
    this.salary = null // 原始工资
    this.strategy = null // 绩效等对应的策略对象
  }

  setSalary(salary) {
    this.salary = salary // 设置员工的原始工资
  }

  setStrategy(strategy) {
    this.strategy = strategy // 设置员工的绩效等级对象
  }

  getBonus() {
    return this.strategy.calculate(this.salary)
  }
}

const bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS()); // 设置策略对象
console.log(bonus.getBonus()); // 输出：40000
bonus.setStrategy(new performanceA()); // 设置策略对象
console.log(bonus.getBonus()); // 输出：30000
