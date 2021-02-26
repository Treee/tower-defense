import Renderer from "./engine/renderer/renderer.js";

import $ from "jquery";

$(function(){
  const gl = $("#c")[0].getContext("webgl2");
  
  const renderer = new Renderer(60, gl);
  renderer.render();
});