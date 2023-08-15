import {
	jDescriptionsProps,
	regulationsProps,
	UnitsDataProps,
} from "types/branchTypes";
import { DescriptionsWrapper } from "../components";

import JDescriptions from "./JDescriptions/JDescriptions";
import Regulations from "./Regulations/Regulations";
interface Props {
	Descriptions: UnitsDataProps | null;
	enableEdit?: boolean;
	isRow?: boolean;
	updateData?: any;
}

export interface DocsProps {
	archiveRegulations: GrouppedArrayPropsReg;
	activeRegulations: GrouppedArrayPropsReg;
	archiveDescriptions: GrouppedArrayPropsDesc;
	activeDescriptions: GrouppedArrayPropsDesc;
}

export interface groupDescr {
	groupName: string;
	childrens: jDescriptionsProps[];
}
export interface groupReg {
	groupName: string;
	childrens: regulationsProps[];
}

export interface GrouppedArrayPropsReg {
	groups: groupReg[];
}

export interface GrouppedArrayPropsDesc {
	groups: groupDescr[];
}

function Descriptions({
	Descriptions,
	enableEdit = false,
	isRow = false,
	updateData,
}: Props) {
	const parseDocsByArchive = (
		data: UnitsDataProps | null
	): DocsProps | null => {
		if (!data) return null;
		//0-archive 1-active 2-deleted
		const archiveRegulations = sortByGroups<GrouppedArrayPropsReg>(
			data.regulations.filter((reg) => reg.status === 0),
			"REGULATION"
		);
		const activeRegulations = sortByGroups<GrouppedArrayPropsReg>(
			data.regulations.filter((reg) => reg.status === 1),
			"REGULATION"
		);
		const archiveDescriptions = sortByGroups<GrouppedArrayPropsDesc>(
			data.jDescriptions.filter((descr) => descr.status === 0),
			"DESCRIPTION"
		);
		const activeDescriptions = sortByGroups<GrouppedArrayPropsDesc>(
			data.jDescriptions.filter((descr) => descr.status === 1),
			"DESCRIPTION"
		);

		return {
			archiveRegulations,
			activeRegulations,
			archiveDescriptions,
			activeDescriptions,
		};
	};

	const sortByGroups = <T,>(
		data: any,
		type: "DESCRIPTION" | "REGULATION"
	): T => {
		return data?.reduce(
			(acc: any, elem: any) => {
				if (acc.groups.length === 0) {
					acc.groups.push({
						groupName:
							type === "DESCRIPTION" ? elem.positionName : elem.unitName,
						childrens: [elem],
					});

					return acc;
				}
				const existGroup = acc.groups.find(
					(el: any) =>
						el.groupName ===
						(type === "DESCRIPTION" ? elem.positionName : elem.unitName)
				);
				if (!existGroup) {
					acc.groups.push({
						groupName:
							type === "DESCRIPTION" ? elem.positionName : elem.unitName,
						childrens: [elem],
					});

					return acc;
				}
				for (const el of acc.groups) {
					if (
						el.groupName ===
						(type === "DESCRIPTION" ? elem.positionName : elem.unitName)
					) {
						el.childrens.push(elem);
					}
				}
				return acc;
			},
			{
				groups: [],
			}
		);
	};

	const data = parseDocsByArchive(Descriptions);

	return (
		<DescriptionsWrapper isRow={isRow}>
			{(!!data?.activeRegulations.groups?.length ||
				!!data?.archiveRegulations.groups?.length ||
				enableEdit) && (
				<Regulations
					enableEdit={enableEdit}
					Descriptions={data}
					updateData={updateData}
				/>
			)}
			{(!!data?.activeDescriptions.groups?.length ||
				!!data?.archiveDescriptions.groups?.length ||
				enableEdit) && (
				<JDescriptions
					enableEdit={enableEdit}
					Descriptions={data}
					updateData={updateData}
				/>
			)}
		</DescriptionsWrapper>
	);
}

export default Descriptions;
