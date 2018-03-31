import React from 'react';
import PropTypes from 'prop-types';


/**
 * This function is used to return inline svg icon of given type with given class assigned to it
 * @param {Object} props The props object contains two keys icon and iconClass
 * example {'icon': 'close', 'iconClass': 'close'}
 */
const Icon = (props) => {
  const iconList = {
    close: `M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41
            1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59
            5.59 5.59 1.41-1.41-5.59-5.59z`,
    restore: `M19,4C20.11,4 21,4.9 21,6V18A2,2 0 0,1 19,
              20H5C3.89,20 3,19.1 3,18V6A2,2 0 0,1 5,
              4H19M19,18V8H5V18H19Z`,
    minimize: 'M19 13H5v-2h14v2z',
  };

  //  viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"

  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      className={`icon ${props.iconClass}`}
    >
      <g>
        <path d={iconList[props.icon]} />
      </g>
    </svg>);
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
};

Icon.defaultProps = {
  iconClass: '',
};

export default Icon;
