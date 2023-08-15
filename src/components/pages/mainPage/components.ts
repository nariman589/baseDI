import styled from "styled-components";

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	margin: 1.25rem;
`;

export const Title = styled.div`
	font-weight: bold;
	font-size: 1.75rem;
	color: ${({ theme }) => theme.colors.fontColor};
`;

export const ElementsContainer = styled.div`
	padding: 1.625rem 2rem;
	background-color: #ffffff;
	box-shadow: ${({ theme }) => theme.boxShadow};
	border-radius: ${({ theme }) => theme.borderRadius};
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;
