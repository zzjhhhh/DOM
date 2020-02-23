window.jQuery = function(selectorOrArrayOrTemplate) {
  let elements
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate
  }

  function createElement(string) {
    const container = document.createElement("template")
    container.innerHTML = string.trim()
    return container.content.firstChild
  }

  return {
    jquery: true,
    elements: elements,
    get(index) {
      return elements[index]
    },
    appendTo(node) {
      if (node instanceof Element) {
        this.each(e1 => node.appendChild(e1))
      } else if (node.jquery === true) {
        this.each(e1 => node.get(0).appendChild(e1))
      }
    },
    append(children) {
      if (children instanceof Element) {
        this.get(0).appendChild(children)
      } else if (children instanceof HTMLAllCollection) {
        for (let i = 0; i < children.length; i++) {
          this.get(0).appendChild(children[i])
        }
      } else if (children.jquery === true) {
        children.each(node => this.get(0).appendChild(node))
      }
    },
    find(selector) {
      let arr = []
      for (let i = 0; i < elements.length; i++) {
        arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)))
      }
      arr.old = this // 保存旧的jQuery对象
      return jQuery(arr)
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn(elements[i], i)
      }
      return this
    },
    parent() {
      const arr = []
      this.each(node => {
        if (arr.indexOf(node.parentNode) === -1) {
          arr.push(node.parentNode)
        }
      })
      return jQuery(arr)
    },
    children() {
      const arr = []
      this.each(node => {
        arr.push(...node.children)
      })
      return jQuery(arr)
    },
    // ???
    siblings() {
      const arr = []
      this.each(node => {
        const array = node.parentNode.children
        for (let i = 0; i < array.length; i++) {
          if (array[i] !== node) {
            arr.push(array[i])
          }
        }
      })
      return jQuery(arr)
    },
    index() {
      const arr = []
      this.each(node => {
        const array = node.parentNode.children
        let i
        for (i = 0; i < array.length; i++) {
          if (node === array[i]) {
            break
          }
        }
        arr.push(i)
      })
      return jQuery(arr)
    },
    next() {
      const arr = []
      this.each(node => {
        let cur = node.nextSibling
        while (cur && cur.nodeType === 3) {
          cur = cur.nextSibling
        }
        arr.push(cur)
      })
      return jQuery(arr)
    },
    pre() {
      const arr = []
      this.each(node => {
        let cur = node.previousSibling
        while (cur && cur.nodeType === 3) {
          cur = cur.previousSibling
        }
        arr.push(cur)
      })
      return jQuery(arr)
    },
    print() {
      console.log(elements)
    },
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className)
      }
      return this
    },
    end() {
      return this.old
    },
    old: selectorOrArrayOrTemplate.old
  }
}
