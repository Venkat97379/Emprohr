    // src/app/canvas.service.ts
    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root', // Makes the service a singleton available throughout the app
    })
    export class CanvasService {
      private ctx: CanvasRenderingContext2D | null = null;

      setContext(context: CanvasRenderingContext2D): void {
        this.ctx = context;
      }

      drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        if (this.ctx) {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(x, y, width, height);
        }
      }

      // Add more drawing or canvas manipulation methods as needed
    }