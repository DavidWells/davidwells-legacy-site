import React, { PropTypes } from 'react'
import Svg from 'react-svg-inline'
import twitterSVG from '../../assets/icons/twitter.svg'
import { twitterShare } from '../../utils/social/share'
import styles from './FixedSocialButtons.css'

const FixedSocialButtons = (props) => {
  const twitterURL = twitterShare(props.title, props.url, props.hashtags)
  return (
    <div className={styles.social}>
      <a href={twitterURL} target='_blank' rel='noopener noreferrer'>
        <Svg svg={twitterSVG} cleanup />
      </a>
    </div>
  )
}

FixedSocialButtons.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  hashtags: PropTypes.array,
}

export default FixedSocialButtons
