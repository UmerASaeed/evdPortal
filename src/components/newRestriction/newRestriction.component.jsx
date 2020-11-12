import React,{ useEffect, useState } from "react"
import {getProdStock,setNewRest} from "../../redux/restrictions/restrictions.actions"
import {FetchStart} from "../../redux/clients/client-actions"
import { connect } from "react-redux"
import "./newRestriction.styles.css"
import { Redirect } from "react-router-dom"


const NewRestriction = ({totalProds,getProdStock,FetchStart,clients,prodStock,ind,setNewRest,saveQoutaStatus}) =>
{
    const [selectedProd,setSelectedProd] = useState(null)
    const [prodID,setProdID] = useState(null)

    useEffect(()=>
    {
        FetchStart()
    },[])


    useEffect(()=>
    {
        if (selectedProd)
        {
            getProdStock({productId:selectedProd.productId,telcoName:selectedProd.telCoName})      
        }
    },[selectedProd])


    const getSelectedProd = (e) =>
    {
        let prod = JSON.parse(e.target.value)
        setProdID(prod.productId)
        setSelectedProd(prod)
    }

    const getClientInfo = (e,client) =>
    {
        if (prodID)
        {
            let newRest = {
                ProductID:prodID,
                CustomerID:client,
                MaxQuantity:e.target.value,
                key:prodID.toString() + client.toString()
            }
            setNewRest(newRest)
        }
    }

    return(
        <div className="prods-newRest">
        {
            saveQoutaStatus ? <Redirect to="/Restrictions"/> : null
        }
            <div className="prods-newRest-val1">
            <select className={selectedProd ? 'prod-dropDown' : 'prod-dropDown-grayed'} defaultValue={null} onChange={getSelectedProd}>
            {
                totalProds ? totalProds.map((prod,index)=>
                {
                    return <option className={selectedProd ? "newRest-prod-val" :"newRest-prod-val-grayed"  } value={JSON.stringify(prod)} key={index}>{prod.telCoName + " - "} {prod.productName}</option>
                }) : null
            }
            </select>
            </div>
            <div className="prods-newRest-val2">{selectedProd ? prodStock[ind] : null}</div>
            <div>
            {
                clients ? clients.map((client,index) => {
                return <div className="prods-newRest-val" key={index}>
                            <div className="cName-newRest">{client.fullName}</div>
                            <div className="client-maq">
                                <input type="text" style={{width:"120px",height:"25px"}} onChange={(e)=>getClientInfo(e,client.customerId)}/>
                            </div>
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
        getProdStock:(id)=>dispatch(getProdStock(id)),
        FetchStart:()=>dispatch(FetchStart()),
        setNewRest:(newRest)=>dispatch(setNewRest(newRest))
    }
}

const mapStateToProps = state =>
{
    return{
        clients:state.clients.ClientData,
        prodStock:state.restrictions.productStock,
        saveQoutaStatus:state.restrictions.saveQoutaStatus
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewRestriction)