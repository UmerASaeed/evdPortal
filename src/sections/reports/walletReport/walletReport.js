import React,{useEffect,useState} from 'react'
import {GetClientPricesStart} from "../../../redux/prices/prices-actions"
import {fetchSaleListStart} from "../../../redux/sales/sales.actions"
import {FetchStart} from "../../../redux/clients/client-actions"
import {fetchTelecomStart,FetchCategoriesStart} from "../../../redux/telecom/telecom-actions"
import SearchDD from "../../../components/SearchDrpDwn/SearchDD.component"
import {GetWalletReport,clearWalletReport} from "../../../redux/reports/reports.actions"
import { connect } from 'react-redux'
import { Redirect,useHistory, withRouter } from 'react-router-dom'

const WalletReport = ({fetchSaleListStart,getClients,clients,GetClientPricesStart,clientWithPrices,fetchTelecomStart,telcoList,walletReport,GetWalletReport,FetchCategoriesStart,categories,clearWalletReport}) =>
{

    const [downloadParams,setDownloadParams] = useState({FromDate:null,ToDate:null,categoryId:null,CustomerId:null,productId:null,telCoId:null,"ExcludeOrders":null})
    const [withParams,setWithParams] = useState(false)
    const history = useHistory()
    const [reRoute,setreRoute] = useState({val:false,nav:""})
    useEffect(()=>
    {
        FetchCategoriesStart()
        GetClientPricesStart()
        fetchSaleListStart()
        getClients()
        fetchTelecomStart()
    },[])

    const changeType = (e) =>
    {
        e.target.type = "date"
    }

    const changeTypeBack = (e) =>
    {
        if (!e.target.value)
        {
            e.target.type="text"
        }
    }

    const SelectedOption = (option) =>
    {
        setWithParams(true)
        if (option.type ==='product')
        {
            if(option.value === null)
           {
                setDownloadParams({...downloadParams,productId:null})
           }
           else
           {
                setDownloadParams({...downloadParams,productId:parseInt(option.value)})
           }
            
        }
        else if (option.type==="cat")
        {
            if(option.value === null)
            {
                 setDownloadParams({...downloadParams,categoryId:null})
            }
            else
            {
                 setDownloadParams({...downloadParams,categoryId:parseInt(option.value)})
            }
        }
        else if (option.type === "telco")
        {
            if(option.value === null)
            {
                 setDownloadParams({...downloadParams,telCoId:null})
            }
            else
            {
                 setDownloadParams({...downloadParams,telCoId:parseInt(option.value)})
            }
        }
        else
        {
           if(option.value === null)
           {
                setDownloadParams({...downloadParams,CustomerId:0})
           }
           else
           {
                setDownloadParams({...downloadParams,CustomerId:parseInt(option.value)})
           }
        }
    }

    const handleChange = (e) =>
    {
        let {name,value} = e.target
        setWithParams(true)
        if (name ==="FromDate" || name === "ToDate")
        {
            if (value==="")
            {
                value = null
            }
        }
        setDownloadParams({...downloadParams,[name]:value})
    }

    useEffect(()=>
    {
        if (withParams)
        {
            if (downloadParams.FromDate ===  null || downloadParams.ToDate === null || downloadParams.ExcludeOrders === null )
            {
                clearWalletReport()
            }
            else
            {
                GetWalletReport(downloadParams)
            }
        }
    },[withParams,downloadParams])


    let telcoArray = []
    

    if (telcoList)
    {
        telcoList.forEach(telco=>
        {
            telcoArray.push({telcoId:telco.telCoId,telcoName:telco.name})  
        })
    }

    const navToReport = (e) =>
    {
        clearWalletReport()
        if (e.target.value === 'sales')
        {
            setreRoute({val:true,nav:"SalesReport"})
        }
        else if(e.target.value === 'download')
        {
            history.push(`/Reports`)
        }
        else if (e.target.value === 'wallet')
        {
            setreRoute({val:true,nav:"WalletReport"})
        }
        else if (e.target.value === 'payment')
        {
            setreRoute({val:true,nav:"PaymentReport"})
        }
        else if (e.target.value === 'purchase')
        {
            setreRoute({val:true,nav:"PurchaseReport"})
        }
        else if (e.target.value === 'iu')
        {
            setreRoute({val:true,nav:"InventoryUsage"})
        }
        else if (e.target.value === 'inven')
        {
            setreRoute({val:true,nav:"InventoryReport"})
        }
    }

    const setExcludeOrders = (e) =>
    {
        setWithParams(true)
        if(e.target.value==='true')
        {
            setDownloadParams({...downloadParams,ExcludeOrders:true})
        }
        else if (e.target.value === 'false')
        {
            setDownloadParams({...downloadParams,ExcludeOrders:false})
        }
        else
        {
            setDownloadParams({...downloadParams,ExcludeOrders:null})
        }
    }
    
    let walletBalance = null
    if(walletReport)
    {
        let arr = walletReport
        let ar = arr.pop()
        if (ar)
        {
            walletBalance = ar.runningTotal + ar.trxValue
        }
    }

    let twd = null
    if(walletReport)
    {
        walletReport.forEach(rep=>
        {
            twd = twd + rep.trxValue
        })
    }
    return(
        <div className="content">
            {reRoute.val ? <Redirect to={`/Reports/${reRoute.nav}`}/> : null}
            <div className="subHeader-reports">
                <h2 className="subText-reports">Reports/Wallet Report</h2>
                <div className="optionss-reports">
                    <select className="search-option" onChange={navToReport}>
                        <option value={0}>Report Type</option>
                        <option value="download">Download Report</option>
                        <option value="sales">Sales Report</option>
                        <option value="iu">Inventory Usage Report</option>
                        <option value="inven">Inventory Report</option>
                        <option value="wallet">Wallet Report</option>
                        <option value="payment">Payment Report</option>
                        <option value="purchase">Purchase Report</option>
                    </select>
                    <input type="text" className="search-option"  placeholder=" From Date" name="FromDate" onFocus={changeType} onBlur={changeTypeBack} onChange={handleChange}/>
                    <input type="text" className="search-option"  placeholder=" To Date" name="ToDate" onFocus={changeType} onBlur={changeTypeBack} onChange={handleChange}/>            
                    <SearchDD placeholder="Clients" SelectedOption={SelectedOption} type="clients" data={clients ? clients : []}/> 
                    <SearchDD placeholder="Brand" SelectedOption={SelectedOption} type="telco" data={telcoArray ? telcoArray: []}/> 
                    <SearchDD placeholder="Categories" SelectedOption={SelectedOption} type="cat" data={categories ? categories: []}/> 
                    <SearchDD placeholder="Products" SelectedOption={SelectedOption} type="product" data={clientWithPrices ? clientWithPrices[0].offers : []}/> 
                    <select className="search-option" onChange={setExcludeOrders}>
                        <option value={0}>Exclude Orders</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            </div>
            <div className="reports-blackBar">
                <div className="blackBar-totalCost">Wallet Balance : {walletBalance} </div>
                <div className="blackBar-totalSales">Tota Wallet Deposits : { twd} </div>
            </div>
            <div className="reports-content">
                <div className='reports-titles' style={{width:"1500px"}} >
                    <div className='reports-title'>Transaction #</div>
                    <div className='reports-title'>Client</div>
                    <div className='reports-title'>Time</div>
                    <div className='reports-title'>Opening Balance</div>
                    <div className='reports-title' style={{color:"#01AA62"}}>Amount</div>
                    <div className='reports-title'>Closing Balance</div>
                    <div className='reports-title'>Description</div>
                </div>
                    {
                     walletReport ? walletReport.map((report,index)=>
                     {
                        return  <div className='reports-vals' style={{width:"1500px"}} key={index}>
                                    <div className='reports-title-val'>{report.orderId}</div>
                                    <div className='reports-title-val'>{report.customerName}</div>
                                    <div className='reports-title-val'>{report.trxDate}</div>
                                    <div className='reports-title-val'>{report.runningTotal}</div>
                                    <div className='reports-title-val' style={{color:"#01AA62"}}>{report.trxValue}</div>
                                    <div className='reports-title-val'>{report.runningTotal + report.trxValue}</div>
                                    <div className='reports-title-val'>{report.comments}</div>
                                </div>
                    }) : null
                    }  
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        FetchCategoriesStart:()=>dispatch(FetchCategoriesStart()),
        fetchSaleListStart:() => dispatch(fetchSaleListStart()),
        getClients:()=>dispatch(FetchStart()),
        GetClientPricesStart:()=>dispatch(GetClientPricesStart()),
        fetchTelecomStart:()=>dispatch(fetchTelecomStart()),
        GetWalletReport:(params)=>dispatch(GetWalletReport(params)),
        clearWalletReport:()=>dispatch(clearWalletReport())
    }
}

const mapStateToProps = state =>
{
    return{
        categories:state.telecom.categoryList,
        clientWithPrices:state.prices.clientWithPrices,
        telcoList:state.telecom.telcoList,
        orderId:state.sales.salesList,
        clients:state.clients.ClientData,
        walletReport:state.reports.walletReport
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WalletReport))