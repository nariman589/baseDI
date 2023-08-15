import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const List = styled.div`
	display: flex;
	list-style: none;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 0;
`;

export const ListElement = styled(NavLink)``;

export const Icon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
	:hover {
		/* filter: contrast(20%); */
		filter: invert(40%) sepia(99%) saturate(1672%) hue-rotate(0deg)
			brightness(101%) contrast(107%);
	}
`;
