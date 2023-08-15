import React from "react";
import styled from "styled-components";

function ArrowUp() {
	return (
		<>
			<ObjectIntro>
				<Text>Наберите в поиск интересующий вас отдел</Text>
			</ObjectIntro>
			<Arrow>
				<ArrowBody />
			</Arrow>
		</>
	);
}

const Arrow = styled.div`
	position: fixed;
	/* bottom: 0; */
	left: 47rem;
	width: 5%;
	height: 10rem;
	transform: scale(1, -1);
`;
const ArrowBody = styled.div`
	width: 100%;
	height: 95%;
	margin-left: 11px;
	border-width: 5px 0 0 5px;
	border-style: dashed;
	border-color: ${({ theme }) => theme.colors.main};
	border-top-left-radius: 100%;
	::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		border-width: 20px 15px 0;
		border-style: solid;
		border-color: ${({ theme }) => theme.colors.main} transparent transparent;
	}
`;

const ObjectIntro = styled.div`
	position: absolute;
	top: 15rem;
	left: 56rem;
	/* transform: translateY(-50%); */
	width: 300px;
	/* padding-left: 20px; */
	color: ${({ theme }) => theme.colors.main};
`;

const Text = styled.p`
	line-height: 1.5;
`;

export default ArrowUp;
