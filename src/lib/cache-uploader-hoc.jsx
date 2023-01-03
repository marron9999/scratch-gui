import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {defineMessages, intlShape, injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import log from '../lib/log';
import sharedMessages from './shared-messages';
const formatMessage = require('format-message');

import { loadCacheContent, enableCache, getCacheIds, getCacheInfo } from '../containers/sb3-loadcache.jsx';

import {
    LoadingState,
    LoadingStates,
    getIsLoadingCacheUpload,
    getIsShowingWithoutId,
    onLoadedProject,
    requestCacheUpload,
    doneCacheUpload
} from '../reducers/project-state';
import {setProjectTitle} from '../reducers/project-title';
import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';
import {
    closeFileMenu
} from '../reducers/menus';

const messages = defineMessages({
    loadError: {
        id: 'gui.projectLoader.loadError',
        defaultMessage: 'The project file that was selected failed to load.',
        description: 'An error that displays when a local project file fails to load.'
    }
});

/**
 * Higher Order Component to provide behavior for loading local project files into editor.
 * @param {React.Component} WrappedComponent the component to add project file loading functionality to
 * @returns {React.Component} WrappedComponent with project file loading functionality added
 *
 * <CacheUploaderHOC>
 *     <WrappedComponent />
 * </CacheUploaderHOC>
 */
const CacheUploaderHOC = function (WrappedComponent) {
    class CacheUploaderComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'createFileObjects',
                'getProjectTitleFromFilename',
                'handleFinishedLoadingUpload',
                'handleStartSelectingCacheUpload',
                'handleChange',
                'onload',
                'removeFileObjects'
            ]);
        }
        componentDidUpdate (prevProps) {
            if (this.props.isLoadingCacheUpload && !prevProps.isLoadingCacheUpload) {
                this.handleFinishedLoadingUpload(); // cue step 5 below
            }
            if (this.props.loadingState == LoadingState.VM_CACHE_WITH_ID
            && 　prevProps.loadingState != LoadingState.VM_CACHE_WITH_ID) {
	            this.handleChange (this.props.cacheId);
            }
        }
        componentWillUnmount () {
            this.removeFileObjects();
        }
        // step 1: this is where the upload process begins
        handleStartSelectingCacheUpload (cacheId) {
//            this.createFileObjects(); // go to step 2

            this.handleChange (cacheId);
        }

//        // step 2: create a FileReader and an <input> element, and issue a
//        // pseudo-click to it. That will open the file chooser dialog.
        createFileObjects () {
//            // redo step 7, in case it got skipped last time and its objects are
//            // still in memory
//            this.removeFileObjects();
//            // create fileReader
//            this.fileReader = new FileReader();
//            this.fileReader.onload = this.onload;
//            // create <input> element and add it to DOM
//            this.inputElement = document.createElement('input');
//            this.inputElement.accept = '.sb,.sb2,.sb3';
//            this.inputElement.style = 'display: none;';
//            this.inputElement.type = 'file';
//            this.inputElement.onchange = this.handleChange; // connects to step 3
//            document.body.appendChild(this.inputElement);
//            // simulate a click to open file chooser dialog
//            this.inputElement.click();
        }

        // step 3: user has picked a file using the file chooser dialog.
        // We don't actually load the file here, we only decide whether to do so.
        handleChange (cacheId) {
            const {
                intl,
                isShowingWithoutId,
                loadingState,
                projectChanged,
                userOwnsProject
            } = this.props;
//            const thisFileInput = e.target;
//            if (thisFileInput.files) { // Don't attempt to load if no file was selected
//                this.fileToUpload = thisFileInput.files[0];
//
//                // If user owns the project, or user has changed the project,
//                // we must confirm with the user that they really intend to
//                // replace it. (If they don't own the project and haven't
//                // changed it, no need to confirm.)
//                let uploadAllowed = true;
//                if (userOwnsProject || (projectChanged && isShowingWithoutId)) {
//                    uploadAllowed = confirm( // eslint-disable-line no-alert
//                        intl.formatMessage(sharedMessages.replaceProjectWarning)
//                    );
//                }
//                if (uploadAllowed) {
//                    // cues step 4
//                    this.props.requestProjectUpload(loadingState);
//                } else {
//                    // skips ahead to step 7
//                    this.removeFileObjects();
//                }
//                this.props.closeFileMenu();
//            }
            this.props.closeFileMenu();
            this.handleFinishedLoadingUpload(cacheId);
        }

        // step 4 is below, in mapDispatchToProps

