import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'react-redux';

import {detectTutorialId} from './tutorial-from-url';

import {activateDeck} from '../reducers/cards';
import {openTipsLibrary} from '../reducers/modals';

//{{ #5
import {detectCacheId} from './cache-uploader-hoc.jsx';
import {startCacheUpload} from '../reducers/project-state.js';
//}} #5

/* Higher Order Component to get parameters from the URL query string and initialize redux state
 * @param {React.Component} WrappedComponent: component to render
 * @returns {React.Component} component with query parsing behavior
 */
const QueryParserHOC = function (WrappedComponent) {
    class QueryParserComponent extends React.Component {
        constructor (props) {
            super(props);
            const queryParams = queryString.parse(location.search);
            const tutorialId = detectTutorialId(queryParams);
            if (tutorialId) {
                if (tutorialId === 'all') {
                    this.openTutorials();
                } else {
                    this.setActiveCards(tutorialId);
                }
            }
//{{ #5
            const cacheId = detectCacheId(queryParams);
            if (cacheId) {
                this.openCacheId(cacheId);
            }
//}} #5
        }
        setActiveCards (tutorialId) {
            this.props.onUpdateReduxDeck(tutorialId);
        }
        openTutorials () {
            this.props.onOpenTipsLibrary();
        }

//{{ #5
		openCacheId(cacheId) {
			this.props.onStartCacheUpload(cacheId);
		}
//}} #5

        render () {
            const {
                onOpenTipsLibrary, // eslint-disable-line no-unused-vars
                onUpdateReduxDeck, // eslint-disable-line no-unused-vars
//{{ #5
				onStartCacheUpload,
//}} #5
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    {...componentProps}
                />
            );
        }
    }
    QueryParserComponent.propTypes = {
        onOpenTipsLibrary: PropTypes.func,
        onUpdateReduxDeck: PropTypes.func
//{{ #5
		, onStartCacheUpload: PropTypes.func
//}} #5
    };
    const mapDispatchToProps = dispatch => ({
        onOpenTipsLibrary: () => {
            dispatch(openTipsLibrary());
        },
        onUpdateReduxDeck: tutorialId => {
            dispatch(activateDeck(tutorialId));
        }
//{{ #5
        , onStartCacheUpload: cacheId => {
            dispatch(startCacheUpload(cacheId));
        }
//}} #5
    });
    return connect(
        null,
        mapDispatchToProps
    )(QueryParserComponent);
};

export {
    QueryParserHOC as default
};
