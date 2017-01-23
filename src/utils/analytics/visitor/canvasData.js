/* Get Canvas Info */
import crc32 from '../utils/crc32'

let canvasCache

export default function canvasInfo() {
  if (canvasCache !== undefined) {
    return canvasCache
  }

  const canvas = document.createElement('canvas')
  canvas.width = 280
  canvas.height = 60
  canvas.dir = 'ltr'
  canvas.style.display = 'none'

  document.body.appendChild(canvas)
  const c = canvas.getContext('2d')
  const text = 'Visitor is watching you'
  c.fillStyle = 'rgb(178, 214, 232)'
  c.fillRect(10, 20, 60, 80)
  c.fillStyle = '#111'
  c.font = '16pt Arial'
  c.fillText(text, 2, 40)
  c.strokeStyle = 'rgb(120, 186, 176)'
  c.arc(80, 10, 20, 0, Math.PI)
  c.stroke()
  const imageData = c.getImageData(0, 0, 280, 60)
  document.body.removeChild(canvas)

  // the md5 implementation is very slow in safari, so crc32 is used.
  const result = crc32(imageData.data).toString()
  canvasCache = result

  return result
}
