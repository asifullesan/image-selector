import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import "./Home.css";

const Home = () => {
  const [images, setImages] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log(selectedImages);
  const totalSelected = selectedImages.length;

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setIsDragging(true);
    setDraggedImage(id);
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    setIsDragging(false);

    const draggedImageIndex = images.findIndex(
      (image) => image.id === draggedImage
    );

    const dropIndex = images.findIndex((image) => image.id === id);
    if (draggedImageIndex === -1 || dropIndex === -1) return;
    const updatedImages = [...images];

    updatedImages.splice(
      dropIndex,
      0,
      updatedImages.splice(draggedImageIndex, 1)[0]
    );

    setImages(updatedImages);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId);
      } else {
        return [...prevSelected, imageId];
      }
    });
  };

  const handleDeleteSelected = () => {
    setImages((prevImages) =>
      prevImages.filter((image) => !selectedImages.includes(image.id))
    );
    setSelectedImages([]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        id: images.length + 1,
        src: URL.createObjectURL(file),
        isFeatured: false,
      };

      setImages([...images, newImage]);
    }
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`header-nav ${
          selectedImages.length > 0 ? "select-nav" : ""
        }`}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <input checked type="checkbox" />
            <label className="ms-2 selected-text">
              {totalSelected} Files Selected
            </label>
          </div>
          <button className="delete-btn" onClick={handleDeleteSelected}>
            Delete Files
          </button>
        </div>
      </div>
      <div className="image-gallery" >
        <div className="grid">
          {images.map((image) => (
            <div
              key={image.id}
              className={`grid-item ${image.isFeatured ? "featured" : ""} ${
                isDragging && image.id === draggedImage ? "dragging" : ""
              } ${selectedImages.includes(image.id) ? "selected" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image.id)}
            >
           
              <div className="image-box">
                <img src={image.src} alt={`Image ${image.id}`} />
                <div className="image-overlay">
                  <label>
                    <input
                      className={`checkbox-label ${
                        selectedImages.includes(image.id)
                          ? "selected-input"
                          : ""
                      }`}
                      onClick={() => handleImageSelect(image.id)}
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div
          className="drop-area"
          onDrop={handleUpload}
          onDragOver={handleDragOver}
        >
          <div className="drop-inner">
            <div>
            
              <p>Drag & Drop</p>
            </div>
          </div>
        </div> */}
        <div>
          <label>
            <div className="drop-area">
              <div className="add-img">
                <BsImage style={{ height: 30, width: 30 }} />
                <p>Add Image</p>
              </div>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Home;
