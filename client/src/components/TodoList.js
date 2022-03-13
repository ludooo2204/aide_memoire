import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import Iframe from "react-iframe";
import { Button } from "reactstrap";
// import img from '../notes-david-travis.jpg'

const TodoList = () => {
	const [modal, setModal] = useState(false);
	const [iFrameWindow, setIFrameWindow] = useState(false);
	const [headerH1Class, SetHeaderH1Class] = useState("headerH1");
	const [headerClass, SetHeaderClass] = useState("header");
	const [taskList, setTaskList] = useState([]);
	const [taskListTotale, setTaskListTotale] = useState([]);
	const [isfiltreCategorie, setFiltreCategorie] = useState(false);
	useEffect(() => {
		// let arr = localStorage.getItem("taskList")
		axios.post("https://lomano.go.yo.fr/api/aideMemoire/get.php", "").then((e) => {
			console.log(e.data);
			setTaskList(e.data);
			setTaskListTotale(e.data);
		});

		// if (arr) {
		//     let obj = JSON.parse(arr)
		//     setTaskList(obj)
		// }
	}, []);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = (e) => {
		// console.log(e.srcElement.scrollingElement.scrollTop)
		const scrollValue = e.srcElement.scrollingElement.scrollTop;

		if (scrollValue > 1) {
			// console.log("dmkf,sdmsmkms");
			SetHeaderH1Class("animatedHeader");
			SetHeaderClass("header2");
		}
	};
	const deleteTask = (indexFromSQL_Base) => {
		// let tempList = taskList;
		// tempList.splice(index, 1);
		// localStorage.setItem("taskList", JSON.stringify(tempList));
		// setTaskList(tempList);
		axios.post("https://lomano.go.yo.fr/api/aideMemoire/delete.php", indexFromSQL_Base).then((e) => window.location.reload());

		//
	};

	const handleUpdate = (objToUpdate, id) => {
		// let tempList = taskList;
		// tempList[index] = obj;
		// localStorage.setItem("taskList", JSON.stringify(tempList));
		// setTaskList(tempList);
		let objectToUpdate = objToUpdate;
		objectToUpdate.id = id;
		console.log(objectToUpdate);
		update(objectToUpdate);
		// updateListArray(objToUpdate)
		// window.location.reload();
	};

	const toggle = () => {
		setModal(!modal);
	};

	const saveTask = (taskObj) => {
		// let tempList = taskList;
		// tempList.push(taskObj);
		console.log("taskObj");
		console.log(taskObj);
		post(taskObj);
		// localStorage.setItem("taskList", JSON.stringify(tempList));
		// setTaskList(taskList);
		setModal(false);
	};

	const get = () => {
		axios.post("https://lomano.go.yo.fr/api/aideMemoire/get.php", "").then((e) => window.location.reload());
	};
	const mockedData = {
		description: "<p>tatata <strong>merde</strong></p",
		nom: "jouet",
		categorie: "test@trescal.com",
	};

	const post = (_data) => {
		axios.post("https://lomano.go.yo.fr/api/aideMemoire/post.php", _data).then((e) => window.location.reload());
	};
	const update = (_data) => {
		axios.post("https://lomano.go.yo.fr/api/aideMemoire/update.php", _data).then((e) => window.location.reload());
	};
	const handleCheckbox = (event) => {
		setIFrameWindow(event.target.checked);
	};
	const filtreCategorie = (index) => {
		if (isfiltreCategorie) {
			setTaskList(taskListTotale);
		} else {
			setTaskList(taskList.filter((e) => e.categorie == taskList[index].categorie));
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		setFiltreCategorie(!isfiltreCategorie);
	};

	return (
		<>
			<div className={headerClass}>
				<div className="button-container">
					{/* <div style={{ alignSelf: "flex-end" }}>
						<input type="checkbox" onChange={handleCheckbox} checked={iFrameWindow} />
						<label>Afficher Iframe</label>
					</div> */}
					{/* <img 
     src={img}
     alt="Grapefruit slice atop a pile of other slices"/> */}
					<h1 className={headerH1Class}>Aide-mémoire Formation</h1>
					{/* <button className="btn" onClick={get}>
						click to get !
					</button> */}
					{/* <button className="btn" onClick={post}>
						click to post !
					</button> */}
					{/* <i color="#12345" className="far button fa-plus-circle" onClick={() => setModal(true)}></i> */}
					
					<div className="tooltip1">
					<i class="fa fa-plus-circle fa-4x   button" aria-hidden="true" onClick={() => setModal(true)}></i>
						<span className="tooltiptext1">Ajouter un Mémo</span>
					</div>
					
				</div>
			</div>
			<div className="task-container">
				{taskList &&
					taskList.map((obj, index) => (
						<Card key={Math.random()} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={handleUpdate} filtreCategorie={filtreCategorie} />
					))}
			</div>
			<CreateTask toggle={toggle} modal={modal} save={saveTask} />
			{/* <div class="tooltip1">
						Hover over me
						<span class="tooltiptext1">Tooltip text</span>
					</div> */}
			{iFrameWindow && <Iframe url="/iframe1.html" width="450px" height="450px" id="myId" display="initial" position="relative" />}
		</>
	);
};

export default TodoList;
