const noOp = () => {}
const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
const localRegex = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/
const ipv6Regex = /^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/

export default function getIPs() {
  return new Promise((resolve, reject) => { // eslint-disable-line
    const ipList = {}
    if (typeof window === 'undefined') {
      return false
    }
    // compatibility for firefox and chrome
    let RTCPeerConnection = getRTCPeerConnection(window)
    // bypass naive webrtc blocking using an iframe
    if (!RTCPeerConnection) {
      const frame = getIframe().contentWindow
      RTCPeerConnection = getRTCPeerConnection(frame)
    }
    // minimal requirements for data connection
    const mediaConstraints = {
      optional: [{ RtpDataChannels: true }]
    }
    const servers = { iceServers: [{ urls: 'stun:stun.services.mozilla.com' }] }
    // construct a new RTCPeerConnection
    const pc = new RTCPeerConnection(servers, mediaConstraints)
    // listen for candidate events
    pc.onicecandidate = function (ice) {
      // skip non-candidate events
      if (ice.candidate) {
        const ipAddress = ipRegex.exec(ice.candidate.candidate)[1]
        ipList[ipAddress] = true
      }
    }
    // create a data channel
    pc.createDataChannel('')
    // create an offer sdp
    pc.createOffer((result) => {
      // console.log(result)
      // trigger the stun server request
      pc.setLocalDescription(result, noOp, noOp)
    }, noOp)

    setTimeout(() => {
      // read candidate info from local description
      const lines = pc.localDescription.sdp.split('\n')
      // console.log(lines)
      lines.forEach((line) => {
        if (line.indexOf('a=candidate:') === 0) {
          const ipAddress = ipRegex.exec(line)[1]
          ipList[ipAddress] = true
        }
        const ips = Object.keys(ipList)
        resolve(formatIps(ips))
      })
    }, 1000)
  })
}

function formatIps(ips) {
  const data = {}
  const local = []
  const ipv6 = []
  const live = []
  ips.forEach((ip) => {
    if (ip.match(localRegex)) {
      local.push(ip)
      data.local = local
    } else if (ip.match(ipv6Regex)) {
      ipv6.push(ip)
      data.ipv6 = ipv6
    } else {
      live.push(ip)
      data.public = live
    }
  })
  return data
}

function getRTCPeerConnection(context) {
  return context.RTCPeerConnection || context.mozRTCPeerConnection || context.webkitRTCPeerConnection
}

function getIframe() {
  let iframe = document.getElementById('data-frame')
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.id = 'data-frame'
    iframe.style.display = 'none'
    iframe.sandbox = 'allow-same-origin'
    document.body.appendChild(iframe)
  }
  return iframe
}
