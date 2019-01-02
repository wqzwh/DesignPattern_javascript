/**
 *
 * 迭代器模式
 *
 */

class Iterator {
  constructor(list = []) {
    this.list = list
    this.index = 0
  }

  next() {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }

  hasNext() {
    if (this.index >= this.list.length) {
      return false
    }
    return true
  }
}

class OrderedData {
  constructor(list) {
    this.list = list
  }

  getIterator() {
    return new Iterator(this.list)
  }
}

const aa = new OrderedData([1, 2, 3, 4, 5])
const aiter = aa.getIterator()
while (aiter.hasNext()) {
  console.log(aiter.next())
}
