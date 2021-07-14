import { Component } from "@/core/Component"

export class Button extends Component {
	static className = "rootButton"

  constructor($root, options) {
    super($root, {
      name: 'Button',
      listeners: ['click', 'mousedown'],
      ...options
    })
  }

  onMousedown(event) {
    const top = $root.getBoundingClientRect().top + document.body.scrollTop
		const left = $root.getBoundingClientRect().left + document.body.scrollLeft

		const relX = e.pageX - left
		const relY = e.pageY - top

		const spanEl = $root.getElementsByTagName("span")[0]
		spanEl.style.top = relY + "px"
		spanEl.style.left = relX + "px"
  }
  
  onClick(event) {
    this.onClick(event)
  }
}
