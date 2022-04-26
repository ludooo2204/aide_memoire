import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import styles from "./LoginForm.module.css";
import axios from "axios";

const LoginForm = ({ closeModal, seConnecter }) => {
	const [isChoixInscriptionActif, setIsChoixInscriptionActif] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);
	const [MDP, setMDP] = useState("");
	const [MDP2, setMDP2] = useState("");
	const [email, setEmail] = useState("");

	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};
	const seConnecterViaButton = () => {
		setIsChoixInscriptionActif(true);
	};
	const sInscrireViaButton = () => {
		setIsChoixInscriptionActif(false);
	};
	const validerForm = () => {
		closeModal();
	};
	const validerInscription = () => {
		if (MDP === MDP2) {
			axios
				.post("/memo/auth/signup", { email, password: MDP })
				.then((e) => {
					if (e.data.message == "Erreur! l'email est déja utilisé!") {
						window.alert(e.data.message);
						return;
					}
					window.alert("Inscription Réussie");
					closeModal();
				})
				.catch((err) => console.log(err));
		} else window.alert("les mdp se sont pas les mêmes !");
	};
	const validerConnexion = () => {
		axios
			.post("/memo/auth/signin", { email, password: MDP })
			.then((e) => {
				if (e.data.message == "Mot de passe erroné!") {
					window.alert(e.data.message);
					return;
				}
				console.log("e.data");
				console.log(e.data);
				window.localStorage.setItem("token", e.data.accessToken);

				seConnecter({ userId: e.data.id, email: e.data.email});

				closeModal();
			})
			.catch((err) => console.log(err));
		// seConnecter("ludo");
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleMDP = (e) => {
		setMDP(e.target.value);
	};
	const handleMDP2 = (e) => {
		setMDP2(e.target.value);
	};




	return (
		<div className="LoginForm">
			{/* <button className="buttonConnexionDansModal">Se connecter</button> */}
			<div className="buttonLoginGroupDansModal">
				<button
					className={`button2 button2--calypso
				 ${isChoixInscriptionActif ? "button2--calypso--actif" : "button2--calypso--inactif"}`}
					onClick={seConnecterViaButton}
				>
					<span>Se connecter</span>
				</button>
				<button
					className={`button2 button2--calypso
				 ${isChoixInscriptionActif ? "button2--calypso--inactif" : "button2--calypso--actif"}`}
					onClick={sInscrireViaButton}
				>
					<span>S'inscrire</span>
				</button>
			</div>
			<div className={styles.labelGroupModal}>
				<span>
					<label >
						Adresse email
					</label>
				</span>
				<input type="text" onChange={handleEmail} value={email} className={isChoixInscriptionActif?styles.inputSignin:styles.inputSignup} />
				<span>
					<label>Mot de passe</label>
					<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
				
				</span>
				<input type={passwordShown ? "text" : "password"} onChange={handleMDP} value={MDP} className={isChoixInscriptionActif?styles.inputSignin:styles.inputSignup}/>

			
				
				{!isChoixInscriptionActif && (
					<span>
						<label >Confirmation mot de passe</label>
						<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
					</span>
				)}
				{!isChoixInscriptionActif && <input className={styles.inputSignup} type={passwordShown ? "text" : "password"} onChange={handleMDP2} value={MDP2} />}
		
				{/* {!isChoixInscriptionActif && (
					<span>
						<label data-tip data-for="mail">
							Email
						</label>{" "}
						<HelpOutlineOutlinedIcon style={{ position: "relative", top: "10" }} sx={{ fontSize: 15 }} />
					</span>
				)} */}
				{/* console.log(isEmail('foo@bar.com')); pour verifier si mail ok */}
				{/* {!isChoixInscriptionActif && <input type="email" onChange={handleEmail} value={email} />} */}
			</div>
			<button className={styles.buttonValidation} onClick={!isChoixInscriptionActif ? validerInscription : validerConnexion}>
				valider
			</button>
			{/* <button className={styles.dev } data-testid="devAdmin" onClick={validerFormFake}>
					se connecter pour developpement
				</button> */}
		</div>
	);
};

export default LoginForm;
