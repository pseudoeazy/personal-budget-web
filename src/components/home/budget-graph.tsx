'use client';
import React, { useRef, useEffect } from 'react';

const BugdgetGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#D2D2D2';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw the arc
    const startAngle = 0;
    const endAngle = (120 * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#51d289';
    ctx.lineWidth = 10;

    // Set font styles

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '24px Arial';
    ctx.fillText('20%', centerX, centerY + 15);

    ctx.font = '16px Arial';
    ctx.fillText('Spent', centerX, centerY - 15);

    ctx.stroke();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

export default BugdgetGraph;
