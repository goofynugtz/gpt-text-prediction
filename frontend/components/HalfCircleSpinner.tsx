import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HalfSpinner = styled.span`
  width: ${(props:any) => props.size}px;
  height: ${(props:any) => props.size}px;
  border-radius: 100%;
  position: relative;
  * {
    box-sizing: border-box;
  }
  .circle {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(${(props:any) => props.size}px / 10) solid transparent;
  }
  .circle.circle-1 {
    // border-top-color: ${(props:any) => props.color};
    animation: half-circle-spinner-animation
      ${(props:any) => props.animationDuration}ms infinite;
  }
  .circle.circle-2 {
    // border-bottom-color: ${(props:any) => props.color};
    animation: half-circle-spinner-animation
      ${(props:any) => props.animationDuration}ms infinite alternate;
  }
  @keyframes half-circle-spinner-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const propTypes = {
  size: PropTypes.number,
  animationDuration: PropTypes.number,
  // color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

const HalfCircleSpinner = ({
  size = 60,
  // color = '#fff',
  animationDuration = 1000,
  className = '',
  style,
  ...props
}:any) => (
  <HalfSpinner
    size={size}
    // color={color}
    animationDuration={animationDuration}
    className={`half-circle-spinner${className ? ' ' + className : ''}`}
    style={style}
    {...props}
  >
    <div className="circle circle-1" />
    <div className="circle circle-2" />
  </HalfSpinner>
);

HalfCircleSpinner.propTypes = propTypes;

export default HalfCircleSpinner;