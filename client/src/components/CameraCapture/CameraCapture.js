import React, { useRef, useEffect } from 'react';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    getCameraStream();
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video && canvas && context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'photo.png';
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} width="640" height="480" autoPlay style={{ border: '1px solid black' }} />
      <br />
      <button onClick={handleCapture} style={{ marginTop: '10px' }}>Snap Photo</button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default CameraCapture;
