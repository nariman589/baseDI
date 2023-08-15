import agent from "components/api/rest";
import { useState } from "react";
import { useEffect } from "react";
import { BranchesDataProps, BranchesProps } from "types/branchTypes";
import { Loader } from "components/ui/Loader";
import { BranchesListWrapper } from "./components";
import BranchesCard from "./BranchesCard";
import { Title } from "components/pages/mainPage/components";
import BranchesChilds from "./BranchesChilds";
import { useCustomContext } from "components/hocs/useCustomContext";

function BranchesList() {
	const [branches, setBranches] = useState<BranchesProps | null>(null);
	const [loading, setLoading] = useState(true);

	const [activeBranch, setActiveBranch] = useState<BranchesDataProps | null>(
		null
	);
	const { choosenFromSearch, setChoosenFromSearch } = useCustomContext();

	const handleActiveBranch = async (branch: BranchesDataProps) => {
		if (activeBranch?.code == branch?.code) {
			setActiveBranch(null);
			setChoosenFromSearch && setChoosenFromSearch(null);
		} else setActiveBranch(branch);
	};

	const getBranches = async () => {
		const branches = await agent.BranchesList.brances();
		setBranches(branches);
		setLoading(false);
	};

	const setDataFromSearch = () => {
		if (choosenFromSearch) {
			setActiveBranch(
				choosenFromSearch.data.units[choosenFromSearch.data.units.length - 1]
			);
		}
	};

	useEffect(() => {
		getBranches();
	}, []);

	useEffect(() => {
		setDataFromSearch();
	}, [choosenFromSearch]);

	return (
		<>
			<Title>Филиалы {loading && <Loader />}</Title>

			<BranchesListWrapper>
				{branches &&
					branches.data.map((branch) => (
						<BranchesCard
							key={branch.code}
							branch={branch}
							onClick={handleActiveBranch}
							active={activeBranch?.code == branch.code}
						/>
					))}
			</BranchesListWrapper>
			{activeBranch && <BranchesChilds ParentUnit={activeBranch} level={2} />}
		</>
	);
}

export default BranchesList;
