/* Get plugin Info */

export default function pluginInfo() {
  if (!navigator.plugins) {
    return null
  }
  const pluginLookup = [
    'Google Talk Plugin Video Renderer',
    'Google Talk Plugin',
    'Java Applet Plug-in',
    'QuickTime Plug-in 7.7.3',
    'Default Browser Helper',
    'Shockwave Flash',
    'AdobeAAMDetect',
    'AdobeExManDetect',
    'iPhotoPhotocast',
    'SharePoint Browser Plug-in',
    'Google Earth Plug-in',
    'RealPlayer Plugin.plugin',
    'DivX Web Player',
    'Wacom Pressure Plug-In',
    'Microsoft Office Live Plug-in',
    'Widevine Content Decryption Module',
    'Chrome Remote Desktop Viewer',
    'Chrome PDF Viewer',
    'Native Client',
    'Google Talk Plugin Video Renderer',
    'Unity Player',
    'Default Browser Helper',
    'Silverlight Plug-In',
    'Wacom Tablet Plug-In',
    'WebKit-integrierte PDF'
  ]
  return pluginLookup.filter((plugin) => {
    if (navigator.plugins[plugin] !== undefined) {
      return true
    }
    return false
  })
}
