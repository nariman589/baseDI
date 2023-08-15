import axios from "axios";
import agent from "components/api/rest";
import { useCustomContext } from "components/hocs/useCustomContext";
import { Loader } from "components/ui/Loader";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CreateProps } from "types/branchTypes";
import { Btns, CancelBtn, EditBtn, FormBody, Input } from "../components";

interface Props {
	processType: "JDescription" | "Regulation";
	updateData?: any;
}

function DescriptionsEditter({ processType, updateData }: Props) {
	const { choosenFromSearch } = useCustomContext();
	const unit = choosenFromSearch?.data.units[0];

	const initialValue = {
		processType: processType,
		documentName: "",
		unitCode: unit!.code,
		link: "",
		approvedDate: "",
		approverTabNumber: 0,
		positionName: "",
	};

	const [clicked, setClicked] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [values, setValues] = useState<CreateProps>(initialValue);
	const [links, setLinks] = useState<string[]>([]);

	const handleCancel = () => {
		setClicked(false);
		setValues(initialValue);
	};

	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement> | undefined
	) => {
		if (e?.target?.files) {
			const url = new URL(process.env.REACT_APP_API_BASE_URL || "");
			const files = Array.from(e.target.files);
			const asyncLinks: any = [];
			files.forEach((file) => {
				const formData = new FormData();
				formData.append("file", file);
				asyncLinks.push(
					axios.request({
						method: "POST",
						url: url.origin + "/API/UploadFile/InfoDocStore",
						data: formData,
					})
				);
			});
			Promise.all(asyncLinks).then((response) =>
				response.forEach((link) => {
					setLinks((v) => [...v, link?.data?.Data?.FileUrl]);
				})
			);
		}
	};

	const handleSaveBtn = async () => {
		if (!clicked) {
			setClicked((v) => !v);
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSaveLoading(true);
		try {
			await agent.BranchesList.create(
				links.map((link) => ({
					...values,
					link,
				}))
			);
			await updateData();
			toast.success("Выполнено!");
		} catch (err: any) {
			toast.error(err?.message || "Что-то пошло не так...");
		}
		setSaveLoading(false);
		setClicked((v) => !v);
	};

	return (
		<form onSubmit={handleSubmit}>
			{clicked && (
				<FormBody>
					<label htmlFor="name">Название</label>
					<Input
						required
						id="name"
						value={values?.documentName}
						onChange={(e) =>
							setValues((v) => ({ ...v, documentName: e.target.value }))
						}
					/>

					<label htmlFor="date">Дата утверждения</label>
					<Input
						required
						id="date"
						type="date"
						value={values?.approvedDate}
						onChange={(e) =>
							setValues((v) => ({ ...v, approvedDate: e.target.value }))
						}
					/>
					<label htmlFor="num">
						Табельный номер утвердившего(пример: 11111)
					</label>
					<Input
						required
						id="num"
						type="number"
						value={values?.approverTabNumber}
						onChange={(e) =>
							setValues((v) => ({ ...v, approverTabNumber: +e.target.value }))
						}
					/>
					<label htmlFor="code">
						{processType === "JDescription"
							? "Наименование позиции"
							: "Код подразделения"}
					</label>
					<Input
						required
						id="code"
						type="string"
						value={
							processType === "JDescription"
								? values?.positionName
								: values?.unitCode
						}
						onChange={(e) => {
							if (processType === "JDescription")
								setValues((v) => ({ ...v, positionName: e.target.value }));
							else setValues((v) => ({ ...v, unitCode: e.target.value }));
						}}
					/>
					<label htmlFor="link">Файл</label>
					<Input
						required
						id="link"
						type="file"
						multiple
						onChange={handleFileChange}
					/>
				</FormBody>
			)}
			<Btns>
				<EditBtn
					disabled={saveLoading}
					isActive={clicked}
					type={clicked ? "submit" : "button"}
					onClick={handleSaveBtn}
				>
					{clicked ? "Сохранить" : "Добавить"} {saveLoading && <Loader />}
				</EditBtn>
				{clicked && <CancelBtn onClick={handleCancel}>Отмена</CancelBtn>}
			</Btns>
		</form>
	);
}

export default DescriptionsEditter;
