import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    BackHandler,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, ButtonGroup } from '@rneui/base';
import { postCurrentOrder, postDetailsLocal, postDetailsMesaNumber } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setIcon, setQrScaner, setSplashScreen } from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreenMesa = (props) => {
    const [selectIndex, setSelectIndex] = useState(0);
    const [mesaNumber, setMesaNumber] = useState(null);//obtiene el numero de mesa
    const [dataMesa, setDataMesa] = useState(null);//obtiene el detalle de la mesa
    const [dataToken, setDataToken] = useState(null);//data del async storage
    const [retroceso, setRetroceso] = useState(false);//retroceso de pantalla

    const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

    //destructuring
    const { id } = props.route.params;//table_id

    // useEffect(() => {
    //     //captura el evento de teclado goback de android
    //     BackHandler.addEventListener('hardwareBackPress', (e) => {
    //         // console.log("hardwareBackPress splash");
    //         // dispatch(setQrScaner(false));//verifica si scaneo el qr
    //         // dispatch(setSplashScreen(true));//visualiza el tabbar

    //         // console.log("se presiono retroceso", e);
    //         return BackHandler.removeEventListener('hardwareBackPress', (e) => {
    //             console.log("se presiono retroceso",);
    //             return false;
    //         }
    //         );
    //         // if(retroceso){
    //         //   return true;
    //         // }
    //     });
    // }, []);

    useEffect(() =>
        props.navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action;
            if (retroceso) {
                return;
            }

            e.preventDefault();

        }), [retroceso, props.navigation]);

    //obtengo el data del async storage
    useEffect(() => {
        getDataStorage();
    }, []);//se actualiza al iniciar sesion o cerrar sesion=>redux


    let titleSplash = mesaNumber ? mesaNumber.current_owner !== "" : false;

    useEffect(() => {
        //obtiene el numero de "mesa y el Id del local" => Api
        postDetailsMesaNumber(id)
            .then(response => {
                console.log("response--mesa--info", response);
                setMesaNumber(response);

                //obtener el nombre de la mesa=> Api
                postDetailsLocal(response.venue_id)
                    .then(response => {
                        console.log("response-mesa", response);
                        setDataMesa(response);
                    })
                    .catch(error => {
                        console.log("error-fallo", error);
                    })
            }
            )
            .catch(error => {
                console.log("error", error);
            });
    }, []);

    //----evento de crear orden
    const handleCreateOrder = () => {
        postCurrentOrder({ body: dataToken, ordenId: id })
            .then(response => {
                console.log("response-Orden", response);
                dispatch(setIcon(false));
            })
            .catch(error => {
                console.log("error-qr", error);
            });
    }

    //obtiene el data del async storage
    const getDataStorage = async () => {
        const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
        const valueJson = JSON.parse(value);//convierto el data a json
        setDataToken(valueJson);//seteo el data del async storage
    };

    let textTitle = mesaNumber ? mesaNumber.joining_enabled === true : false;

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="#E12D31" barStyle="light-content" /> */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo_blanco.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={{ alignItems: 'center' }}>
                    {textTitle &&
                        <Text style={styles.text}>
                            {dataMesa ? dataMesa.name : null}
                        </Text>
                    }

                    {textTitle ?
                        <>
                            <Text style={styles.text}>
                                {titleSplash ? "Únete a la mesa" : "Sé el propietario de la mesa"}
                            </Text>

                            <Text style={styles.textNum}>
                                {mesaNumber ? mesaNumber.number : null}
                            </Text>
                        </>
                        :
                        <Text style={styles.textStatus}>
                            La mesa se encuetra ocupada
                        </Text>
                    }


                    <View style={{ top: 50 }}>
                        {textTitle &&
                            <ButtonGroup
                                onPress={(value) => {
                                    // console.log("buton", value);
                                    if (value === 0) {
                                        setSelectIndex(value);
                                        // dispatch(setSplashScreen(true));//visualiza el tabbar
                                        if (titleSplash) {
                                            // dispatch(setIcon(true));
                                            dispatch(setSplashScreen(false));//visualiza el tabbar
                                            setRetroceso(true);
                                            props.navigation.navigate('Join', {
                                                id: id,//table_id
                                                venueId: mesaNumber ? mesaNumber.venue_id : null,//venue_id
                                                propietario: mesaNumber ? mesaNumber.current_owner : null,
                                            });
                                        } else {
                                            handleCreateOrder();
                                            setRetroceso(true);
                                            dispatch(setQrScaner(true));//verifica si scaneo el qr
                                            dispatch(setSplashScreen(true));//visualiza el tabbar
                                            props.navigation.navigate('Home', {
                                                screen: 'Menu',
                                                params: {
                                                    id: mesaNumber ? mesaNumber.venue_id : null//paso el id del qr
                                                }
                                            });
                                        }
                                    } else {
                                        setRetroceso(true);
                                        setSelectIndex(value);
                                        dispatch(setQrScaner(false));//verifica si scaneo el qr
                                        dispatch(setSplashScreen(true));//visualiza el tabbar
                                        setTimeout(() => { props.navigation.goBack(); }, 10);
                                    }
                                }}
                                buttons={['Continuar', 'Cancelar']}
                                selectedIndex={selectIndex}
                                containerStyle={styles.buttonContainer}
                                selectedButtonStyle={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: 10,
                                }}
                                textStyle={styles.titleStyleButton}
                                selectedTextStyle={styles.textColor}
                                innerBorderStyle={{
                                    width: 0,
                                    color: 'transparent',
                                }}
                            />
                        }

                        {!textTitle &&
                            <Button
                                title="Cancelar"
                                buttonStyle={styles.btnCancel}
                                titleStyle={styles.textColorButtonCancel}
                                onPress={() => {
                                    setRetroceso(true);
                                    dispatch(setQrScaner(false));//verifica si scaneo el qr
                                    dispatch(setSplashScreen(true));//visualiza el tabbar
                                    setTimeout(() => { props.navigation.goBack(); }, 10);
                                }}
                            />
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SplashScreenMesa;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E12D31',
    },
    header: {
        flex: 2,
        // justifyContent: 'center',
        top: 80,
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: 500,
        height: 220,
        marginBottom: 20,
    },
    titleStyleButton: {
        fontSize: 16,
        color: '#fff4ed',
        fontWeight: 'bold',
    },
    text: {
        color: '#fffafa',
        // marginTop: 5,
        fontSize: 28,
        marginTop: 20,
    },
    textStatus: {
        color: '#fffafa',
        // marginTop: 5,
        fontSize: 25,
        marginTop: 20,
    },
    textNum: {
        color: '#fffafa',
        // marginTop: 5,
        fontSize: 80,
        // marginTop: 20,
        fontWeight: 'bold',
    },
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
    textColorButtonCancel: {
        color: '#212429',
        fontSize: 20,
    },
    btnCancel: {
        backgroundColor: '#ffffff',
        width: 150,
        height: 80,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center'
    },
});
