import { useRef, useEffect } from 'react';

const Canvas: React.FC = (): JSX.Element => {

    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const particlesArray: {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        update(): void
        draw(): void
    }[] = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        

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
            opacity: number
            
    
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = 0.7;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.opacity = 0;
            }
            
            update(): void {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += 0.01;
                if (this.size > 0.2) this.size -= 0.001;
            }
            
            draw(): void {
                ctx.fillStyle = `hsla(0,0%,100%,${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
          
          function init(): void {
            for (let i = 0; i < 100; i += 1) {
                particlesArray.push(new Particle());
            }
            setInterval(() => {
                for (let i = 0; i < 50; i += 1) {
                    particlesArray.push(new Particle());
                }
            }, 3000)
          }  

          init();
          
          function handleParticles(): void {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].size <= 0.3) {
                    particlesArray.splice(i, 1);
                    i -= 1;
                }
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