import axios from "axios"
import {store} from "../redux/store"

export const Login = async (credentials) =>
{
    try {
        const options1 =
        {
            headers: {'Content-Type':'application/json' }
        } 
        return await axios.post("http://localhost/StaffApp/api/Auth/Login",credentials,options1)
    } catch (error) {
        return error
    }
}


const FetchData = async (url,body) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post(url,body,options1)
        return resp
    } catch (error) {
        return error.message
    }
}

export const getClients = async() =>
{
      try {
        const options1 =
        {
            headers: { Authorization: `Bearer ${store.getState().login.token}` }
        }
        return axios.post("http://localhost/StaffApp/api/Customer/List",{},options1)  
    } catch (error) {
        console.log("Error Getting Clients")
    }
}

export const getStaff = async() =>
{
    try {
        const options1 =
        {
            headers: { Authorization: `Bearer ${store.getState().login.token}` }
        }
       return axios.post("http://localhost/StaffApp/api/User/List",{},options1)
    } catch (error) {
        console.log("Error Getting Clients")
    }
}

export const updateWallet = async (id,amount,desc) =>
{
    try{
        const options1 =
        {
            headers: { Authorization: `Bearer ${store.getState().login.token}` }
        } 
        axios.post("http://localhost/StaffApp/api/Customer/AddCredit",
        {
        "CustomerID":id,
        "Addition":amount,
        "Comments":desc
        },options1)
    }
    catch(error)
    {
        console.log("Error Updating Clients")
    }
}

export const updatePaymentBalance= async (id,amount,desc,mode) =>
{
    try{
        const options1 =
        {
            headers: { Authorization: `Bearer ${store.getState().login.token}`}
        } 
        axios.post("http://localhost/StaffApp/api/Customer/AddPayment",
        {
        "CustomerID":id,
        "Addition":amount,
        "Comments":desc,
        "paymentMode":mode
        },options1)
    }
    catch(error)
    {
        console.log("Error Updating Clients")
    }
}

export const getTelcos = async () =>
{
    try {
        const options1 =
        {
            headers: { Authorization: `Bearer ${store.getState().login.token}` ,'Content-Type':'application/json'}
        } 
        const telcosList = await axios.post("http://localhost/StaffApp/api/Telco/List",{},options1)
        let telcoObj={}
    
        telcosList.data.forEach((telco)=>
        {
            telcoObj[`${telco.seqNo}`] = telco
        })

        let newList = []
        Object.entries(telcoObj).forEach(telco=>
        {
            newList.push(telco[1])
        })
    
        return newList
        
    } catch (error) {
        console.log("Error getting Telcos")
    }
}

export const getTelcoProds = async (telcoId) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const telcosProds = await axios.post("http://localhost/StaffApp/api/product/list",telcoId,options1)

        let telcoObj={}
    
        telcosProds.data.forEach((telco)=>
        {
            telcoObj[`${telco.seqNo}`] = telco
        })

        let newList = []
        Object.entries(telcoObj).forEach(telco=>
        {
            newList.push(telco[1])
        })
    
        return newList
        
    } catch (error) {
        console.log("Error getting Telco Products")
    }
}

export const setLogo = async (formData) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Telco/SetLogo",formData,options1)
        return resp
    } catch (error) {
        console.log("error setting logo")
    }
}

export const CreateTelcoFetch = async (telcoInfo) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Telco/Create",telcoInfo,options1)
        return resp
    } catch (error) {
        console.log("error setting logo")
    }
}

let telcoListIndex = 0;

export const telcoUpdate =  async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Telco/Update",data.telco)
    if (resp.statusText === "OK")
    {
        let returnObj={}
        telcoListIndex = telcoListIndex + 1
        if (telcoListIndex === data.size)
        {
            telcoListIndex = 0;
            let telcoObj={}
            data.fullList.forEach((telco)=>
            {
                telcoObj[`${telco.seqNo}`] = telco
            })

            let newList = []
            Object.entries(telcoObj).forEach(telco=>
            {
                newList.push(telco[1])
            })
            returnObj.data = newList;
            returnObj.success = true
            return returnObj
        }
    }
    else
    {
        let returnObj={}
        returnObj.success = false
        return returnObj
    }
}


let telcoProdListUpdate = 0;

export const telcoProdUpdate =  async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/product/Update",data.telco)
    if (resp.statusText === "OK")
    {
        
        telcoProdListUpdate = telcoProdListUpdate + 1
        if (telcoProdListUpdate === data.size)
        {
            let returnObj={}
            telcoProdListUpdate = 0;
            let telcoObj={}
            data.fullList.forEach((telco)=>
            {
                telcoObj[`${telco.seqNo}`] = telco
            })

            let newList = []
            Object.entries(telcoObj).forEach(telco=>
            {
                newList.push(telco[1])
            })
            returnObj.data = newList;
            returnObj.success = true
            return returnObj
        }
    }
    else
    {
        let returnObj={}
        returnObj.success = false
        return returnObj
    }
}

export const DeleteTelco = async (telcoInfo) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Telco/Delete",telcoInfo.telcoDelete,options1)
        telcoInfo.telcos.forEach((telco)=>
        {
            let obj={
                telco,
                size:telcoInfo.size,
                fullList:telcoInfo.telcos
            }
            telcoUpdate(obj)
        })
        return resp
    } catch (error) {
        console.log("error deleting telco")
    }
}

export const AddProduct = async (prodInfo) =>
{
    try {

        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/product/Add",prodInfo,options1)
        return resp
    } catch (error) {
        return error.message
    }
}

export const fetchCategories = async () =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Category/List",{},options1)
        return resp
    } catch (error) {
        return error.message
    }
}

export const createCategory = async (category) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Category/Create",category,options1)
        return resp
    } catch (error) {
        return error.message
    }
}

export const deleteCategory = async (category) =>
{
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Category/Delete",category,options1)
        return resp
    } catch (error) {
        return error.message
    }
}

export const getBatchList = async () =>
{
   return await FetchData("http://localhost/StaffApp/api/voucher/BatchList",{})
}

