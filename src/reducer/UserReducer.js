export default function userReducer( state=null, action) {
    switch (action.type) {
        case 'login':
            return action.payload;
        default:
            return state
    }
}