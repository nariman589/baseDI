import React, { RefObject } from "react";
import arrowUp from "assets/arrowUp.svg";
import styled, { keyframes } from "styled-components";

interface Props {
	targetRef: RefObject<HTMLDivElement>;
}

function ToTop({ targetRef }: Props) {
	const handleClick = () => {
		if (targetRef.current)
			targetRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest",
			});
	};
	return <ToTopIcon src={arrowUp} alt="На верх" onClick={handleClick} />;
}

export const pulseAnimation = keyframes`
    0% {
        transform: scale(1)
    } 50% {
        transform: scale(1.15)
    }
`;

const ToTopIcon = styled.img`
	position: fixed;
	right: 2rem;
	bottom: 2rem;
	width: 1.25rem;
	background-color: ${({ theme }) => theme.colors.main};
	border: 1px solid ${({ theme }) => theme.colors.main};
	color: white;
	padding: 0.5rem;
	border-radius: 3rem;
	cursor: pointer;
	/* animation: ${pulseAnimation} infinite 5s linear; */
`;

export default ToTop;
