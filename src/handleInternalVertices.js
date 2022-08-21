// Function to manipulate internal coordinates without ripping the mesh
export function getInternalCoordinates(gl, positions, sizeFactor) {
  // Save x and y central coordinates and reorganize positions array as [x,y] pairs
  const positionPairs = [];
  const xCoordinates = [];
  const yCoordinates = [];
  let lastX, lastY;
  let j = 0;
  for (let i = 0; i < positions.length; i++) {
    const innerVertex = positions[i] > 0;
    const xVertex = i % 2 == 0 && positions[i] < gl.canvas.width * sizeFactor;
    const yVertex = i % 2 != 0 && positions[i] < gl.canvas.height * sizeFactor;

    // Save x and y central coordinates
    if (innerVertex) {
      if (xVertex) {
        if (lastX != positions[i] && !xCoordinates.includes(positions[i])) {
          xCoordinates.push(positions[i]);
        }
      } else if (yVertex) {
        if (lastY != positions[i] && !yCoordinates.includes(positions[i])) {
          yCoordinates.push(positions[i]);
        }
      }
    }

    // Reorganize positions array
    if (positions[j] !== undefined && positions[j + 1] !== undefined) {
      positionPairs.push([positions[j], positions[j + 1]]);
      j += 2;
    }
  }

  // Filter internal pairs
  let centralPairs = [];
  for (let m = 0; m < xCoordinates.length; m++) {
    const x = xCoordinates[m];
    for (let n = 0; n < yCoordinates.length; n++) {
      const y = yCoordinates[n];
      centralPairs.push([x, y]);
    }
  }

  // Restore unidimensional array
  positions = positionPairs.reduce((pair, next) => pair.concat(next));

  return centralPairs;
}
