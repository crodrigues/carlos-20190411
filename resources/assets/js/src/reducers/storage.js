import axios from 'axios';

export const FILE_SELECTIONS_SET = 'Files selected for upload';
export const FILE_SELECTIONS_CLEAR = 'Selected files cleared';
export const FETCH_REQUEST = 'Request to update document list';
export const FETCH_REQUEST_COMPLETE = 'Finished fetching document list';
export const UPLOAD_REQUEST = 'Request to upload document';
export const UPLOAD_REQUEST_COMPLETE = 'Finished uploading document';
export const DELETE_REQUEST = 'Request to delete document';
export const DELETE_REQUEST_COMPLETE = 'Finished deleting document';

const initialState = {
    busy: false,
    selected: null,
    files: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FILE_SELECTIONS_SET:
            return {
                ...state,
                selected: payload,
            };

        case FILE_SELECTIONS_CLEAR:
            return {
                ...state,
                selected: null,
            };

        case DELETE_REQUEST:
        case UPLOAD_REQUEST:
        case UPLOAD_REQUEST_COMPLETE:
            return {
                ...state,
                busy: !state.busy,
            };

        case DELETE_REQUEST_COMPLETE:
            return {
                ...state,
                busy: !state.busy,
                files: state.files.filter(file => file.id !== payload),
            };

        case FETCH_REQUEST_COMPLETE:
            return {
                ...state,
                files: payload.data,
            };

        default:
            return state;
    }
};

export const selectFiles = files => dispatch => {
    dispatch({
        type: FILE_SELECTIONS_SET,
        payload: files,
    });
};

export const fetch = () => dispatch => {
    dispatch({
        type: FETCH_REQUEST,
    });

    return axios.get('/api/list').then(response => {
        dispatch({
            type: FETCH_REQUEST_COMPLETE,
            payload: response,
        });
    });
};

export const upload = () => (dispatch, getState) => {
    const {
        storage: { selected },
    } = getState();

    const formData = new FormData();

    formData.append('document', selected[0]);

    dispatch({
        type: UPLOAD_REQUEST,
    });

    dispatch({
        type: FILE_SELECTIONS_CLEAR,
    });

    return axios
        .post('/api/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            dispatch({
                type: UPLOAD_REQUEST_COMPLETE,
                payload: response,
            });
        });
};

export const remove = id => (dispatch, getState) => {
    dispatch({
        type: DELETE_REQUEST,
    });

    const document = getState().storage.files.find(file => file.id === id);

    if (document) {
        return axios.get(`/api/delete/${document.hash}`).then(() => {
            dispatch({
                type: DELETE_REQUEST_COMPLETE,
                payload: id,
            });
        });
    }
};
