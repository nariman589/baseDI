import React from "react";
import admin from "assets/admin.svg";
import { List, ListElement, Icon } from "./components";

function IconsList() {
	const iconsList = [
		{
			icon: admin,
			url: "/manage",
			title: "Админ панель",
		},
	];

	return (
		<List>
			{iconsList.map((item, index) => (
				<ListElement key={item.url + index} to={item.url} title={item.title}>
					<Icon src={item.icon} />
				</ListElement>
			))}
		</List>
	);
}

export default IconsList;
