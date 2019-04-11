import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Documents from './documents';

import { fetch, upload, selectFiles } from '../../reducers/storage';

const FormControls = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 25px;
    padding: 9px 9px 6px 9px;
    border: 1px solid lightgrey;
    border-radius: 5px;
`;

const UploadControls = styled.div`
    display: flex;
    align-items: baseline;
`;

class Home extends Component {
    state = {
        filter: '',
    };

    constructor(props) {
        super(props);

        this.onChangeDebounced = window._.debounce(this.onChangeDebounced, 250);
    }

    componentDidMount() {
        this.props.fetch();
    }

    onChangeDebounced({ target }) {
        this.setState({ filter: target.value });
    }

    render() {
        return (
            <section>
                <Documents
                    collection={this.props.files}
                    filter={this.state.filter}
                />
                <FormControls>
                    <UploadControls>
                        <div>
                            <input
                                type="file"
                                id="file"
                                onChange={e =>
                                    this.props.selectFiles(e.target.files)
                                }
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!this.props.selected}
                                onClick={() =>
                                    this.props
                                        .upload()
                                        .then(() => {
                                            document.getElementById(
                                                'file'
                                            ).value = '';
                                        })
                                        .then(this.props.fetch)
                                }
                            >
                                Upload
                            </button>
                        </div>
                    </UploadControls>
                    <div>
                        <label
                            className="documents__form-controls__label"
                            htmlFor="filter"
                        >
                            <span>Filter:</span>
                            <input
                                id="filter"
                                name="filter"
                                type="text"
                                onChange={e => {
                                    e.persist();
                                    this.onChangeDebounced(e);
                                }}
                            />
                        </label>
                    </div>
                </FormControls>
            </section>
        );
    }
}

Home.defaultProps = {
    files: [],
    selected: null,
};

Home.propTypes = {
    files: PropTypes.arrayOf(PropTypes.object),
    selected: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    fetch: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
    selectFiles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ storage }) => ({
    busy: storage.busy,
    selected: storage.selected,
    files: storage.files,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetch,
            upload,
            selectFiles,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
