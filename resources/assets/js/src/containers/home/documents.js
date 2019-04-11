import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Document from './document';

const DocumentList = styled.div`
    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-gap: 15px 3.5%;
    padding: 15px;
    margin: 25px;
    background-color: #f4f9ff;
    border: 2px solid lightblue;
    border-radius: 5px;
`;

const DocumentListEmpty = styled.span`
    color: dimgray;
`;

export default function Documents({ filter, collection }) {
    return (
        <DocumentList>
            {collection.length ? (
                collection
                    .filter(
                        item =>
                            !filter.trim() ||
                            item.filename.includes(filter.trim())
                    )
                    .map(item => <Document key={item.hash} item={item} />)
            ) : (
                <DocumentListEmpty>Select a file to upload</DocumentListEmpty>
            )}
        </DocumentList>
    );
}

Documents.defaultProps = {
    filter: '',
};

Documents.propTypes = {
    filter: PropTypes.string,
    collection: PropTypes.arrayOf(PropTypes.object).isRequired,
};
