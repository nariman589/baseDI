export interface RequestProps {
	code: number;
	message: string;
}

export interface BranchesDataProps {
	code: string;
	name: string;
	level: string;
}

export interface jDescriptionsProps {
	unitCode: string;
	link: string;
	approvedDate: string;
	approverTabNumber: number;
	documentId: number;
	documentName: string;
	unitName: string;
	approverFullName: string;
	approverPositionCode: string;
	approverPositionName: string;
	status: number;
	positionCode: string;
	positionName: string;
}

export interface regulationsProps {
	unitCode: string;
	link: string;
	approvedDate: string;
	approverTabNumber: number;
	documentId: number;
	documentName: string;
	unitName: string;
	approverFullName: string;
	approverPositionCode: string;
	approverPositionName: string;
	status: number;
}

export interface unitsProps {
	code: string;
	name: string;
	level: string;
}

export interface BranchesProps extends RequestProps {
	data: BranchesDataProps[];
}

export interface UnitsDataProps {
	jDescriptions: jDescriptionsProps[];
	regulations: regulationsProps[];
	units: unitsProps[];
}

export interface UnitsProps extends RequestProps {
	data: UnitsDataProps;
}

export interface CreateProps {
	processType: string;
	documentName: string;
	unitCode: string;
	link: string;
	approvedDate: string;
	approverTabNumber: number;
	positionName: string;
}

export interface UpdateProps {
	documentId: number;
	processType: "JDESCRIPTION" | "REGULATION";
	status: number;
}

export interface SuccessProps extends RequestProps {
	data: string;
}
