import React, { useLayoutEffect, useRef, useState } from "react";
import {
	JDescription,
	AccordeonTitle,
	AccordeonListWrapper,
	ShowArchiveButton,
} from "../../components";
import { DocsProps } from "../Descriptions";
import DescriptionsEditter from "../DescriptionsEditter";
import JDescriptionsCards from "./JDescriptionsCards";

interface Props {
	Descriptions: DocsProps | null;
	enableEdit?: boolean;
	updateData?: any;
}

function JDescriptions({
	Descriptions,
	enableEdit = false,
	updateData,
}: Props) {
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
			<AccordeonTitle isActive={true}>Должностные инструкции</AccordeonTitle>
			<AccordeonListWrapper isAdminPage={enableEdit}>
				{enableEdit && (
					<DescriptionsEditter
						processType="JDescription"
						updateData={updateData}
					/>
				)}
				{Descriptions?.activeDescriptions?.groups?.length
					? Descriptions?.activeDescriptions?.groups.map((group) => (
							<JDescriptionsCards group={group} />
					  ))
					: "Нет актуальных документов"}
				{!!Descriptions?.archiveDescriptions?.groups?.length && (
					<ShowArchiveButton onClick={() => setShowArchive((v) => !v)}>
						{showArchive
							? "Скрыть архивные документы"
							: "Показать архивные документы"}
					</ShowArchiveButton>
				)}
				{showArchive &&
					Descriptions?.archiveDescriptions?.groups?.map((group) => (
						<JDescriptionsCards group={group} enableEdit={enableEdit} />
					))}
			</AccordeonListWrapper>
		</JDescription>
	);
}

export default JDescriptions;
