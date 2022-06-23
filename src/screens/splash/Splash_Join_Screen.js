import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Input } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Modal,
  BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postJoinOrders } from '../../api/api';
import { setIcon, setQrScaner, setSplashScreen } from '../../redux/actions/action';
import { stylesJoinScreen } from '../../styles/styles';

const SplashJoinScreen = (navigation) => {
  const [recoveryNum1, setRecoveryNum1] = useState('');
  const [recoveryNum2, setRecoveryNum2] = useState('');
  const [recoveryNum3, setRecoveryNum3] = useState('');
  const [recoveryNum4, setRecoveryNum4] = useState('');
  const [dataTokenUser, setDataTokenUser] = useState(null);//obtiene si hay user logueado
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [checkSesion, setCheckSesion] = useState(false);

  //destructuring
  const { propietario, id, venueId } = navigation.route.params;
  const stateToken = useSelector(state => state.token);
  const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux


  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  useEffect(() => {
    getDataStorageUser();
  }, [stateToken]);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 1100);
    }
  }, [modalVisible]);

  useEffect(() => {
    //captura el evento de teclado goback de android
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   dispatch(setQrScaner(false));//verifica si scaneo el qr
    // }
    // );
  }, []);

  useEffect(() => {

  }, [dataTokenUser]);

  //obtiene el token del async storage
  const getDataStorageUser = async () => {
    const value = await AsyncStorage.getItem('@dataStorage');
    const valueJson = JSON.parse(value);
    setDataTokenUser(valueJson);
  };


  //envia el codigo de mesa
  const sendCode = () => {
    const code = recoveryNum1 + recoveryNum2 + recoveryNum3 + recoveryNum4;
    let validacion = recoveryNum1 !== '' && recoveryNum2 !== '' && recoveryNum3 !== '' && recoveryNum4 !== '';
    let bodyData = {};
    bodyData.table_id = id;
    bodyData.code = code;
    //validar que el codigo no este vacio
    if (validacion) {
      postJoinOrders(dataTokenUser, bodyData)
        .then(response => {
          console.log("response", response);
          setModalVisible(true);
          setMessage(response.message);
          setCheckSesion(true);
          dispatch(setQrScaner(true));//verifica si scaneo el qr
          dispatch(setIcon(false));//visualiza el tabbar
          dispatch(setSplashScreen(true));//visualiza el tabbar
          setTimeout(() => {
            navigation.navigation.navigate('Menu', {
              id: venueId//paso el id del qr
            });
          }, 1150);
        })
        .catch(error => {
          setModalVisible(true);
          setCheckSesion(false);
          setMessage(error.message);
        })
    } else {
      //mostrar alerta
      setCheckSesion(false);
      setModalVisible(true);
      setMessage("Por favor ingrese un codigo valido");
    }
    // navigation.navigate('SplashScreen', { code });
  }



  return (
    <View style={{ backgroundColor: '#f9fafc', flex: 1 }}>
      <View style={stylesJoinScreen.contentText}>
        <Text style={stylesJoinScreen.titlePrincipal}>Únete a la mesa</Text>
        <Text style={stylesJoinScreen.titleSecundary}>Ingrese el código de SiSr.</Text>
        <Text style={stylesJoinScreen.titleSecundary}>El propietario actual es {propietario}</Text>
      </View>

      <View style={stylesJoinScreen.contentInput}>
        {/*campo recovery code*/}
        <View>
          <Input
            inputContainerStyle={stylesJoinScreen.inputContainer}
            style={stylesJoinScreen.inputText}
            textAlign="center"
            maxLength={1}
            keyboardType="numeric"
            value={recoveryNum1}
            onChangeText={(text) => {
              setRecoveryNum1(text);
              if (text.length === 1) {
                setRecoveryNum2('');
                setRecoveryNum3('');
                setRecoveryNum4('');
                ref.current.focus();
              }
            }}
          />
        </View>
        <View>
          <Input
            ref={ref}
            inputContainerStyle={stylesJoinScreen.inputContainer}
            style={stylesJoinScreen.inputText}
            textAlign="center"
            maxLength={1}
            keyboardType="numeric"
            value={recoveryNum2}
            onChangeText={(text) => {
              setRecoveryNum2(text);
              if (text.length === 1) {
                setRecoveryNum3('');
                setRecoveryNum4('');
                ref2.current.focus();
              }
            }}
          />
        </View>
        <View>
          <Input
            ref={ref2}
            inputContainerStyle={stylesJoinScreen.inputContainer}
            style={stylesJoinScreen.inputText}
            textAlign="center"
            maxLength={1}
            keyboardType="numeric"
            value={recoveryNum3}
            onChangeText={(text) => {
              setRecoveryNum3(text);
              if (text.length === 1) {
                setRecoveryNum4('');
                ref3.current.focus();
              }
            }}
          />
        </View>
        <View>
          <Input
            ref={ref3}
            inputContainerStyle={stylesJoinScreen.inputContainer}
            style={stylesJoinScreen.inputText}
            textAlign="center"
            maxLength={1}
            keyboardType="numeric"
            value={recoveryNum4}
            onChangeText={(text) => {
              setRecoveryNum4(text);
            }}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={stylesJoinScreen.centeredView}>
            <View style={[stylesJoinScreen.modalView, { backgroundColor: checkSesion ? '#09b29d' : '#cc2827' }]}>
              {/* <Text>{message}</Text>
              <Button
                title="Aceptar"
                containerStyle={{ marginTop: 20, borderRadius: 10, width: 100 }}
                color="#ce2828"
                onPress={() => setModalVisible(!modalVisible)}
              /> */}

              {checkSesion ?
                <Icon
                  name='check-circle-outline'
                  size={30}
                  type='material'
                  color='#fffeff'
                /> :
                <Icon
                  name='highlight-off'
                  size={30}
                  type='material'
                  color='#fffeff'
                />
              }

              <View style={{ alignItems: 'center', width: 200 }}>
                <Text style={stylesJoinScreen.textTitleModal}>
                  {message}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity onPress={sendCode}>
          <View style={stylesJoinScreen.viewContentIcon}>
            <Icon
              name='chevron-right'
              size={30}
              color="#fffffe"
              type='material-community'
              iconStyle={stylesJoinScreen.iconStyle}
            />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SplashJoinScreen;

