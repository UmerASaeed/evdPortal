import React, { useEffect, useState,useRef} from "react"
import {Route,Redirect} from 'react-router-dom'
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import {CreateTelco,UploadLogo} from "../../../redux/telecom/telecom-actions"
import "./Addtelecom.styles.css"
import { connect } from "react-redux"

const Addtelecom = ({telcos,createTelcoAction,telcoCreated,UploadLogo,logoUploaded}) =>
{
    const [imgSrc,setImgSrc] = useState("")
    const [telcoNames,setTelcoNames] = useState({name:"",nameAra:"",seqNo:0})
    const isFirstRender = useRef(true)
    const isFirstRenderlogo = useRef(true)
    const hiddenFileInput = useRef(null)

    const handleChange = (e) =>
    {
        const {name,value}=e.target
        setTelcoNames({...telcoNames,[name]:value})
    }

    const DisplayImg = (e) =>
    {
        const fileList = e.target.files;
        setImgSrc(fileList[0])
    }

    const createTelco = () =>
    {
        const copyArr = JSON.parse(JSON.stringify(telcos))
        const last = copyArr.pop()
        setTelcoNames({...telcoNames,seqNo:last.seqNo+1})    
        
    }

    const handleClick = () =>
    {
        hiddenFileInput.current.click();
    }

    useEffect(()=>
    {
        if (!isFirstRender.current) {
            
            createTelcoAction(telcoNames)
          }
        isFirstRender.current = false  
    },[telcoNames.seqNo,createTelcoAction])


    useEffect(()=>
    {
        if (!isFirstRenderlogo.current) {
            const copyArr = JSON.parse(JSON.stringify(telcos))
            const last = copyArr.pop()
            let bodyFormData = new FormData()
            bodyFormData.append('image',imgSrc)
            bodyFormData.append("telCoId",last.telCoId)
            UploadLogo(bodyFormData)
        }
        isFirstRenderlogo.current = false
    },[imgSrc,UploadLogo])

    return(
        <div className="telecom-content">
            <Route exact path="/Telecom/addTelecom" render={()=>logoUploaded ? <Redirect to = {`/Telecom`}/> : null } />
            <div className='add-telco-title'>
                <h2>Telecom / Add New Telecom</h2>
            </div>
            <SubSection quarter={true}>
            {
               telcoCreated 
               ?
               <div className="telecom-logo">
                    <p className="tele-logo">Logo</p>
                    <div className="tn-logo">
                    <input type="button" id="uploadLogo" value="UPLOAD" onClick={handleClick} />
                        <input type="file" ref={hiddenFileInput} onChange={DisplayImg} style={{display:'none'}}/>
                    </div>
                </div>
                :
                <div>
                    <div className="telecom-info">
                        <h2 className="telecom-info-text">Information</h2>
                            <div className="telecom-name-en">
                                <p>Telecom Name (EN)</p>
                                <input type="text" placeholder=" Telecom Name (EN)" className="tn-en" name="name" onChange={handleChange} required/>
                            </div>
                            <div className="telecom-name-ar">
                                <p>Telecom Name (AR)</p>
                                <input type="text" placeholder="            (Telecom Name (AR" className="tn-ar" name="nameAra" dir="rtl" lang="ar" onChange={handleChange} required/>
                            </div>
                            
                    </div>
                    <div className="new-telecom">
                        <CustomButton btnText="Create New Telecom" createTelco={createTelco} />
                    </div>
                </div> 
            }    
            </SubSection>
        </div>
    );
}

const mapDispatchToProps = dispatch =>
{
    return{
        createTelcoAction:(telcoData) => dispatch(CreateTelco(telcoData)),
        UploadLogo:(formData) => dispatch(UploadLogo(formData))
    }
}

const mapStateToProps = state =>
{
    return{
        telcos:state.telecom.telcoList,
        telcoCreated:state.telecom.telcoCreated,
        logoUploaded:state.telecom.logoUploaded
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Addtelecom)



