export default function searchReducer( state=[], action) {
    switch (action.type) {
        case 'search':
            return action.data;
        default:
            return state
    }
}