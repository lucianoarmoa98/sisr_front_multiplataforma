import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Badge, Button, ButtonGroup, CheckBox, Divider, Icon, Input, LinearProgress, ListItem } from "@rneui/base";
import { Alert, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setIcon, setToken } from "../../redux/actions/action";
import { stylesProfile } from "../../styles/styles";
import { getUser, postUserUpdate } from "../../api/api";


const ProfileScreen = ({ navigation }) => {
  const [dataToken, setDataToken] = useState(null);//data del async storage
  const [viewPassword, setViewPassword] = useState(false);//ver contraseña
  const [selectIndex, setSelectIndex] = useState(0);;//seleccionar el index del boton
  const [selectIndexOpcion, setSelectIndexOpcion] = useState(0);;//seleccionar el index del boton
  const [isOpen, setIsOpen] = useState(true);//seleccionar el index del boton
  const [updateUser, setUpdateUser] = useState([]);//seleccionar el index del boton
  const [password, setPassword] = useState("");//seleccionar el index del boton
  const [passwordConfirm, setPasswordConfirm] = useState("");//seleccionar el index del boton
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(false);
  const [checkSesion, setCheckSesion] = useState(false);



  const stateToken = useSelector(state => state.token);//obtengo el estado del redux, actualizado

  const dispatch = useDispatch();

  //obtengo el data del async storage
  useEffect(() => {
    getDataStorage();
  }, [stateToken]);

  //renderiza si hay algun cambio dentro del async storage
  useEffect(() => {
    if (dataToken !== null) {
      //----------obtiene el usuario: Api
      getUser(dataToken)
        .then(res => {
          setUpdateUser(res);
          console.log("res-Usuario: ", res);
        })
        .catch(err => {
          console.log("err-fake", err);
        });

    } else {
      // console.log("falta iniciar sesion");
    }
  }, [dataToken]);//se actualiza al iniciar sesion o cerrar sesion=>getDataStorage

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 1100);
    }
  }, [modalVisible]);

  //eliminar data del storage
  const removeDataStorage = async () => {
    const keys = ['@dataStorage', '@addCarrito']
    try {
      await AsyncStorage.multiRemove(keys);
      dispatch(setToken(false));
      console.log("dataStorage", "dataStorage eliminada");
    } catch (error) {
      console.log("dataStorage", "error al eliminar dataStorage");
    }
    // console.log("dataStorage", "dataStorage eliminada");
  };

  //obtiene el data del async storage
  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
    const valueJson = JSON.parse(value);//convierto el data a json
    setDataToken(valueJson);//seteo el data del async storage
  };

  //visualizar contraseña
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  //actualizar perfil
  const handleUpdateProfile = () => {
    setProgress(true);
    let body = {};
    body.name = updateUser.name;
    body.password = password;
    body.password_confirmation = passwordConfirm;
    //validar campos
    if (body.name === "") {
      setProgress(false);
      setModalVisible(true);
      setMessage("Ingrese su nombre");
      return;
    } else if (body.email === "") {
      setProgress(false);
      setModalVisible(true);
      setMessage("Ingrese su email");
      setCheckSesion(false);
      return;
    } else if (body.password === "") {
      setProgress(false);
      setModalVisible(true);
      setMessage("Ingrese su contraseña");
      setCheckSesion(false);
      return;
    } else if (body.password_confirmation === "") {
      setProgress(false);
      setModalVisible(true);
      setMessage("Ingrese su contraseña");
      setCheckSesion(false);
      return;
    } else if (body.password !== body.password_confirmation) {
      setProgress(false);
      setCheckSesion(false);
      setModalVisible(true);
      setMessage("Las contraseñas no coinciden");
      return;
    } else {
      postUserUpdate({ body: dataToken, user: body })
        .then(res => {
          setCheckSesion(true);
          setProgress(false);
          setModalVisible(true);
          setMessage(res.message);
          setPassword('');
          setPasswordConfirm('');
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };



  return (
    <>
      {stateToken ? (
        <>
          <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
            <View style={{ alignItems: 'center', top: Platform.OS === 'ios' ? 35 : 20 }}>
              <Text style={{ fontSize: 20, color: '#5f5f5f' }}>
                Mi Perfil
              </Text>

            </View>

            <View style={{ alignItems: 'center', top: 25 }}>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={stylesProfile.centeredView}>
                  <View style={[stylesProfile.modalView, { backgroundColor: checkSesion ? '#09b29d' : '#cc2827' }]}>
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
                    <Text style={stylesProfile.textTitleModal}>
                      {message}
                    </Text>
                  </View>
                  </View>
                </View>
              </Modal>

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
                // buttons={['Datos Personales', 'Lenguaje Sistema']}//comente=> se usara mas adelante
                buttons={['Datos Personales']}
                selectedIndex={selectIndexOpcion}
                containerStyle={{ borderRadius: 10, marginTop: 20, marginBottom: 20, height: 50 }}
                buttonContainerStyle={stylesProfile.btnUpdateOpcion}
                selectedButtonStyle={{
                  backgroundColor: '#ce2828',
                  borderRadius: 10,
                }}
                selectedTextStyle={stylesProfile.textColorSelect}
                textStyle={stylesProfile.titleStyleButtonOpcion}
                innerBorderStyle={{
                  width: 0,
                  color: 'transparent',
                }}
              />

              {isOpen && (
                <>
                  <Input
                    inputContainerStyle={stylesProfile.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    value={updateUser ? updateUser.name : ""}
                    onChangeText={(value) => { setUpdateUser({ ...updateUser, name: value }) }}
                    placeholder="Nombre"
                    leftIcon={
                      <Icon
                        name="user"
                        type="font-awesome"
                        color="#727373"
                        size={20}
                      />
                    }
                  />

                  <Input
                    inputContainerStyle={stylesProfile.inputDisabled}
                    value={updateUser ? updateUser.email : ""}
                    placeholder="Correo Electrónico"
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    leftIcon={
                      <Icon
                        name="email-outline"
                        type="material-community"
                        color="#727373"
                        size={24}
                      />}
                    disabled={true}
                  />

                  <Input
                    inputContainerStyle={stylesProfile.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    rightIconContainerStyle={{ marginRight: 10 }}
                    secureTextEntry={!viewPassword}
                    placeholder={"Ingrese su nueva contraseña"}
                    value={password}
                    onChangeText={(value) => { setPassword(value) }}
                    leftIcon={
                      <Icon
                        name="lock-outline"
                        type="material-community"
                        color="#727373"
                        size={24}
                      />
                    }
                    rightIcon={
                      <TouchableOpacity onPress={handleViewPassword}>
                        <Icon
                          name={!viewPassword ? "eye-outline" : "eye-off-outline"}
                          type="material-community"
                          color="#727373"
                          size={24}
                        />
                      </TouchableOpacity>
                    }
                  />

                  <Input
                    inputContainerStyle={stylesProfile.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    rightIconContainerStyle={{ marginRight: 10 }}
                    secureTextEntry={!viewPassword}
                    placeholder={"Confirme su nueva contraseña"}
                    value={passwordConfirm}
                    onChangeText={(value) => { setPasswordConfirm(value) }}
                    leftIcon={
                      <Icon
                        name="lock-outline"
                        type="material-community"
                        color="#727373"
                        size={24}
                      />
                    }
                    rightIcon={
                      <TouchableOpacity onPress={handleViewPassword}>
                        <Icon
                          name={!viewPassword ? "eye-outline" : "eye-off-outline"}
                          type="material-community"
                          color="#727373"
                          size={24}
                        />
                      </TouchableOpacity>
                    }
                  />
                </>)}
            </View>
            {progress && (
              <LinearProgress
                color={'#ce2828'}
                // value={progress}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  height: 5,
                  borderRadius: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                progress={0.5}
              />
            )}

            {isOpen &&
              <ButtonGroup
                onPress={(value) => {
                  // console.log("buton", value);
                  if (value === 0) {
                    setSelectIndex(value);
                    console.log("buton-guardar", value);
                    handleUpdateProfile();
                  } else {
                    setSelectIndex(value);
                    removeDataStorage();
                    dispatch(setIcon(true));
                    // console.log("buton-Cerrar", value);
                  }
                }}
                vertical={true}
                buttons={['Actualizar Perfil', 'Cerrar Sesión']}
                selectedIndex={selectIndex}
                containerStyle={{ borderRadius: 10, top: 20 }}
                buttonContainerStyle={stylesProfile.btnUpdate}
                selectedButtonStyle={{
                  backgroundColor: '#ce2828',
                  borderRadius: 10,
                }}
                selectedTextStyle={stylesProfile.textColorSelect}
                textStyle={stylesProfile.titleStyleButton}
                innerBorderStyle={{
                  width: 0,
                  color: 'transparent',
                }}
              />
            }

            {/*Opcion de Idiomas=> se va usar mas adelante*/}
            {/* {!isOpen && (
              <View>
                <CheckBox
                  title="Español"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  containerStyle={{
                    backgroundColor: 'transparent',
                  }}
                />

                <CheckBox
                  title="English"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  containerStyle={{
                    backgroundColor: 'transparent',
                  }}
                />
              </View>
            )} */}

          </View>
        </>
      ) : (
        <View style={stylesProfile.contentBtnSesion}>
          <Button
            title={'Iniciar Sesión'}
            onPress={() => navigation.navigate('SignInScreen')}
            buttonStyle={stylesProfile.btnStyle}
            titleStyle={stylesProfile.textColor}
          />
        </View>
      )}

    </>
  );
}
export default ProfileScreen;