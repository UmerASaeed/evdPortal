import React,{useEffect,useState} from 'react'
import {GetClientPricesStart} from "../../../redux/prices/prices-actions"
import {fetchSaleListStart} from "../../../redux/sales/sales.actions"
import {FetchStart} from "../../../redux/clients/client-actions"
import {fetchTelecomStart,FetchCategoriesStart} from "../../../redux/telecom/telecom-actions"
import {GetVendors} from "../../../redux/vendors/vendors.actions"
import SearchDD from "../../../components/SearchDrpDwn/SearchDD.component"
import {GetDwnldReport,clearDownloadReport} from "../../../redux/reports/reports.actions"
import { connect } from 'react-redux'
import './dwnlReport.styles.css'
import { useHistory, withRouter } from 'react-router-dom'

const DownloadReport = ({fetchSaleListStart,orderId,getClients,clients,GetClientPricesStart,clientWithPrices,fetchTelecomStart,telcoList,GetVendors,vendors,downloadReport,GetDwnldReport,FetchCategoriesStart,categories,clearDownloadReport}) =>
{

    const [downloadParams,setDownloadParams] = useState({FromDate:null,ToDate:null,categoryId:null,CustomerId:null,productId:null,telCoId:null,orderId:null})
    const [withParams,setWithParams] = useState(false)
    const history = useHistory()

    useEffect(()=>
    {
        FetchCategoriesStart()
        GetClientPricesStart()
        fetchSaleListStart()
        getClients()
        fetchTelecomStart()
        GetVendors()
    },[])

    useEffect(()=>
    {
        GetDwnldReport({})
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
            setDownloadParams({...downloadParams,productId:parseInt(option.value)})
        }
        else if (option.type==="cat")
        {
            setDownloadParams({...downloadParams,categoryId:parseInt(option.value)})
        }
        else if (option.type === 'orders')
        {
            setDownloadParams({...downloadParams,orderId:parseInt(option.value)})
        }
        else if (option.type === "telco")
        {
            setDownloadParams({...downloadParams,telCoId:parseInt(option.value)})
        }
        else
        {
            setDownloadParams({...downloadParams,CustomerId:parseInt(option.value)})
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
            GetDwnldReport(downloadParams)
        }
    },[withParams,downloadParams])

    let orderIdArray = []
    if(orderId)
    {
        orderId.forEach(order=>
        {
            orderIdArray.push(order.orderId)
        })
    }

    let categoryArray = []
    let telcoArray = []
    

    if (telcoList)
    {
        telcoList.forEach(telco=>
        {
            telcoArray.push({telcoId:telco.telCoId,telcoName:telco.name})  
        })
    }

    if (vendors)
    {
        vendors.forEach(vendor=>
        {
            categoryArray.push({catId:vendor.supplierId,catName:vendor.name})    
        })
    }

    const navToReport = (e) =>
    {
        clearDownloadReport()
        if(e.target.value === 'sales')
        {
            history.push(`Reports/SalesReport`)
        }
        else if (e.target.value === 'wallet')
        {
            history.push(`Reports/WalletReport`)
        }
        else if (e.target.value === 'payment')
        {
            history.push("Reports/PaymentReport")
        }
        else if (e.target.value === 'purchase')
        {
            history.push("Reports/PurchaseReport")
        }
        else if (e.target.value === 'iu')
        {
            history.push("Reports/InventoryUsage")
        }
        else if (e.target.value === 'inven')
        {
            history.push("Reports/InventoryReport")
        }
        
    }

    console.log(downloadReport)
    return(
        <div className="content">
            <div className="subHeader-reports">
                <h2 className="subText-reports">Reports/Download Report</h2>
                <div className="optionss-reports">
                    <select className="search-option" onChange={navToReport}>
                        <option value={0}>Report Type</option>
                        <option value="sales">Sales Report</option>
                        <option value="iu">Inventory Usage Report</option>
                        <option value="inven">Inventory Report</option>
                        <option value="wallet">Wallet Report</option>
                        <option value="payment">Payment Report</option>
                        <option value="purchase">Purchase Report</option>
                    </select>
                    <input type="text" className="search-option"  placeholder=" From Date" name="FromDate" onFocus={changeType} onBlur={changeTypeBack} onChange={handleChange}/>
                    <input type="text" className="search-option"  placeholder=" To Date" name="ToDate" onFocus={changeType} onBlur={changeTypeBack} onChange={handleChange}/>            
                    <SearchDD placeholder="Request #"  SelectedOption={SelectedOption} type="orders" data={orderIdArray ? orderIdArray : []}/> 
                    <SearchDD placeholder="Clients" SelectedOption={SelectedOption} type="clients" data={clients ? clients : []}/> 
                    <SearchDD placeholder="Brand" SelectedOption={SelectedOption} type="telco" data={telcoArray ? telcoArray: []}/> 
                    <SearchDD placeholder="Categories" SelectedOption={SelectedOption} type="cat" data={categories ? categories: []}/> 
                    <SearchDD placeholder="Products" SelectedOption={SelectedOption} type="product" data={clientWithPrices ? clientWithPrices[0].offers : []}/> 
                </div>
            </div>
            <div className="reports-blackBar">
                <div className="blackBar-totalCost">Total Cost  :{downloadReport ? downloadReport.totalCost : null}</div>
                <div className="blackBar-totalSales">Total Sales :{downloadReport ? downloadReport.totalSales : null}</div>
                <div className="blackBar-totalProfit">Total Profit :{downloadReport ? downloadReport.totalProfit : null}</div>
            </div>
            <div className="reports-content">
                <div className='reports-titles'>
                    <div className='reports-title'>Client</div>
                    <div className='reports-title'>Reference #</div>
                    <div className='reports-title'>Brand</div>
                    <div className='reports-title'>Category</div>
                    <div className='reports-title'>Product</div>
                    <div className='reports-title'>Qty</div>
                    <div className='reports-title'>Cost</div>
                    <div className='reports-title'>Selling Price</div>
                    <div className='reports-title'>Total Cost</div>
                    <div className='reports-title'>Total Selling</div>
                    <div className='reports-title'>Profit</div>
                </div>
                {
                    downloadReport ? downloadReport.data.map((report,index)=>
                    {
                        return <div className='reports-vals' key={index}>
                                    <div className='reports-title-val'>{report.customerName}</div>
                                    <div className='reports-title-val'>{report.orderId}</div>
                                    <div className='reports-title-val'>{report.telCoName}</div>
                                    <div className='reports-title-val'>{report.categoryName}</div>
                                    <div className='reports-title-val'>{report.productName}</div>
                                    <div className='reports-title-val'>{report.quantity}</div>
                                    <div className='reports-title-val'>{"yet to recieve"}</div>
                                    <div className='reports-title-val'>{report.salePrice}</div>
                                    <div className='reports-title-val'>{report.totalCost}</div>
                                    <div className='reports-title-val'>{report.totalSale}</div>
                                    <div className='reports-title-val'>{report.profit}</div>
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
        GetVendors:()=>dispatch(GetVendors()),
        GetDwnldReport:(params)=>dispatch(GetDwnldReport(params)),
        clearDownloadReport:()=>dispatch(clearDownloadReport())
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
        vendors:state.vendors.vendorsList,
        downloadReport:state.reports.downloadReport
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DownloadReport))