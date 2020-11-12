import React, { useEffect } from "react"
import CustomButton from "../../components/customButton/customButton.component"
import SubSection from "../../components/subSection/subSection.component"
import RestrictionsList from "../../components/RestrictionsList/restrictionsList.component"
import {FetchRestStart} from "../../redux/restrictions/restrictions.actions"
import Spinner from "../../components/spinner/spinner.component"
import {RestrictionsTitles} from "../../assets/titles"
import { connect } from "react-redux"
import { useHistory, withRouter } from "react-router-dom"

const Restrictions = ({FetchRestStart,restList,match}) =>
{
    const history = useHistory()

    const newRestr = () =>
    {
        history.push(`${match.path}/NewRestriction`)
    }

    useEffect(()=>
    {
        FetchRestStart()
    },[])

    return(
        <div className="content">
            <div className="subHeader">
                <h2 className="subText">Restrictions</h2>
                <div className="options" onClick={newRestr}>
                    <CustomButton btnText="New Restriction"/>
                </div>
            </div>
            <SubSection titles={RestrictionsTitles} ResTitle={true}>
                {
                   restList ? restList.map((restr,index)=>
                    {
                        return <RestrictionsList restr={restr} key={index}/>
                    }) : <Spinner/>
                }
            </SubSection>
        </div>
    )
}

const mapStateToProps = state =>
{
    return{
        restList:state.restrictions.restrList
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        FetchRestStart:()=>dispatch(FetchRestStart()),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Restrictions))