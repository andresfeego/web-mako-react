export const saveBusqueda = (auxi)=>{
    return{
        type: 'SET_BUSQUEDA',
        busqueda:auxi
    }
}

export const clearBusqueda = ()=>{
    return{
        type: 'CLEAR_BUSQUEDA'
    }
}

export const saveCiudad = (auxi)=>{
    if (auxi == null) {
        return{
            type: 'SET_CIUDAD',
            ciudad:''

        }    
    } else {
        return{
            type: 'SET_CIUDAD',
            ciudad:auxi
        }
        
    }
    
}

export const clearCiudad = ()=>{
    return{
        type: 'CLEAR_CIUDAD'
    }
}


export const saveCategoria = (auxi)=>{
    return{
        type: 'SET_CATEGORIA',
        categoria:auxi
    }
}

export const clearCategoria = ()=>{
    return{
        type: 'CLEAR_CATEGORIA'
    }
}

export const savelblCategoria = (auxi)=>{
    return{
        type: 'SET_LBLCATEGORIA',
        lblCategoria:auxi
    }
}

export const clearlblCategoria = ()=>{
    return{
        type: 'CLEAR_LBLCATEGORIA'
    }
}