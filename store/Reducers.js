

  const reducers = (state, action) => {
    switch(action.type){
        case 'NOTIFY':
            return {
                ...state,
                notify: action.payload
            }
        case 'AUTH':
            return {
                ...state,
                user: action.payload
            }
        default: 
          return state;

        }
    }

 export default reducers