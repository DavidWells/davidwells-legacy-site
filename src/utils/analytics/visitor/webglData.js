/* Get webglInfo Info */
export default function webglInfo() {
  const canvas = document.createElement('canvas')
  const gl = getGlContext(canvas)
  const output = {}

  if (gl === null) {
    return null
  }
  /*
    Get all WebGL parameters
    see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.1
  */
  const webglParameters = [
    'VENDOR',
    'RENDERER',
    'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
    'MAX_CUBE_MAP_TEXTURE_SIZE',
    'MAX_FRAGMENT_UNIFORM_VECTORS',
    'MAX_RENDERBUFFER_SIZE',
    'MAX_TEXTURE_IMAGE_UNITS',
    'MAX_TEXTURE_SIZE',
    'MAX_VARYING_VECTORS',
    'MAX_VERTEX_ATTRIBS',
    'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
    'MAX_VERTEX_UNIFORM_VECTORS',
    'RED_BITS',
    'GREEN_BITS',
    'BLUE_BITS',
    'ALPHA_BITS',
    'DEPTH_BITS',
    'STENCIL_BITS',
  ]
  output.parameters = {}

  webglParameters.forEach((param) => {
    if (gl[param.toUpperCase()] !== 'undefined') {
      output.parameters[param.toLowerCase()] = gl.getParameter(gl[param.toUpperCase()])
    }
  })

  /* Find all WebGL extensions */
  output.extensions = gl.getSupportedExtensions()

  return output
}

function getGlContext(canvas) {
  if (!window.WebGLRenderingContext) {
    return null
  }
  let context = null
  try {
    context = canvas.getContext('webgl') ||
    canvas.getContext('moz-webgl') ||
    canvas.getContext('experimental-webgl') ||
    canvas.getContext('webkit-3d')
  } catch (err) {
    // nil
  }

  return context
}
