export const convertDate = (date?: string) => {
	if (!date) return "";
	return new Date(date).toLocaleDateString();
};
