import React, { useContext } from "react";
import logo from "assets/logo.svg";
import Profile from "./Profile/Profile";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import { Link } from "react-router-dom";
import {
	Header,
	HeaderElementsWrapper,
	HeaderElement,
	Logo,
} from "./components";
import IconsList from "./IconsList/IconsList";
import { useCustomContext } from "components/hocs/useCustomContext";

function NavBar() {
	const { setChoosenFromSearch } = useCustomContext();
	return (
		<Header>
			<HeaderElementsWrapper>
				<HeaderElement>
					<Link
						onClick={() => setChoosenFromSearch && setChoosenFromSearch(null)}
						to={"/"}
					>
						<Logo src={logo}></Logo>
					</Link>
				</HeaderElement>
				<HeaderElement>
					<HeaderSearch />
				</HeaderElement>

				<HeaderElement>
					<IconsList />
					<Profile />
				</HeaderElement>
			</HeaderElementsWrapper>
		</Header>
	);
}

export default NavBar;
