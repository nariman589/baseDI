import React, { useLayoutEffect, useRef, useState } from "react";
import {
	JDescription,
	AccordeonTitle,
	AccordeonListWrapper,
	ShowArchiveButton,
} from "../../components";
import { DocsProps } from "../Descriptions";
import DescriptionsEditter from "../DescriptionsEditter";
import RegulationCards from "./RegulationCards";

interface Props {
	Descriptions: DocsProps | null;
	enableEdit?: boolean;
	updateData?: any;
}

function Regulations({ Descriptions, enableEdit = false, updateData }: Props) {
	const focusRef = useRef<HTMLDivElement>(null);
	const [showArchive, setShowArchive] = useState(true);

	useLayoutEffect(() => {
		if (focusRef.current)
			focusRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
	}, [focusRef.current]);
	return (
		<JDescription ref={focusRef}>
			<AccordeonTitle isActive={true}>Положение</AccordeonTitle>
			<AccordeonListWrapper isAdminPage={enableEdit}>
				{enableEdit && (
					<DescriptionsEditter
						updateData={updateData}
						processType="Regulation"
					/>
				)}
				{Descriptions?.activeRegulations?.groups?.length
					? Descriptions?.activeRegulations?.groups.map((group) => (
							<RegulationCards enableEdit={enableEdit} group={group} />
					  ))
					: "Нет актуальных документов"}
				{!!Descriptions?.archiveRegulations?.groups?.length && (
					<ShowArchiveButton onClick={() => setShowArchive((v) => !v)}>
						{showArchive
							? "Скрыть архивные документы"
							: "Показать архивные документы"}
					</ShowArchiveButton>
				)}
				{showArchive &&
					Descriptions?.archiveRegulations?.groups?.map((group) => (
						<RegulationCards enableEdit={enableEdit} group={group} />
					))}
			</AccordeonListWrapper>
		</JDescription>
	);
}

export default Regulations;
