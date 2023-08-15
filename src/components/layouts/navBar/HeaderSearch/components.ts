import styled from "styled-components";

export const SearchWrapper = styled.div`
	/* position: relative;
	display: flex;
	align-items: center;
	border-radius: 10px;
	width: 30vw;
	background-color: ${({ theme }) => theme.colors.grey}; */
`;
interface ActiveProps {
	isActive: boolean;
}
export const InputWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 10px;
	width: 30vw;
	background-color: ${({ theme }) => theme.colors.grey};
`;
export const Input = styled.input<ActiveProps>`
	width: 100%;
	border-radius: 10px;
	border-bottom-left-radius: ${({ isActive }) => (isActive ? 0 : "10px")};
	border-bottom-right-radius: ${({ isActive }) => (isActive ? 0 : "10px")};
	border: none;
	outline: none;
	color: ${({ theme }) => theme.colors.fontColor};
	height: 2.375rem;
	background-color: inherit;
	padding-left: 1rem;
	transition: 0.2s all;
`;
export const PositionSearch = styled.div`
	position: relative;
	z-index: 10;
`;
export const SearchDataWrapper = styled.ul`
	position: absolute;
	top: 0;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-height: 30rem;
	width: 97%;
	overflow-y: auto;
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: ${({ theme }) => theme.boxShadow};
	border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
	border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
`;
export const SearchDataElement = styled.li`
	color: ${({ theme }) => theme.colors.fontColor};
	cursor: pointer;
	:hover {
		color: ${({ theme }) => theme.colors.main};
	}
`;
export const Loupe = styled.img`
	position: absolute;
	cursor: pointer;
	background-color: inherit;
	background: transparent;
	right: 0.5rem;
	filter: ${({ theme }) =>
		theme.isDarkTheme
			? "invert(100%) sepia(0%) saturate(7488%) hue-rotate(203deg) brightness(104%) contrast(101%)"
			: ""};
`;
