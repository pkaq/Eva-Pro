import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';
import loading from '../../assets/loading.gif';
const Loader = ({ spinning, fullScreen }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <img src={loading}/>
      </div>
    </div>
  );
};

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
};

export default Loader;
