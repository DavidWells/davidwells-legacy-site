import React, { PropTypes } from 'react'
import styles from './Video.css'

const Video = ({ video }) => {
  return (
    <div>
      <video className={styles.video} autoPlay loop poster='http://serverless.com/images/video_poster.png'>
        <source
          src={video}
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

Video.defaultProps = {
  video: 'http://serverless.com/video/serverless_framework_intro_v2.mp4'
}
Video.propTypes = {
  children: PropTypes.element
}

export default Video
