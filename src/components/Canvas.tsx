import { useRef, useEffect } from 'react';

const Canvas: React.FC = (): JSX.Element => {

    const canvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, [])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Canvas;