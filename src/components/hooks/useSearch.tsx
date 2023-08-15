import agent from "components/api/rest";
import useDebounce from "components/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { UnitsProps } from "types/branchTypes";

function useSearch() {
	const [inputVal, setFindUnits] = useState("");
	const [isDataFetching, setDataFetching] = useState(false);
	const [searchData, setSearchData] = useState<UnitsProps | null>(null);
	const input = useDebounce(inputVal, 500);
	const getSearchData = async () => {
		setDataFetching(true);
		setSearchData(await agent.BranchesList.searchByTerm(input));
		setDataFetching(false);
	};
	useEffect(() => {
		if (input.length > 4) {
			getSearchData();
		}
	}, [input]);
	return {
		inputVal,
		searchData,
		setFindUnits,
		isDataFetching,
		getSearchData,
	};
}

export default useSearch;
