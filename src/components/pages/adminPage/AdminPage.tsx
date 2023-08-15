import agent from "components/api/rest";
import { useCustomContext } from "components/hocs/useCustomContext";
import { BranchesSppInfoWithWrapper } from "components/layouts/branchesList/components";
import Descriptions from "components/layouts/branchesList/descriptons/Descriptions";
import ArrowUp from "components/ui/ArrowUp";
import { Loader } from "components/ui/Loader";
import React, { useEffect, useState } from "react";
import { UnitsDataProps } from "types/branchTypes";
import { Title } from "../mainPage/components";

function AdminPage() {
	const { choosenFromSearch } = useCustomContext();
	const [loading, setLoading] = useState(false);
	const [docs, setDocs] = useState<UnitsDataProps | null>(null);
	const activeUnit = choosenFromSearch?.data.units[0];

	const checkDocs = async () => {
		if (!activeUnit) return null;
		const { data } = await agent.BranchesList.documentByUnitCode(
			activeUnit.code
		);
		const { jDescriptions, regulations } = data;
		if (!jDescriptions?.length && !regulations?.length) return null;
		return data;
	};

	const getDocs = async () => {
		if (activeUnit) {
			setLoading(true);
			setDocs(await checkDocs());
			setLoading(false);
		}
	};

	useEffect(() => {
		getDocs();
	}, [activeUnit]);

	if (!activeUnit)
		return (
			<>
				<ArrowUp />
			</>
		);
	return (
		<>
			<Title>
				{activeUnit?.name} {loading && <Loader />}
			</Title>
			<BranchesSppInfoWithWrapper>
				<Descriptions
					isRow
					enableEdit
					Descriptions={docs}
					updateData={getDocs}
				/>
			</BranchesSppInfoWithWrapper>
		</>
	);
}

export default AdminPage;
