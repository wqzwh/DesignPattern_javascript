// 享元模式
// 运用共享技术来有效支持大量细粒度的对象
// 内部状态与外部状态
// 享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量
/**
 * 内部状态存储于对象内部。
 * 内部状态可以被一些对象共享。
 * 内部状态独立于具体的场景，通常不会改变。
 * 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。
 * */

// 用享元模式重构文件上传
// 避免在startUpload中重复创建对象，其实只需要根据上传类型不同创建两个对象即可，因此上传类型是可以被共享的，应该设为内部状态，其余的文件大小文件名称可以设为外部状态

class Upload {
  constructor(uploadType) {
    this.uploadType = uploadType
    this.dom = null
  }

  delFile(id) {
    // 这里获取不到fileSize和fileName，因为他们是外部状态。调用一个函数来获取外部状态的参数
    uploadManager.setExternalState(id, this)
    console.log(this.fileSize)
    console.log(this.fileName)
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom)
    }
    if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom)
    }
  }
}

// 定义一个方法来判断是否创建过对象
const UploadCreateObject = (() => {
  // 定义一个空对象来保存创建的新对象
  const createdObjs = {}
  return {
    create(uploadType) {
      if (createdObjs[uploadType]) {
        return createdObjs[uploadType]
      }
      createdObjs[uploadType] = new Upload(uploadType)
      return createdObjs[uploadType]
    }
  }
})()
// 封装外部状态
const uploadManager = (() => {
  // 保存所有的外部对象
  const uploadExternalObject = {}
  return {
    add(id, uploadType, fileName, fileSize) {
      // 判断是否需要创建新对象
      const createObj = UploadCreateObject.create(uploadType)
      const dom = document.createElement('div')
      dom.innerHTML =
        '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize + '</span>' +
        '<button class="delFile">删除</button>'
      dom.querySelector('.delFile').onclick = () => {
        createObj.delFile(id)
      }
      document.body.appendChild(dom)
      uploadExternalObject[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom
      }
      return createObj
    },
    setExternalState(id, createObj) {
      const uploadData = uploadExternalObject[id]
      for (const i in uploadData) {
        createObj[i] = uploadData[i]
      }
    }
  }
})()

// 使用
let id = 0
const startUpload = function(uploadType, files) { // uploadType 区分是控件还是 flash
  for (let i = 0, file; file = files[i++];) {
    uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
  }
}
startUpload('plugin', [{
  fileName: '1.txt',
  fileSize: 1000
},
{
  fileName: '2.html',
  fileSize: 3000
},
{
  fileName: '3.txt',
  fileSize: 5000
}
])

startUpload('flash', [{
  fileName: '4.txt',
  fileSize: 1000
},
{
  fileName: '5.html',
  fileSize: 3000
},
{
  fileName: '6.txt',
  fileSize: 5000
}
])
