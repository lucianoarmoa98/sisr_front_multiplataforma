import React, { useEffect, useState } from "react";
import { Dimensions, LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import QRCodeScanner from "react-native-qrcode-scanner";
import { Buffer } from 'buffer';
import { Button, Card, Icon, Image } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { setQrScaner, setSplashScreen } from "../../redux/actions/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesQr } from "../../styles/styles";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

const QrScreen = ({ navigation }) => {
  const [scan, setScan] = useState(false);//activar o desactivar el qr scanner
  const [result, setResult] = useState(null);//resultado del qr scanner
  const [dataToken, setDataToken] = useState(null);//data del async storage
  const [refreshing, setRefreshing] = useState(false);//muestra iniciar sesion o qr, si no esta logueado no muestra el qr

  const stateToken = useSelector(state => state.token);//obtengo el estado del redux, actualizado

  const { height, width } = Dimensions.get('window');

  const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

  //obtengo el data del async storage
  useEffect(() => {
    getDataStorage();
  }, [stateToken]);//se actualiza al iniciar sesion o cerrar sesion=>redux

  //actualiza si hay algun cambio dentro del async storage
  useEffect(() => {
    if (dataToken !== null) {
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  }, [dataToken]);//se actualiza al iniciar sesion o cerrar sesion=>getDataStorage

  //verifica si scaneo el qr
  // useEffect(() => {
  //   if (result) {
  //     setScan(false);
  //     dispatch(setSplashScreen(false));
  //     navigation.navigate('QRConfirmation', {
  //       id: result ? result.table_id : null//paso el id del qr
  //     });
  //   }
  // }, [result]);

  //obtiene el data del async storage
  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
    const valueJson = JSON.parse(value);//convierto el data a json
    setDataToken(valueJson);//seteo el data del async storage
  };

  //Obtiene los datos del Qr
  const onSuccess = e => {
    dispatch(setQrScaner(true));
    setScan(false);
    getUrl(e.data);
  };

  //Abre el qr scanner
  const startScan = () => {
    setScan(true);
    setResult(null);
  };


  //obtener url del qr despues del ?qr= con un decode
  const getUrl = (urlData) => {
    let url = urlData;
    //obtener url del qr despues del ?qr= con un splice
    let url_splice = url.split("?qr=");

    //pasar a json con un parse y obtener el id
    //decode base64
    let json = JSON.parse(Buffer.from(url_splice[1], 'base64').toString());
    setResult(json);
    setScan(false);
    dispatch(setSplashScreen(false));
    navigation.navigate('QRConfirmation', {
      id: json ? json.table_id : null//paso el id del qr
    });
  };

  return (
    <View style={stylesQr.contentView}>
      {scan ? (
        // <QRCodeScanner
        //   reactivate={true}
        //   vibrate={false}
        //   showMarker={true}
        //   onRead={onSuccess}
        //   cameraStyle={{ height: height / 2, width: width }}
        //   topContent={
        //     <View >
        //       <Text>
        //         Scanea el codigo QR
        //       </Text>
        //     </View>
        //   }
        //   bottomContent={
        //     <View>
        //       <Button
        //         title="Cancelar"
        //         onPress={() => {
        //           setScan(false);
        //           dispatch(setQrScaner(false))
        //         }}

        //         buttonStyle={stylesQr.btnCancel}
        //         titleStyle={stylesQr.textColor}
        //       />
        //     </View>
        //   }
        // />
        <Text>Qr</Text>
      ) : (
        <View style={stylesQr.contentBtnQr}>

          <View>
            {/* {refreshing ? ( */}
            {stateToken ? (
              <View style={stylesQr.containerImage}>
                <View style={stylesQr.header}>
                  <Image
                    source={require('../../assets/images/logo_blanco.png')}
                    style={stylesQr.logo}
                    resizeMode="contain"
                  />

                  <View style={{ alignItems: 'center' }}>
                    <Text style={stylesQr.text}>
                      SiSr App
                    </Text>

                    <Text style={stylesQr.titleDos}>
                      Escanea un codigo QR para continuar
                    </Text>

                    <View style={{ top: 50 }}>
                      <Button
                        // title="Scanear Qr"
                        //agregarv icono de camara
                        icon={
                          <Icon
                            name="camera"
                            type="material-community"
                            size={30}
                            color="#212429"
                          />
                        }
                        onPress={startScan}
                        buttonStyle={stylesQr.btnQrScaner}
                      // titleStyle={stylesQr.textColor}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <Button
                title="Iniciar Sesión"
                onPress={() => navigation.navigate('SignInScreen')}
                buttonStyle={stylesQr.btnQrSesion}
                titleStyle={stylesQr.textColor}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
export default QrScreen;
const styles = StyleSheet.create({
  buttonContainer: {
    width: '80%',
    height: 70,
    borderRadius: 10,
    backgroundColor: '#df6f6d',
    borderWidth: 0,
  },
  textColor: {
    color: '#292929',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});