
import './Style.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "297c3e2de48326a2eec9013455f13959"; 
function SnapShot() {
    const [searchTerm, setSearchTerm] = useState("");
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inp,setinp]=useState("")
    const [hoveredPhotoId, setHoveredPhotoId] = useState(null);
    
    const handleImageHover = (photoId) => {
      setHoveredPhotoId(photoId);
    };
  
    useEffect(() => {
        const fetchPhotos = async (searchTerm = "cars") => {
      try {
        setLoading(true);
        const url =
          "https://www.flickr.com/services/rest/?method=flickr.photos.search" +
          `&api_key=${API_KEY}&text=${searchTerm}&per_page=20&format=json&nojsoncallback=1`;
        const response = await axios.get(url);
        setPhotos(response.data.photos.photo);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPhotos(searchTerm || "cars")
    }, [searchTerm]);
  
    // Handle search bar input change
    const handleSearchInput = (event) => {
      setinp(event.target.value)
      setSearchTerm(event.target.value);
    };
    const handleButtonClick = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
    
  return (
    <div className='cont'>
    <h1>Snap Shot</h1>
    <div>
    <input
      type="text"
      placeholder="Search for photos"
      value={searchTerm}
      onChange={handleSearchInput}
    />
    <button onClick={() => handleButtonClick(inp)}>Search</button>
    </div>
    <div>
    <button onClick={() => handleButtonClick("Mountain")}>Mountain</button>
    <button onClick={() => handleButtonClick("Beaches")}>Beaches</button>
    <button onClick={() => handleButtonClick("Birds")}>Birds</button>
    <button onClick={() => handleButtonClick("Food")}>Food</button>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p>{error.message}</p>}
    <div>
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={photo.title}
          style={{
            width:photo.id === hoveredPhotoId? "200px": "10rem",
            height: photo.id === hoveredPhotoId? "200px": "150px",
            objectFit: "cover",
            margin:photo.id === hoveredPhotoId?null:"20px",
            filter: photo.id === hoveredPhotoId ? "brightness(50%)" : "none",
          }}
          onMouseEnter={() => handleImageHover(photo.id)}
          onMouseLeave={() => handleImageHover(null)}
        />
      ))}
    </div>
  </div>
  )
}

export default SnapShot