/* fork of https://github.com/TiuSh/react-simple-breadcrumb/ */
import React from 'react'
import BreadcrumbItem from './item'
import styles from './Breadcrumbs.css'

/**
<Breadcrumb
  getUrlFromPathSegments={function getUrlFromPathSegments(pathSegments) {
    return 'https://github.com/TiuSh/react-simple-breadcrumb/tree/master/' + pathSegments.join('/');
  }}
  path="example/src/example.jsx"
/>
*/

const Breadcrumbs = ({
  path,
  pathRoot,
  pathSeparator,
  getUrlFromPathSegments,
  onClick,
  className
}) => {
  const pathArray = explodePath(path, pathSeparator)
  return (
    <ul className={`${styles.breadcrumbs} ${className}`}>
      {pathRoot ? (
        <li
          key='root'
          className={`${styles.item} ${styles.basePath}`}
        >
          <span className={styles.itemInner}>
            <BreadcrumbItem
              label={pathRoot}
              pathSegments={[]}
              {...{ getUrlFromPathSegments, onClick }}
            />
          </span>
        </li>
        ) : null}

      {pathArray.map((segment, id) => {
        const pathSegments = pathArray.map(encodeURIComponent).slice(0, id + 1)
        const active = (pathArray.length === id + 1) ? styles.current : ''
        return (
          <li
            key={id}
            className={`${styles.item} ${active}`}
          >
            <span className={styles.itemInner}>
              <BreadcrumbItem
                label={segment}
                pathSegments={pathSegments}
                {...{ getUrlFromPathSegments, onClick }}
              />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

Breadcrumbs.propTypes = {
  path: React.PropTypes.string.isRequired,
  pathSeparator: React.PropTypes.string,
  pathRoot: React.PropTypes.string,
  getUrlFromPathSegments: React.PropTypes.func,
  onClick: React.PropTypes.func,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
}

Breadcrumbs.defaultProps = {
  pathSeparator: '/',
  getUrlFromPathSegments: pathSegments => {
    const link = `/${pathSegments.join('/')}`
    return link
  },
}

export default Breadcrumbs

/**
 * Removes spaces and the given character from both sides of the string
 *
 * @param {String} path The path to be trimed
 * @param {String} char The character trime with spaces
 *
 * @returns {String} The trimed string
 */

const trimPath = (path, char = '/') => {
  const escapedString = char.replace(/[\[\](){}?*+\^$\\.|\-]/g, '\\$&')

  return path.replace(
    new RegExp(`^[ ${escapedString}]+|[ ${escapedString}]+$`, 'g'),
    ''
  )
}
/**
 * Create an array of segments from a path
 *
 * @param {String} path The path
 * @param {String} pathSeparator The separator used in the path
 *
 * @returns {Array} An array of segments
 */
const explodePath = (path, pathSeparator) => {
  const trimedPath = trimPath(path, pathSeparator)

  if (trimedPath === '') {
    return []
  }

  return trimedPath.split(pathSeparator)
}
