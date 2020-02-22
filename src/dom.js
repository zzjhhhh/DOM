window.dom = {
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  }
}

// Create node
dom.create = function(string) {
  const container = document.createElement("div")
  container.innerHTML = string
  return container.children[0]
}
// Create siblings
dom.before = function(newNode, node) {
  node.parentNode.insertBefore(newNode, node)
}
dom.after = function(newNode, node) {
  node.parentNode.insertBefore(newNode, node.nextSibling)
}
// append child
dom.append = function(node, parent) {
  parent.appendChild(node)
}
// append parent
dom.wrap = function(parent, node) {
  dom.before(parent, node)
  dom.append(node, parent)
}

dom.remove = function(node) {
  node.parentNode.removeChild(node)
  return node
}

dom.empty = function(node) {
  // node.childNodes
  const { childNodes } = node
  const arr = []
  let cur = node.firstChild
  while (cur) {
    arr.push(dom.remove(cur))
    cur = node.firstChild
  }
  return arr
}

dom.attr = function(node, attrName, value) {
  if (arguments.length === 3) {
    node.setAttribute(attrName, value)
  } else if (arguments.length === 2) {
    return node.getAttribute(attrName)
  }
}

dom.text = function(node, string) {
  if (arguments.length === 2) {
    if ("innerText" in node) {
      node.innerText = string // ie
    } else {
      node.textContent = string // Firefox / Chrome
    }
  } else if (arguments.length === 1) {
    if ("innerText" in node) {
      return node.innerText
    } else {
      return node.textContent
    }
  }
}

dom.html = function(node, string) {
  if (arguments.length === 2) {
    node.innerHTML = string // ie
  } else if (arguments.length === 1) {
    return node.innerHTML
  }
}

dom.style = function(node, name, value) {
  if (arguments.length === 3) {
    // dom.style(div, 'color', 'red')
    node.style[name] = value
  } else if (arguments.length === 2) {
    if (typeof name === "string") {
      // dom.style(div, 'color')
      return node.style[name]
    } else if (name instanceof Object) {
      // dom.style(div, {color: 'red'})
      for (let key in name) {
        node.style[key] = name[key]
      }
    }
  }
}

dom.on = function(node, eventName, fn) {
  node.addEventListener(eventName, fn)
}

dom.off = function(node, eventName, fn) {
  node.removeEventListener(eventName, fn)
}

dom.find = function(selector, scope) {
  return (scope || document).querySelectorAll(selector)
}

dom.parent = function(node) {
  return node.parentNode
}
dom.children = function(node) {
  return node.children
}
dom.siblings = function(node) {
  // children 是伪数组
  return Array.from(node.parentNode.children).filter(n => n !== node)
}

dom.next = function(node) {
  let x = node.nextSibling
  while (x && x.nodeType === 3) {
    x = x.nextSibling
  }
  return x
}

dom.previous = function(node) {
  let x = node.previousSibling
  while (x && x.nodeType === 3) {
    x = x.previousSibling
  }
  return x
}

dom.each = function(nodeList, fn) {
  for (let i = 0; i < nodeList.length; i++) {
    fn(nodeList[i])
  }
}

dom.index = function(node) {
  const childList = dom.children(node.parentNode)
  let i
  for (i = 0; i < childList.length; i++) {
    if (childList[i] === node) {
      break
    }
  }
  return i
}
