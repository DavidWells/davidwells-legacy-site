import screenInfo from './screenData'
import browserInfo from './browserData'
import pluginInfo from './pluginData'
import canvasInfo from './canvasData'
import fontsInfo from './fontData'
import webglInfo from './webglData'

let visitorData // cache
export default function getVisitorData() {
  if (visitorData) return visitorData
  visitorData = {
    canvas: canvasInfo(),
    fonts: fontsInfo(),
    browser: browserInfo(),
    plugins: pluginInfo(),
    screen: screenInfo(),
    webgl: webglInfo(),
  }
  return visitorData
}
