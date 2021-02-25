import { useRef, useEffect } from 'react';

const Canvas: React.FC = (): JSX.Element => {

    const canvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particlesArray: {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            update(): void
            draw(): void
        }[] = [];

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
          
        class Particle {

            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            
    
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = 0.5;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
            }
            
            update(): void {
                this.x += this.speedX;
                this.y += this.speedY;
            }
            
            draw(): void {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
          
          function init(): void {
            for (let i = 0; i < 100; i += 1) {
                particlesArray.push(new Particle());
            }
          }  

          init();
          
          function handleParticles(): void {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
          }

          function animate(): void {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              handleParticles();
              requestAnimationFrame(animate);
          }
           
          animate();
   
      }, [])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Canvas;