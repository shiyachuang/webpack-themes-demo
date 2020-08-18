
// 查找某个dom 是否为 另外dom 的子节点
export function isChildernNode(node, parentnode) {
  parentnode = document.querySelector(parentnode)
  while (node !== undefined && node != null && parentnode !== undefined
    && parentnode !== null && node.tagName.toUpperCase() !== 'BODY') { 
    if (node === parentnode){ 
      return true
    } 
    node = node.parentNode
  } 
  return false
}

// 格式化时间
export function formatting(input, full) {
  if (input) {
    const times = parseInt(input) * 1000
    if (full) {
      return moment(times).format('YYYY-MM-DD HH:mm')
    }
    if (moment().isSame(moment(times), 'day')) {
      return moment(times).format('HH:mm')
    }
    return moment(times).format('MM-DD')
  }
}

export const getPortalTheme = (type) => {
  const headerBackground = getStyle(document.querySelector('app-menu #header'), "background")
  const headerNavBackground = getStyle(document.querySelector('app-menu #header #nav'), "background")
  const headerNavLiActiveBackground = getStyle(document.querySelector('app-menu #header #nav li.active'), "background-color")
  const arr = headerNavBackground.split('linear-gradient')[1].split('rgb')
  const btnsBackground = type == "defaultTheme" ? "#1c8acd" : "rgb" + arr[1].replace(/\),.*/,")")
  const btnsHoverBackground = type == "defaultTheme" ? "#1e7fb7" : headerNavLiActiveBackground
  return encodeURIComponent(JSON.stringify({
      'header-top': {
          background: headerBackground
      },
      'btns': {
          background: btnsBackground
      },
      'btns-hover': {
          background: btnsHoverBackground
      },
      'btns-hover-color': {
          color: btnsBackground
      }
  }))
}

const getStyle = (obj, attr) => {
  if (!obj) {
     return undefined
  }
  if (obj.currentStyle) {
      return obj.currentStyle[attr];
  } else {
      return document.defaultView.getComputedStyle(obj, null)[attr];
  }
}