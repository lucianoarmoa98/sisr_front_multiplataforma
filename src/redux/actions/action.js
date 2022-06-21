//------------------abre la ventana del filtro
export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter,
    };
}

//------------------token de usuario
export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
}

//------------------actualiza la seleccion de pago "persona o mesa"
export const setPayment = (isPayment) => {
    return {
        type: 'SET_PAYMENT',
        payload: isPayment,
    };
}

//------------------refrescar carrito=> notificacion
export const setRefreshCarrito = (refreshCarrito) => {
    return {
        type: 'SET_REFRESH_CARRITO',
        payload: refreshCarrito,
    };
}

//------------------splashScreen=> oculta la barra de navegacion
export const setSplashScreen = (splashScreen) => {
    return {
        type: 'SET_SPLASH_SCREEN',
        payload: splashScreen,
    };
}

//------------------icon=> oculta el icono de la barra de navegacion
export const setIcon = (icon) => {
    return {
        type: 'SET_ICON',
        payload: icon,
    };
}

//--------------------actualiza los datos del orderItem
export const setOrderItem = (orderItem) => {
    return {
        type: 'SET_ORDER_ITEM',
        payload: orderItem,
    };
}

//---------------------actualiza el estado del qrScaner
export const setQrScaner = (qrScaner) => {
    return {
        type: 'SET_QR_SCANER',
        payload: qrScaner,
    };
}

//---------------------actualiza el estado del viewModal
export const setViewModal = (viewModal) => {
    return {
        type: 'SET_VIEW_MODAL',
        payload: viewModal,
    };
}

//---------------------recarga el home
export const setRefresHome = (refresHome) => {
    return {
        type: 'SET_REFRES_HOME',
        payload: refresHome,
    };
}