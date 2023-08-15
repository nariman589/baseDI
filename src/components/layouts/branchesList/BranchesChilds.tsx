import agent from "components/api/rest";
import { useCustomContext } from "components/hocs/useCustomContext";
import { Title } from "components/pages/mainPage/components";
import { Loader } from "components/ui/Loader";
import React, { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import {
	BranchesDataProps,
	UnitsDataProps,
	UnitsProps,
	unitsProps,
} from "types/branchTypes";
import { Icon } from "../navBar/IconsList/components";
import BranchesCard from "./BranchesCard";
import { BranchesListWrapper, BranchesSppInfoWithWrapper } from "./components";

import pencil from "assets/pencil.svg";
import { Link } from "react-router-dom";
import Descriptions from "./descriptons/Descriptions";

interface Props {
	ParentUnit: BranchesDataProps;
	level: number;
}

function BranchesChilds({ ParentUnit, level }: Props) {
	const [loading, setLoading] = useState(true);
	const [docs, setDocs] = useState<UnitsDataProps | null>(null);
	const [activeUnit, setActiveUnit] = useState<BranchesDataProps | null>(null);
	const [units, setUnits] = useState<UnitsProps | null>(null);
	const focusRef = useRef<HTMLDivElement>(null);

	const { choosenFromSearch, setChoosenFromSearch } = useCustomContext();
	const checkDocs = async () => {
		const { data } = await agent.BranchesList.documentByUnitCode(
			ParentUnit?.code
		);
		const { jDescriptions, regulations } = data;
		if (!jDescriptions?.length && !regulations?.length) return null;
		return data;
	};

	const getUnits = async () => {
		setActiveUnit(null);
		setDocs(null);
		setUnits(await agent.BranchesList.units(ParentUnit?.code));
		setDocs(await checkDocs());
		handleDataFromSearch();
		setLoading(false);
	};

	useLayoutEffect(() => {
		if (focusRef.current)
			focusRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			});
	}, [focusRef.current]);

	const handleDataFromSearch = () => {
		if (choosenFromSearch && choosenFromSearch.data.units.length >= level) {
			setActiveUnit(
				choosenFromSearch.data.units[
					choosenFromSearch.data.units.length - level
				]
			);
		}
	};

	useEffect(() => {
		getUnits();
	}, [ParentUnit]);

	const handleActiveUnit = async (unit: unitsProps) => {
		if (activeUnit?.code == unit.code) {
			setActiveUnit(null);
			setChoosenFromSearch && setChoosenFromSearch(null);
		} else setActiveUnit(unit);
	};
	const handleEditClick = () => {
		setChoosenFromSearch &&
			setChoosenFromSearch({
				code: 0,
				data: {
					jDescriptions: [],
					regulations: [],
					units: [ParentUnit],
				},
				message: "",
			});
	};

	return (
		<>
			<Title>
				{ParentUnit?.name}{" "}
				<Link to="/manage">
					<Icon src={pencil} title="Править" onClick={handleEditClick} />
				</Link>
				{loading && <Loader />}
			</Title>
			<BranchesSppInfoWithWrapper>
				{docs && <Descriptions Descriptions={docs} />}
				<div>
					<BranchesListWrapper ref={focusRef}>
						{units &&
							units.data.units.map((unit) => (
								<BranchesCard
									key={unit.name}
									branch={unit}
									onClick={handleActiveUnit}
									active={activeUnit?.code == unit.code}
								/>
							))}
					</BranchesListWrapper>
				</div>
			</BranchesSppInfoWithWrapper>
			{activeUnit && (
				<BranchesChilds ParentUnit={activeUnit} level={level + 1} />
			)}
		</>
	);
	// {activeUnit && (
	//     <>
	//         <Title>
	//             {activeUnit.name} {loading == 3 && <Loader />}
	//         </Title>

	//         <JDescriptions jDescriptions={docs?.data.jDescriptions} />
	//     </>
	// )}
}

export default BranchesChilds;
