import {createStore, combineReducers} from 'redux'

function busquedaReducer(state='',action){
    switch (action.type) {
        case 'SET_BUSQUEDA':  
            return action.busqueda;
        
        case 'CLEAR_BUSQUEDA': 
            return '';
    

        default:
            return state;
    }
}

function ciudadReducer(state='',action){
    switch (action.type) {
        case 'SET_CIUDAD':  
            if (action.ciudad != 'Todas') {
                return action.ciudad;
            } else {
                return '';
            }
        
        case 'CLEAR_CIUDAD': 
            return '';
    

        default:
            return state;
    }
}

function categoriaReducer(state='',action){
    switch (action.type) {
        case 'SET_CATEGORIA':  
            return action.categoria;
        
        case 'CLEAR_CATEGORIA': 
            return '';
    

        default:
            return state;
    }
}

function lblCategoriaReducer(state='',action){
    switch (action.type) {
        case 'SET_LBLCATEGORIA':  
            return action.lblCategoria;
        
        case 'CLEAR_LBLCATEGORIA': 
            return '';
    

        default:
            return state;
    }
}


let rootReducer = combineReducers({
    busqueda: busquedaReducer,
    ciudad: ciudadReducer,
    categoria: categoriaReducer,
    lblCategoria: lblCategoriaReducer
});

export default createStore(rootReducer)