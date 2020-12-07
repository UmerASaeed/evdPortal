import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SubSection from "../../../components/subSection/subSection.component";
import CustomButton from "../../../components/customButton/customButton.component";
import {ClientTitles} from "../../../assets/titles";
import Client from "../../../components/client/client.component"
import {FetchStart} from "../../../redux/clients/client-actions"
import Spinner from "../../../components/spinner/spinner.component"

import "./clients.styles.css"
import { useHistory } from 'react-router-dom';


const Clients = ({fetchClients,clients,isfetching,updateSuccess}) =>
{
    const [searchFor,setSearchFor] = useState("")
    let FilteredClients;
    const history = useHistory()

    const searchClients = (event) =>
    {
        const {value} = event.target
        setSearchFor(value)
    }

    useEffect(()=>
    {
        fetchClients()
    },[fetchClients])

    if (clients)
    {
        FilteredClients = clients.filter(client =>
        {
            return client.fullName.toLowerCase().includes(searchFor) 
        })
    }
    
    if(updateSuccess)
    {
        history.go()
    }

    return(
        <div className="client-content">
            <div className="subHeader">
                <h2 className="subText">Clients</h2>
                <div className="options">
                    <input type="search" placeholder="Search" className="searchBar" onChange={searchClients}/>
                    <CustomButton btnText="Add new client" nav="addClient"/>
                </div>
            </div>
            <SubSection titles={ClientTitles}>
                {
                    isfetching 
                    ? <Spinner/>
                    : clients ? FilteredClients.map((client,index) =>
                    {
                    return <Client key ={index} id={client.customerId} uid={client.userId} fullName={client.fullName} currentCredit={client.currentCredit} paymentBalance={client.paymentBalance} lastLogInAt={client.lastLogInAt} username={client.userName} createdAt={client.createdAt}/>
                    } ) :null
                }
            </SubSection>
        </div>
    );
}

const mapStateToProps = state =>
({
        clients:state.clients.ClientData,
        isfetching:state.clients.isfetching,
        updateSuccess:state.clients.updateSuccess
})

const mapDispatchToProps = dispatch =>
{
    return{
        fetchClients:()=>dispatch(FetchStart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Clients)