import PropTypes from 'prop-types';
import React, { Suspense, Fragment, useState } from 'react';
import styled from 'styled-components';

import Navigation from '~/client/components/Navigation';
import ThreeButtonInfo from '~/client/components/ThreeButtonInfo';
import ThreeButtonLogo from '~/client/components/ThreeButtonLogo';
import ThreeButtonNavigation from '~/client/components/ThreeButtonNavigation';
import ThreeCanvas from '~/client/components/ThreeCanvas';
import ThreeRotator from '~/client/components/ThreeRotator';
import styles from '~/client/styles/variables';

const ThreeInterface = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  const onClickLogo = () => {
    if (props.onClickLogo) {
      props.onClickLogo();
    }
  };

  const onClickNavigation = () => {
    setIsExpanded(!isExpanded);

    if (props.onClickNavigation) {
      props.onClickNavigation(isExpanded);
    }
  };

  const onClickInfo = () => {
    setIsInfoExpanded(!isInfoExpanded);

    if (props.onClickInfo) {
      props.onClickInfo();
    }
  };

  return (
    <Fragment>
      {props.isShowingHome ? (
        <ThreeInterfaceElement left top onClick={onClickLogo}>
          <ThreeRotator rotation={[3.5, -0.6, 0]}>
            <ThreeButtonLogo />
          </ThreeRotator>
        </ThreeInterfaceElement>
      ) : null}

      <ThreeInterfaceElement right top onClick={onClickNavigation}>
        <ThreeRotator rotation={[3.5, 0.3, 0]}>
          <ThreeButtonNavigation isExpanded={isExpanded} />
        </ThreeRotator>
      </ThreeInterfaceElement>

      {props.isShowingInfo ? (
        <ThreeInterfaceElement bottom left onClick={onClickInfo}>
          <ThreeRotator rotation={[3, -0.5, -0.1]}>
            <ThreeButtonInfo isExpanded={isInfoExpanded} />
          </ThreeRotator>
        </ThreeInterfaceElement>
      ) : null}

      {isExpanded ? <Navigation /> : null}
    </Fragment>
  );
};

const ThreeInterfaceElement = (props) => {
  return (
    <ThreeInterfaceElementStyle {...props}>
      <ThreeCanvas>
        <Suspense fallback={null}>{props.children}</Suspense>
      </ThreeCanvas>
    </ThreeInterfaceElementStyle>
  );
};

ThreeInterface.propTypes = {
  isShowingHome: PropTypes.bool,
  isShowingInfo: PropTypes.bool,
  onClickInfo: PropTypes.func,
  onClickLogo: PropTypes.func,
  onClickNavigation: PropTypes.func,
};

ThreeInterfaceElement.propTypes = {
  bottom: PropTypes.bool,
  children: PropTypes.node.isRequired,
  left: PropTypes.bool,
  offset: PropTypes.number,
  right: PropTypes.bool,
  top: PropTypes.bool,
};

const ThreeInterfaceElementStyle = styled.div`
  position: fixed;

  ${(props) => (props.top ? 'top: 0;' : '')}
  ${(props) => (props.right ? 'right: 0;' : '')}
  ${(props) => (props.bottom ? 'bottom: 0;' : '')}
  ${(props) => (props.left ? 'left: 0;' : '')}

  z-index: ${styles.layers.ThreeInterfaceElement};

  width: 6.5rem;
  height: 6.5rem;

  margin: 1rem;

  cursor: pointer;
`;

export default ThreeInterface;
