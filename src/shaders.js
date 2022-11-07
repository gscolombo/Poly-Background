// Function to write shader programs
export default function setShaderPrograms(centralPairs) {
  let positionsUniforms = [],
    m = 1;
  while (m <= centralPairs.length) {
    positionsUniforms.push(`uTranslateV${m}`);
    m++;
  }

  // Template string to declare internal vertex translation uniforms
  const positionsUniformsText = positionsUniforms
    .map((uniform) => `uniform vec2 ${uniform}; \n\t`)
    .join("");

  // Template string for individual internal vertex translation setting
  const setInternalVertexPosition = centralPairs
    .map((pair, index) => {
      if (index == centralPairs.length - 1) {
        return `
            if (aVertexPosition == vec2(${pair})) {
                gl_Position = vec4(clipSpacePosition + ${positionsUniforms[index]}, 0, 1);
            }`;
      } else {
        return `
            if (aVertexPosition == vec2(${pair})) {
                gl_Position = vec4(clipSpacePosition + ${positionsUniforms[index]}, 0, 1);
            } else `;
      }
    })
    .join("");

  // Vertex shader program
  const vsSource = `
    attribute vec2 aVertexPosition;
    attribute vec4 aColor;
    
    uniform vec2 uResolution;
    
    // Declare internal vertex translation uniforms
    ${positionsUniformsText} 
    
    varying vec4 vColor;
    
    void main() {
        // Convert the position from pixels to the interval [-1,1] (clip space interval)
        vec2 clipSpacePosition = (((aVertexPosition / uResolution) * 2.0) - 1.0);

        vColor = aColor;
        
        // Check and set individual internal vertex translation
        ${setInternalVertexPosition}
            else {
                gl_Position = vec4(clipSpacePosition, 0, 1);
            }
    }
    `;

  console.log(vsSource);

  const fsSource = `
    precision mediump float;
    
    varying vec4 vColor;
    
    void main() {
        gl_FragColor = vColor;
    }
    `;

  return [vsSource, fsSource];
}
