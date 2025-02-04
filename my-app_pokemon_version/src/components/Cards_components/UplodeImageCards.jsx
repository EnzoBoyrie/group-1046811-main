import React, { useState } from "react";

import GetSetCardService from "../../service/SetCards";

export default function ImageUploaderCards() {
    const { data: allCards } = GetSetCardService();
    const [selectedFile, setSelectedFile] = useState(null);
    const [card_id, setCard_id] = useState("");
    const [upload, setUpload] = useState("");

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === "image/png") {
            setSelectedFile(file);
        } else {
            setUpload("Seulement les fichiers PNG sont accepter 1.");
        }
    };

    const handleMouv = (event) => {
        event.preventDefault();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "image/png") {
            setSelectedFile(file);
        } else {
            setUpload("Seulement les fichiers PNG sont accepter 1.");
        }
    };

    const uploadFile = async () => {
        if (!selectedFile || !card_id) {
            setUpload("Sélectionner un ID de carte et une image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("card_id", card_id);

        try {
            const response = await fetch(`http://localhost:3001/api/images/card/${card_id}`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                setUpload("Image supprimée !");
                console.log("Image supprimée !");
            } else {
                setUpload("Erreur de la suppréssion de l'image.");
                console.log("Erreur de la suppression de l'image.");
            }
        } catch (error) {
            console.error("Erreur lors de la requête:", formData);
            setUpload("Erreur de connexion, réessayez.");
        }
    };

    return (
        <div>
           
            <div>
                <label>
                    Sélectionner le nom de la carte :
                    <select
                        value={card_id}
                        onChange={(e) => setCard_id(e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionner une carte --</option>
                        {allCards?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </label>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleMouv}
                >
                    {selectedFile ? (
                        <div>
                            <p>Fichier : {selectedFile.name}</p>
                            <button onClick={uploadFile}>Télécharger l'image</button>
                        </div>
                    ) : (
                        <div>
                            <p>Faites glisser et déposez une image PNG ici</p>
                            <input type="file" accept="image/png" onChange={handleFileChange} />
                        </div>
                    )}
                </div>

                {upload && <p>{upload}</p>}
            </div>
        </div>
    );
}
