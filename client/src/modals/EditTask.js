import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({modal, toggle, updateTask, taskObj}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
	const [categorie, setCategorie] = useState("");


    // console.log("taskObj") 
    // console.log(taskObj) 
    const handleChange = (e) => {
        
        const { name, value } = e.target;
        console.log( name, value)


        if (name === "taskName") {
			setTaskName(value);
		} else if (name === "description") {
			setDescription(value);
		} else if (name === "categorie") {
			setCategorie(value);
		}


    }

    useEffect(() => {
        setTaskName(taskObj.nom)
        setDescription(taskObj.description)
        setCategorie(taskObj.categorie)
    },[])

    const handleUpdate = (e) => {
        e.preventDefault();
        let taskObj = {};
		taskObj["nom"] = taskName;
		taskObj["description"] = description;
		taskObj["categorie"] = categorie;
        updateTask(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Titre du Mémo</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                    <div className = "form-group">
                        <label>Categorie</label>
                        <textarea rows = "5" className = "form-control" value = {categorie} onChange = {handleChange} name = "categorie"></textarea>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Valider</Button>{' '}
            <Button color="secondary" onClick={toggle}>Annuler</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTaskPopup;