import axios from "axios"
let token=""
const options= 
{
    headers:{'key':'Content-Type','name':'Content-Type','type':'text','value':'application/json'}
}


export const Login = async () =>
{
    try {
        await axios.post("http://staff.evdportal.com/api/Auth/Login",{username:"admin",password:"admin1234"},options).then(res=>token=res.data.token)
    } catch (error) {
        console.log("Error Logging In")
    }
}

export const getClients = async() =>
{
      try {
        await Login()
        const options1 =
        {
            headers: { Authorization: `Bearer ${token}` }
        }
        return axios.post("http://staff.evdportal.com/api/Customer/List",{},options1)  
    } catch (error) {
        console.log("Error Getting Clients")
    }
}

export const getStaff = async() =>
{
    try {
        await Login()
        const options1 =
        {
            headers: { Authorization: `Bearer ${token}` }
        }
       return axios.post("http://staff.evdportal.com/api/User/List",{},options1)
    } catch (error) {
        console.log("Error Getting Clients")
    }
}

export const updateWallet = async (id,amount,desc) =>
{
    try{
        await Login()
        const options1 =
        {
            headers: { Authorization: `Bearer ${token}` }
        } 
        axios.post("http://staff.evdportal.com/api/Customer/AddCredit",
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

export const updatePaymentBalance= async (id,amount,desc) =>
{
    try{
        await Login()
        const options1 =
        {
            headers: { Authorization: `Bearer ${token}`}
        } 
        axios.post("http://staff.evdportal.com/api/Customer/AddPayment",
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

export const getTelcos = async () =>
{
    try {
        await Login()
        const options1 =
        {
            headers: { Authorization: `Bearer ${token}` ,'Content-Type':'application/json'}
        } 
        const telcosList = await axios.post("http://localhost/StaffApp/api/Telco/List",{},options1)
        return telcosList
        
    } catch (error) {
        console.log("Error getting Telcos")
    }
}

export const getTelcoProds = async (telcoId) =>
{
    try {
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
        } 
        const telcosProds = await axios.post("http://localhost/StaffApp/api/product/list",telcoId,options1)
        return telcosProds
        
    } catch (error) {
        console.log("Error getting Telco Products")
    }
}

export const setLogo = async (formData) =>
{
    try {
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
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
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Telco/Create",telcoInfo,options1)
        return resp
    } catch (error) {
        console.log("error setting logo")
    }
}

export const DeleteTelco = async (telcoInfo) =>
{
    try {
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Telco/Delete",telcoInfo,options1)
        return resp
    } catch (error) {
        console.log("error deleting telco")
    }
}

export const AddProduct = async (prodInfo) =>
{
    try {
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
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
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
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
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
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
        await Login()
        const options1 =
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json' }
        } 
        const resp = await axios.post("http://localhost/StaffApp/api/Category/Delete",category,options1)
        return resp
    } catch (error) {
        return error.message
    }
}