import setPolygonalPlane from "./setPolyPlane.js";
import setColors from "./setColors.js";

// Function to initialize buffers to be used in the shader program
export default function initBuffers(gl, ncols, nrows) {
  // Create position buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Bind position buffer to GPU buffer
  const [positions, centralPoints] = setPolygonalPlane(gl, ncols, nrows); // Set polygonal plane vertices points

  // Create color buffer
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // Bind color buffer to GPU buffer
  setColors(gl, ncols, nrows); // Set random colors for each triangle

  return {
    position: positionBuffer,
    color: colorBuffer,
    columns: ncols,
    rows: nrows,
    vertices: {
      all: positions,
      internal: centralPoints,
    },
  };
}
