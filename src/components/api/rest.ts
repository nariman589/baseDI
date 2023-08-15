import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "routes";
import {
	BranchesProps,
	CreateProps,
	SuccessProps,
	UnitsProps,
	UpdateProps,
} from "types/branchTypes";

export const api = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = api;

axios.interceptors.response.use(
	async (response) => {
		return response;
	},
	(error: AxiosError) => {
		const { data, status } = error.response as AxiosResponse;
		switch (status) {
			case 400:
				if (data.errors) {
					const modalStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modalStateErrors.push(data.errors[key]);
						}
					}
					toast.error(modalStateErrors.flat());
					// throw modalStateErrors.flat();
				} else {
					toast.error(data);
				}
				break;
			case 401:
				toast.error("unauthorized");
				break;
			case 403:
				toast.error("forbidden");
				break;
			case 404:
				router.navigate("/not-found");
				break;
			case 500:
				router.navigate("/server-error");
				break;
		}
		return Promise.reject(error);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string, config?: any) =>
		axios.get<T>(url, config).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const BranchesList = {
	brances: () => requests.get<BranchesProps>("/Structure/v1/Branches"),
	units: (unitCode: string) =>
		requests.get<UnitsProps>(`/Structure/v1/ChildUnits`, {
			params: {
				unitCode,
			},
		}),
	documentByUnitCode: (unitCode: string) =>
		requests.get<UnitsProps>(`/Document/v1/ByUnitCode`, {
			params: {
				unitCode,
			},
		}),
	searchByTerm: (term: string) =>
		requests.get<UnitsProps>(`/Structure/v1/Units`, {
			params: {
				term,
			},
		}),
	findParents: (unitCode: string) =>
		requests.get<UnitsProps>(`/Structure/v1/ParentUnits`, {
			params: {
				unitCode,
			},
		}),
	create: (data: CreateProps[]) =>
		requests.post<SuccessProps>("/Document/v1/Creation", data),
	changeDocumentStatus: (data: UpdateProps) =>
		requests.post<SuccessProps>("/Document/v1/Updating", {
			...data,
		}),
};

const agent = {
	BranchesList,
};

export default agent;
