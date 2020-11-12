import React, { useEffect, useState } from "react"
import {FetchCategoriesStart,toggleAddCategory,addCategoryStart,deleteCategoryStart} from "../../redux/telecom/telecom-actions"
import { connect } from "react-redux"
import CustomButton from "../customButton/customButton.component"
import {ReactComponent as Drag} from "../../assets/Drag.svg"
import "./manageCategories.styles.css"

const ManageCat = ({FetchCategoriesStart,categories,addingCategory,toggleAddCategory,addCategoryStart,deleteCategoryStart,deletingCat}) =>
{

    const [categoryName,setCategoryName] = useState("")

    useEffect(()=>
    {
        if (!addingCategory || !deletingCat)
        {
            FetchCategoriesStart()
        }
    },[FetchCategoriesStart,addingCategory,deletingCat])

    const addNewCategory = () =>
    {
        toggleAddCategory()
    }

    const createCategory = () =>
    {
        let category ={
            name:categoryName
        }
        addCategoryStart(category)
    }

    const handleChange = (e)=>
    {
        const {value}=e.target;
        setCategoryName(value)
    }

    const DeleteCategory = (id)=>
    {
        let category = {
            Id:id
        }
        deleteCategoryStart(category)
    }

    return(
        <div className="ManageCat" >
        {   
            addingCategory ?  <div className="ManageCat-popUpContent">
                        <div className="ManageCatName">
                            <p className="manageCat-title-vals">Name</p>
                            <input type='text' className="displayCat" onChange={handleChange}/>
                        </div>
                        <div className="ManageCat-Add" onClick={createCategory}>
                                <p className="manageCat-title-vals">Add</p>
                                <CustomButton btnText="Add"/>
                            </div>    
                    </div>    
            : categories ? categories.map((category,index)=>
            {
                return <div className="ManageCat-popUpContent" key={index}>
                            <div className="ManageCatName">
                                <p className="manageCat-title-vals">Seq</p>
                                <div className="manageCat-seq">
                                    <Drag/>
                                    <div className="manageCat-seqNo">1</div>
                                </div>
                            </div>
                            <div className="ManageCatName">
                                <p className="manageCat-title-vals">Name</p>
                                <input type='text' defaultValue={`${category.name}`} className="displayCat" readOnly/>
                            </div>
                            <div className="ManageCat-Delete">
                                <p className="manageCat-title-vals">Delete</p>
                                <div onClick={()=>DeleteCategory(category.categoryId)}>
                                    <CustomButton btnText="delete" del={true}/>
                                </div>
                            </div>    
                        </div>
            }) : null
        }       
        {
            addingCategory ? null
            : <div className="addCat" onClick={addNewCategory} >
                <CustomButton btnText="Add new Category"/>
            </div>
        }    
        </div>    
    )
}

const mapDispatchToProps = dispatch =>
{
    return{
        FetchCategoriesStart:()=>dispatch(FetchCategoriesStart()),
        toggleAddCategory:()=>dispatch(toggleAddCategory()),
        addCategoryStart:(category)=>dispatch(addCategoryStart(category)),
        deleteCategoryStart:(id)=>dispatch(deleteCategoryStart(id))
    }
}

const mapStateToProps = state =>
{
    return{
        categories:state.telecom.categoryList,
        addingCategory:state.telecom.addingCategory,
        deletingCat:state.telecom.deletingCategory
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageCat)


