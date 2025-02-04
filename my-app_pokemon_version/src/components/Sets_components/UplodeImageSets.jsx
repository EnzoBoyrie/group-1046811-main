import React, { useState } from "react";

import GetSetsService from "../../service/Set";

export default function ImageUploaderSets() {
    const { data: allSets } = GetSetsService();
    const [selectedFile, setSelectedFile] = useState(null);
    const [sets_id, setSets_id] = useState("");
    const [upload, setUpload] = useState("");

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === "image/png") {
            setSelectedFile(file);
        } else {
            setUpload("Seuls les fichiers PNG sont accepter 1.");
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
            setUpload("Seuls les fichiers PNG sont accepter 1.");
        }
    };

    const uploadFile = async () => {
        if (!selectedFile || !sets_id) {
            setUpload("Sélectionner un ID de carte et une image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("sets_id", sets_id);

        try {
            const response = await fetch(`http://localhost:3001/api/images/sets/${sets_id}`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                setUpload("Image del avec reussi !1");
                console.log("Image del avec reussi !1");
            } else {
                setUpload("Erreur du del de l'image.2");
                console.log("Erreur du del de l'image.2");
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
                    Sélectionner le nom du set :
                    <select
                        value={sets_id}
                        onChange={(e) => setSets_id(e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionner un set --</option>
                        {allSets?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name_sets}
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
                            <p> glisser et déposez une image PNG ici</p>
                            <input type="file" accept="image/png" onChange={handleFileChange} />
                        </div>
                    )}
                </div>

                {upload && <p>{upload}</p>}
            </div>
        </div>
    );
}
