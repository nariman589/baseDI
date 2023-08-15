import styled, { keyframes } from "styled-components";

export const BranchesListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	/* outline: none; */
	/* transition: 0.2s all; */
`;

interface isActive {
	isActive?: boolean;
}

const inOutAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const BranchCard = styled.div<isActive>`
	position: relative;
	padding: 1.25rem;
	display: flex;
	gap: 0.3rem;
	width: 18rem;
	height: 1.8rem;
	align-items: center;
	font-weight: 500;
	font-size: 0.85em;
	justify-content: space-between;
	color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.black)};
	background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.main : theme.colors.grey};
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
	border-bottom-left-radius: inherit;
	/* border-bottom-left-radius: ${({ isActive }) =>
		isActive ? "none" : "inherit"}; */
	border-bottom-right-radius: inherit;
	/* border-bottom-right-radius: ${({ isActive }) =>
		isActive ? "none" : "inherit"}; */
	/* transition: 0.2s; */
	animation: ${inOutAnimation} 0.2s;
`;

export const Chevron = styled.img<isActive>`
	width: 1rem;
	height: 1rem;
	padding: 5px;
	border-radius: 50px;
	background-color: white;
	transition: 0.2s;
	transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
`;

interface BranchWrapperProps {
	showLine?: boolean;
	isActive?: boolean;
	index?: number;
}

export const BranchWrapper = styled.div<BranchWrapperProps>`
	position: relative;
	border-radius: ${({ theme }) => theme.borderRadius};
	display: flex;
	flex-direction: row;
	cursor: pointer;
	${({ isActive, index, showLine }) => {
		if (isActive && showLine) {
			return `&:after {
            position: absolute;
            left: 100%;
            top: 50%;
            border-bottom: 2px dashed orange;
            border-bottom-right-radius: 2rem;
            width: 100%;
            content: "";
        }
        ${
					index == 2 &&
					`&:before {
            position: absolute;
            right: 100%;
            top: 50%;
            border-bottom: 2px dashed orange;
            border-bottom-right-radius: 2rem;
            width: 30%;
            content: "";
        }`
				}
        `;
		}
	}}
`;

interface descr {
	isRow?: boolean;
}

export const DescriptionsWrapper = styled.div<descr>`
	display: flex;
	flex-direction: ${({ isRow }) => (isRow ? "row" : "column")};
	flex-wrap: wrap;
	gap: 1rem;
	transition: 0.2s all;
`;

export const JDescription = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: ${({ theme }) => theme.boxShadow};
	/* border-radius: ${({ theme }) => theme.borderRadius}; */
	display: flex;

	flex-direction: column;
`;

interface AnimatedColumnViewProps {
	index: number;
}

export const AnimatedColumnView = styled.div<AnimatedColumnViewProps>`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	align-items: center;
	${({ index }) => {
		if (index == 1) return "align-items: start;";
		else if (index == 2) return "align-items: center;";
		else if (index == 3) return "align-items: end;";
	}}
`;

export const TreeViewWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`;

interface AccordeonListI {
	isActive: boolean;
}

export const AccordeonList = styled.div``;

export const AccordeonListTitle = styled.div<AccordeonListI>`
	display: grid;
	grid-template-columns: 70% 26%;
	gap: 4%;
	text-decoration: none;
	color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.black)};
	font-size: 0.8rem;
	padding: 0.75rem;
	background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.main : theme.colors.grey};
	/* border-radius: ${({ theme }) => theme.borderRadius}; */
	/* border-bottom-left-radius: ${({ isActive, theme }) =>
		isActive ? "0" : theme.borderRadius};
	border-bottom-right-radius: ${({ isActive, theme }) =>
		isActive ? "0" : theme.borderRadius}; */
	transition: 0.2s all;
`;

export const AccordeonTitle = styled.div<AccordeonListI>`
	padding: 1.25rem;
	text-align: center;
	font-weight: 600;
	font-size:1.2rem;
    height: 1.8rem
	justify-content: space-between;
	color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.black)};
	background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.main : theme.colors.grey};
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
	
	transition: 0.2s;
