import React, { useState } from "react";

function ImageComponent({onImageChange}) {
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);

            setPreviews((prevImages) => prevImages.concat(preview));
            URL.revokeObjectURL(file);

            onImageChange(file);
        }
    };

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            return <img src={photo} alt="" key={photo} />;
        });
    };

    return (
      <div>
        <input type="file" id="file" onChange={handleImageChange} accpet="image/jpeg, image/png" />
        <div className="result">{renderPhotos(previews)}</div>
      </div>
    );
}

export default ImageComponent;