//        // step 5: called from componentDidUpdate when project state shows
//        // that project data has finished "uploading" into the browser
        handleFinishedLoadingUpload (cacheId) {
//            if (this.fileToUpload && this.fileReader) {
//                // begin to read data from the file. When finished,
//                // cues step 6 using the reader's onload callback
//                this.fileReader.readAsArrayBuffer(this.fileToUpload);
//            } else {
//                this.props.cancelCacheUpload(this.props.loadingState);
//                // skip ahead to step 7
//                this.removeFileObjects();
//            }
            this.fileToUpload = null;
            this.fileReader = null;
            let ids = getCacheIds();
            let info = getCacheInfo(cacheId);
            console.log("CacheUploaderHOC:" + info.filename + "," + info.uniqueId);
            loadCacheContent(info.cacheId, function(id, content) {
                this.fileToUpload = { name: info.filename };
                this.fileReader = { result: content };
                this.getProjectTitleFromFilename (info.filename);
                this.onload();
            }.bind(this), function() {
                this.props.cancelCacheUpload(this.props.loadingState);
            }.bind(this));
        }

        // used in step 6 below
        getProjectTitleFromFilename (fileInputFilename) {
            if (!fileInputFilename) return '';
            // only parse title with valid scratch project extensions
            // (.sb, .sb2, and .sb3)
            const matches = fileInputFilename.match(/^(.*)\.sb[23]?$/);
            if (!matches) return '';
            return matches[1].substring(0, 100); // truncate project title to max 100 chars
        }
        // step 6: attached as a handler on our FileReader object; called when
        // file upload raw data is available in the reader
        onload () {
            if (this.fileReader) {
                this.props.onLoadingStarted();
                const filename = this.fileToUpload && this.fileToUpload.name;
                let loadingSuccess = false;
                enableCache(false);
                let _this = this;
                this.props.vm.loadProject(this.fileReader.result)
                    .then(() => {
                        if (filename) {
                            const uploadedProjectTitle = _this.getProjectTitleFromFilename(filename);
                            _this.props.onSetProjectTitle(uploadedProjectTitle);
                        }
                        loadingSuccess = true;
                    })
                    .catch(error => {
                        log.warn(error);
                        alert(_this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                    })
                    .then(() => {
                        _this.props.onLoadingFinished(LoadingState.VM_CACHE_WITH_ID, loadingSuccess);
                        // go back to step 7: whether project loading succeeded
                        // or failed, reset file objects
                        _this.removeFileObjects();
                        enableCache(true);
                    });
            }
        }

//        // step 7: remove the <input> element from the DOM and clear reader and
//        // fileToUpload reference, so those objects can be garbage collected
        removeFileObjects () {
//            if (this.inputElement) {
//                this.inputElement.value = null;
//                document.body.removeChild(this.inputElement);
//            }
//            this.inputElement = null;
//            this.fileReader = null;
//            this.fileToUpload = null;
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                cancelCacheUpload,
                closeFileMenu: closeFileMenuProp,
                isLoadingCacheUpload,
                isShowingWithoutId,
                loadingState,
                cacheId,
                onLoadingFinished,
                onLoadingStarted,
                onSetProjectTitle,
                projectChanged,
                requestCacheUpload: requestCacheUploadProp,
                userOwnsProject,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        onStartSelectingCacheUpload={this.handleStartSelectingCacheUpload}
                        {...componentProps}
                    />
                </React.Fragment>
            );
        }
    }

    CacheUploaderComponent.propTypes = {
        canSave: PropTypes.bool,
        cancelCacheUpload: PropTypes.func,
        closeFileMenu: PropTypes.func,
        intl: intlShape.isRequired,
        isLoadingCacheUpload: PropTypes.bool,
        isShowingWithoutId: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        cacheId: PropTypes.number,
        onLoadingFinished: PropTypes.func,
        onLoadingStarted: PropTypes.func,
        onSetProjectTitle: PropTypes.func,
        projectChanged: PropTypes.bool,
        requestCacheUpload: PropTypes.func,
        userOwnsProject: PropTypes.bool,
        vm: PropTypes.shape({
            loadProject: PropTypes.func
        })
    };
    const mapStateToProps = (state, ownProps) => {
        const loadingState = state.scratchGui.projectState.loadingState;
        const cacheId = state.scratchGui.projectState.cacheId;
        const user = state.session && state.session.session && state.session.session.user;
        return {
            isLoadingCacheUpload: getIsLoadingCacheUpload(loadingState),
            isShowingWithoutId: getIsShowingWithoutId(loadingState),
            loadingState: loadingState,
            cacheId: cacheId,
            projectChanged: state.scratchGui.projectChanged,
            userOwnsProject: ownProps.authorUsername && user &&
                (ownProps.authorUsername === user.username),
            vm: state.scratchGui.vm
        };
    };
    const mapDispatchToProps = (dispatch, ownProps) => ({
        cancelCacheUpload: loadingState => dispatch(onLoadedProject(loadingState, false, false)),
        closeFileMenu: () => dispatch(closeFileMenu()),
        // transition project state from loading to regular, and close
        // loading screen and file menu
        onLoadingFinished: (loadingState, success) => {
            dispatch(onLoadedProject(loadingState, ownProps.canSave, success));
            dispatch(closeLoadingProject());
            dispatch(closeFileMenu());
        },
        // show project loading screen
        onLoadingStarted: () => dispatch(openLoadingProject()),
        onSetProjectTitle: title => dispatch(setProjectTitle(title)),
        // step 4: transition the project state so we're ready to handle the new
        // project data. When this is done, the project state transition will be
        // noticed by componentDidUpdate()
        requestCacheUpload: loadingState => dispatch(requestCacheUpload(loadingState))
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(CacheUploaderComponent));
};

const detectCacheId = queryParams => {
    const cacheId = Array.isArray(queryParams.cache) ?
        queryParams.cache[0] :
        queryParams.cache;
    if (typeof cacheId === 'undefined') return null;
    return parseInt(cacheId);
};

export {
    CacheUploaderHOC as default,
    detectCacheId
};
