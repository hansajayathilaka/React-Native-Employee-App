
export const initState = {
    data: [],
    loading: true,
}

export const reducer = (state = initState, action) => {
    switch (action.type){
        case 'SET_DATA':
            state = { ...state, data: action.payload }
            break
        case 'SET_LOADING':
            state = { ...state, loading: action.payload }
            break
    }

    return state
}
