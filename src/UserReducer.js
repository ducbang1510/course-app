export const reducer = ( state=null, action) => {
    if (action.login === 'login')
        return action.payload;

    return state
}