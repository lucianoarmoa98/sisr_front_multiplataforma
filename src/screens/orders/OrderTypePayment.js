import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonGroup, Card, CheckBox, Divider, Icon, Image } from "@rneui/base";
import { Modal, Platform, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getCurrencyMoney } from "../../api/api";
import { stylesOrderTypePayment } from "../../styles/styles";

const OrderTypePayment = (navigation) => {
    const [dataToken, setDataToken] = useState(null);//data del async storage
    const [currency, setCurrency] = useState(null);//moneda
    const [isChecked, setIsChecked] = useState([]);//checkbox
    const [checkedSelected, setCheckedSelected] = useState(null);//checkbox
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    console.log("navigation", checkedSelected);
    //destructuring navigation
    const { bill_type } = navigation.route.params;

    const stateToken = useSelector(state => state.token);//obtengo el estado del redux, actualizado


    //obtengo el data del async storage
    useEffect(() => {
        getDataStorage();
    }, [stateToken]);

    useEffect(() => {
        if (dataToken !== null) {
            getCurrencyMoney(dataToken)
                .then(res => {
                    // console.log("res", res);
                    setCurrency(res);
                })
                .catch(err => {
                    console.log("err", err);
                });

        } else {
            // console.log("");
        }
    }, [dataToken]);

    //obtiene el data del async storage
    const getDataStorage = async () => {
        const value = await AsyncStorage.getItem('@dataStorage');
        const valueJson = JSON.parse(value);//convierto el data a json
        setDataToken(valueJson);
    };

    const onPressCheck = (index, item) => {
        setIsChecked(index);
        setCheckedSelected(item);
    };

    //guardar en el storage
    const saveStorage = () => {
        //await AsyncStorage.setItem('@dataStoragePayment', JSON.stringify(checkedSelected));
        //valido si hay un item seleccionado
        if (checkedSelected !== null) {
            navigation.navigation.navigate('OrderPago', {
                payment: checkedSelected ? checkedSelected.code : null,
                bill_type: bill_type
            });
        } else {
            setModalVisible(true);
            setMessage('Seleccione una opción');
        }
    };

    return (
            <View style={{marginTop: Platform.OS === 'ios' ? 45 : 10 }}>

                <View style={stylesOrderTypePayment.containerText}>
                    <Text style={stylesOrderTypePayment.textStyle}>Moneda de Pago</Text>
                </View>

                <View style={stylesOrderTypePayment.viewCheckContent}>

                    {currency ? currency.map((item, index) => {
                        return (
                            <CheckBox
                                key={index}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                title={`${item.code}` + ` (${item.name})`}
                                textStyle={stylesOrderTypePayment.textCheck}
                                style={{ width: '100%' }}
                                checkedColor={'#ce2828'}
                                containerStyle={stylesOrderTypePayment.containetCheck}
                                checked={isChecked === index}
                                onPress={() => {
                                    // console.log("item", item);
                                    onPressCheck(index, item);
                                }}
                            />
                        );
                    }) : null}


                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={stylesOrderTypePayment.centeredView}>
                        <View style={stylesOrderTypePayment.modalView}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={stylesOrderTypePayment.textTitle}>{message}</Text>
                            </View>

                            <Button
                                title="Aceptar"
                                containerStyle={{ marginTop: 20, borderRadius: 10 }}
                                color="#ce2828"
                                onPress={() => {setModalVisible(!modalVisible)} }
                            />
                        </View>
                    </View>
                </Modal>

                <View style={stylesOrderTypePayment.viewButtonContent}>
                    <Button
                        title={'Continuar'}
                        onPress={() => { saveStorage() }}
                        buttonStyle={stylesOrderTypePayment.containerButton}
                    />
                </View>


            </View>
    );
}
export default OrderTypePayment;