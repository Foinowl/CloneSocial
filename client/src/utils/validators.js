var emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/


export class Validators {
	static required(value = "") {
		return value && value.trim()
	}

	static minLength(length) {
		return (value) => {
			return value.length >= length
		}
	}


	static emailRequired(value = "") {
		return new RegExp(emailRegExp).test(value)
	}
}
