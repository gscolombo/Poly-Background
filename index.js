import initProgram from './src/initProgram.js';
import initBuffers from './src/initBuffers.js';
import draw from './src/draw.js';
import redrawPolyPlane from './src/redrawPolyPlane.js';

export default function main(
  canvasID,
  ncols,
  nrows,
  width,
  height,
  animate = true
) {
  const canvas = document.getElementById(canvasID);
  const gl = canvas.getContext('webgl');

  // Set canvas display size to user input size
  canvas.width = width;
  canvas.height = height;

  // Check if number of columns and rows is over threshold
  if (ncols <= 1 || nrows <= 1) {
    alert('Invalid number of columns/rows. Must be greater than or equal to 2');
    return;
  }

  // Check if WebGL is available
  if (gl == null) {
    alert(
      'Unable to initialize WebGL. Your browser or machine may not support it.'
    );
    return;
  }

  const buffers = initBuffers(gl, ncols, nrows); // Initialize buffers
  const programInfo = initProgram(gl, buffers.vertices.internal); // Initialize shader program

  // Draw the image with the shader program
  draw(gl, programInfo, buffers);

  let time = Math.random() * (100 - 20) + 20;
  const randomFactors = buffers.vertices.internal.map(() => [
    ((Math.random() * (1 + 1) - 1) * Math.random()) / 4,
    ((Math.random() * (1 + 1) - 1) * Math.random()) / 4,
  ]);

  redrawPolyPlane(
    gl,
    programInfo,
    buffers.vertices.internal,
    buffers.columns,
    buffers.rows,
    time,
    randomFactors,
    animate
  );
}
