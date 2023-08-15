import loupe from "assets/loupe.svg";
import {
	SearchWrapper,
	Input,
	Loupe,
	SearchDataWrapper,
	SearchDataElement,
	PositionSearch,
	InputWrapper,
} from "./components";
import useSearch from "components/hooks/useSearch";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Loader } from "components/ui/Loader";
import { useClickOutside } from "components/hocs/clickOutsideHook";
import { unitsProps } from "types/branchTypes";
import { useCustomContext } from "components/hocs/useCustomContext";
import agent from "components/api/rest";

function HeaderSearch() {
	const { inputVal, searchData, setFindUnits, isDataFetching, getSearchData } =
		useSearch();
	const [isActive, setIsActive, activeRef] = useClickOutside();
	const { setChoosenFromSearch } = useCustomContext();
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFindUnits && setFindUnits(e.target.value);
	};
	const handleSearchClick = () => {
		setIsActive(true);
		getSearchData();
	};
	const handleTargetClick = async (item: unitsProps) => {
		const parentsList = await agent.BranchesList.findParents(item.code);
		setChoosenFromSearch && setChoosenFromSearch(parentsList);
		setFindUnits && setFindUnits("");
		setIsActive(false);
	};

	return (
		<SearchWrapper>
			<InputWrapper>
				<Input
					isActive={isActive}
					placeholder="Найти..."
					value={inputVal}
					onChange={handleInputChange}
					onClick={() => setIsActive(true)}
				/>
				{isDataFetching ? (
					<Loader />
				) : (
					<Loupe src={loupe} onClick={handleSearchClick} />
				)}
			</InputWrapper>
			{searchData && isActive && (
				<PositionSearch ref={activeRef}>
					<SearchDataWrapper>
						{searchData?.data?.units?.map((item) => (
							<SearchDataElement
								key={item.name + item.code}
								onClick={() => handleTargetClick(item)}
							>
								{item.name}
							</SearchDataElement>
						))}
					</SearchDataWrapper>
				</PositionSearch>
			)}
		</SearchWrapper>
	);
}

export default HeaderSearch;
