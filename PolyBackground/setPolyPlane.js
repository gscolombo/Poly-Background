import { getInternalCoordinates } from "./handleInternalVertices.js";

// Function to set a plane made of triangles accordingly to the number of columns and rows provided
export default function setPolygonalPlane(gl, ncols, nrows) {
  // Set the dimensions to distribute the vertices in the plane
  const colWidth = Math.ceil(gl.canvas.width / ncols);
  const rowHeight = Math.ceil(gl.canvas.height / nrows);

  // Set the position vertices of the plane for each triangle
  let i = 0;
  let positions = [];

  while (i < nrows) {
    let y1 = rowHeight * i; // first y coordinate
    let y2 = y1 + rowHeight; // second y coordinate
    let j = 0;
    while (j < ncols) {
      let x1 = colWidth * j; //first x coordinate
      let x2 = x1 + colWidth; //second x coordinate
      positions.push(x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2);
      j++;
    }
    i++;
  }

  const centralPoints = getInternalCoordinates(gl, positions, 1);

  // Add the vertice position data to the GPU buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);

  return [positions, centralPoints];
}
