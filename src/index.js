/**
 *
 * 1、一个停车场，有3层，每层100个车位
 * 2、每个车位都有监控系统，监控车辆进入还是驶出
 * 3、车辆进入前，显示每层空余车位数量
 * 4、车辆进入时，摄像头识别车牌号和时间
 * 5、车辆离开时，屏幕显示车牌号和停车时间
 *
*/

class Park {
  constructor(floor = []) {
    this.floor = floor
    this.screen = new Screen()
    this.monitor = new Monitor()
    this.cartList = {} // 记录停车场所有车位的车
  }

  in(car) {
    const info = this.monitor.shot(car)
    // 假设停在第一层的随机位置
    const space = this.floor[0].space[parseInt(Math.random() * 100)]
    space.in()
    info.space = space
    this.cartList[car.num] = info
  }

  out(car) {
    const info = this.cartList[car.num]
    info.space.out()
    this.screen.show(car)
    delete this.cartList[car.num]
  }

  // 输出每层的车位信息
  showEmpty() {
    return this.floor.map((floor) => {
      return `${floor.index}层还有${floor.showEmpty()}空余车位`
    }).join('\n')
  }
}

class Floor {
  constructor(index, space = []) {
    this.space = space
    this.index = index
  }

  showEmpty() {
    let num = 0
    this.space.forEach((sp) => {
      if(sp.empty) {
        num = num + 1
      }
    })
    return num
  }
}

class Space {
  constructor() {
    this.empty = true
  }

  in() {
    this.empty = false
  }

  out() {
    this.empty = true
  }
}

class Monitor {
  shot(car) {
    return {
      num: car,
      time: new Date()
    }
  }
}

class Screen {
  show(car) {
    console.log(`${car.num},${new Date() - car.time}`)
  }
}
