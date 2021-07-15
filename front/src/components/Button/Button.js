import React from 'react'
import './Button.scss'

const Button = (props) => {


	const { text, type, clickHandler, cls } = props
	

	const parentRef = React.useRef()
	const currentRef = React.useRef()

 	const hadlerMouse = (event) => {
		event.preventDefault()

			const parent = parentRef.current.getBoundingClientRect()
			
			const element = event

			const relX = element.pageX - parent.x
			const relY = element.pageY - parent.y

			currentRef.current.style.top = relY + "px"
			currentRef.current.style.left = relX + "px"
	}

	return (
		<button
			// onClick={() => clickHandler()}
			onMouseDown={hadlerMouse}
			type="button"
			className={`${"rootButton"} ${
				type === "primary" ? "inLinedPrimary" : "outlinedPrimary"
			} ${cls}`}
			ref={parentRef}
		>
			{text}
			<span ref={currentRef}></span>
		</button>
	)
}

export default Button