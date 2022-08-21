import setShaderPrograms from "./shaders.js";

// Function to initialize shader program
export default function initProgram(gl, centralPairs) {
  gl.clearColor(0, 0, 0, 1); // Set clear color to black
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear the canvas with the clear color setted

  // Function to create shaders
  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      alert(`Shader compilation error: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // Create vertex and fragment shaders
  const [vsSource, fsSource] = setShaderPrograms(centralPairs);

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Function to create a shader program (which link the vertex and fragment shaders)
  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      alert(`Shader program creation failed: ${gl.getProgramInfoLog(program)}`);
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  // Create shader program
  const shaderProgram = createProgram(gl, vertexShader, fragmentShader);

  // Get attribute and uniform locations in the shader program
  const programInfo = {
    program: shaderProgram,
    attributesLoc: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      color: gl.getAttribLocation(shaderProgram, "aColor"),
    },
    uniformLoc: {
      resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
    },
  };

  // Get internal vertices translation uniform locations
  for (let m = 1; m <= centralPairs.length; m++) {
    programInfo.uniformLoc[`V${m}Translation`] = gl.getUniformLocation(
      shaderProgram,
      `uTranslateV${m}`
    );
  }

  return programInfo;
}
