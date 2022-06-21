import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CheckBox, Divider, Icon, Image, Input } from "@rneui/base";
import { Modal, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stylesPago } from "../../styles/styles";
import { getCurrentOrder, postOrderFinalize } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setQrScaner, setRefreshCarrito } from "../../redux/actions/action";
import { CommonActions } from "@react-navigation/native";





const Pago = (navigation) => {
    const [dataUsers, setDataUsers] = useState(null);
    const [dataCliente, setDataCliente] = useState([]);
    const [isChecked, setIsChecked] = useState([]);//checkbox
    const [checkedSelected, setCheckedSelected] = useState([]);//checkbox
    const [isPropina, setIsPropina] = useState([]);
    const [selectPropina, setSelectPropina] = useState([]);
    const [customPrecie, setCustomPrecie] = useState(false);
    const [stateDocument, setStateDocument] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [precieNum, setPrecieNum] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [checkSesion, setCheckSesion] = useState(false);

    //destructuring navigation
    const { bill_type } = navigation.route.params;

    const dispatch = useDispatch();

    let currentCode = dataCliente ? dataCliente.currency_code : null;
    let totalMonto = dataCliente ? dataCliente.my_total_formatted : null;
    let propina = (totalMonto * 0.07).toFixed(3);
    let propina15 = (totalMonto * 0.15).toFixed(3);

    const dataPago = [
        {
            id: 1,
            name: "Efectivo",
            code: "cash"
        },
        {
            id: 2,
            name: "Tarjeta de Crédito/Débito",
            code: "card"
        },
    ];

    const dataPropina = [
        {
            id: 1,
            name: "7%" + ` (${currentCode} ${propina})`,
            propina: propina,
            code: "7"
        },
        {
            id: 2,
            name: "15%" + ` (${currentCode} ${propina15})`,
            propina: propina15,
            code: "15"
        },
        {
            id: 3,
            name: "Personalizado",
            code: "custom"
        }
    ]

    useEffect(() => {
        if (modalVisible) {
            setTimeout(() => {
                setModalVisible(false);
            }, 1100);
        }
    }, [modalVisible]);

    useEffect(() => {
        getDataStorageUser();
    }, []);

    useEffect(() => {
        if (dataUsers !== null) {
            currentHistoriOrders();
        } else {
            // console.log("");
        }
    }, [dataUsers]);



    //obtiene User del data del async storage
    const getDataStorageUser = async () => {
        const value = await AsyncStorage.getItem('@dataStorage');
        const valueJson = JSON.parse(value);
        setDataUsers(valueJson);
    };


    //inicializa en useEffect
    const currentHistoriOrders = () => {
        getCurrentOrder(dataUsers)
            .then(res => {
                // console.log("res", res.my_order_products);
                setDataCliente(res);
            })
            .catch(err => {
                console.log("err", err);
            });
    };

    //metodo de pago
    const onPressCheck = (index, item) => {
        setIsChecked(index);
        setCheckedSelected(item);
    };

    //seleccion de propina
    const onPressPropina = (index, item) => {
        setIsPropina(index);
        setSelectPropina(item);
        if (index === 0) {
            setCustomPrecie(false);
        } else if (index === 1) {
            setCustomPrecie(false);
        } else {
            setCustomPrecie(true);
        }
    };

    //-------propina porcentaje
    const cerrarPedido = () => {
        //eliminar el punto de los numeros
        // let numSend = selectPropina.propina.replace(/\./g, '');

        let body = {}
        body.order_id = dataCliente ? dataCliente.order_id : [];
        body.business_name = razonSocial;
        body.document = stateDocument;
        body.currency_code = dataCliente ? dataCliente.currency_code : [];
        body.payment_method = checkedSelected ? checkedSelected.code : [];
        // body.tip = precieNum;
        body.tip = customPrecie ? precieNum : selectPropina.propina;
        body.bill_type = bill_type;
        body.exchange = '1';

        //validar que el array de metodo de pago no este vacio
        if (checkedSelected.length === 0) {
            setMessage("Seleccione un metodo de pago");
            setModalVisible(true);
            setCheckSesion(false);
        }
        //validar que el array de propina no este vacio
        else if (selectPropina.length === 0) {
            setMessage("Seleccione una propina");
            setModalVisible(true);
            setCheckSesion(false);
        } else {

            postOrderFinalize({ body: dataUsers, ordenData: body })
                .then(res => {
                    console.log("res-cerro-pedido", res);
                    if (res.message === 'Se ha pagado la cuenta de toda la mesa' || res.message === 'Se ha pagado la cuenta personal') {
                        setModalVisible(true);
                        setMessage(res.message);
                        setCheckSesion(true);


                        dispatch(setRefreshCarrito(true));
                        dispatch(setQrScaner(false));
                        // setModalVisible(!modalVisible);
                        // setTimeout(() => navigation.navigation.navigate('Order'), 1000);
                        // navigation.navigation.navigate('Order');
                        setTimeout(() => navigation.navigation.dispatch(CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })), 1150);
                    } else {
                        setModalVisible(!modalVisible)
                    }

                })
                .catch(err => {
                    console.log("err", err);
                });
            console.log("body", body);
        }

        //eliminar el punto entre los numeros
    }

    return (
        <View>
            <ScrollView>
                <View>

                    <View style={stylesPago.containerText}>
                        <Text style={stylesPago.textStyle}>Pago</Text>
                        <Text >Monto a Pagar {currentCode} {totalMonto}</Text>
                    </View>

                    <View>
                        <Text style={stylesPago.textTitle}>
                            Razón Social
                        </Text>
                        <Input
                            placeholder="Ingrese su razón Social (opcional)"
                            inputContainerStyle={stylesPago.input}
                            onChangeText={(text) => setRazonSocial(text)}
                            value={razonSocial}
                        />
                    </View>


                    <View>
                        <Text style={stylesPago.textTitle}>
                            Documento
                        </Text>
                        <Input
                            placeholder="Ingrese su documento (opcional)"
                            inputContainerStyle={stylesPago.input}
                            onChangeText={(text) => setStateDocument(text)}
                            value={stateDocument}
                            keyboardType="numeric"
                        />
                    </View>

                    <View>
                        <Text style={stylesPago.textTitle}>
                            Método de Pago
                        </Text>

                        <View style={stylesPago.viewCheckContent}>
                            {dataPago ? dataPago.map((item, index) => {
                                return (
                                    <CheckBox
                                        key={index}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        title={item.name}
                                        textStyle={stylesPago.textCheck}
                                        style={{ width: '100%' }}
                                        containerStyle={stylesPago.containetCheck}
                                        checkedColor={'#ce2828'}
                                        checked={isChecked === index}
                                        onPress={() => {
                                            // console.log("item", item);
                                            onPressCheck(index, item);
                                        }}
                                    />
                                );
                            }) : null}
                        </View>
                    </View>

                    <View>
                        <Text style={stylesPago.textTitle}>
                            Propina
                        </Text>
                        <View style={stylesPago.viewCheckContent}>
                            {dataPropina ? dataPropina.map((item, index) => {
                                return (
                                    <CheckBox
                                        key={index}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        title={item.name}
                                        textStyle={stylesPago.textCheck}
                                        style={{ width: '100%' }}
                                        containerStyle={stylesPago.containetCheck}
                                        checkedColor={'#ce2828'}
                                        checked={isPropina === index}
                                        onPress={() => {
                                            // console.log("item", item);
                                            onPressPropina(index, item);
                                        }}
                                    />
                                );
                            }) : null}
                        </View>
                        {customPrecie &&
                            <Input
                                placeholder="Ingrese el monto de la propina"
                                inputContainerStyle={stylesPago.input}
                                keyboardType="numeric"
                                onChangeText={(text) => setPrecieNum(text)}
                                value={precieNum}
                            />}
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={stylesPago.centeredView}>
                            <View style={[stylesPago.modalView, { backgroundColor: checkSesion ? '#09b29d' : '#cc2827' }]}>
                                {checkSesion ?
                                    <Icon
                                        name='check-circle-outline'
                                        size={50}
                                        type='material'
                                        color='#fffeff'
                                    /> :
                                    <Icon
                                        name='highlight-off'
                                        size={50}
                                        type='material'
                                        color='#fffeff'
                                    />
                                }
                                <View style={{ alignItems: 'center', width: 200 }}>
                                    <Text style={stylesPago.textTitleModal}>{message}</Text>
                                </View>

                                {/* <Button
                                    title="Aceptar"
                                    containerStyle={{ marginTop: 20, borderRadius: 10 }}
                                    color="#ce2828"
                                    onPress={() => {
                                        if (message === 'Se ha pagado la cuenta de toda la mesa') {
                                            dispatch(setRefreshCarrito(true));
                                            dispatch(setQrScaner(false));
                                            setModalVisible(!modalVisible);
                                            // setTimeout(() => navigation.navigation.navigate('Order'), 1000);
                                            // navigation.navigation.navigate('Order');
                                            setTimeout(() => navigation.navigation.dispatch(CommonActions.reset({
                                                index: 0,
                                                routes: [{ name: 'Home' }],
                                            })), 1000);
                                        } else {
                                            setModalVisible(!modalVisible)
                                        }
                                    }}
                                /> */}
                            </View>
                        </View>
                    </Modal>

                    <View style={stylesPago.viewButtonContent}>
                        <Button
                            title={'Confirmar Pago'}
                            onPress={cerrarPedido}
                            buttonStyle={stylesPago.containerButton}
                        />
                    </View>


                </View>
            </ScrollView>
        </View>
    );
}
export default Pago;