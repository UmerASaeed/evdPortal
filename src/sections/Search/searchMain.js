import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import CustomButton from "../../components/customButton/customButton.component"
import {GetVendors} from "../../redux/vendors/vendors.actions"
import {GetClientPricesStart} from "../../redux/prices/prices-actions"
import {fetchSaleListStart} from "../../redux/sales/sales.actions"
import {StartSearch} from "../../redux/search/search.actions"
import SearchDD from "../../components/SearchDrpDwn/SearchDD.component"
import Spinner from "../../components/spinner/spinner.component"
import "./search.styles.css"

const GlobalSearch = ({GetVendors,GetClientPricesStart,vendors,products,orderId,fetchSaleListStart,StartSearch,searchResult}) =>
{
    const [searchParam,setSearchParam] = useState({Sold:null,voucherPin:"",supplierId:null,UploadFromDate:null,UploadToDate:null,SerialNumber:"",BatchNumber:"",OrderNumber:"",ProductId:null,SaleDate:null,})
   
    useEffect(()=>
    {
        StartSearch({})
    },[])

    useEffect(()=>
    {
        GetVendors()
        GetClientPricesStart()
        fetchSaleListStart()
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
        if (option.type ==='product')
        {
            setSearchParam({...searchParam,ProductId:parseInt(option.value)})
        }
        else if (option.type==="vendor")
        {
            setSearchParam({...searchParam,supplierId:option.value})
        }
        else if (option.type === 'orders')
        {
            setSearchParam({...searchParam,OrderNumber:option.value})
        }
        else
        {
            let sold = null;
            if (option.value === 'Used')
            {
                sold = true
            }
            else if ( option.value === 'Unused')
            {
                sold = false
            }
            else
            {
                sold = null
            }
            setSearchParam({...searchParam,Sold:sold})
        }
    }

    let orderIdArray = []
    if(orderId)
    {
        orderId.forEach(order=>
        {
            orderIdArray.push(order.orderId)
        })
    }

    const handleChange = (e) =>
    {
        let {name,value} = e.target
        if (name === 'SaleDate' || name ==="UploadFromDate" || name === "UploadToDate")
        {
            if (value==="")
            {
                value = null
            }
        }
        setSearchParam({...searchParam,[name]:value})
    }

    const search = () =>
    {
        StartSearch(searchParam)
    }
    
    return(
        <div className="content">
            <div className="subHeader-search">
                <h2 className="subText-search">Search</h2>
                <div className="optionss-search">
                    <input type="text" className="search-option"  placeholder=" From Date" name="UploadFromDate" onFocus={changeType} onBlur={changeTypeBack} onChange={handleChange}/>
                    <input type="text" className="search-option"  placeholder=" To Date" name="UploadToDate" onFocus={changeType} onBlur={changeTypeBack} onChange={handleChange}/>
                    <input type="text" className="search-option" placeholder=" SN" name="SerialNumber" onChange={handleChange}/>
                    <input type="text" className="search-option" placeholder=" VN" name="voucherPin" onChange={handleChange}/>
                    <input type="text" className="search-option" placeholder=" Batch Number" name="BatchNumber" onChange={handleChange}/>
                    <input type="text" className="search-option"  placeholder=" Transaction Time" onFocus={changeType} onBlur={changeTypeBack} name="SaleDate" onChange={handleChange}/>
                    {
                        orderIdArray ? <SearchDD placeholder="Request #" SelectedOption={SelectedOption} type="orders" data={orderIdArray}/> : null
                    }
                    {
                        vendors ? <SearchDD placeholder="Vendor" SelectedOption={SelectedOption} type="vendor" data={vendors}/> : null
                    }
                    {
                        products ? <SearchDD placeholder="Product" SelectedOption={SelectedOption} type="product" data={products[0].offers}/> : null
                    }
                    <SearchDD placeholder="Status" SelectedOption={SelectedOption} type="status"/>
                </div>
                
                <div className="searchMain-btn" onClick={search}>
                    <CustomButton btnText="Search"/>
                </div>
            </div>
            
            <div className="subSection-search">
                <div className="searchTitles">
                    <div className="searchTitle">Uploaded</div>
                    <div className="searchTitle">Product</div>
                    <div className="searchTitle">SN</div>
                    <div className="searchTitle">VN</div>
                    <div className="searchTitle">Batch Name</div>
                    <div className="searchTitle">Status</div>
                    <div className="searchTitle">Vendor</div>
                    <div className="searchTitle">Client</div>
                    <div className="searchTitle">Reference #</div>
                    <div className="searchTitle">Transaction Time</div>
                </div>
                {
                    searchResult ? searchResult.map((voucher,index)=>
                    {
                        return  <div className="searchTitles-Vals" key={index}>
                                    <div className="searchTitle">{voucher.uploadedAt}</div>
                                    <div className="searchTitle">{voucher.productName}</div>
                                    <div className="searchTitle">{voucher.serialNumber}</div>
                                    <div className="searchTitle">{voucher.voucherPin}</div>
                                    <div className="searchTitle">{voucher.batchNumber}</div>
                                    <div className="searchTitle">{voucher.sold ? "Used" : "Unused"}</div>
                                    <div className="searchTitle">{voucher.supplierName}</div>
                                    <div className="searchTitle">{voucher.clientName}</div>
                                    <div className="searchTitle">{voucher.orderId}</div>
                                    <div className="searchTitle">{voucher.saleTime}</div>
                                </div>
                    }) :  <Spinner/>
                }
            </div>
            
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        GetVendors:()=>dispatch(GetVendors()),
        GetClientPricesStart:()=>dispatch(GetClientPricesStart()),
        fetchSaleListStart:() => dispatch(fetchSaleListStart()),
        StartSearch:(params)=>dispatch(StartSearch(params))
    }
}

const mapStateToProps = state =>
{
    return{
        vendors:state.vendors.vendorsList,
        products:state.prices.clientWithPrices,
        orderId:state.sales.salesList,
        searchResult:state.search.searchResult
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GlobalSearch)