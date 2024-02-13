import React, { useState } from "react";

function ImageComponent({onImageChange}) {
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        if(e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            setPreviews((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

            const fileArray = Array.from(e.target.files);
            onImageChange(fileArray);
        }
    };

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            return <img src={photo} alt="" key={photo} />;
        });
    };

    return (
      <div>
        <input type="file" id="file" multiple onChange={handleImageChange} />
        <div className="result">{renderPhotos(previews)}</div>
      </div>
    );
}

export default ImageComponent;