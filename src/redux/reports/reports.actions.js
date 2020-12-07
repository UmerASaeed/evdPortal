import {ReportActionTypes} from './reports.types'

export const GetDwnldReport = (params) =>
{
    return{
        type:ReportActionTypes.GET_DWNLD_REPORT,
        payload:params
    }
}

export const GetDwnldReportSuccess = (report) =>
{
    return{
        type:ReportActionTypes.GET_DWNLD_REPORT_SUCCESS,
        payload:report
    }
}

export const clearDownloadReport = () =>
{
    return{
        type:ReportActionTypes.CLEAR_DWNLD_REPORT
    }
}

export const GetWalletReport = (params) =>
{
    return{
        type:ReportActionTypes.GET_WALLET_REPORT,
        payload:params
    }
}

export const GetWalletReportSuccess = (report) =>
{
    return{
        type:ReportActionTypes.GET_WALLET_REPORT_SUCCESS,
        payload:report
    }
}

export const clearWalletReport = () =>
{
    return{
        type:ReportActionTypes.CLEAR_WALLET_REPORT
    }
}

export const GetPaymentReport = (params) =>
{
    return{
        type:ReportActionTypes.GET_PAYMENT_REPORT,
        payload:params
    }
}

export const GetPaymentReportSuccess = (report) =>
{
    return{
        type:ReportActionTypes.GET_PAYMENT_REPORT_SUCCESS,
        payload:report
    }
}

export const clearPaymentReport = () =>
{
    return{
        type:ReportActionTypes.CLEAR_PAYMENT_REPORT
    }
}

export const GetPurchaseReport = (params) =>
{
    return{
        type:ReportActionTypes.GET_PURCHASE_REPORT,
        payload:params
    }
}

export const GetPurchaseReportSuccess = (report) =>
{
    return{
        type:ReportActionTypes.GET_PURCHASE_REPORT_SUCCESS,
        payload:report
    }
}

export const clearPurchaseReport = () =>
{
    return{
        type:ReportActionTypes.CLEAR_PURCHASE_REPORT
    }
}

export const GetInvenUsageReport = (params) =>
{
    return{
        type:ReportActionTypes.GET_INVEN_USAGE_REPORT,
        payload:params
    }
}

export const GetInvenUsageReportSuccess = (report) =>
{
    return{
        type:ReportActionTypes.GET_INVEN_USAGE_REPORT_SUCCESS,
        payload:report
    }
}

export const clearInvenUsageReport = () =>
{
    return{
        type:ReportActionTypes.CLEAR_INVEN_USAGE_REPORT
    }
}

export const GetInvenReport = (params) =>
{
    return{
        type:ReportActionTypes.GET_INVENTORY_REPORT,
        payload:params
    }
}

export const GetInvenReportSuccess = (report) =>
{
    return{
        type:ReportActionTypes.GET_INVENTORY_REPORT_SUCCESS,
        payload:report
    }
}

export const clearInvenReport = () =>
{
    return{
        type:ReportActionTypes.CLEAR_INVENTORY_REPORT
    }
}