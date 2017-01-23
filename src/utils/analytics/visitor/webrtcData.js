export default function webrtcInfo(cb) {
  const output = {
    enumeration: false
  }
  const mediaStream = window.MediaStreamTrack
  if (mediaStream && mediaStream.getSources !== 'undefined') {
    mediaStream.getSources((sources) => {
      output.sources = sources
      output.enumeration = true
      cb(output)
    })
  } else {
    cb(output)
  }
}
