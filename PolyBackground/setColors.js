// Function to set random colors into the GPU buffer
export default function setColors(gl, ncols, nrows) {
  let colors = [];
  for (let i = 0; i < ncols * nrows * 2; i++) {
    const c1 = Math.ceil(Math.random() * (30 - 0));

    colors.push(c1, c1, c1, 255);
    colors.push(c1, c1, c1, 255);
    colors.push(c1, c1, c1, 255);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.DYNAMIC_DRAW);
}
