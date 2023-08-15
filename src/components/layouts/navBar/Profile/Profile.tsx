import React, { useState } from "react";
import picture from "assets/profilePicture.png";
import {
	ProfileWrapper,
	Image,
	InfoWrapper,
	FullName,
	PositionName,
} from "./components";
// import PersonInfoModal from "components/modules/Core/components/Modal/PersonInfoModal";

function Profile() {
	const [openModal, setOpenModal] = useState(false);
	return (
		<ProfileWrapper onClick={() => setOpenModal(true)}>
			{/* {openModal && (
				 <PersonInfoModal
				 	onClick={(e: any) => {
				 		e.stopPropagation();
				 		setOpenModal(false);
				 	}}
				 /> 
			)} */}
			<Image src={picture} />
			<InfoWrapper>
				<FullName>Азаматов Нариман</FullName>
				<PositionName>Главный Менеджер</PositionName>
			</InfoWrapper>
		</ProfileWrapper>
	);
}

export default Profile;
