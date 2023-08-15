import useSearch from "components/hooks/useSearch";
import React, { useState } from "react";
import { createContext } from "react";
import { UnitsDataProps, UnitsProps } from "types/branchTypes";

interface Props {
	choosenFromSearch: UnitsProps | null;
	setChoosenFromSearch: React.Dispatch<
		React.SetStateAction<UnitsProps | null>
	> | null;
	recursionLevel: number;
	setRecursionLevel: React.Dispatch<React.SetStateAction<number>> | null;
}

const initialValue: Props = {
	choosenFromSearch: null,
	setChoosenFromSearch: null,
	recursionLevel: 1,
	setRecursionLevel: null,
};

export const customContext = createContext(initialValue);

function Context({ children }: any) {
	const [choosenFromSearch, setChoosenFromSearch] = useState<UnitsProps | null>(
		null
	);
	const [recursionLevel, setRecursionLevel] = useState(1);
	return (
		<customContext.Provider
			value={{
				choosenFromSearch,
				setChoosenFromSearch,
				recursionLevel,
				setRecursionLevel,
			}}
		>
			{children}
		</customContext.Provider>
	);
}

export default Context;
