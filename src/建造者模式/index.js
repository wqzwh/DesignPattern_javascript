/**
 *
 * 建造者模式
 * 包工头安排一群工人盖房子，完成后交工
 *
 */

/**
 *
 * 创建包工头
 */
class Contractor {
  build(worker, woshi, chufang, keting) {
    worker.buildWoshi(woshi)
    worker.buildChufang(chufang)
    worker.buildKeting(keting)
  }
}

/**
 *
 * 工人
 *
 */
class Worker {
  constructor() {
    this.woshiStatus = false
    this.chufangStatus = false
    this.ketingStatus = false
  }

  buildWoshi(woshi) {
    console.log(`${woshi}开始建造`)
  }

  buildChufang(chufang) {
    console.log(`${chufang}开始建造`)
  }

  buildKeting(keting) {
    console.log(`${keting}开始建造`)
  }

  complete(woshi, chufang, keting) {
    const house = new House(woshi, chufang, keting)
    this.woshiStatus = true
    this.chufangStatus = true
    this.ketingStatus = true
    console.log(`${house.woshi}好了，${house.chufang}好了，${house.keting}好了`)
  }
}

class House {
  constructor(woshi, chufang, keting) {
    this.woshi = woshi
    this.chufang = chufang
    this.keting = keting
  }
}

const worker = new Worker()
const contractor = new Contractor()
contractor.build(worker, '卧室', '厨房', '客厅')
worker.complete('卧室', '厨房', '客厅')
