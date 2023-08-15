import React from "react";
import logo from "assets/logo.svg";
import { Logo, SideBarWrapper } from "./components";

interface Props {
	hideSideBar: boolean;
}

function SideBar({ hideSideBar }: Props) {
	return (
		<SideBarWrapper>
			<Logo src={logo} alt="Логотип" />
		</SideBarWrapper>
	);
}

export default SideBar;
