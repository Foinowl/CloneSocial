import React, { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import Input from '../../../components/Input/Input'

import MonthSelect from '../../../components/SelectDate/MonthSelect'
import YearSelect from "../../../components/SelectDate/YearSelect"
import DaySelect from "../../../components/SelectDate/DaySelect"


import { useDispatch } from "react-redux"
import { register } from "../../../store/actions/auth"


import { Validators } from '../../../utils/validators'

import "./AuthModal.scss"


const RegisterModal = ({ active, setActive, history }) => {
	const dispatch = useDispatch()

	const [days, setDays] = useState("")
	const [years, setYears] = useState("")
	const [months, setMonths] = useState("")

	const [formValid, setFormValid] = useState(false)
	const [selectValid, setSelectValid] = useState(false)

	const [stateControls, setControls] = useState({
		firstName: {
			value: "",
			type: "text",
			errorMessage: "Введите имя",
			label: "Имя",
			valid: false,
			touched: false,
			validation: {
				required: Validators.required,
				minLength: Validators.minLength(1),
			},
		},
		lastName: {
			value: "",
			type: "text",
			errorMessage: "Введите фамилию",
			label: "Фамилия",
			valid: false,
			touched: false,
			validation: {
				required: Validators.required,
				minLength: Validators.minLength(1),
			},
		},
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

	useEffect(() => {
		setSelectValid(months && days && years)
	}, [months, days, years])


	const submitForm = (e) => {
		e.preventDefault()

		const dateBirth = new Date(years, months - 1, days)
		const data = Object.keys(stateControls).map((el) => {
			const valueEl = stateControls[el].value
			return {[el]:valueEl}
		}).reduce((prevVal, curr) => {
			return prevVal = {...prevVal, ...curr}
		}, {})

		dispatch(register({ ...data, dateBirth }, history))
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

		// setControls({ ...stateControls, ...{ [name]: control } })
		setControls((prevState) => ({
			...prevState,
			[name]: control,
		}))
	}

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
						<span>Создайте учетную запись</span>
					</div>
					<form className="auth__form">
						{renderInputs()}

						<div className="auth__select">
							<div className="auth__item">
								<span>Месяц</span>
								<MonthSelect
									className="months"
									value={months}
									onChange={(v) => {
										setMonths(v)
									}}
								/>
								<label></label>
							</div>

							<div className="auth__item">
								<span>День</span>
								<DaySelect
									className="days"
									y={years}
									m={months}
									value={days}
									onChange={(v) => {
										setDays(v)
									}}
								/>
								<label></label>
							</div>
							<div className="auth__item">
								<YearSelect
									className="years"
									value={years}
									start={new Date().getFullYear() - 125}
									end={new Date().getFullYear()}
									onChange={(v) => {
										setYears(v)
									}}
								/>
								<span>Год</span>
								<label></label>
							</div>
						</div>

						<Button
							text="Зарегистрироваться"
							type="primary"
							cls="fullWidth"
							onClick={submitForm}
							disabled={!formValid || !selectValid}
						/>
					</form>
				</div>
			</div>
		</Modal>
	)
}


export default RegisterModal;