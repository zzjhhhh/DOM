const div = dom.create("<div>newDiv</div>")
console.log(div)

dom.after(div, test)
const div3 = dom.create('<div id="parent"></div>')
dom.wrap(div3, test)

const nodes = dom.empty(window.empty)
console.log(nodes)

dom.attr(test, "title", "newTitle")

const title = dom.attr(test, "title")
console.log(`title: ${title}`)

dom.text(test, "New Content")

dom.style(test, { border: "1px solid red", color: "blue" })
console.log(dom.style(test, "border"))
dom.style(test, "border", "1px solid green")

dom.class.add(test, "red")
dom.class.add(test, "blue")
dom.class.remove(test, "blue")
console.log(dom.class.has(test, "blue"))

const fn = () => {
  console.log("Clicked!")
}
dom.on(test, "click", fn)
dom.off(test, "click", fn)

const testDiv = dom.find("#test")[0]
console.log(testDiv)

const s2 = dom.find("#s2")[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find("#travel")[0]
dom.each(dom.children(t), n => dom.style(n, "color", "red"))

console.log(dom.index(s2))
