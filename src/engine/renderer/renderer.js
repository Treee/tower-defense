import * as twgl from "twgl.js";
import DefaultObject from "./objects/default-object";
import { vertexShaderSource, fragmentShaderSource } from "../../engine/shaders/base-shader-program";
import ShaderProgram from "../../engine/shaders/shader-program";


export default class Renderer {  
    fps;
    fpsInterval;
    stop;
    frameCount;
    
  constructor(_fps, _gl) {
    this.fps = _fps;
    this.fpsInterval = 1000 / _fps;
    this.stop = false;
    this.frameCount = 0;
    this.gl = _gl;

    const shaderProg = ShaderProgram.createProgram(this.gl, vertexShaderSource, fragmentShaderSource);
    
    this.obj = new DefaultObject(shaderProg);
    this.obj.createObject(this.gl);

  }

  render(time) {
    if (this.stop) {
      return;
    }

    requestAnimationFrame(this.render.bind(this));
    // calc elapsed time since last loop
    this.now = time;
    this.elapsed = this.now - this.then;

    // if enough time has this.elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
      this.then = this.now - (this.elapsed % this.fpsInterval);
    }
    // draw stuff here

    twgl.resizeCanvasToDisplaySize(this.gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);
    // this.gl.enable(this.gl.CULL_FACE);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    this.obj.draw(this.gl, time);

    // TESTING...Report #seconds since start and achieved fps.
    // let sinceStart = now - startTime;
    // let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
  }
}