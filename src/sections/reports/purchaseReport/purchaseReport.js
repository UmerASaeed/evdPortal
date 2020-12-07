import React,{useEffect,useState} from 'react'
import {GetClientPricesStart} from "../../../redux/prices/prices-actions"
import {fetchSaleListStart} from "../../../redux/sales/sales.actions"
import {GetVendors} from "../../../redux/vendors/vendors.actions"
import {fetchTelecomStart,FetchCategoriesStart} from "../../../redux/telecom/telecom-actions"
import SearchDD from "../../../components/SearchDrpDwn/SearchDD.component"
import {GetPurchaseReport,clearPurchaseReport} from "../../../redux/reports/reports.actions"
import { connect } from 'react-redux'
import { Redirect,useHistory, withRouter } from 'react-router-dom'

const PurchaseReport = ({fetchSaleListStart,GetVendors,vendors,GetClientPricesStart,clientWithPrices,fetchTelecomStart,telcoList,purchaseReport,GetPurchaseReport,FetchCategoriesStart,categories,clearPurchaseReport}) =>
{

    const [downloadParams,setDownloadParams] = useState({FromDate:null,ToDate:null,categoryId:null,SupplierId:null,productId:null,telCoId:null})
    const [withParams,setWithParams] = useState(false)
    const history = useHistory()
    const [reRoute,setreRoute] = useState({val:false,nav:""})
    useEffect(()=>
    {
        FetchCategoriesStart()
        GetClientPricesStart()
        fetchSaleListStart()
        GetVendors()
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
                setDownloadParams({...downloadParams,SupplierId:null})
           }
           else
           {
                setDownloadParams({...downloadParams,SupplierId:parseInt(option.value)})
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
            if (downloadParams.FromDate ===  null || downloadParams.ToDate === null )
            {
                clearPurchaseReport()
            }
            else
            {
                GetPurchaseReport(downloadParams)
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
        clearPurchaseReport()
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

    return(
        <div className="content">
            {reRoute.val ? <Redirect to={`/Reports/${reRoute.nav}`}/> : null}
            <div className="subHeader-reports">
                <h2 className="subText-reports">Reports/Purchase Report</h2>
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
                    <SearchDD placeholder="Vendor" SelectedOption={SelectedOption} type="vendor" data={vendors ? vendors : []}/> 
                    <SearchDD placeholder="Brand" SelectedOption={SelectedOption} type="telco" data={telcoArray ? telcoArray: []}/> 
                    <SearchDD placeholder="Categories" SelectedOption={SelectedOption} type="cat" data={categories ? categories: []}/> 
                    <SearchDD placeholder="Products" SelectedOption={SelectedOption} type="product" data={clientWithPrices ? clientWithPrices[0].offers : []}/> 
                </div>
            </div>
            <div className="reports-blackBar"></div>
            <div className="reports-content">
                <div className='reports-titles' style={{width:"1500px"}} >
                    <div className='reports-title'>Brand</div>
                    <div className='reports-title'>Category</div>
                    <div className='reports-title'>Product</div>
                    <div className='reports-title'>Vendor</div>
                    <div className='reports-title'>Cost</div>
                    <div className='reports-title'>Purchased Qty</div>
                    <div className='reports-title'>Total Cost</div>
                </div>
                    {
                     purchaseReport ? purchaseReport.map((report,index)=>
                     {
                        return  <div className='reports-vals' style={{width:"1500px"}} key={index}>
                                    <div className='reports-title-val'>{report.telCoName}</div>
                                    <div className='reports-title-val'>{report.categoryName}</div>
                                    <div className='reports-title-val'>{report.productName}</div>
                                    <div className='reports-title-val'>{report.supplierName}</div>
                                    <div className='reports-title-val'>{report.itemPrice}</div>
                                    <div className='reports-title-val'>{report.quantity}</div>
                                    <div className='reports-title-val'>{report.totalPrice}</div>
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
        GetVendors:()=>dispatch(GetVendors()),
        GetClientPricesStart:()=>dispatch(GetClientPricesStart()),
        fetchTelecomStart:()=>dispatch(fetchTelecomStart()),
        GetPurchaseReport:(params)=>dispatch(GetPurchaseReport(params)),
        clearPurchaseReport:()=>dispatch(clearPurchaseReport())
    }
}

const mapStateToProps = state =>
{
    return{
        categories:state.telecom.categoryList,
        clientWithPrices:state.prices.clientWithPrices,
        telcoList:state.telecom.telcoList,
        orderId:state.sales.salesList,
        vendors:state.vendors.vendorsList,
        purchaseReport:state.reports.purchaseReport
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PurchaseReport))