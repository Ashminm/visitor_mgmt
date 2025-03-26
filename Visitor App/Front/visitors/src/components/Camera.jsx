import React, { useRef, useState } from 'react'

function Camera() {
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setImagePreview(reader.result);
          reader.readAsDataURL(file);
        }
      };
    
      // Open file picker
      const openFilePicker = () => {
        fileInputRef.current.click();
      };
    
      // Start camera
      const startCamera = async () => {
        setIsCameraOn(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      };
    
      // Capture photo
      const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImagePreview(canvas.toDataURL("image/png"));
    
        // Stop camera
        video.srcObject.getTracks().forEach((track) => track.stop());
        setIsCameraOn(false);
      };
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover border" />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      <button onClick={openFilePicker} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload Photo
      </button>

      {!isCameraOn ? (
        <button onClick={startCamera} className="bg-green-500 text-white px-4 py-2 rounded">
          Open Camera
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <video ref={videoRef} autoPlay className="w-40 h-40 border"></video>
          <canvas ref={canvasRef} width="160" height="160" className="hidden"></canvas>
          <button onClick={capturePhoto} className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
            Capture Photo
          </button>
        </div>
      )}
    </div>
    </div>
  )
}

export default Camera
