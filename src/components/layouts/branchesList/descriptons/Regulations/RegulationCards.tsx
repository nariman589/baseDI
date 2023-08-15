import React, { useState } from "react";
import { groupReg } from "../Descriptions";
import ChevronR from "assets/chevronRight.svg";
import RegulationCard from "./RegulationCard";
import { Card, CardTitle, ChevronRight } from "../../components";

interface Props {
	group: groupReg;
	enableEdit?: boolean;
}

function RegulationCards({ group, enableEdit = false }: Props) {
	const [showChildrens, setShowChildrens] = useState(true);
	return (
		<>
			<Card>
				<CardTitle
					isActive={showChildrens}
					onClick={() => setShowChildrens((v) => !v)}
				>
					{group.groupName}
					<ChevronRight isActive={showChildrens} src={ChevronR} />
				</CardTitle>
				{showChildrens &&
					group.childrens.map((child) => (
						<RegulationCard
							key={child.documentId}
							enableEdit={enableEdit}
							data={child}
						/>
					))}
			</Card>
		</>
	);
}

export default RegulationCards;
