

export class AuthPage {
	constructor() {
		this.$placeholder = document.querySelector("#app")

		const root = await this.page.getRoot()

		this.$placeholder.html = ""
		this.$placeholder.append(root)

		this.afterRender()
	}

  getRoot() { }
  
  init() {
    
  }

	afterRender() {
		this.init()
	}
}