import React from "react";
import { BranchesDataProps } from "types/branchTypes";
import { BranchCard, BranchWrapper, Chevron } from "./components";
import chevron from "assets/chevron.svg";

interface Props {
	branch: BranchesDataProps;
	onClick: (branch: BranchesDataProps) => void;
	active: boolean;
	index?: number;
	setActiveRef?: any;
	showLine?: boolean;
}

function BranchesCard({
	branch,
	onClick,
	active,
	index,
	setActiveRef,
	showLine = false,
}: Props) {
	return (
		<BranchWrapper
			onClick={() => {
				onClick(branch);
			}}
			isActive={active}
			showLine={showLine}
			index={index}
		>
			<BranchCard isActive={active} ref={active ? setActiveRef : null}>
				{branch.name} <Chevron isActive={active} src={chevron} />
			</BranchCard>
		</BranchWrapper>
	);
}

export default BranchesCard;
