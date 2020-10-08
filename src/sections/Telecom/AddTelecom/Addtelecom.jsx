import React from "react"
import SubSection from "../../../components/subSection/subSection.component"
import CustomButton from "../../../components/customButton/customButton.component"
import "./Addtelecom.styles.css"

const Addtelecom = () =>
{
    return(
        <div className="content">
            <div className='title'>
                <h2>Telecom / Add New Telecom</h2>
            </div>
            <SubSection quarter={true}>
                <div className="telecom-info">
                    <h2 className="telecom-info-text">Information</h2>
                        <div className="telecom-name-en">
                            <p>Telecom Name (EN)</p>
                            <input type="text" placeholder=" Telecom Name (EN)" className="tn-en"/>
                        </div>
                        <div className="telecom-name-ar">
                            <p>Telecom Name (AR)</p>
                            <input type="text" placeholder=" Telecom Name (AR)" className="tn-ar"/>
                        </div>
                        <div className="telecom-logo">
                            <p>Logo</p>
                            <div className="tn-logo">
                                <CustomButton btnText="UPLOAD"/>
                            </div>
                        </div>
                </div>
            </SubSection>
            <div className="new-telecom">
             <CustomButton btnText="Create New Telecom"/>
            </div>
        </div>
    );
}

export default Addtelecom