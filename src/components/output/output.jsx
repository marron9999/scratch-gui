import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {injectIntl} from 'react-intl';
import styles from './output.css';

const Output = ({}) => (
    <div className={styles.outputContainer}>
    <div className={styles.outputBody}>
    </div>
    <div className={styles.outputBody2}>
    </div>
    </div>
);

Output.propTypes = {
};

Output.defaultProps = {
};

export default injectIntl(Output);
