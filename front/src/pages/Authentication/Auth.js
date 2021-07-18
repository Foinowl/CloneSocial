import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import Logo from '../../components/Logo'
import Button from "../../components/Button"

import RegisterModal from "./components/RegisterModal"
import LoginModal from "./components/LoginModal"

import "./Auth.scss"


export const Auth = ({ history }) => {
	
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

	const [registerModalActive, setRegisterModalActive] = useState(false)
	const [loginModalActive, setLoginModalActive] = useState(false)


	
	useEffect(() => {
		console.log(isLoggedIn);
		if (isLoggedIn) {
			<Redirect to="/" />
		}
	}, [history, isLoggedIn])
	

  return (
		<div className="auth-container">
			<div className="auth-container__left">
				<Logo cls="logo logo--big" />

				<ul className="auth-container__left-about">
					<li className="auth-container__left-item">
						<h6 className="auth-container__left-title">
							<svg
								class="svg-el auth-container__left-title-el"
								focusable="false"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
							</svg>
							Читайте о том, что вам интересно.
						</h6>
					</li>

					<li className="auth-container__left-item">
						<h6 className="auth-container__left-title">
							<svg
								class="svg-el auth-container__left-title-el"
								focusable="false"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path>
							</svg>
							Узнайте, о чем говорят в мире.
						</h6>
					</li>

					<li className="auth-container__left-item">
						<h6 className="auth-container__left-title">
							<svg
								class="svg-el auth-container__left-title-el"
								focusable="false"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M20 17.17L18.83 16H4V4h16v13.17zM20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"></path>
							</svg>
							Присоединяйтесь к общению.
						</h6>
					</li>
				</ul>
			</div>

			<div className="auth-container__right">
				<div className="auth-container__right-loginSide">
					<Logo cls="logo frontSvg"></Logo>

					<h4>Узнайте, что происходит в мире прямо сейчас</h4>

					<p>Присоединяйтесь к Твиттеру прямо сейчас!</p>

					<br />

					<Button
						text="Зарегистрироваться"
						type="primary"
						cls="fullWidth mb-20"
						onClick={() => setRegisterModalActive(true)}
					/>

					<Button
						text="Войти"
						type="outlined"
						cls="fullWidth"
						onClick={() => setLoginModalActive(true)}
					/>

					{registerModalActive && (
						<RegisterModal
							history={history}
							active={registerModalActive}
							setActive={setRegisterModalActive}
						></RegisterModal>
					)}

					{loginModalActive && (
						<LoginModal
							history={history}
							active={loginModalActive}
							setActive={setLoginModalActive}
						></LoginModal>
					)}
				</div>
			</div>
		</div>
	)
}
