import styled from "styled-components";

export const Header = styled.header`
	background-color: ${({ theme }) => theme.colors.white};
	height: 5.25rem;
	display: flex;
	justify-content: center;
	box-shadow: ${({ theme }) => theme.boxShadow};
	padding-left: 1.25rem;
	padding-right: 1.25rem;
`;

export const HeaderElementsWrapper = styled.ul`
	display: flex;
	list-style: none;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
	width: 100%;
	padding: 0;
`;

export const HeaderElement = styled.li`
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;

export const Logo = styled.img`
	cursor: pointer;
`;
