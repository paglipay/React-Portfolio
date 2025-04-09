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

      // Draw overlay image on top of canvas
      const overlay = new Image();
      overlay.src = '/logo512.png'; // <-- place your overlay image in /public or use an import
      overlay.onload = () => {
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        // Save final image with overlay
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'photo_with_logo512.png';
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 640, height: 480, margin: '0 auto' }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
        <img
          src="/logo512.png"
          alt="Overlay"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, width: 640, height: 480 }}
        />
      </div>
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
