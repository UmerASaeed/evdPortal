import {ReportActionTypes} from "./reports.types"

const INITIAL_STATE = {
    downloadReport:null,
    walletReport:null,
    paymentReport:null,
    purchaseReport:null,
    inventoryReport:null,
    inventoryUsageReport:null
}

const ReportsReducer = (state = INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case ReportActionTypes.GET_DWNLD_REPORT_SUCCESS:
            return{
                ...state,
                downloadReport:action.payload,
            }
        case ReportActionTypes.CLEAR_DWNLD_REPORT:
            return{
                ...state,
                downloadReport:null
            }
        case ReportActionTypes.GET_WALLET_REPORT_SUCCESS:
            return{
                ...state,
                walletReport:action.payload
            }
        case ReportActionTypes.CLEAR_WALLET_REPORT:
            return{
                ...state,
                walletReport:null
            }
        case ReportActionTypes.GET_PAYMENT_REPORT_SUCCESS:
            return{
                ...state,
                paymentReport:action.payload,
            }
        case ReportActionTypes.CLEAR_PAYMENT_REPORT:
            return{
                ...state,
                paymentReport:null
            }  
        case ReportActionTypes.GET_PURCHASE_REPORT_SUCCESS:
            return{
                ...state,
                purchaseReport:action.payload,
            }
        case ReportActionTypes.CLEAR_PURCHASE_REPORT:
            return{
                ...state,
                purchaseReport:null
            }   
        case ReportActionTypes.GET_INVEN_USAGE_REPORT_SUCCESS:
            return{
                ...state,
                inventoryUsageReport:action.payload
            }
        case ReportActionTypes.CLEAR_INVEN_USAGE_REPORT:
            return{
                ...state,
                inventoryUsageReport:null
            }
        case ReportActionTypes.GET_INVENTORY_REPORT_SUCCESS:
            return{
                ...state,
                inventoryReport:action.payload
            }
        case ReportActionTypes.CLEAR_INVENTORY_REPORT:
            return{
                ...state,
                inventoryReport:null
            }
        default:
            return state    
    }
}

export default ReportsReducer