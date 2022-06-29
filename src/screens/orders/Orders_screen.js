import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonGroup, Card, Divider, Icon, Image } from "@rneui/base";
import { Dimensions, Modal, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { stylesOrders } from "../../styles/styles";
import { setPayment, setRefreshCarrito } from "../../redux/actions/action";
import { getCurrencyMoney, getCurrentOrder, postOrderSend } from "../../api/api";

const deviceHeight = Dimensions.get("window").height;
console.log('deviceWidth', deviceHeight);

const OrdersScreen = ({ navigation }) => {
  const [selectIndexOpcion, setSelectIndexOpcion] = useState(0);;//seleccionar el index del boton
  const [isOpen, setIsOpen] = useState(true);//seleccionar el index del boton
  const [dataOrders, setDataOrders] = useState(null);//data del async storage
  const [dataUsers, setDataUsers] = useState(null);//data User del async storage
  const [iconView, setIconView] = useState(true);//icono de la vista
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [productsHistory, setProductsHistory] = useState([]);
  const [checkSesion, setCheckSesion] = useState(false);


  let historialPedidos = productsHistory ? productsHistory.my_order_products !== undefined : [];


  const stateToken = useSelector(state => state.token);
  const stateOrderItem = useSelector(state => state.orderItem);
  const stateIsPayment = useSelector(state => state.isPayment);
  const refresh_Carrito = useSelector(state => state.refreshCarrito);

  const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

  //obtengo el data del async storage
  useEffect(() => {
    getDataStorage();
  }, [stateOrderItem]);

  useEffect(() => {
    getDataStorageUser();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 1100);
    }
  }, [modalVisible]);

  useEffect(() => {
    if (dataUsers !== null) {
      currentHistoriOrders();
    } else {
      // console.log("");
    }
  }, [dataUsers, refresh_Carrito]);

  let nameCurrentCode = productsHistory ? productsHistory.currency_code : null;
  let precieTotal = productsHistory ? productsHistory.order_total_formatted : null;
  let montoMin = productsHistory ? productsHistory.minimum_amount_reached : null;
  let gsMinimo = productsHistory ? productsHistory.minimum_amount_formatted : null;

  const currentHistoriOrders = () => {
    getCurrentOrder(dataUsers)
      .then(res => {
        // console.log("res", res);
        setProductsHistory(res);
      })
      .catch(err => {
        // console.log("err", err);
      });
  };

  const currencyCode = () => {
    let currencyCode = dataOrders ? dataOrders.map(item => item.currency_code) : null;

    //verifico si existe el currency code
    if (currencyCode) {
      //si es repetido obtengo el currency code
      let currencyCodeUnique = [...new Set(currencyCode)];
      return currencyCodeUnique;
    } else {
      return null;
    }

  }
  // console.log("currencyCode", currencyCode());

  //obtiene el data del async storage
  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem('@addCarrito');//obtengo el data del async storage
    const valueJson = JSON.parse(value);
    setDataOrders(valueJson);
  };

  //obtiene User del data del async storage
  const getDataStorageUser = async () => {
    const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
    const valueJson = JSON.parse(value);
    setDataUsers(valueJson);
  };

  //---remover otem seleccionado del asyn storage
  const removerItem = (item) => {
    console.log("selecciono", item)
    //remover item seleccionado
    const newData = dataOrders.filter(data => data.product_id !== item);//remuevo el item seleccionado
    setDataOrders(newData);
    AsyncStorage.setItem('@addCarrito', JSON.stringify(newData));//seteo el data del async storage
    // dispatch(setRefreshCarrito(true)); //refresca el icono de carrito en el home


  }

  //sumar todos los price
  const sumarPrice = () => {
    let num = dataOrders ? dataOrders : 0;

    if (num.length > 0) {
      //eliminar el separador de punto con un split
      let numSplit = num.map(item => item.total.split(".").join(""));
      //luego sumar todos los price
      let suma = numSplit.reduce((a, b) => parseInt(a) + parseInt(b));
      // return suma;
      //agregar separador de punto
      let sumaPunto = suma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return sumaPunto;
    } else {
      return 0;
    }
  };


  //----envia la orders guardadas en el async storage
  const enviarOrders = () => {
    let dataStorage = dataOrders ? dataOrders : [];

    if (dataStorage.length > 0) {
      for (let i = 0; i < dataStorage.length; i++) {
        delete dataStorage[i].currency_code;

        //eliminar los puntos del precio
        dataStorage[i].total = dataStorage[i].total.split(".").join("");

        //eliminar los puntos de product_price
        dataStorage[i].product_price = dataStorage[i].product_price.split(".").join("");
      }

      console.log("dataStorage-send", dataStorage);
      //enviar dataStorage
      postOrderSend({ body: dataUsers, orders: dataStorage })
        .then(res => {
          console.log("res", res);
          //limpiar el dataStorage
          if (res.message !== "Formato incorrecto") {
            AsyncStorage.removeItem('@addCarrito');
            setDataOrders([]);
            setModalVisible(true);
            setMessage(res.message);
            setCheckSesion(true);
            dispatch(setPayment(true));
            currentHistoriOrders();
            // navigation.navigate("OrderTypePay");
          } else {
            setModalVisible(true);
            setMessage(res.message);
            setCheckSesion(false);
          }
        })
        .catch(err => {
          console.log("err", err);
        })
    } else {
      setModalVisible(true);
      setCheckSesion(false);
      setMessage('No hay productos en el carrito');
      console.log("no hay dataStorage");
    }
  };

  //selecciono pago total
  const seleccionarPagoTotalMesa = () => {
    if (montoMin) {
      getCurrencyMoney(dataUsers)
        .then(res => {
          // console.log("res", res);
          if (res.length > 1) {
            navigation.navigate("OrderTypePay", {
              bill_type: "table",
            });
          } else {
            //se coloca la ruta de formulario cliente
            navigation.navigate("OrderPago", {
              bill_type: "table",
            });
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      setModalVisible(true);
      setCheckSesion(false);
      setMessage(`Debe alcanzar el monto mínimo de ${gsMinimo} ${nameCurrentCode}`);
    }
  }

  //selecciono pago total
  const seleccionarPagoPersonal = () => {
    if (montoMin) {
      getCurrencyMoney(dataUsers)
        .then(res => {
          // console.log("res", res);
          if (res.length > 1) {
            navigation.navigate("OrderTypePay", {
              bill_type: "personal",
            });
          } else {
            //se coloca la ruta de formulario cliente
            navigation.navigate("OrderPago", {
              bill_type: "personal",
            });
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      setModalVisible(true);
      setCheckSesion(false);
      setMessage(`Debe alcanzar el monto mínimo de ${gsMinimo} ${nameCurrentCode}`);
    }
  }

  let dataItemsOrders = dataOrders ? dataOrders.length > 0 : false;
  console.log('dataItems', dataItemsOrders)

  return (
    <>
      {stateToken ? (
        <>
          <View style={{ height: "100%" }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    console.log("refresh-scroll");
                    getDataStorage();
                    currentHistoriOrders();
                  }}
                />
              }
            >
              <View style={{ alignItems: 'center', top: Platform.OS === 'ios' ? 45 : 20 }}>
                <Text style={{ fontSize: 20, color: '#5f5f5f' }}>
                  Mi Carrito
                </Text>

              </View>

              <View style={{
                alignItems: 'center',
                top: Platform.OS === 'ios' ? 40 : 20,
                marginBottom: Platform.OS === 'ios' ? 20 : 0
              }}>
                <ButtonGroup
                  onPress={(value) => {
                    // console.log("buton", value);
                    if (value === 0) {
                      setSelectIndexOpcion(value);
                      setIsOpen(true);
                    } else {
                      setSelectIndexOpcion(value);
                      setIsOpen(false);
                    }
                  }}
                  buttons={['Nuevos Pedidos', 'Historial Pedidos']}//comente=> se usara mas adelante
                  selectedIndex={selectIndexOpcion}
                  containerStyle={{ borderRadius: 10, marginTop: 20, marginBottom: 20, height: 50 }}
                  buttonContainerStyle={stylesOrders.btnUpdateOpcion}
                  selectedButtonStyle={{
                    backgroundColor: '#ce2828',
                    borderRadius: 10,
                  }}
                  selectedTextStyle={stylesOrders.textColorSelect}
                  textStyle={stylesOrders.titleStyleButtonOpcion}
                  innerBorderStyle={{
                    width: 0,
                    color: 'transparent',
                  }}
                />
              </View>

              {isOpen && (
                <View style={{ marginBottom: dataItemsOrders ? 130: 0}}>
                  {dataOrders ? dataOrders.map((item, index) => (
                    <View key={index}>
                      <Card containerStyle={{ borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Image
                            source={{ uri: item ? item.photo_url : null }}
                            style={stylesOrders.imgStyle}
                          />
                          <View style={{ marginRight: 'auto', left: 10, width: '50%' }}>
                            <Text style={stylesOrders.textColorTodo}>
                              {item ? item.product_name : null}
                            </Text>

                            <Text style={stylesOrders.textColorTodo}>
                              {item ? item.currency_code : null} {item ? item.product_price : null} {item ? item.quantity : null}x
                            </Text>
                          </View>

                          <TouchableOpacity onPress={() => { removerItem(item.product_id) }}>
                            <Text style={stylesOrders.textCache}>
                              Remover
                            </Text>
                          </TouchableOpacity>

                        </View>
                      </Card>
                    </View>
                  )) : (
                    <View style={{ alignItems: 'center', top: 20 }}>
                      <Text style={stylesOrders.textColorTodo}>Su carrito esta vacío</Text>
                    </View>
                  )}
                </View>
              )}


              {/*Hostorial de orders*/}
              {!isOpen && (
                <View style={{ marginBottom: 25 }}>
                  {historialPedidos ? productsHistory.my_order_products.map((item, index) => (
                    <View key={index}>
                      <Card containerStyle={{ borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Image
                            source={{ uri: item ? item.photo_url : null }}
                            style={stylesOrders.imgStyle}
                          />
                          <View style={{ marginRight: 'auto', left: 10, width: '50%' }}>
                            <Text style={stylesOrders.textColorTodo}>{item ? item.product_name : null}</Text>
                            <Text style={stylesOrders.textColorTodo}>{nameCurrentCode} {item ? item.product_price_formatted : null} {item ? item.quantity : null}x</Text>
                          </View>

                          <Text style={stylesOrders.textStatus}>
                            {item ? item.status : null}
                          </Text>

                        </View>
                      </Card>
                    </View>
                  )) : (
                    <View style={{ alignItems: 'center', top: 20 }}>
                      <Text style={stylesOrders.textColorTodo}>Su carrito esta vacío</Text>
                    </View>
                  )}
                </View>
              )}


            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={stylesOrders.centeredView}>
                <View style={[stylesOrders.modalView, { backgroundColor: checkSesion ? '#09b29d' : '#cc2827' }]}>
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
                    <Text style={stylesOrders.textTitleModal}>
                      {message}
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>

            {isOpen && (
              <View style={[stylesOrders.contentViewMonto,
              {
                // marginTop: iconView ? Platform.OS === 'ios' ? '100%' : deviceHeight > 700 ? '80%' : '50%' :
                  // Platform.OS === 'ios' ? 722 : deviceHeight > 700 ? '170%' : '135%'
                  marginTop: iconView ? dataItemsOrders ? Platform.OS === 'ios' ? '100%' : 
                  deviceHeight > 700 ? '85%' : '50%': 
                  Platform.OS === 'ios' ? '95%' : deviceHeight > 700 ? '82%' : '50%': 
                  dataItemsOrders ? Platform.OS === 'ios' ? '162%' : deviceHeight > 700 ? '149%' : '115%' :
                  Platform.OS === 'ios' ? '183%' : deviceHeight > 700 ? '170%' : '135%'
              }]}>

                <View>
                  <TouchableOpacity onPress={() => { setIconView(!iconView) }}>
                    <Icon
                      name={iconView ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                      type="ionicons"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>

                {iconView && (
                  <View style={stylesOrders.contentTextMonto}>
                    <Text style={stylesOrders.contentViewText}>Total Personal</Text>
                    <Text style={stylesOrders.contentViewText}>
                      {nameCurrentCode} {productsHistory ? productsHistory.my_total_formatted : null}
                    </Text>
                  </View>
                )}

                {iconView && (
                  <View style={stylesOrders.contentTextMonto}>
                    <Text style={stylesOrders.contentViewText}>Total de la mesa</Text>
                    <Text style={stylesOrders.contentViewText}>
                      {nameCurrentCode} {precieTotal}
                    </Text>
                  </View>
                )}

                {iconView && (<Divider style={stylesOrders.dividerStyle} />)}

                {iconView && (
                  <View style={stylesOrders.contentTextMonto}>
                    <Text style={stylesOrders.contentViewTextTotal}>Total</Text>
                    <Text style={stylesOrders.contentViewTextTotal}>{nameCurrentCode} {precieTotal}</Text>
                  </View>
                )}

                {dataOrders && dataOrders.length > 0 && (
                  // <View style={stylesOrders.contentViewBtnMonto}>
                  <View style={{marginTop: iconView ? '5%': '-1%'}}>
                    <Button
                      title={'Enviar nuevos Pedidos'}
                      onPress={enviarOrders}
                      buttonStyle={stylesOrders.btnEnviarPedido}
                      titleStyle={{ color: '#b6494b' }}
                      color={'#ffffff'}
                    />
                  </View>
                )}
                {stateIsPayment && (
                  <View style={stylesOrders.contentViewBtnMonto}>
                    {productsHistory.users ? productsHistory.users.length > 1 ? (
                      <>
                        <Button
                          title={'Pagar Total Personal'}
                          onPress={() => seleccionarPagoPersonal()}
                          buttonStyle={stylesOrders.btnEnviarPedido}
                          titleStyle={{ color: '#b6494b' }}
                          color={'#ffffff'}
                        />

                        <Button
                          title={'Pagar Total de la Mesa'}
                          onPress={seleccionarPagoTotalMesa}
                          buttonStyle={stylesOrders.btnEnviarPedido}
                          titleStyle={{ color: '#b6494b' }}
                          color={'#ffffff'}
                        />

                      </>

                    ) : (

                      <>
                        <Button
                          title={'Pagar Total de la Mesa'}
                          onPress={seleccionarPagoTotalMesa}
                          buttonStyle={stylesOrders.btnEnviarPedido}
                          titleStyle={{ color: '#b6494b' }}
                          color={'#ffffff'}
                        />
                      </>
                    ) : null}


                  </View>
                )}
              </View>
            )}
          </View>
        </>
      ) : (
        <View style={stylesOrders.contentBtnSesion}>
          <Button
            title={'Iniciar Sesión'}
            onPress={() => navigation.navigate('SignInScreen')}
            buttonStyle={stylesOrders.btnStyle}
            titleStyle={stylesOrders.textColor}
          />
        </View>
      )}

    </>
  );
}
export default OrdersScreen;