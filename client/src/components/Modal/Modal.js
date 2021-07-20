import React, { useRef } from 'react'
import "./Modal.scss"
import Button from '../Button'

const Modal = ({ active, setActive, auth, children }) => {
	const isAuth = auth ? true : false

	const markupDefaults = () => {
		return (
			<>
				{children}
			</>
		)
	}

	return (
		<div
			className={active ? "modal active" : "modal"}
			onClick={() => setActive(false)}
		>
			<div
				className={active ? "modal__content active" : "modal__content"}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal__content-top">
					<div className="container-close" onClick={() => setActive(false)}>
						<svg
							viewBox="0 0 24 24"
							aria-hidden="true"
							className="container-close__svg"
						>
							<path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
						</svg>
					</div>
				</div>

				<div className="modal__content-bottom">
					{isAuth ? children : markupDefaults()}
				</div>
			</div>
		</div>
	)
}

export default Modal