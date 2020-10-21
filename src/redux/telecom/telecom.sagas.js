import {takeLatest,all,put,call} from "redux-saga/effects";
import {fetchTelecomSuccessful,fetchTelecomFailed,fetchTelecoProdsSuccessful,fetchTelecoProdsFailed,TelcoCreated,UploadLogoSuccess,DeleteTelcoSuccessful,DeleteTelcoFailed,AddProductSuccess,AddProductFailed,FetchCategoriesSuccess,FetchCategoriesFailed,addCategorySuccess,AddCategoryFailed,deleteCategoryStart,deleteCategoryFailed, deleteCategorySuccess} from "./telecom-actions";
import {getTelcos,getTelcoProds,CreateTelcoFetch,setLogo,DeleteTelco,AddProduct,fetchCategories,createCategory,deleteCategory} from "../../utils/fetching"
import TelecomActionTypes from "./telecom.types";


export function* fetchTelcosAsync(){
    try {
        const telcos = yield getTelcos()
        yield put(fetchTelecomSuccessful(telcos.data))

    } catch (error) {
        yield put(fetchTelecomFailed(error.message))
    }
}

export function* fetchTelcoProdsAsync(data)
{
    try {
        const telcoId=data.payload
        const telcoProds = yield getTelcoProds(telcoId)
        yield put(fetchTelecoProdsSuccessful(telcoProds.data))
    } catch (error) {
        yield put(fetchTelecoProdsFailed(error.message))
    }
}

export function* CreateTelco(data)
{
    try {
        const Resp = yield CreateTelcoFetch(data.payload)
        if(Resp.statusText==='OK')
        {
            yield put(TelcoCreated(true))
            const telcos = yield getTelcos()
            yield put(fetchTelecomSuccessful(telcos.data))
        }
    } catch (error) {
            yield put(TelcoCreated(false))
    }
}


export function* UploadLogoAsync(data)
{
    try {
        const resp = yield setLogo(data.payload)
        if(resp.statusText==='OK')
        {
            yield put(UploadLogoSuccess())
        }
    } catch (error) {
        console.log("Can't upload Logo")
    }
}

export  function* DeleteTelcoAsync(data)
{
    try {
        const resp = yield(DeleteTelco(data.payload))
        if(resp.statusText==='OK')
        {
            yield put(DeleteTelcoSuccessful())
        }
    } catch (error) {
        yield put(DeleteTelcoFailed(error.message))
    }
}

export function* addProductStartAsync(data)
{
    try {
        const resp = yield(AddProduct(data.payload))
        if(resp.statusText==='OK')
        {
            yield put(AddProductSuccess())
        }
    } catch (error) {
        yield put (AddProductFailed(error.message))
    }
}

export function* FetchCategoriesStartAsync()
{
    try {
        const resp = yield(fetchCategories())
        if(resp.statusText==='OK')
        {
            yield put(FetchCategoriesSuccess(resp.data))
        }
    } catch (error) {
        yield put(FetchCategoriesFailed(error))
    }
}

export function* CreateCategoryStart(data)
{
    try {
        const resp = yield(createCategory(data.payload))
        if(resp.statusText==='OK')
        {
            yield put(addCategorySuccess())
        }
    } catch (error) {
        yield put(AddCategoryFailed(error))
    }
}


export function* DeleteCategoryStart(data)
{
    try {
        const resp = yield(deleteCategory(data.payload))
        if(resp.statusText==='OK')
        {
            yield put(deleteCategorySuccess())
        }
    } catch (error) {
        yield put(deleteCategoryFailed(error))
    }
}



export function* fetchTelcosStart()
{
    yield takeLatest(TelecomActionTypes.FETCH_TELECOM_START_ASYNC,fetchTelcosAsync)
}

export function* fetchTelcoProdsStart()
{
    yield takeLatest(TelecomActionTypes.FETCH_TELCOPRODS_START_ASYNC,fetchTelcoProdsAsync)    
}

export function* CreateTelcoStart()
{
    yield takeLatest(TelecomActionTypes.CREATE_TELCO,CreateTelco)
}

export function* UploadLogoStart()
{
    yield takeLatest(TelecomActionTypes.UPLOAD_LOGO,UploadLogoAsync)
}

export function* DeleteTelcoStart()
{
    yield takeLatest(TelecomActionTypes.DELETE_TELECOM_START_ASYNC,DeleteTelcoAsync)
}


export function* AddProductStart()
{
    yield takeLatest(TelecomActionTypes.ADD_PROD_START,addProductStartAsync)
}

export function* FetchCategories()
{
    yield takeLatest(TelecomActionTypes.FETCH_CATEGORIES_START,FetchCategoriesStartAsync)
}

export function* CreateCategory()
{
    yield takeLatest(TelecomActionTypes.ADD_CATEGORY_START,CreateCategoryStart)
}

export function* DeleteCategory()
{
    yield takeLatest(TelecomActionTypes.DELETE_CATEGORY_START,DeleteCategoryStart)
}

export function* TelecomSagas()
{
    yield all([call(fetchTelcosStart),call(fetchTelcoProdsStart),call(CreateTelcoStart),call(UploadLogoStart),call(DeleteTelcoStart),call(AddProductStart),call(FetchCategories),call(CreateCategory),call(DeleteCategory)])
}