import React, { useState, useEffect } from "react";
import EditTask from "../modals/EditTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const Card = ({ taskObj, index, deleteTask, updateListArray, filtreCategorie }) => {
	const [modal, setModal] = useState(false);

	const colors = [
		{
			primaryColor: "#5D93E1",
			secondaryColor: "#ECF3FC",
		},
		{
			primaryColor: "#F9D288",
			secondaryColor: "#FEFAF1",
		},
		{
			primaryColor: "#5DC250",
			secondaryColor: "#F2FAF1",
		},
		{
			primaryColor: "#F48687",
			secondaryColor: "#FDF1F1",
		},
		{
			primaryColor: "#B964F7",
			secondaryColor: "#F3F0FD",
		},
	];

	const toggle = () => {
		setModal(!modal);
	};

	const updateTask = (objToUpdate) => {
		console.log("taskObj from update");
		console.log("taskObj from update");
		console.log("taskObj from update");
		console.log("taskObj from update");
		console.log("taskObj from update");
		console.log(objToUpdate);
		updateListArray(objToUpdate, taskObj.id);
	};

	const handleDelete = () => {
		console.log(taskObj);
		console.log("deletre!!");
		deleteTask(taskObj.id);
	};

	// const filtreCategorie = (obj) => {
	// 	console.log( index)

	// }
	const onscroll = (e) => {
		console.log(e);
	};
	return (
		<div className="card-wrapper mr-5 floatting">
			<div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
			<div className="task-holder">
				<div className="headerCard">
					<span className="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: "10px" }}>
						{taskObj.nom}
					</span>
					<div className="tooltip2">
						<span className="tooltiptext2">Clique pour filtrer par catégorie</span>
						<span
							className="card-header-right "
							onClick={() => filtreCategorie(index)}
							style={{
								backgroundColor: colors[index % 5].secondaryColor,
								borderRadius: "10px",
								borderColor: colors[index % 5].primaryColor,
								borderWidth: "3px",
								borderStyle: "solid",
							}}
						>
							{taskObj.categorie}
						</span>
					</div>
				</div>
				{/* <p className = "mt-3 card-description">{taskObj.description}</p> */}
				<p className="mt-3 card-description" dangerouslySetInnerHTML={{ __html: taskObj.description }}></p>

				<div className="icon-delete-modify">
				

					{/* <i
						className="far fa-edit mr-3"
						style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
						onClick={() => {
							setModal(true);
							console.log("coucou");
						}}
					></i> */}
					<EditIcon
						onClick={() => {
							setModal(true);
						}}
					/>
					<DeleteForeverIcon onClick={handleDelete} />
					{/* <i className="fas fa-trash-alt" style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }} onClick={handleDelete}></i>   */}
				</div>
			</div>
			<EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
		</div>
	);
};

export default Card;
