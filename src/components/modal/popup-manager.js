// 控制 zIndex
let zIndex = 999
function getZIndex() {
  return zIndex++
}

const PopupManager = {
  instances: [],
  setIndex(instances) {
    const dom = instances.$el
    dom.children[0].style.zIndex = getZIndex()
    dom.children[1].style.zIndex = getZIndex()
  }
}

export default PopupManager
