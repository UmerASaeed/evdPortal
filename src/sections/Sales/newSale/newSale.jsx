import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {FetchStart} from "../../../redux/clients/client-actions"
import CustomButton from "../../../components/customButton/customButton.component"
import {fetchNSProdsStart,clearSelectedProducts,placeOrder} from "../../../redux/sales/sales.actions"
import NewSaleProd from "../../../components/newSaleProds/newSaleProds.component"

import "./newSale.styles.css"
import { Redirect, useHistory } from "react-router-dom"

const NewSale = ({getClients,clients,fetchNSProdsStart,NewSaleProds,selectedProducts,clearSelectedProducts,placeOrderAction,placeOrderStatus}) =>
{
    const [client,setClient] = useState(null)
    const [clientInfo,setclientInfo] = useState({clientName:"",balance:null})
    const history = useHistory()
    let spList = [];
    let total = 0;
    let totalQty = 0;

    useEffect(()=>
    {   
        getClients()
        clearSelectedProducts()
    },[])

    useEffect(()=>
    {
        if (client)
        {
            let cid = {
                CustomerId:parseInt(client)
            }
            fetchNSProdsStart(cid)
        }
    },[client])

    const SelectedClient = (e) =>
    {
        let client = JSON.parse(e.target.value)
        if(client.customerId !== 0)
        {
            setClient(client.customerId)
            setclientInfo({clientName:client.fullName,balance:client.currentCredit})
            clearSelectedProducts()
        }
    }

    if (selectedProducts)
    {
        Object.entries(selectedProducts).map(prod=>
        {
            if(prod[1])
            {
                total = total + (prod[1].price * prod[1].qty)
                totalQty = totalQty + parseInt(prod[1].qty)
                spList.push(prod[1])
            }
        })
    }

    const placeOrder = () =>
    {
        if (client !== null && spList.length > 0)
        {
            let order = {
                CustomerId:client,
                OrderItems:[]
            }
    
            order.OrderItems = spList.map(sp=>
            {
                return{
                    ProductID:sp.productId,
                    Quantity:parseInt(sp.qty)
                }
            })
    
            placeOrderAction(order)
        }
    }


    const cancelOrder = () =>
    {
        history.goBack()
    }

    return(
        <div className="content">
        {
            placeOrderStatus ? <Redirect to="/Sales"/> :
            <div>
                <div className="newSale-selectClient">
                    <div>Select Client</div>
                    <div>
                        <select placeholder="Select Client" className="ns-clientDropDown" onChange={SelectedClient}>
                            <option value={0}>Select Client</option>
                        {
                            clients ? clients.map((client,index)=>
                            {
                                return <option value={JSON.stringify(client)} key={index}>{client.fullName}</option>
                            }) : null
                        }    
                        </select>
                    </div>
                </div>
                <div className="ns-content">
                    <div className="ns-left-panel">
                    {
                        NewSaleProds ? NewSaleProds.map((prod,index)=>
                        {
                            return <NewSaleProd key={index} prod={prod}/>
                        }) : null
                    }
                    </div>
                    <div>
                        
                    </div>
                    <div className="ns-right-panel">
                    {
                        client ? 
                        <div>
                            <div className="ns-stats-clientName">{clientInfo.clientName}</div>
                            <div className="ns-stats-clientInfo">
                                <div className="ns-clientBalance">
                                    <div>Wallet Balance</div>
                                    <div className="ns-cn-balanceVal">{clientInfo.balance}</div>
                                </div>
                                <div className="ns-requestTotal"> 
                                    <div>Request Total</div>
                                    <div className="ns-cn-rtVal">{total}</div>
                                </div>
                            </div>
                            <div className="ns-borderBottom"></div>
                            <div className="ns-sp-headers">
                                <div className="ns-sp-sn">SN</div>
                                <div className="ns-sp-prod">Product</div>
                                <div className="ns-sp-price">Price</div>
                                <div className="ns-sp-qty">Qty</div>
                                <div className="ns-sp-total">Total</div>
                            </div>
                            <div className="ns-sp-list">
                            {
                                spList ? spList.map((prod,index)=>{                            
                                    return <div className="ns-sp-vals" key={index}>
                                                <div className="ns-sp-sn">{index + 1}</div>
                                                <div className="ns-sp-prod">{prod.productName}</div>
                                                <div className="ns-sp-price">{prod.price}</div>
                                                <div className="ns-sp-qty">{prod.qty}</div>
                                                <div className="ns-sp-total">{prod.price * prod.qty}</div>
                                            </div>
                                }) : null
                            }
                            <div className="ns-borderBottom2"></div>
                            <div className="ns-totalVals">
                                <div>{totalQty}</div>
                                <div className="ns-sp-totalVal">{total}</div>
                            </div>
                            </div>
                        </div> :null
                    }   
                    </div>
                    <div className="ns-orderBtns">
                        <div className='ns-cancel-btn' onClick={cancelOrder}>
                            <CustomButton btnText = "cancel" del={true}/> 
                        </div>
                        <div className='ns-placeOrder-btn' onClick={placeOrder}>
                            <CustomButton btnText = "place Order" />
                        </div>
                    </div>
                </div>
                </div> 
        }    
        </div>
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        getClients:()=>dispatch(FetchStart()),
        fetchNSProdsStart:(cID)=>dispatch(fetchNSProdsStart(cID)),
        clearSelectedProducts:()=>dispatch(clearSelectedProducts()),
        placeOrderAction:(order)=>dispatch(placeOrder(order))
    }
}

const mapStateToProps = state =>
{
    return{
        clients:state.clients.ClientData,
        NewSaleProds:state.sales.NewSaleProds,
        selectedProducts:state.sales.selectedProducts,
        placeOrderStatus:state.sales.placeOrderStatus
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewSale)