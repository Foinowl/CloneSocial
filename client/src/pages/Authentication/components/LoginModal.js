import React, { useEffect, useState } from 'react'

import { useDispatch } from "react-redux"


import Modal from '../../../components/Modal'
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button"


import { Validators } from "../../../utils/validators"


import { login } from "../../../store/actions/auth"


import "./AuthModal.scss"


const LoginModal = ({ active, setActive, history }) => {
	const dispatch = useDispatch()

	const [formValid, setFormValid] = useState(false)

	const [stateControls, setControls] = useState({
		email: {
			value: "",
			type: "text",
			errorMessage: "Введите корректный email",
			label: "Введите почту",
			valid: false,
			touched: false,
			validation: {
				required: Validators.required,
				email: Validators.emailRequired,
			},
		},
		password: {
			value: "",
			type: "password",
			label: "Пароль",
			errorMessage: "Введите пароль",
			valid: false,
			touched: false,
			validation: {
				required: Validators.required,
				minLength: Validators.minLength(4),
			},
		},
	})


	const submitForm = (e) => {
		e.preventDefault()


		const data = Object.keys(stateControls)
			.map((el) => {
				const valueEl = stateControls[el].value
				return { [el]: valueEl }
			})
			.reduce((prevVal, curr) => {
				return (prevVal = { ...prevVal, ...curr })
			}, {})

		dispatch(login({ ...data }, history))
	}

	const validateControl = (value, validation) => {
		if (!validation) {
			return true
		}

		let isValid = true

		Object.keys(validation).forEach((el) => {
			const valid = validation[el]
			isValid = valid(value)
		})

		return isValid
	}

	const changeInputs = (e) => {
		const { name, value } = e.target

		const control = { ...stateControls[name] }

		control.value = value
		control.touched = true
		control.valid = validateControl(value, control.validation)

		let isFormValid = true

		Object.keys(stateControls).forEach((name) => {
			isFormValid = stateControls[name].valid && isFormValid
		})

		setFormValid(isFormValid)

		setControls((prevState) => ({
			...prevState,
			[name]: control,
		}))
	}

	useEffect(() => {
		let isFormValid = true
		Object.keys(stateControls).forEach((name) => {
			isFormValid = stateControls[name].valid && isFormValid
		})

		setFormValid(isFormValid)
	}, [stateControls])

	const renderInputs = () => {
		return Object.keys(stateControls).map((controlName, index) => {
			const control = stateControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					name={controlName}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={changeInputs}
				/>
			)
		})
	}

	return (
		<Modal active={active} setActive={setActive} auth={true}>
			<div className="auth">
				<div className="auth__box">
					<div className="auth__box-create">
						<span>Войдите в учетную запись</span>
					</div>
					<form className="auth__form">
						{renderInputs()}

						<Button
							text="Войти"
							type="primary"
							cls="fullWidth"
							onClick={submitForm}
							disabled={!formValid}
						/>
					</form>
				</div>
			</div>
		</Modal>
	)
}

export default LoginModal