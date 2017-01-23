import React, { PropTypes } from 'react'
import TextLinePlaceholder from './TextLinePlaceholder'
import styles from './Paragraph.css' // eslint-disable-line

const Paragraph = ({ numberOfLines, marginBottom, lineHeight, className }) => {
  const lines = []
  const lineWidths = [99, 98, 97, 96, 95, 94, 93]
  const lastLineWidth = [80, 75, 70, 65, 60, 55, 50, 45, 40, 35]

  for (let i = 0; i < numberOfLines + 1; i++) {
    let width = lineWidths[Math.floor(Math.random() * lineWidths.length)]
    let setLineHeight = lineHeight
    if (i !== 0 && ((i % 5) === 0)) {
      width = lastLineWidth[Math.floor(Math.random() * lastLineWidth.length)]
      setLineHeight = marginBottom
    }

    lines.push(
      <TextLinePlaceholder key={i} width={width} marginBottom={setLineHeight} />
    )
  }
  const wrapperClass = styles.loadingParagraph
  const classes = (className) ? `${wrapperClass} ${className}` : wrapperClass
  return (
    <div className={classes}>
      {lines}
    </div>
  )
}

Paragraph.defaultProps = {
  numberOfLines: 5,
  lineHeight: 12,
  marginBottom: 30
}

Paragraph.propTypes = {
  numberOfLines: PropTypes.number,
  lineHeight: PropTypes.number,
  marginBottom: PropTypes.number,
  className: PropTypes.string,
}

export default Paragraph
