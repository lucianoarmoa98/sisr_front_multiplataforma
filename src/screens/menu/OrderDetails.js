import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Divider, FAB, Icon, Input, ListItem, Text } from '@rneui/base';
import { Dimensions, FlatList, Image, ImageBackground, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { postDetailsMenu } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderItem, setPayment, setRefreshCarrito } from '../../redux/actions/action';
import { stylesOrderDetails } from '../../styles/styles';

const { height, width } = Dimensions.get('window');

const OrderDetails = (navigation) => {
    const [counter, setCounter] = useState(1);
    const [selectIndex, setSelectIndex] = useState([0, 1, 2]);
    const [menuOpciones, setMenuOpciones] = useState(null);
    const [precieSelect, setPrecieSelect] = useState(null);
    const [selectName, setSelectName] = useState(null);
    const [dataStorageCarrito, setDataStorageCarrito] = useState(null);
    const [btnSelect, setBtnSelect] = useState([]);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    const stateToken = useSelector(state => state.token);
    const stateQr = useSelector(state => state.qrScaner);

    const dispatch = useDispatch();


    //destructuring
    const { photo_url, name, price, id } = navigation.route.params;

    useEffect(() => {
        if (modalVisible) {
            setTimeout(() => {
                setModalVisible(false);
            }, 1100);
        }
    }, [modalVisible]);

    useEffect(() => {
        let body = {}
        body.product_id = id;
        postDetailsMenu(body)
            .then((response) => {
                // console.log('detalles-menu', response);
                setMenuOpciones(response);
            })
            .catch((error) => {
                // console.log(error);
            });
    }, []);

    useEffect(() => {
        getDataStorage();
    }, []);

    useEffect(() => {
        {
            menuOpciones ? menuOpciones.options.map((item, index) => {
                //obtener el id menor con js reduce
                let dataMenu = item.suboptions.reduce((prev, current) => (prev.id < current.id ? prev : current));
                //spread operator
                setBtnSelect(prev => [...prev, dataMenu.id]);
                // setPrecieSelect(dataMenu.price);
                setPrecieSelect(dataMenu.price);
                setSelectName(dataMenu.name);
            }) : []
        }
    }, [menuOpciones]);




    //selecciona las opciones del menu
    const onSelectBtn = ({ id, is_multiple, price, name }) => {
        setPrecieSelect(price);
        setSelectName(name);
        if (is_multiple) {
            //si is_multiple: true => varias opciones
            if (btnSelect.includes(id)) {
                setBtnSelect(btnSelect.filter(item => item !== id));
            } else {
                setBtnSelect([...btnSelect, id]);
            }
        } else {
            //si is_multiple: false => solo una opcion,
            setBtnSelect([id]);
        }

    }

    //---------------total de precio para varias opciones
    const formatPrice = (price) => {
        //multiplico el numero por el counter
        let total = price * (counter > 0 ? counter : 0);

        let validacion = menuOpciones ? menuOpciones.currency_code === 'USD' : false;
        let cantidadCero = menuOpciones ? menuOpciones.currency_decimals : 0;
        let newTotal = {};

        //formatear con tofixed
        if (validacion) {
            newTotal = total.toFixed(cantidadCero).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            newTotal = total.toFixed(cantidadCero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        return newTotal;
    }

    //-----total de precios, sin opciones
    const precieUnit = (item) => {
        if (item === "0" || item === 0) {
            return null;
        } else {
            //multiplico el numero por el counter
            let total = item * (counter > 0 ? counter : 0);
            let validacion = menuOpciones ? menuOpciones.currency_code === 'USD' : false;
            let cantidadCero = menuOpciones ? menuOpciones.currency_decimals : 0;
            let newTotal = {};

            //formatear con tofixed
            if (validacion) {
                newTotal = total.toFixed(cantidadCero).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                newTotal = total.toFixed(cantidadCero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }

            return newTotal;
        }
    }

    const precieUnico = () => {
        let total = precieSelect * 1;

        let validacion = menuOpciones ? menuOpciones.currency_code === 'USD' : false;
        let cantidadCero = menuOpciones ? menuOpciones.currency_decimals : 0;
        let newTotal = {};

        //formatear con tofixed
        if (validacion) {
            newTotal = total.toFixed(cantidadCero).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            newTotal = total.toFixed(cantidadCero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        return newTotal;
    }


    //obtiene el data del async storage
    const getDataStorage = async () => {
        const value = await AsyncStorage.getItem('@addCarrito');
        const valueJson = JSON.parse(value);
        setDataStorageCarrito(valueJson);
    };

    //agregar al carrito de compras
    const addToCart = async () => {
        dispatch(setPayment(false));
        //agregar en el async storage
        let body = {}
        body.product_id = id;
        body.quantity = counter;
        body.is_promotion = menuOpciones ? menuOpciones.is_promotion : 0;
        body.options = menuOpciones ? menuOpciones.options.length > 0 ? JSON.stringify([{
            optionId: btnSelect[0],
            optionName: selectName,
            price: precieUnico(),
        }]) : "[]" : "[]";
        body.product_price = menuOpciones ? menuOpciones.options.length > 0 ? precieUnico() : menuOpciones.price_formatted : precieUnico();
        body.total = menuOpciones ? menuOpciones.options.length > 0 ? formatPrice(precieSelect) : precieUnit(menuOpciones ? menuOpciones.price : '') : null
        body.product_name = menuOpciones ? menuOpciones.name : "";
        body.photo_url = menuOpciones ? menuOpciones.photo_url : "";
        body.currency_code = menuOpciones ? menuOpciones.currency_code : "";
        body.observation = specialInstructions;

        //se agrega nuevos objetos al data del async storage, dentro de este array
        let arrayNew = [];



        //verificar si el producto ya existe en el carrito de compras
        if (dataStorageCarrito) {
            //verificar si el producto ya existe en el carrito de compras y setear el body para actualizar nuevos datos
            let exist = dataStorageCarrito.find(item => item.product_id === id);
            if (exist) {
                //si existe el id y es igual, elimino el producto y lo vuelvo a agregar
                let index = dataStorageCarrito.findIndex(item => item.product_id === id);
                dataStorageCarrito.splice(index, 1);
                arrayNew = [...dataStorageCarrito, body];

                dispatch(setOrderItem(true));
            } else {
                //si no existe
                arrayNew = [...dataStorageCarrito, body];
                dispatch(setOrderItem(true));
            }

        } else {
            //si no existe en el carrito de compras
            arrayNew = [body];
            dispatch(setOrderItem(true));

        }

        if (stateQr) {
            //verifico que body.options, body.product_price, body.total, body.product_name, body.photo_url, body.currency_code no esten vacios
            if (body.product_price !== "" && body.total !== "" && body.product_name !== "" && body.photo_url !== "" && body.currency_code !== "") {

                try {
                    const response = JSON.stringify(arrayNew);
                    await AsyncStorage.setItem('@addCarrito', response);
                    // dispatch(setRefreshCarrito(true));
                    navigation.navigation.navigate('Orders');
                } catch (error) {
                    // console.log(error);
                }

            } else {
                console.log("no entro");
                setMessage("Error al agregar al carrito");
                setModalVisible(true);
            }

        } else {
            navigation.navigation.navigate('Qr');
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#f9fafc' }}>
            <LinearGradient
                colors={["rgba(249,250,252,255)", "rgba(249,250,252,255)"]}
                style={stylesOrderDetails.contentViewHeader}
            >
                <View>
                    <View style={stylesOrderDetails.contentIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigation.goBack()}
                        >
                            <View style={stylesOrderDetails.viewContentBack}>
                                <Icon
                                    name="chevron-left"
                                    size={30}
                                    color="#ffffff"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={stylesOrderDetails.centeredView}>
                    <View style={stylesOrderDetails.modalView}>
                        <Icon
                            name='highlight-off'
                            size={30}
                            type='material'
                            color='#fffeff'
                        />

                        <View style={{ alignItems: 'center', width: 200 }}>
                            <Text style={stylesOrderDetails.textTitleModal}>
                                {message}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={stylesOrderDetails.viewTitleContent}>
                <Text style={stylesOrderDetails.titleName}>
                    {menuOpciones ? menuOpciones.name : ''}
                </Text>
            </View>

            <ScrollView>
                <Image
                    source={{ uri: menuOpciones ? menuOpciones.photo_url : null }}
                    style={stylesOrderDetails.imgStyles}
                />

                <View style={{ marginLeft: '5%' }}>
                    <View>
                        <Text style={stylesOrderDetails.titleName}>Detalles del Producto</Text>

                        <Text style={stylesOrderDetails.titleDescription}>
                            {menuOpciones ? menuOpciones.description : ''}
                        </Text>
                    </View>

                    {stateToken ? (
                        <View style={stylesOrderDetails.contentButton}>
                            {/*crear un contador que se incremente y decremente */}
                            <ButtonGroup
                                onPress={(value) => {
                                    //incrementar y decrementar
                                    if (value === 0) {
                                        setCounter(counter - 1)
                                    } else if (value === 2) {
                                        setCounter(counter + 1)
                                    } else {
                                        setCounter(counter)
                                    }
                                }}
                                buttons={['-', counter > 1 ? counter : 1, '+']}
                                // disabled={[0]}
                                disabled={[counter === 1 ? 0 : false]}
                                selectedIndex={selectIndex}
                                containerStyle={{ width: 120, borderRadius: 10 }}
                            />
                        </View>
                    ) : null}


                    <View style={{ top: 10, marginRight: '5%' }}>

                        {menuOpciones ? menuOpciones.options.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text style={stylesOrderDetails.textTitleDetails}>
                                        {item.name}
                                    </Text>

                                    {item.suboptions.map((subitem, subindex) => {
                                        return (


                                            <Button
                                                key={subindex}
                                                title={`${subitem.name} (${menuOpciones ? menuOpciones.currency_code : ''} ${subitem.price_formatted})`}
                                                containerStyle={{ borderRadius: 10, marginBottom: '5%' }}
                                                onPress={() => {
                                                    onSelectBtn({
                                                        id: subitem.id,
                                                        is_multiple: item.is_multiple,
                                                        price: subitem.price,
                                                        name: subitem.name,
                                                    });
                                                }}
                                                //si is_multiple: false entonces no se puede seleccionar mas de una opcion, si es true entonces se puede seleccionar mas de una opcion
                                                color={btnSelect.includes(subitem.id) ? '#dc3546' : 'rgba(249,250,252,255)'}
                                                titleStyle={{ color: btnSelect.includes(subitem.id) ? '#fffbfc' : '#dc3546' }}
                                            />
                                        )
                                    })}
                                </View>
                            )
                        }) : null}
                    </View>
                </View>

                {/*instrucciones especiales*/}
                <View style={stylesOrderDetails.contentTextInstructions}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Instrucciones especiales
                    </Text>
                    <Text style={stylesOrderDetails.textInstructions}>
                        Hagános saber si es alérgicos a algo o si debemos evitar algo.
                    </Text>
                </View>

                <View style={stylesOrderDetails.contentInput}>
                    <View>
                        <Input
                            multiline={true}
                            placeholder="Ejemplo: sin mayonesa"
                            value={specialInstructions}
                            onChangeText={(text) => setSpecialInstructions(text)}
                            inputContainerStyle={stylesOrderDetails.inputStyles}
                        />
                    </View>

                    {stateToken ? (
                        <View style={{ marginBottom: '15%' }}>
                            <TouchableOpacity onPress={addToCart}>
                                <View style={stylesOrderDetails.addContent}>
                                    <View style={stylesOrderDetails.viewButtonAdd}>
                                        <View>
                                            <Text style={stylesOrderDetails.textMonto}>
                                                Monto a Pagar
                                            </Text>

                                            <Text style={stylesOrderDetails.textPrecie}>
                                                {menuOpciones ? menuOpciones.currency_code : ''} { /*precieUnit(menuOpciones ? menuOpciones.price_formatted : '')**/}
                                                {/*verifico si dentro del array hay objetos, si no hay objetos entonces no se muestra nada*/}
                                                {menuOpciones ? menuOpciones.options.length > 0 ? null : precieUnit(menuOpciones ? menuOpciones.price : '') : null}

                                                {precieSelect !== null ? formatPrice(precieSelect) : ''}
                                            </Text>
                                        </View>

                                        <View style={stylesOrderDetails.iconAdd}>
                                            <Icon
                                                name='shopping-bag'
                                                size={30}
                                                type="ionicons"
                                                color="white"
                                            />
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : null}


                </View>
            </ScrollView>
        </View >
    );
}

export default OrderDetails;