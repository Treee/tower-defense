import * as twgl from "twgl.js";

export default class FObject {
  bufferInfo = undefined;
  shaderProgram = undefined;
  constructor(shaderProgram) {
    this.shaderProgram = shaderProgram;
  }

  createObject(gl) {
    const arrays = {
        position: [
          -1, -1, 0, 
          1, -1, 0, 
          -1, 1, 0, 
          -1, 1, 0, 
          1, -1, 0, 
          1, 1, 0
        ],
    };
    this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
  }

  draw(gl, time) {
    const uniforms = {
      time: time * 0.001,
      resolution: [gl.canvas.width, gl.canvas.height],
    };

    gl.useProgram(this.shaderProgram.program);
    twgl.setBuffersAndAttributes(gl, this.shaderProgram, this.bufferInfo);
    twgl.setUniforms(this.shaderProgram, uniforms);
    twgl.drawBufferInfo(gl, this.bufferInfo);
  }
}