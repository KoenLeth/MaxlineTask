const initialState = {
    cityData: {
        weather:[{}]
    },
    barIsOpen: false
}

export default (state=initialState, action)=> {

    switch(action.type){
        case "loadCity":
        return {
            ...state,
            cityData: action.data
        }
        case "openBar":
        return {
            ...state,
            barIsOpen: true
        }
        case "hideBar":
        return{
            ...state,
            barIsOpen: false
        }
        default: 
        return state
    }
    
}