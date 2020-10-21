import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from 'react-router'
import {TelecomTitles} from "../../../assets/titles"
import {fetchTelecomStart,ToggleLogoUploaded,ToggleDeleteSuccessful,ToggleCategoryPopUp,ClearTelcoProducts} from "../../../redux/telecom/telecom-actions"

import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import Telco from "../../../components/telco/telco.component"
import PopUp from "../../../components/popUp/popUp.component"

import "./telecom.styles.css"

const Telecom = ({fetchTelecom,telcoList,ToggleLogoUploaded,deleteSuccessful,ToggleDeleteSuccessful,categoryPopUp,ToggleCategoryPopUp,ClearTelcoProducts}) =>
{
    const hisory = useHistory()
    const [search,setSearch] = useState("")
    let FilteredTelcos;
    //const [telecomList,setTelcoList] = useState(telcoList)
    let draggedItem;
    let draggedOnItem;


    // const dragStartHandle = (e,param) =>
    // {
    //     draggedItem = param
    // }

    // const dragEnterHandle = (e,param) =>
    // {
    //     draggedOnItem = param  
    // }

    // const handleDragEnd = () =>
    // {
        
    //     if (draggedItem !== draggedOnItem)
    //     {
    //         setTelcoList(telecomList=>
    //         {
    //             let newList = JSON.parse(JSON.stringify(telecomList));
    //             let temp1;
    //             let temp2;
    //             newList.forEach((telco,index) =>
    //             {
                    
    //                 if (telco.seqNo === draggedItem)
    //                 {
    //                     temp1 = index
    //                 }

    //                 if (telco.seqNo === draggedOnItem)
    //                 {
    //                     temp2 = index
    //                 }
    //             })
    //             let temp3 = newList[temp1]
    //             newList[temp1] = newList [temp2]
    //             newList[temp2] = temp3
              

    //             newList.forEach((telco,index)=>
    //             {
    //                 telco.seqNo = index + 1
    //             })
    //             return newList
    //         })  
    //     }
    // }

    useEffect(()=>
    {
        fetchTelecom()
        ToggleLogoUploaded()
        ClearTelcoProducts()
    },[fetchTelecom])


    if (deleteSuccessful)
    { 
        ToggleDeleteSuccessful()
        hisory.go(0)
    }

    const toggleCaetgoryPopUp = () =>
    {
        ToggleCategoryPopUp()
    }

    const filterTelcos = (e) =>
    {
        setSearch(e.target.value)
    }

    if (telcoList)
    {
        FilteredTelcos = telcoList.filter(telco =>
        {
            return telco.name.toLowerCase().includes(search) 
        })
    }


    return(
        <div className="content">
            <div className="subHeader">
                    <h2 className="subText">Telecom</h2>
                    <div className="options">
                        <input type="search" placeholder="Search" className="searchBar" onChange={filterTelcos}/>
                        <div onClick={toggleCaetgoryPopUp}>
                            <CustomButton btnText="Manage Categories"/>
                        </div>
                        <div className="nbsp"></div>
                        <CustomButton btnText="Add new Telecom" nav="addTelecom" />
                    </div>
                </div>
            <SubSection titles={TelecomTitles}>
                {
                    //onDragStart={(e)=>{dragStartHandle(e,telco.seqNo)}}  onDragEnter={(e)=>{dragEnterHandle(e,telco.seqNo)}} onDragEnd={handleDragEnd}
                    telcoList ? FilteredTelcos.map((telco,index)=>
                    {
                        return <div key={telco.seqNo} >
                                    <Telco key={index} seq={telco.seqNo} enName={telco.name} arName={telco.nameAra} imgSrc={"http://localhost/StaffApp/logos/" + `${telco.logoName}`} telcoId={telco.telCoId}/>
                                </div>
                    }) : null
                }
                <div className="manageCat-PopUp">
                    <PopUp header="Manage Categories" closeVal={categoryPopUp} popUpType="manageCategories"/>
                </div>
            </SubSection>
        </div>
    );
}

const mapStateToProps = state =>
{
    return{
        telcoList:state.telecom.telcoList,
        deleteSuccessful:state.telecom.deleteSuccessful,
        categoryPopUp:state.telecom.categoryPopUp,
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        fetchTelecom:() => dispatch(fetchTelecomStart()),
        ToggleLogoUploaded:()=>dispatch(ToggleLogoUploaded()),
        ToggleDeleteSuccessful:()=>dispatch(ToggleDeleteSuccessful()),
        ToggleCategoryPopUp:()=>dispatch(ToggleCategoryPopUp()),
        ClearTelcoProducts:()=>dispatch(ClearTelcoProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Telecom);

