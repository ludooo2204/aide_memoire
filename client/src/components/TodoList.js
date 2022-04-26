import axios from "axios";
import React, { useEffect, useState } from "react";
import CreationMemo from "../modals/CreationMemo";
import LoginForm from "./LoginForm";
import Card from "./Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "react-modal";

Modal.setAppElement("body");

const customStyles = {
	content: {
		zIndex: "5",
		top: "50%",
		left: "50%",
		width: "50VW",
		height: "80VH",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#f1f1f120",
		display: "flex",
		justifyContent: "center",
		padding: "0.5REM",
		boxShadow: "3px 3px 30px 2px",
		borderRadius: "6px",
	},
};
const TodoList = () => {
	const [modal, setModal] = useState(false);
	const [headerH1Class, SetHeaderH1Class] = useState("headerH1");
	const [headerClass, SetHeaderClass] = useState("header");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [userConnected, setUserConnected] = useState(null);
	const [toggleMenu, setToggleMenu] = useState(false);
	const [userData, setUserData] = useState(null);

	const [taskList, setTaskList] = useState([]);
	const [taskListTotale, setTaskListTotale] = useState([]);
	const [isfiltreCategorie, setFiltreCategorie] = useState(false);

	useEffect(() => {
		const header = {
			headers: {
				"x-access-Token": window.localStorage.getItem("token"),
				"content-type": "application/json",
			},
		};
		axios
			.get("/memo/auth/signinAuto", header)
			.then((user) => {
				setUserData(user.data);
				setUserConnected(true);

				axios
					.get("/memo/getMemo/" + user.data.id)
					.then((listeMemo) => {
						const memoFiltres = listeMemo.data.filter((memo) => memo.user == user.data.id);
						setTaskList(memoFiltres);
						setTaskListTotale(memoFiltres);
					})
					.catch((err) => console.log("bye", err));
			})
			.catch((err) => console.log("bye", err));
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	function openModal() {
		toggleNav();
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	const toggleNav = () => {
		console.log(toggleMenu);
		setToggleMenu(!toggleMenu);
	};
	const handleScroll = (e) => {
		const scrollValue = e.srcElement.scrollingElement.scrollTop;

		if (scrollValue > 1) {
			SetHeaderH1Class("animatedHeader");
			SetHeaderClass("header2");
		}
	};
	const deleteTask = (indexFromSQL_Base) => {
		axios.delete("memo/deleteMemo/" + indexFromSQL_Base).then((e) => window.location.reload());
	};

	const post = (_data) => {
		axios.post("memo/postMemo", _data).then((e) => window.location.reload());
	};
	const update = (_data) => {
		axios.patch("memo/updateMemo/" + _data.id, _data).then((e) => {
			window.location.reload();
		});
	};
	const handleUpdate = (objToUpdate, id) => {
		console.log("updddaate");
		let objectToUpdate = objToUpdate;
		objectToUpdate.id = id;
		console.log(objectToUpdate);
		update(objectToUpdate);
	};

	const toggle = () => {
		setModal(!modal);
	};

	const saveTask = (taskObj) => {
		post(taskObj);
		setModal(false);
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
	const seConnecter = (user) => {
		setUserConnected(true);
		window.location.reload();
	};
	const seDeconnecter = () => {
		window.localStorage.removeItem("token");
		toggleNav();
		setUserConnected(null);
		window.location.reload(false);
	};

	return (
		<>
			<div className={headerClass}>
				<div className="button-container">
					<h1 className={headerH1Class}>Aide-mémoire Formation</h1>
					{userConnected ? (
						<div onClick={seDeconnecter}>
							<LogoutIcon sx={{ fontSize: 25, paddingTop: 0 }} />
						</div>
					) : (
						<div onClick={openModal}>
							<AccountCircleIcon data-tip data-for="AccountCircleIcon" sx={{ fontSize: 25, paddingTop: 0 }} />
						</div>
					)}
					{userConnected && (
						<div className="tooltip1">
							<i class="fa fa-plus-circle fa-4x   button" aria-hidden="true" onClick={() => setModal(true)}></i>
							<span className="tooltiptext1">Ajouter un Mémo</span>
						</div>
					)}
				</div>
			</div>
			<div className="task-container">
				{taskList &&
					taskList.map((obj, index) => {
						return <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={handleUpdate} filtreCategorie={filtreCategorie} />;
					})}
			</div>
			<CreationMemo toggle={toggle} modal={modal} save={saveTask} />
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
				<LoginForm closeModal={closeModal} seConnecter={seConnecter} />
			</Modal>
		</>
	);
};

export default TodoList;
