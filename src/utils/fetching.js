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
            headers: { Authorization: `Bearer ${token}` }
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