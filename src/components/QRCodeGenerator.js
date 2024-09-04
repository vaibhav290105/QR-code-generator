// src/components/QRCodeGenerator.js
import React, { useState } from 'react';
import QRCode from 'qrcode';
import './QRCodeGenerator.css'; // Ensure to create this CSS file for custom styles

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [dataUrl, setDataUrl] = useState('');

  const generateQRCode = () => {
    if (!url) {
      setError('Enter The Url');
      setTimeout(() => setError(''), 5000);
      return;
    }

    QRCode.toDataURL(url, (err, url) => {
      if (err) {
        setError('Invalid URL');
        setTimeout(() => setError(''), 5000);
        return;
      }
      setQrCode(url);
      setDataUrl(url);
      setError('');
    });
  };

  const clearQRCode = () => {
    setUrl('');
    setQrCode('');
    setDataUrl('');
    setError('');
  };

  return (
    <div className="qr-code-generator">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={generateQRCode} onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}>
        Generate
      </button>
      <button onClick={clearQRCode}>Clear</button>
      {qrCode && (
        <>
          <img src={qrCode} alt="qr-code" />
          <a download="qrCode.png" href={dataUrl}>
            <button>Download</button>
          </a>
        </>
      )}
      {error && <div className="mt-2 mb-1">{error}</div>}
    </div>
  );
};

export default QRCodeGenerator;
