const reducer = (state='', action) => {
    switch(action.type){
        case 'CHANGE':
            return action.value
        default:
            return state
    }
}
export const changeFilter = (value) => (
    {type: 'CHANGE', value: value}
)
export default reducer