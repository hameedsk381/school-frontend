import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function MySignatureCanvas() {
  const signatureRef = useRef();
  const handleUndo = () => {
    signatureRef.current.undo();
  };

  const handleRedo = () => {
    signatureRef.current.redo();
  };
  return (
    <>
    
   
    </>
  );
}

export default MySignatureCanvas;
