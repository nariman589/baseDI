export const downloadFunc = async (url: string, name: string) => {
	const link = document.createElement("a");
	const data = await fetch(url);
	const blob = await data.blob();
	const objectUrl = URL.createObjectURL(blob);

	link.setAttribute("href", objectUrl);
	link.setAttribute("download", name);
	link.style.display = "none";

	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
};
