import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Text } from '@rneui/base';
import { Image, Modal, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { stylesLogin } from '../../styles/styles';
import { postLogin } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [viewPassword, setViewPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stateMessage, setStateMessage] = useState("");//mensaje toas
    const [stateLoading, setStateLoading] = useState(false);//abre y cierra el toas
    const [loadingButton, setLoadingButton] = useState(false);
    const [checkSesion, setCheckSesion] = useState(false);

    const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

    // useEffect(() => {
    //     setStateLoading(false);
    // }, [stateLoading]);

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
    const handleLogin = () => {
        let body = {}
        body.grant_type = "password";
        body.client_id = 2;
        body.client_secret = "lwguOueA9AH9fCU4mgjKh91nHKzPoBvhW9tvasxD";
        body.username = email;
        body.password = password;
        body.scope = "";

        setLoadingButton(true);

        if (email === '' || password === '') {
            setStateMessage("Todos los campos son obligatorios");
            setStateLoading(true);
            setLoadingButton(false);
            setCheckSesion(false);
        } else {
            //--enviar datos al servidor
            postLogin(body)
                .then(response => {
                    // console.log(response);
                    if (response.token_type === "Bearer") {
                        storeData(response);
                        setEmail("");
                        setPassword("");
                        setStateMessage("Inicio de sesión exitoso");
                        setCheckSesion(true);
                        setStateLoading(true);
                        setLoadingButton(false);
                        //navigation.navigate('Home_Invitado');
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
                    setCheckSesion(false);
                });
            // setTimeout(() => {
            //     setStateMessage("Bienvenido");
            //     setStateLoading(true);
            //     setLoadingButton(false);

            //     navigation.navigate('Home_Invitado')
            // }, 3000);
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
                                size={50}
                                type='material'
                                color='#fffeff'
                            /> :
                            <Icon
                                name='highlight-off'
                                size={50}
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
                    }}>
                        SiSr App
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
                        Ingrese a su cuenta para continuar
                    </Text>
                </View>

                <Input
                    inputContainerStyle={stylesLogin.input}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    onChangeText={(text) => setEmail(text)}
                    value={email.toLowerCase()}
                    placeholder="Correo Electrónico"
                    leftIcon={<Icon
                        name="email-outline"
                        type="material-community"
                        color="#727373"
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
                        color="#727373"
                        size={24}
                    />}
                    rightIcon={
                        <TouchableOpacity onPress={handleViewPassword}>
                            <Icon
                                name={!viewPassword ? "eye-outline" : "eye-off-outline"}
                                //onPress={handleViewPassword}
                                type="material-community"
                                color="#727373"
                                size={24}
                            />
                        </TouchableOpacity>
                    }

                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginRight: '5%',
                    // marginBottom: '8%',
                }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'rgba(95,95,95,255)' }}>¿Se te olvidó tú contraseña?</Text>
                    </TouchableOpacity>
                </View>

                <View style={stylesLogin.buttonCenter}>
                    <Button
                        buttonStyle={stylesLogin.buttonStyle}
                        title="iniciar sesión"
                        loading={loadingButton}
                        onPress={handleLogin}
                    />
                </View>
            </View>



            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: 'rgba(95,95,95,255)' }}>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={stylesLogin.textColor}>
                        Registrarte
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home_Invitado')}
                >
                    <Text style={stylesLogin.textCenter}>
                        Ingresar como invitado
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default Login;