export const ScanVoucherFile = async (formData) =>
{
    let duplicateFiles = {}
    try {
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${store.getState().login.token}` }
        } 

        const resp = await axios.post("http://localhost/StaffApp/api/voucher/uploadVouchers",formData,options1)
        if (resp.data.hasError)
        {
            duplicateFiles.error = true;
            duplicateFiles.files = []

            if (resp.data.fileDuplicates.length > 0 )
            {
                
                duplicateFiles.duplicateVoucherNo = []
                duplicateFiles.errorType="duplicateWithin"
                duplicateFiles.duplicateVoucherNo = resp.data.fileDuplicates
                resp.data.vouchers.forEach(voucher=>
                {
                    resp.data.fileDuplicates.forEach(duplicate=>
                    {
                        if(duplicate.voucherNo === voucher.pin)
                        {
                            duplicateFiles.files.push(voucher)
                        }
                    })
                }) 
                 console.clear()
                 console.log(duplicateFiles)               
                 return duplicateFiles
            }
            else
            {
                duplicateFiles.errorType="duplicateWithExistingBatch"
                const files = resp.data.vouchers.filter(voucher=>voucher.isDuplicate)
                duplicateFiles.files = files
                return duplicateFiles
            }

        }
        else
        {
            duplicateFiles.error = false;
            duplicateFiles.batchFileID=resp.data.batchFileID;
            duplicateFiles.quantity = resp.data.quantity
            return duplicateFiles
        }
    } catch (error) {
        duplicateFiles.internalError = true
        duplicateFiles.errorType = error.response.data
        return duplicateFiles
    }
}



export const getProductId = async (data) =>
{
    try {
        const telcos = await getTelcos()
        const telco = telcos.filter(telco => telco.name === data.telecom)
        const products = await getTelcoProds(telco[0].telCoId)
        const product = products.filter(prod=>prod.nameEn === data.product)
        return product[0].productId
    } catch (error) {
        return "No such Brand or Product"
    }
}

export const fetchVouchers = async (batchID) =>
{
    const vouchers = await FetchData("http://localhost/StaffApp/api/voucher/VouchersList",batchID)
    return vouchers
}

export const deleteVouchers = async (vouchersList) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/voucher/DeleteVouchers",vouchersList)
    return resp
}

export const CUpload = async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/voucher/ConfirmUpload",data)
    return resp
}

export const updateProductActivation = async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/product/UpdateActivation",data)
    return resp
}

export const updateBatchActivation = async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/voucher/UpdateActivation",data)
    return resp
}

export const cancelBatch = async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/voucher/DeleteBatch",data)
    return resp
}

export const fetchClientPrices = async () =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Offer/List",{})
    return resp
}

export const RemoveOffer = async (offer) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Offer/RemoveOffers",offer)
    return resp
}

export const UpdateOffers = async (offers) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Offer/UpdateOffers",offers)
    return resp
}

export const delTelcoProd = async (id) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/product/Delete",id)
    return resp
}

export const fetchRestList = async () =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/SaleRestriction/List",{})
    return resp
}

export const fetchProdStock = async(data) =>
{
    const telco = await FetchData("http://localhost/StaffApp/api/Telco/List",{})
    let telcoId = null
    telco.data.forEach((telco)=>
    {
        if (telco.name === data.telcoName)
        {
            telcoId = telco.telCoId
        }
    })
    const prodDetails = await FetchData("http://localhost/StaffApp/api/product/ListDetails",telcoId)
    let ProdStock = null
    prodDetails.data.forEach(prod=>
    {
        if(prod.productId === data.productId)
        {
            ProdStock = prod.stock
        } 
    })
    return ProdStock
}

export const createNewRestriction = async (data) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/SaleRestriction/CreateSaleRestriction",data)
    return resp
}

export const cancelRestriction = async (id) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/SaleRestriction/RemoveSaleRestriction",id)
    return resp
}

export const getSalesList = async () =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/ListOrders",{})
    return resp
}

export const getOrderDetails  = async (orderId) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/OrderDetails",orderId)
    return resp
}

export const getSaleVouchers = async (orderId) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/OrderVouchers",orderId)
    return resp
}

export const getNSProds = async (cId) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/ProductListForOrder",cId)
    return resp
}

export const makeSale = async (sale) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/PlaceOrder",sale)
    return resp
}

export const getFileLink = async (id) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/GetOrderFileLink",id)
    return resp
}

export const delSale = async (id) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Order/CancelOrder",id)
    return resp
}

export const fetchVendors = async () =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/supplier/list",{})
    return resp
}

export const createSupplier = async (vendor) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/supplier/Create",vendor)
    return resp
}

export const EditSupplier = async (vendor) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/supplier/update",vendor)
    return resp
}

export const search = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/voucher/VoucherSearch",params)
    return resp
}

export const fetchDownloadReport = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Reports/SalesReport",params)
    return resp
}

export const fetchWalletReport = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Reports/WalletReport",params)
    return resp
}

export const fetchPaymentReport = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Reports/PaymentReport",params)
    return resp
}

export const fetchPurchaseReport = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Reports/PuchaseReport",params)
    return resp
}


export const fetchInventoryUsageReport = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Reports/InventoryUsageReport",params)
    return resp
}

export const fetchInventoryReport = async (params) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Reports/InventoryReport",params)
    return resp
}

export const fetchPerms = async () =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/User/PermissionsList",{})
    return resp
}

export const makeClient = async (client) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/User/Create",client)
    return resp
}

export const updateUser =  async (user) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/User/Update",user)
    return resp
}

export const editBatch =  async (batch) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/voucher/EditBatch",batch)
    return resp
}

export const telcoManualUpdate = async (telco) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/Telco/Update",telco)
    return resp
}

export const prodManualUpdate = async (prod) =>
{
    const resp = await FetchData("http://localhost/StaffApp/api/product/Update",prod)
    return resp
}