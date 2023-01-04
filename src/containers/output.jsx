import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import Output from '../components/output/output.jsx';
import {outputClear, outputWrite} from '../components/output/output_io.jsx';

import {connect} from 'react-redux';

import VM from 'scratch-vm';

class OutputPane extends React.Component {
    constructor (props) {
        super(props);
		props.vm.runtime.outputClear = outputClear;
		props.vm.runtime.outputWrite = outputWrite;
    }
    render () {
        return (
            <Output />
        );
    }
}

OutputPane.propTypes = {
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => Object.assign(
    {
        vm: state.scratchGui.vm
    }
);

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OutputPane);
