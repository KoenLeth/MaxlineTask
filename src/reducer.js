const initialState = {
    cityData: {
    },
    barIsOpen: false,
    searchValue: ""
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
        case "setSearchValue":
        return{
            ...state,
            searchValue: action.value
        }
        default: 
        return state
    }
    
}