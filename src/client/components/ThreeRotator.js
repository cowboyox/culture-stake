import PropTypes from 'prop-types';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Group } from 'react-three-fiber/components';
import { Vector3 } from 'three';
import { useFrame } from 'react-three-fiber';

import { randomRange, randomFromArray } from '~/common/utils/random';

const ANIMATION_WAIT_MIN = 20 * 1000;
const ANIMATION_WAIT_MAX = 60 * 1000;

const eulerVector = new Vector3(Math.PI * 2, Math.PI * 2, Math.PI * 2);

const possibleRotations = [
  new Vector3(1, 0, 0),
  new Vector3(0, 1, 0),
  new Vector3(0, 0, 1),
];

const ThreeRotator = ({ children, ...props }) => {
  const ref = useRef();

  const [targetRotation, setTargetRotation] = useState(new Vector3());

  const animate = () => {
    const target = eulerVector
      .clone()
      .multiply(randomFromArray(possibleRotations));

    setTargetRotation(
      new Vector3()
        .fromArray([
          ref.current.rotation._x,
          ref.current.rotation._y,
          ref.current.rotation._z,
        ])
        .add(target),
    );
  };

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.setFromVector3(
      ref.current.rotation.toVector3().lerp(targetRotation, 0.01),
    );
  });

  useEffect(() => {
    const initialRotation = new Vector3().fromArray(props.rotation);
    setTargetRotation(initialRotation);
  }, [props.rotation]);

  useEffect(() => {
    let timeout;

    const nextAnimation = () => {
      timeout = setTimeout(() => {
        animate();
        nextAnimation();
      }, randomRange(ANIMATION_WAIT_MIN, ANIMATION_WAIT_MAX));
    };

    nextAnimation();

    return () => {
      clearTimeout(timeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense fallback={null}>
      <Group {...props} ref={ref}>
        {children}
      </Group>
    </Suspense>
  );
};

ThreeRotator.propTypes = {
  children: PropTypes.node.isRequired,
  rotation: PropTypes.array.isRequired,
};

export default ThreeRotator;
