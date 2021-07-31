import React, { Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { logout } from "../../../../store/actions/auth"

import Modal from "../../../../components/Modal"
import Button from "../../../../components/Button"
import Input from "../../../../components/Input/Input"

import { updateProfile } from "../../../../store/actions/auth"

import { Validators } from "../../../../utils/validators"
import updateProfileSvg from "../../../../assets/images/updateProfile.svg"
import "./Navbar.scss"


const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)


	const [showProfileOptions, setShowProfileOptions] = useState(false)
	const [showProfileModal, setShowProfileModal] = useState(false)


		const [formValid, setFormValid] = useState(true)
	  const [avatar, setAvatar] = useState("")

		const [stateControls, setControls] = useState({
			firstName: {
				value: `${user.firstName}`,
				type: "text",
				typeField: "input",
				errorMessage: "Введите имя",
				label: "Имя",
				valid: true,
				touched: false,
				validation: {
					required: Validators.required,
					minLength: Validators.minLength(1),
				},
			},
			lastName: {
				value: `${user.lastName}`,
				type: "text",
				typeField: "input",
				errorMessage: "Введите фамилию",
				label: "Фамилия",
				valid: true,
				touched: false,
				validation: {
					required: Validators.required,
					minLength: Validators.minLength(1),
				},
			},
			email: {
				value: `${user.email}`,
				type: "text",
				typeField: "input",
				errorMessage: "Введите корректный email",
				label: "Введите почту",
				valid: true,
				touched: false,
				validation: {
					required: Validators.required,
					email: Validators.emailRequired,
				},
			},
			password: {
				value: "",
				type: "password",
				typeField: "input",
				label: "Пароль",
				errorMessage: "Введите пароль",
				valid: true,
				touched: false,
				validation: {
					required: Validators.required,
					minLength: Validators.minLength(4),
				},
			},
			gender: {
				value: `${user.gender}`,
				type: "text",
				typeField: "input",
				label: "Пол",
				errorMessage: "Заполните это поле",
				valid: true,
				touched: false,
				validation: {
					required: Validators.required,
					minLength: Validators.minLength(4),
				},
			},
			infoSelf: {
				value: `${user.infoSelf}`,
				type: "text",
				typeField: "textarea",
				label: "Информация про себя",
				errorMessage: "Заполните это поле",
				valid: true,
				touched: false,
				validation: {},
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
			
			if (!data.password.length) {
				delete data.password
			}

			const form = { ...data, avatar }

			const formData = new FormData()

			for (const key in form) {
				formData.set(key, form[key])
			}

			dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
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

		const renderInputs = () => {
			return Object.keys(stateControls).map((controlName, index) => {
				const control = stateControls[controlName]
				if (control.typeField === "input") {
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
					
				} else {
					return (
						<textarea
							key={controlName + index}
							type={control.type}
							value={control.value}
							name={controlName}
							className="textArea"
							onChange={changeInputs}
						></textarea>
					)
				}
			})
		}


	return (
		<Fragment>
			<div className="navbar card-shadow">
				<h2>CHat</h2>

				{showProfileOptions && (
					<div
						id="wrapper-overflow"
						onClick={() => setShowProfileOptions(false)}
					/>
				)}

				<div
					className="navbar__profile"
					onClick={(e) => {
						setShowProfileOptions(!showProfileOptions)
					}}
				>
					<img width="40" height="40" src={user.avatar} alt="Avatar" />
					<p>
						{user.firstName} {user.lastName}
					</p>
					<FontAwesomeIcon icon="caret-down" className="fa-icon" />

					{showProfileOptions && (
						<div className="options">
							<p
								onClick={() => {
									dispatch(logout())
								}}
							>
								Logout
							</p>
							<p
								onClick={() => {
									setShowProfileModal(true)
								}}
							>
								Update profile
							</p>
						</div>
					)}
				</div>
				{showProfileModal && (
					<Modal
						active={showProfileModal}
						setActive={setShowProfileModal}
						auth={false}
					>
						<div
							className="modal__bottom-image-about--left"
							style={{ marginBottom: "15px" }}
						>
							<img src={updateProfileSvg}></img>
							<span className="m-0">Update profile</span>
						</div>
						<div className="modal__bottom-info">
							<form className="auth__form">
								{renderInputs()}
								<div className="fileContainer">
									<span id="spanFile">Загрузить</span>
									<input
										id="inputFile"
										onChange={(e) => setAvatar(e.target.files[0])}
										type="file"
									/>
								</div>

								<div className="modal__bottom-children">
									<Button
										text="Обновить"
										type="primary"
										cls="fullWidth"
										onClick={submitForm}
										disabled={!formValid}
									/>
								</div>
							</form>
						</div>
					</Modal>
				)}
			</div>
		</Fragment>
	)
}

export default Navbar