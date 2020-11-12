import TelecomActionTypes from "./telecom.types"


export const fetchTelecomStart = () =>
{
    return{
        type:TelecomActionTypes.FETCH_TELECOM_START_ASYNC
    }
}

export const fetchTelecomSuccessful = (telcos) =>
{
    return{
        type:TelecomActionTypes.FETCH_TELECOM_SUCCESSFULL_ASYNC,
        payload:telcos
    }
}

export const fetchTelecomFailed = (errorMessage) =>
{
    return{
        type:TelecomActionTypes.FETCH_TELECOM_FAILED_ASYNC,
        payload:errorMessage
    }
}

export const setCurrentTelco = (currentTelco) =>
{
    return{
        type:TelecomActionTypes.SET_CURRENT_TELCO,
        payload:currentTelco
    }
}

export const fetchTelecoProdsStart = (telcoId) =>
{
    return{
        type:TelecomActionTypes.FETCH_TELCOPRODS_START_ASYNC,
        payload:telcoId
    }
}

export const fetchTelecoProdsSuccessful = (telcoProds) =>
{
    return{
        type:TelecomActionTypes.FETCH_TELCOPRODS_SUCCESSFULL_ASYNC,
        payload:telcoProds
    }
}

export const fetchTelecoProdsFailed = (errorMessage) =>
{
    return{
        type:TelecomActionTypes.FETCH_TELCOPRODS_FAILED_ASYNC,
        payload:errorMessage
    }
}

export const CreateTelco = (newTelco) =>
{
    return{
        type:TelecomActionTypes.CREATE_TELCO,
        payload:newTelco
    }
}

export const TelcoCreated = (status) =>
{
    return{
        type:TelecomActionTypes.TELCO_CREATED,
        payload:status
    }
}

export const UploadLogo = (FormData) =>
{
    return{
        type:TelecomActionTypes.UPLOAD_LOGO,
        payload:FormData
    }
}

export const UploadLogoSuccess = (status) =>
{
    return{
        type:TelecomActionTypes.UPLOAD_LOGO_SUCCESSFUL,
        payload:status
    }
}

export const ToggleLogoUploaded = () =>
{
    return{
        type:TelecomActionTypes.TOGGLE_LOGO_UPLOADED
    }
}

export const DeleteTelcoStart = (telcoId) =>
{
    return{
        type:TelecomActionTypes.DELETE_TELECOM_START_ASYNC,
        payload:telcoId
    }
}

export const DeleteTelcoSuccessful = (info) =>
{
    return{
        type:TelecomActionTypes.DELETE_TELECOM_SUCCESSFULL_ASYNC,
        payload:info
    }
}

export const DeleteTelcoFailed = (error) =>
{
    return{
        type:TelecomActionTypes.DELETE_TELECOM_FAILED_ASYNC,
        payload:error
    }
}

export const ToggleDeleteSuccessful = () =>
{
    return{
        type:TelecomActionTypes.TOGGLE_DELETE_SUCCESSFUL
    }
}

export const UpdateAddProd = (data) =>
{
    return{
        type:TelecomActionTypes.UPDATE_ADDPROD,
        payload:data
    }
}

export const AddProductStart = (data)=>
{
    return{
        type:TelecomActionTypes.ADD_PROD_START,
        payload:data
    }
}

export const AddProductSuccess = (status) =>
{
    return{
        type:TelecomActionTypes.ADD_PROD_SUCCESS,
        payload:status
    }
}

export const ClearTelcoProducts = () =>
{
    return{
        type:TelecomActionTypes.CLEAR_TELCO_PROD,
    }
}

export const AddProductFailed = (error) =>
{
    return{
        type:TelecomActionTypes.ADD_PROD_FAILED,
        payload:error
    }
}

export const ProductCreated = () =>
{
    return{
        type:TelecomActionTypes.PRODUCT_CREATED
    }
}

export const ToggleCategoryPopUp = () =>
{
    return{
        type:TelecomActionTypes.TOGGLE_CATEGORY_POPUP
    }
}

export const FetchCategoriesStart = () =>
{
    return{
        type:TelecomActionTypes.FETCH_CATEGORIES_START
    }
}

export const FetchCategoriesSuccess = (categories) =>
{
    return{
        type:TelecomActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload:categories
    }
}

export const FetchCategoriesFailed = (error)=>
{
    return{
        type:TelecomActionTypes.FETCH_CATEGORIES_FAILED,
        payload:error
    }
}

export const toggleAddCategory = () =>
{
    return{
        type:TelecomActionTypes.TOGGLE_ADD_CATEGORY
    }
}

export const addCategoryStart = (category) =>
{
    return{
        type:TelecomActionTypes.ADD_CATEGORY_START,
        payload:category
    }
}

export const addCategorySuccess = (status) =>
{
    return{
        type:TelecomActionTypes.ADD_CATEGORY_SUCCESS,
        payload:status
    }
}

export const AddCategoryFailed = (error) =>
{
    return{
        type:TelecomActionTypes.ADD_CATEGORY_FAILED,
        payload:error
    }
}

export const deleteCategoryStart = (id) =>
{
    return{
        type:TelecomActionTypes.DELETE_CATEGORY_START,
        payload:id
    }
}

export const deleteCategorySuccess = (status) =>
{
    return{
        type:TelecomActionTypes.DELETE_CATEGORY_SUCCESS,
        payload:status
    }
}

export const deleteCategoryFailed = (error) =>
{
    return{
        type:TelecomActionTypes.DELETE_CATEGORY_FAILED,
        payload:error
    }
}

export const updateTelecomStart = (telco) =>
{
    return{
        type:TelecomActionTypes.UPDATE_TELECOM_START,
        payload:telco
    }
}


export const updateTelecomProdStart = (telco) =>
{
    return{
        type:TelecomActionTypes.UPDATE_TELECOMPROD_START,
        payload:telco
    }
}

export const updateProdActivation = (telco) =>
{
    return{
        type:TelecomActionTypes.UPDATE_PROD_ACTIVATION,
        payload:telco
    }
}

export const productsUpdatedStatus = (status) =>
{
    return{
        type:TelecomActionTypes.PRODUCTS_UPDATE_STATUS,
        payload:status
    }
}

export const deleteTelcoProduct = (id) =>
{
    return{
        type:TelecomActionTypes.DELETE_TELCO_PROD,
        payload:id
    }
}


export const deleteTelcoProductStatus = (status) =>
{
    return{
        type:TelecomActionTypes.DELETE_TELCO_PROD_STATUS,
        payload:status
    }
} 