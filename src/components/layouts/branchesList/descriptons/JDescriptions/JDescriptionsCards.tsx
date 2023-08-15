import React, { useState } from "react";
import { groupDescr } from "../Descriptions";
import JDescriptionCard from "./JDescriptionCard";
import ChevronR from "assets/chevronRight.svg";
import { Card, CardTitle, ChevronRight } from "../../components";

interface Props {
	group: groupDescr;
	enableEdit?: boolean;
}

function JDescriptionsCards({ group, enableEdit = false }: Props) {
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
						<JDescriptionCard
							key={child.documentId}
							enableEdit={enableEdit}
							data={child}
						/>
					))}
			</Card>
		</>
	);
}

export default JDescriptionsCards;
