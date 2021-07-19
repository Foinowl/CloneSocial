import React, { Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { logout } from "../../../../store/actions/auth"

import Modal from "../../../../components/Modal"
import updateProfile from "../../../../assets/images/updateProfile.svg"
import "./Navbar.scss"


const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)


	const [showProfileOptions, setShowProfileOptions] = useState(false)
	const [showProfileModal, setShowProfileModal] = useState(false)

	return (
		<Fragment>
			<div className="navbar card-shadow">
				<h2>CHat</h2>

				<div className="navbar__profile">
					<img width="40" height="40" src={user.avatar} alt="Avatar" />
					<p>
						{user.firstName} {user.lastName}
					</p>
					<FontAwesomeIcon
						icon="caret-down"
						className="fa-icon"
						onClick={(e) => {
							setShowProfileOptions(!showProfileOptions)
						}}
					/>

					{console.log(showProfileOptions)}
					{showProfileOptions && (
						<div
							id="wrapper-overflow"
							onClick={() => setShowProfileOptions(!showProfileOptions)}
						>
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
						</div>
					)}

					{showProfileModal && (
						<Modal
							active={showProfileModal}
							setActive={setShowProfileModal}
							auth={false}
						>
							<div className="modal__bottom-image-about--left">
								<img src={updateProfile}></img>
								<span className="m-0">Update profile</span>
							</div>
						</Modal>
					)}
				</div>
			</div>
		</Fragment>
	)
}

export default Navbar