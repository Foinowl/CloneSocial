import React, { useEffect, useRef } from "react"
import "./Input.scss"

function isInvalid({ valid, touched, shouldValidate }) {
	return !valid && shouldValidate && touched
}

const Input = (props) => {
	const inputType = props.type || "text"
  const htmlFor = `${inputType}-${Math.random()}`
  const refBlock = useRef()
  const refSpan = useRef()

  useEffect(() => {

		let debouncer = setTimeout(() => {
      if (isInvalid(props)) {
        
        refBlock.current.classList.add("input__block--error")
        refSpan.current.innerHTML = props.errorMessage || "Введите верное значение"

      }
    }, 350)

    refBlock.current.classList.remove("input__block--error")
    refSpan.current.innerHTML = ""

		return () => {
      clearTimeout(debouncer)
		}
  }, [props.value])
  

	return (
		<div className={`input__block`} ref={refBlock}>
			<input
				name={props.name}
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
				required
				tabIndex="0"
			/>
      <label htmlFor="">{props.label}</label>
      
      <span ref={refSpan}></span>
		</div>
	)
}

export default Input
