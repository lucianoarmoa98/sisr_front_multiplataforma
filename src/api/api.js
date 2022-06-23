import axios from "axios";

//Url base desarrollo
// const URL = "http://192.168.122.189:8000";
// const URL = "http://127.0.0.1:8000";
const URL = 'https://sisr-backendsix.rosphrethic.com'
// const URL = 'http://sisr-backend.test'

//-------------------------------------------------------------listar locales
export const getLocales = () => {

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/venues',
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response);
                //reject(response.data.data);
                //console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                resolve(error.response.data);
                console.log("error-data", error);
            });
    });
};

//-------------------------------------------------------------listar categorias de productos
export const getMenuCategories = (id) => {
    let body = {}
    body.venue_id = id
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/products-public',
            method: 'Post',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data.data);
                //reject(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                resolve(error.response.data);
                console.log("error-data", error.response.data);
            });
    });
};

//-------------------------------------------------------------Registrar usuarios
export const postRegister = (body) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/users/register',
            method: 'Post',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data.data);
                //reject(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                resolve(error.response.data);
                // console.log("error-data", error.response.data);
            });
    });
};

//-------------------------------------------------------------Iniciar sesion
export const postLogin = (body) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/oauth/token',
            method: 'Post',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data);
                // console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Obtengo los datos del usuario
export const getUser = (body) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/users/details',
            method: 'Get',
            // data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Actualiza el perfil del usuario
export const postUserUpdate = ({body, user}) => {
   
    console.log("body-data", user);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/users/update',
            method: 'Post',
            data: user,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};


//-------------------------------------------------------------Detalles de menu
export const postDetailsMenu = (body) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/products-public/details',
            method: 'Post',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};


//-------------------------------------------------------------Obtiene el numero de mesa
export const postDetailsMesaNumber = (body) => {
    let bodyMesa = {}
    bodyMesa.table_id = body
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/tables/details',
            method: 'Post',
            data: bodyMesa,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Obtiene detalles del local
export const postDetailsLocal = (body) => {
    let bodyLocal = {}
    bodyLocal.venue_id = body
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/venues/details',
            method: 'Post',
            data: bodyLocal,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Crea una orden
export const postCurrentOrder = ({body, ordenId}) => {
    let bodyOrden = {}
    bodyOrden.table_id = ordenId
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/orders/store',
            method: 'Post',
            data: bodyOrden,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//------------------------------------------------------------send order
export const postOrderSend = ({body, orders}) => {
    let bodyOrden = {}
    bodyOrden.products = orders
   
    // console.log("body-ordes", orders ? orders.map(item => item) : "no hay ordenes");

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/orders/store-order-product',
            method: 'Post',
            data: bodyOrden,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//------------------------------------------------------------Llamar al mesero
export const postCallMesero = ({body, call}) => {
    
   
    // console.log("body-ordes", orders ? orders.map(item => item) : "no hay ordenes");

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/tables/call-waiter',
            method: 'Post',
            data: call,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Verifica si tiene una orden pendiente
export const getCurrentOrder = (body) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/orders/current-order',
            method: 'Get',
            // data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Obtengo tipo de moneda
export const getCurrencyMoney = (body) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/currencies',
            method: 'Get',
            // data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Unirme a la mesa
export const postJoinOrders = (body, data) => {
   
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/orders/join',
            method: 'Post',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.data);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------Cerrar pedido
export const postOrderFinalize = ({body, ordenData}) => {
    // console.log("orderData", ordenData);
   
    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/orders/finalize',
            method: 'Post',
            data: ordenData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                // console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//------------------------------------------------------------Ver promociones
export const getPromociones = (body) => {
    
   
    // console.log("body-ordes", orders ? orders.map(item => item) : "no hay ordenes");

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/ads',
            method: 'Get',
            // data: call,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + body.access_token
            },
        })
            .then(response => {
                resolve(response.data.data);
                console.log("obtiene-descripcion", response.data.data);
            })
            .catch(error => {
                // resolve(error);
                reject(error.response.data.message);
                // console.log("error-data", error.response.data.message);
            });
    });
};

//-------------------------------------------------------------listar categorias de menu => filtro "ejemplo"
export const getMenuCategoriesFilter = () => {
    let body = {}
    body.venue_id = 1
    // console.log("body", body);

    return new Promise((resolve, reject) => {
        axios({
            url: URL + '/api/v1/products-public',
            method: 'Post',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                resolve(response.data.data);
                //reject(response.data.data);
                //console.log("obtiene-descripcion", response.data);
            })
            .catch(error => {
                resolve(error.response.data);
                console.log("error-data", error.response.data);
            });
    });
};