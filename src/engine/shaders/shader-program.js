import * as twgl from "twgl.js";

let programInfo = undefined;
function createProgram(gl, vertexShaderText, fragmentShaderText) {
  programInfo = twgl.createProgramInfo(gl, [vertexShaderText, fragmentShaderText]);
  return programInfo;
}

const ShaderProgram = {
  programInfo,
  createProgram
};

export default ShaderProgram;