`;

interface AccordenListWrapperProps {
	isAdminPage?: boolean;
}

export const AccordeonListWrapper = styled.div<AccordenListWrapperProps>`
	display: flex;
	flex-direction: column;
	gap: 0.75em;
	width: ${({ isAdminPage }) => (isAdminPage ? "26rem" : "18rem")};
	min-height: 10rem;
	padding: 0.75rem;
	color: ${({ theme }) => theme.colors.fontColor};
	word-wrap: break-all;
	border-bottom-left-radius: inherit;
	border-bottom-right-radius: inherit;
`;

export const AccordeonBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.5rem;
	gap: 0.5rem;
	color: ${({ theme }) => theme.colors.fontColor};
	background-color: ${({ theme }) => theme.colors.grey};
	padding: 0.75rem;
	border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
	border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
	transition: 0.2s all;
`;

export const AccordeonBodyForStatus = styled(AccordeonBody)`
	flex-direction: row;
`;

export const StatusBtn = styled.button`
	border: none;
	background-color: ${({ theme }) => theme.colors.main};
	color: white;
	padding: 0.4rem;
	font-family: inherit;
	cursor: pointer;
`;

export const BranchesSppInfoWithWrapper = styled.div`
	display: flex;
	gap: 1rem;
`;

export const AccordeonListName = styled.div`
	word-wrap: break-all;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
`;

export const AccordeonItems = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

export const AccordeonButtonWrapper = styled.div`
	width: 0.8rem;
	height: 0.8rem;
	padding: 0.5rem;
	background: cover;
	background-color: white;
	border-radius: 3rem;
	cursor: pointer;
	transition: 0.2s all;
	:hover {
		transform: scale(1.1);
	}
`;

export const AccordeonButton = styled.img`
	width: inherit;
	height: inherit;
	transition: 0.2s all;
`;

export const ApprovedEmployee = styled.div`
	font-size: 0.8rem;
`;

export const ApprovedDate = styled.div`
	font-size: 0.75rem;
	font-weight: bold;
`;

export const ApprovedStatus = styled(ApprovedEmployee)`
	display: flex;
	gap: 0.5rem;
`;

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.colors.fontColor};
	/* cursor: pointer; */
`;

export const CardTitle = styled.div<isActive>`
	display: flex;
	justify-content: space-between;
	padding: 0.75rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
	background-color: ${({ theme }) =>
		theme.isDarkTheme ? theme.colors.main : "white"};
`;

export const ChevronRight = styled.img<isActive>`
	width: 1rem;
	height: 1rem;
	padding: 0.5rem;
	background-color: white;
	border-radius: 3rem;
	transform: ${({ isActive }) => (isActive ? "rotate(90deg)" : "")};
	transition: 0.2s all;
`;

export const ShowArchiveButton = styled.div`
	color: ${({ theme }) => theme.colors.fontColor};
	font-weight: bold;
	cursor: pointer;
	:hover {
		color: ${({ theme }) => theme.colors.main};
	}
`;

export const EditBtn = styled.button<isActive>`
	padding: 0.8rem;
	color: ${({ theme, isActive }) =>
		isActive ? "white" : theme.colors.fontColor};
	border: none;
	background-color: ${({ theme, isActive }) =>
		isActive ? theme.colors.main : theme.colors.grey};
	font-family: inherit;
	cursor: pointer;
	transition: 0.2s all;
`;

export const Input = styled.input`
	outline: none;
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
	color: ${({ theme }) => theme.colors.fontColor};
	background-color: ${({ theme }) => theme.colors.white};
`;

export const CancelBtn = styled.button`
	width: 40%;
	padding: 0.6rem;
	border: none;
	font-family: inherit;
	cursor: pointer;
	transition: 0.2s all;
`;

export const Btns = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const FormBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const Select = styled.select``;

export const Option = styled.option``;
