const reducer = (state=null, action) => {
    switch(action.type){
        case 'NOTIFY':
            return action.message
        case 'CLEAR':
            return null
        default:
            return state
    }
}
let timer
export const setNotification = (message, time) => {
    return dispatch => {
        dispatch({type: 'NOTIFY', message })
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch({type: 'CLEAR'})
        }, time)
    }
}
    


export const clearNotification = () => (
    {type: 'CLEAR'}
)

export default reducer