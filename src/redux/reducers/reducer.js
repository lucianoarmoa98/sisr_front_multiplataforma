const initialState = {
    isFilter: false,
    token: false,
    refreshCarrito: null,
    splashScreen: true,
    isIcon: true,
    orderItem: true,
    qrScaner: false,
    isPayment: false,
    viewModal: false,
    refresHome: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                // isFilter: !state.isFilter,
                isFilter: action.payload,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                // token: !state.token,
                token: action.payload,
            };
        case 'SET_REFRESH_CARRITO':
            return {
                ...state,
                refreshCarrito: !state.refreshCarrito,
            };
        case 'SET_SPLASH_SCREEN':
            return {
                ...state,
                splashScreen: action.payload,
            };
        case 'SET_ICON':
            return {
                ...state,
                isIcon: action.payload,
            };
        case 'SET_ORDER_ITEM':
            return {
                ...state,
                orderItem: !state.orderItem,
            };
        case 'SET_QR_SCANER':
            return {
                ...state,
                qrScaner: action.payload,
            };
        case 'SET_PAYMENT':
            return {
                ...state,
                isPayment: action.payload,
            };
        case 'SET_VIEW_MODAL':
            return {
                ...state,
                viewModal: action.payload,
            };
        case 'SET_REFRES_HOME':
            return {
                ...state,
                refresHome: !state.refresHome,
            };
        default:
            return state;
    }
};