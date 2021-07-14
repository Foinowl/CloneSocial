import { DomListener } from "@core/DomListener"


export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ""

		this.prepare()
	}

	prepare() {}

	toHTML() {
		return ""
	}

	// Инициализируем компонент
	// Добавляем DOM слушателей
	init() {
		this.initDOMListeners()
	}

	// Удаляем компонент
	// Чистим слушатели
	destroy() {
		this.removeDOMListeners()
	}
}
