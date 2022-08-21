// import handleInternalCoordinates from "./handleInternalVertices.js";

// Function to reset and redraw internal vertices
export default function redrawPolyPlane(
  gl,
  programInfo,
  pairs,
  ncols,
  nrows,
  time,
  randomFactors
) {
  // Clear the canvas
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  pairs.forEach((pair, index) => {
    // Set periodic point translation
    const x =
      Math.sin(((2 * Math.PI) / 60) * time) / 8 +
      Math.sin(((2 * Math.PI) / 60) * time) * randomFactors[index][0];
    const y =
      Math.cos(((2 * Math.PI) / 60) * time) / 8 +
      Math.cos(((2 * Math.PI) / 60) * time) * randomFactors[index][1];
    const translation = [x, y];

    gl.uniform2fv(
      programInfo.uniformLoc[`V${index + 1}Translation`],
      translation
    );

    gl.drawArrays(gl.TRIANGLES, 0, ncols * nrows * 6);
  });

  time += 1 / 60;
  requestAnimationFrame(() => {
    redrawPolyPlane(gl, programInfo, pairs, ncols, nrows, time, randomFactors);
  });
}
