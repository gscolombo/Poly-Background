// Function to set UI controller of vertice attributes
export default function setUI(
  gl,
  programInfo,
  ncols,
  nrows,
  pairs,
  direction = "X"
) {
  const form = document.querySelector("form#ui");

  pairs.forEach((pair, index) => {
    // Set UI input for each internal vertex
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.textContent = direction + (index + 1);
    input.type = "range";
    input.value = direction == "X" ? pair[0] : pair[1];
    input.max = direction == "X" ? gl.canvas.width : gl.canvas.height;
    input.min = -input.max;
    label.appendChild(input);
    form.appendChild(label);

    // Set input event
    input.addEventListener("input", (event) => {
      const offset = event.currentTarget.value / (event.currentTarget.max * 8);
      console.log(offset);

      gl.uniform2fv(programInfo.uniformLoc[`V${index + 1}Translation`], [
        offset,
        0,
      ]);

      gl.drawArrays(gl.TRIANGLES, 0, ncols * nrows * 6);
    });
  });
}
