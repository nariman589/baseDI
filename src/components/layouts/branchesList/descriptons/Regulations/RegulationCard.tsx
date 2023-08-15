import { convertDate } from "components/utils/dateConverters";
import React, { useState } from "react";

import ViewIcon from "assets/view.svg";
import CloseViewIcon from "assets/closeView.svg";
import DownloadIcon from "assets/download.svg";
import Pencil from "assets/OrangePencil.svg";

import { regulationsProps } from "types/branchTypes";
import {
	AccordeonList,
	AccordeonListTitle,
	AccordeonListName,
	AccordeonItems,
	AccordeonButtonWrapper,
	AccordeonButton,
	AccordeonBody,
	ApprovedEmployee,
	ApprovedDate,
	Select,
	Option,
	ApprovedStatus,
	AccordeonBodyForStatus,
	StatusBtn,
} from "../../components";
import agent from "components/api/rest";
import { Loader } from "components/ui/Loader";

interface Props {
	data: regulationsProps;
	enableEdit?: boolean;
}

function RegulationCard({ data, enableEdit = false }: Props) {
	const [isActive, setActive] = useState(false);
	const [editStatus, setEditStatus] = useState(false);
	const [documentNewStatus, setDocumentNewStatus] = useState(0);
	const [statusChanging, setStatusChanging] = useState(false);

	const getDocumentStatusName = () => {
		if (data.status === 0) return "Архивный";
		else if (data.status === 1) return "Активный";
		else if (data.status === 2) return "Удаленный";
		return "";
	};

	const getStatusFromName = (name: string) => {
		if (name === "Архивный") return 0;
		else if (name === "Активный") return 1;
		else if (name === "Удаленный") return 2;
		return -1;
	};

	const [documentStatusName, setDocumentStatusName] = useState(
		getDocumentStatusName()
	);

	const handleDownload = async (url: string) => {
		const link = document.createElement("a");

		link.setAttribute("href", url);
		link.style.display = "none";

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const name = e.target.value;
		setDocumentStatusName(name);
		setDocumentNewStatus(getStatusFromName(name));
	};

	const handleSaveStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStatusChanging(true);
		await agent.BranchesList.changeDocumentStatus({
			documentId: data.documentId,
			processType: "REGULATION",
			status: documentNewStatus,
		});
		setStatusChanging(false);
	};

	return (
		<AccordeonList>
			<AccordeonListTitle isActive={isActive || editStatus}>
				<AccordeonListName>
					{data?.documentName || "(Название документа отсутствует)"}
				</AccordeonListName>
				<AccordeonItems>
					{enableEdit && (
						<AccordeonButtonWrapper
							onClick={() => {
								setEditStatus((v) => !v);
								setActive(false);
							}}
						>
							<AccordeonButton src={Pencil} />
						</AccordeonButtonWrapper>
					)}
					<AccordeonButtonWrapper onClick={() => handleDownload(data.link)}>
						<AccordeonButton src={DownloadIcon} />
					</AccordeonButtonWrapper>
					<AccordeonButtonWrapper
						onClick={() => {
							setActive((v) => !v);
							setEditStatus(false);
						}}
					>
						<AccordeonButton src={isActive ? CloseViewIcon : ViewIcon} />
					</AccordeonButtonWrapper>
				</AccordeonItems>
			</AccordeonListTitle>
			{isActive && (
				<AccordeonBody>
					<ApprovedEmployee>
						Утвердил(а):{" "}
						{`${data?.approverFullName} (${data?.approverPositionName})`}
					</ApprovedEmployee>
					<ApprovedDate>
						Дата утверждения: {convertDate(data?.approvedDate)}
					</ApprovedDate>
				</AccordeonBody>
			)}
			{editStatus && (
				<AccordeonBodyForStatus>
					<ApprovedStatus>
						Статус документа:
						<Select value={documentStatusName} onChange={handleStatusChange}>
							<Option>Активный</Option>
							<Option>Архивный</Option>
							<Option>Удаленный</Option>
						</Select>
						<StatusBtn disabled={statusChanging} onClick={handleSaveStatus}>
							{statusChanging && <Loader />}Сохранить
						</StatusBtn>
					</ApprovedStatus>
				</AccordeonBodyForStatus>
			)}
		</AccordeonList>
	);
}

export default RegulationCard;
