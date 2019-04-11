import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetch, remove } from '../../reducers/storage';

const DocumentListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    background-color: #f0f8ff;
    border: 1px solid lightblue;
    border-radius: 5px;
`;

const DocumentListItemActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 12%;
`;

const DocumentListItemDelete = styled.div`
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
`;

class Document extends Component {
    render() {
        const {
            item: { id, hash, filename },
        } = this.props;

        return (
            <DocumentListItem>
                <div>
                    {filename.substring(0, 25)}
                    {filename.length > 25 ? '...' : ''}
                </div>
                <DocumentListItemActions>
                    <i
                        role="presentation"
                        className="fas fa-download"
                        onClick={() => {
                            window.top.location.href = `/download/${hash}`;
                        }}
                    />
                    <DocumentListItemDelete
                        onClick={() =>
                            this.props.remove(id).then(this.props.fetch)
                        }
                    >
                        &times;
                    </DocumentListItemDelete>
                </DocumentListItemActions>
            </DocumentListItem>
        );
    }
}

Document.propTypes = {
    item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    fetch: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetch,
            remove,
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(Document);
