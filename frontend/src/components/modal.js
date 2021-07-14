import { Component } from "@/core/Component"

export class Modal extends Component {
  static className = "modal"

	constructor($root, options) {
		super($root, {
			name: "Modal",
			listeners: ["click"],
			...options,
    })
	}

	onClick(event) {
		event.preventDefault()
	}
}
