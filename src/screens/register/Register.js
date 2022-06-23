import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Text } from '@rneui/base';
import { Image, Modal, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { stylesLogin } from '../../styles/styles';
import { postLogin, postRegister } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
    const [viewPassword, setViewPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stateMessage, setStateMessage] = useState("");//mensaje toas
    const [stateLoading, setStateLoading] = useState(false);//abre y cierra el toas
    const [checkSesion, setCheckSesion] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (stateLoading) {
            setTimeout(() => {
                setStateLoading(false);
            }, 1100);
        }
    }, [stateLoading]);


    //visualizar contraseña
    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    //almacena el token en el async storage
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            //console.warn("dataAsyncLogin", jsonValue);
            await AsyncStorage.setItem('@dataStorage', jsonValue)
        } catch (e) {
            // saving error
        }
    }


    //--valido si todos los campos estan llenos
    const handleRegister = () => {
        let body = {}
        body.name = name;
        body.email = email;
        body.password = password;
        body.password_confirmation = confirmPassword;

        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setStateMessage("Todos los campos son obligatorios");
            setStateLoading(true);
            setCheckSesion(false);

        } else if (password !== confirmPassword) {
            setStateMessage("Las contraseñas no coinciden");
            setStateLoading(true);
            setCheckSesion(false);

        } else {
            //--enviar datos al servidor
            // setStateMessage("Registro exitoso");
            // setStateLoading(true);
            postRegister(body)
                .then(response => {
                    console.log(response);
                    setStateLoading(true);
                    if (response.message === "Su usuario ha sido creado") {
                        setStateMessage(response.message);
                        setCheckSesion(true);

                        // navigation.navigate('SignInScreen');

                        let bodySesion = {}
                        bodySesion.grant_type = "password";
                        bodySesion.client_id = 2;
                        bodySesion.client_secret = "lwguOueA9AH9fCU4mgjKh91nHKzPoBvhW9tvasxD";
                        bodySesion.username = email;
                        bodySesion.password = password;
                        bodySesion.scope = "";

                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");

                        postLogin(bodySesion)
                            .then(response => {
                                if (response.token_type === "Bearer") {
                                    storeData(response);
                                    setTimeout(() => {
                                        dispatch(setToken(true));
                                    }, 1150);
                                }
                            })
                            .catch(error => {
                                console.log("info-error", error);
                                setStateMessage(error);
                                setStateLoading(true);
                                setLoadingButton(false);
                            });
                    } else {
                        setStateMessage(response.message);
                        setStateLoading(true);
                        setCheckSesion(false);
                    }
                })
                .catch(error => {
                    // console.log(error);
                    //setStateMessage("Error al registrar");
                    //setStateLoading(true);
                }
                );
        }
    };

    //function para mostrar toast
    // const Toast = ({ visible, message }) => {
    //     if (visible) {
    //         ToastAndroid.showWithGravityAndOffset(
    //             message,
    //             ToastAndroid.LONG,
    //             ToastAndroid.BOTTOM,
    //             25,
    //             50
    //         );
    //         return null;
    //     }
    //     return null;
    // };


    return (
        <View style={stylesLogin.containerView}>

            {/* <Toast visible={stateLoading} message={stateMessage} /> */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={stateLoading}
            >
                <View style={stylesLogin.centeredView}>
                    <View style={[stylesLogin.modalView, { backgroundColor: checkSesion ? '#09b29d' : '#cc2827' }]}>
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
                            />}

                        <View style={{ alignItems: 'center' }}>
                            <Text style={stylesLogin.textTitleModal}>
                                {stateMessage}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={stylesLogin.container}>
                <View style={stylesLogin.textTitle}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        // fontFamily: 'RobotoCondensed-Regular',
                        // color: 'rgb(206, 40, 41)',
                    }}>
                        Registrarme
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: 'rgba(95,95,95,255)',
                    }}>
                        Bienvenido a SiSr App
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: 'rgba(95,95,95,255)',
                    }}
                    >
                        Cree su nueva cuenta para continuar
                    </Text>
                </View>

                <Input
                    inputContainerStyle={stylesLogin.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="Nombre"
                    leftIcon={<Icon
                        name="account-outline"
                        type="material-community"
                        color="#c1c1c1"
                        size={24}
                    />}
                />

                <Input
                    inputContainerStyle={stylesLogin.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    onChangeText={(text) => setEmail(text)}
                    // value={email}
                    //pasar a minúscula
                    value={email.toLowerCase()}
                    placeholder="Correo Electrónico"
                    leftIcon={<Icon
                        name="email-outline"
                        type="material-community"
                        color="#c1c1c1"
                        size={24}
                    />}
                />

                <Input
                    inputContainerStyle={stylesLogin.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    rightIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!viewPassword}
                    placeholder="Contraseña"
                    leftIcon={<Icon
                        name="lock-outline"
                        type="material-community"
                        color="#c1c1c1"
                        size={24}
                    />}
                    rightIcon={
                        <TouchableOpacity onPress={handleViewPassword}>
                            <Icon
                                name={!viewPassword ? "eye-outline" : "eye-off-outline"}
                                //onPress={handleViewPassword}
                                type="material-community"
                                color="#c1c1c1"
                                size={24}
                            />
                        </TouchableOpacity>
                    }
                />



                <Input
                    inputContainerStyle={stylesLogin.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    rightIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={!viewPassword}
                    placeholder="Confirmar Contraseña"
                    leftIcon={<Icon
                        name="lock-outline"
                        type="material-community"
                        color="#c1c1c1"
                        size={24}
                    />}
                    rightIcon={
                        <TouchableOpacity onPress={handleViewPassword}>
                            <Icon
                                name={!viewPassword ? "eye-outline" : "eye-off-outline"}
                                //onPress={handleViewPassword}
                                type="material-community"
                                color="#c1c1c1"
                                size={24}
                            />
                        </TouchableOpacity>
                    }

                />

                <View style={stylesLogin.buttonCenter}>
                    <Button
                        buttonStyle={stylesLogin.buttonStyle}
                        onPress={handleRegister}
                        title="Registrarme"
                    />
                </View>
            </View>



            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: 'rgba(95,95,95,255)' }}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                    <Text style={stylesLogin.textColor}>
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Register;