/**
 *
 * 适配器模式
 *
 * 1、假设有两种充电接口MicroUSB和USBTypec
 * 2、有两种车分别有不同的充电接口
 * 3、有两种手机有不同的接受充电的接口
 * 4、两辆车都适用转换器给两种手机充电
 */

class Car {
  constructor(name = '', inface = '') {
    this.name = name
    this.inface = inface
  }

  charging(phone) {
    const inface = phone.inface
    const name = phone.name
    if(inface === this.inface) {
      console.log(`${this.name}的${this.inface}接口开始给${name}的${inface}接口充电`)
      return
    }
    const adatper = new Adatper(phone)
    if(inface === 'MicroUSB' && this.inface === 'USBTypec') {
      adatper.uSBTypecInface()
      console.log(`${this.name}的${this.inface}接口开始给${name}的${adatper.inface}接口充电`)
      return
    }

    if(inface === 'USBTypec' && this.inface === 'MicroUSB') {
      adatper.microUSBInface()
      console.log(`${this.name}的${this.inface}接口开始给${name}的${adatper.inface}接口充电`)
      return
    }
  }
}

class Phone {
  constructor(name = '', inface = '') {
    this.name = name
    this.inface = inface
  }
}

class Adatper {
  constructor(phone) {
    this.inface = phone.inface
  }
  microUSBInface() {
    console.log(`接口由${this.inface}转换成MicroUSB接口`)
    this.inface = 'MicroUSB'
  }

  uSBTypecInface() {
    console.log(`接口由${this.inface}转换成USBTypec接口`)
    this.inface = 'USBTypec'
  }
}


const car1 = new Car('1号车', 'MicroUSB')
const car2 = new Car('2号车', 'USBTypec')

const phone1 = new Phone('苹果手机', 'MicroUSB')
const phone2 = new Phone('华为手机', 'USBTypec')

car1.charging(phone1)
car2.charging(phone2)

car1.charging(phone2)
car1.charging(phone1)

car2.charging(phone2)
car2.charging(phone1)


