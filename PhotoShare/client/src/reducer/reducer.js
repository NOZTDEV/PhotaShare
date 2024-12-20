let initialState = {
    users: [],
    user:[]
};

const todos = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_START':
            return {
                ...state,
                users: action.payload
            }  

        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }

        default:
            return state
    }
}

export default todos;