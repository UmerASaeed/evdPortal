import React from "react"

const SearchDD = ({placeholder,SelectedOption,data,type}) =>
{
    const returnOption = (e) =>
    {
        let obj = {
            type,
            value:e.target.value
        }
        if (e.target.value === "0")
        {
            obj.value = null
        }
        if (isNaN(e.target.value) && obj.type !== 'status' )
        {
            obj.value = null
        }
        SelectedOption(obj)
    }

    return(
        <div>
            <select style={{height:"27px",width:"150px",marginRight:"10px",marginBottom:"19px"}} onChange={returnOption} >
                <option value={0}>{placeholder}</option>
                {
                    type === 'status' ? <option value="Used">Used</option> : null
                }
                {
                    type === 'status' ? <option value="Unused">Unused</option> : null
                }
                {
                    type === 'status' ? null
                    :
                    data.map((item,index)=>
                    {
                        return <option value={type === 'vendor' ? item.supplierId : type === "product" ? item.productId : type === 'clients' ? item.customerId : type === 'telco' ? item.telcoId : type === 'cat' ? item.categoryId : null} key={index}>{type === 'vendor' ? item.name : type === "product" ? item.productName : type ==='orders' ? item : type === 'clients' ? item.fullName : type === 'telco' ? item.telcoName : type === 'cat' ? item.name : null}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SearchDD