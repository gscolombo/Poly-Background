// Function to draw accordingly with the shader program
export default function draw(gl, programInfo, buffers, angle = 0) {
  // Convert clip space values to screen space values (canvas display dimensions)
  gl.viewport(-100, -100, gl.canvas.width * 1.2, gl.canvas.height * 1.2);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the shader program to be used
  gl.useProgram(programInfo.program);

  // Enable the vertex position attribute of the vertex shader
  gl.enableVertexAttribArray(programInfo.attributesLoc.vertexPosition);

  // Bind the position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

  // Set how the attribute will get data from the position buffer
  let numComponents = 2;
  let type = gl.FLOAT;
  let normalize = false;
  let stride = 0;
  let offset = 0;

  gl.vertexAttribPointer(
    programInfo.attributesLoc.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  // Set random colors for each triangle
  gl.enableVertexAttribArray(programInfo.attributesLoc.color); // Enable color attribute
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color); // Bind color buffer to GPU buffer

  // Set how the color attribute will get data from the color buffer
  gl.vertexAttribPointer(
    programInfo.attributesLoc.color,
    4,
    gl.UNSIGNED_BYTE,
    true,
    0,
    0
  );

  // Set the shaders uniforms

  // Resolution uniform
  gl.uniform2f(
    programInfo.uniformLoc.resolution,
    gl.canvas.width,
    gl.canvas.height
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position); // Rebind positions buffer to GPU buffer the later transformations

  // Draw the plane
  gl.drawArrays(gl.TRIANGLES, 0, buffers.columns * buffers.rows * 6);
}
