import initProgram from "./initProgram.js";
import initBuffers from "./initBuffers.js";
import draw from "./draw.js";
import redrawPolyPlane from "./redrawPolyPlane.js";

function main(ncols, nrows) {
  const canvas = document.querySelector("canvas.canvas_container");
  const gl = canvas.getContext("webgl");

  // Set canvas display size to screen size
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  // Check if WebGL is available
  if (gl == null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const buffers = initBuffers(gl, ncols, nrows);
  const programInfo = initProgram(gl, buffers.vertices.internal);

  // Draw the image with the shader program
  draw(gl, programInfo, buffers);

  let time = 0;
  const randomFactors = buffers.vertices.internal.map(() => [
    ((Math.random() * (1 + 1) - 1) * Math.random()) / 4,
    ((Math.random() * (1 + 1) - 1) * Math.random()) / 4,
  ]);

  requestAnimationFrame(() => {
    redrawPolyPlane(
      gl,
      programInfo,
      buffers.vertices.internal,
      buffers.columns,
      buffers.rows,
      time,
      randomFactors
    );
  });
}

window.onload = main(6, 6);
