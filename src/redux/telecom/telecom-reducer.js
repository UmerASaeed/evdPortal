import TelecomActionTypes from "./telecom.types"

const INITIAL_STATE = {
    telcoList:null,
    telcoFetched:false,
    telcoProds:"",
    isFetching:false,
    telcoProdsFetched:false,
    errorMessage:"",
    currentTelco:"",
    telcoCreated:false,
    logoUploaded:false,
    isDeleting:false,
    isDeletingFailed:"",
    deleteSuccessful:false,
    addProd:{TelCoId:null,SeqNo:null},
    productAdded:false,
    productAddedError:"",
    categoryPopUp:false,
    categoryList:null,
    isFetchingCategories:false,
    fetchingCategoriesFailed:"",
    addingCategory:false,
    addingCategoryError:"",
    deletingCategory:false,
    deletingCategoryError:"",
    productsUpdated:false,
    productDelStatus:false,
    productsUpdateStatus:false
}

const TelecomReducer = (state = INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case TelecomActionTypes.FETCH_TELECOM_START_ASYNC:
        return{
            ...state,
            isFetching:true
        }
        case TelecomActionTypes.FETCH_TELECOM_SUCCESSFULL_ASYNC:
        return{
            ...state,
            telcoList:action.payload,
            isFetching:false,
            errorMessage:""
        }
        case TelecomActionTypes.FETCH_TELECOM_FAILED_ASYNC:
        return{
            ...state,
            errorMessage:action.payload,
            isFetching:false
        }
        case TelecomActionTypes.FETCH_TELCOPRODS_START_ASYNC:
        return{
            ...state,
            isFetching:true,
        }
        case TelecomActionTypes.FETCH_TELCOPRODS_SUCCESSFULL_ASYNC:
        return{
            ...state,
            telcoProds:action.payload,
            isFetching:false,
            errorMessage:""
        }
        case TelecomActionTypes.FETCH_TELCOPRODS_FAILED_ASYNC:
        return{
            ...state,
            errorMessage:action.payload,
            isFetching:false,
            telcoProdsFetched:false
        }
        case TelecomActionTypes.SET_CURRENT_TELCO:
        return{
            ...state,
            currentTelco:action.payload
        }
        case TelecomActionTypes.TELCO_CREATED:
        return{
            ...state,
            telcoCreated:action.payload
        }   
        case TelecomActionTypes.UPLOAD_LOGO_SUCCESSFUL:
        return{
            ...state,
            telcoCreated:false,
            logoUploaded:true
        }    
        case TelecomActionTypes.TOGGLE_LOGO_UPLOADED:
        return{
            ...state,
            logoUploaded:false
        }
        case TelecomActionTypes.DELETE_TELECOM_START_ASYNC:
        return{
            ...state,
            isDeleting:true
        }
        case TelecomActionTypes.DELETE_TELECOM_SUCCESSFULL_ASYNC:
        return{
            ...state,
            isDeleting:false,
            isDeletingFailed:"",
            deleteSuccessful:true
        }
        case TelecomActionTypes.DELETE_TELECOM_FAILED_ASYNC:
        return{
            ...state,
            isDeletingFailed:action.payload,
            isDeleting:false,
        }  
        case TelecomActionTypes.TOGGLE_DELETE_SUCCESSFUL:
        return{
            ...state,
            deleteSuccessful:false
        }
        case TelecomActionTypes.UPDATE_ADDPROD:
        return{
            ...state,
            addProd:action.payload
        }
        case TelecomActionTypes.ADD_PROD_SUCCESS:
        return{
            ...state,
            productAdded:true
        }    
        case TelecomActionTypes.ADD_PROD_FAILED:
        return{
            ...state,
            productAddedError:action.payload   
        }
        case TelecomActionTypes.PRODUCT_CREATED:
        return{
            ...state,
            productAdded:false
        }
        case TelecomActionTypes.TOGGLE_CATEGORY_POPUP:
        return{
            ...state,
            categoryPopUp:!state.categoryPopUp
        }
        case TelecomActionTypes.FETCH_CATEGORIES_START:
        return{
            ...state,
            isFetchingCategories:true
        }
        case TelecomActionTypes.FETCH_CATEGORIES_SUCCESS:
        return{
            ...state,
            categoryList:action.payload,
            isFetchingCategories:false
        }
        case TelecomActionTypes.FETCH_CATEGORIES_FAILED:
        return{
            ...state,
            isFetchingCategories:false,
            fetchingCategoriesFailed:action.payload
        }
        case TelecomActionTypes.TOGGLE_ADD_CATEGORY:
        return{
            ...state,
            addingCategory:!state.addingCategory
        }
        case TelecomActionTypes.ADD_CATEGORY_SUCCESS:
        return{
            ...state,
            addingCategory:false
        }
        case TelecomActionTypes.ADD_CATEGORY_FAILED:
        return{
            ...state,
            addingCategory:false,
            addingCategoryError:action.payload
        }
        case TelecomActionTypes.DELETE_CATEGORY_START:
        return{
            ...state,
            deletingCategory:true
        }
        case TelecomActionTypes.DELETE_CATEGORY_SUCCESS:
        return{
            ...state,
            deletingCategory:false
        }
        case TelecomActionTypes.DELETE_CATEGORY_FAILED:
        return{
            ...state,
            deletingCategory:false,
            deletingCategoryError:action.payload
        }
        case TelecomActionTypes.CLEAR_TELCO_PROD:
        return{
            ...state,
            telcoProds:""
        }
        case TelecomActionTypes.PRODUCTS_UPDATE_STATUS:
        return{
            ...state,
            productsUpdated:action.payload
        }
        case TelecomActionTypes.UPDATE_TELECOM_LOCALLY:
        return{
            ...state,
            telcoList:action.payload       
        }
        case TelecomActionTypes.DELETE_TELCO_PROD_STATUS:
            return{
                ...state,
                productDelStatus:action.payload      
            }
        default:
            return state
    }
}

export default TelecomReducer;