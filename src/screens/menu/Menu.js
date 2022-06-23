import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Divider, FAB, Icon, Input, LinearProgress, ListItem, Text } from '@rneui/base';
import { Dimensions, FlatList, Image, ImageBackground, Modal, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { stylesLogin, stylesMenu } from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import { getCurrentOrder, getMenuCategories, getPromociones, postCallMesero, postDetailsLocal } from '../../api/api';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIcon, setRefreshCarrito } from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { height, width } = Dimensions.get('window');

const Menu = (navigation) => {
    const [categories, setcategories] = useState([]);//obiene las categorias de los productos
    const [local, setlocal] = useState([]);//obtiene los datos del local
    const [indexSelected, setindexSelected] = useState(0);
    const [dataStorageUser, setDataTokenUser] = useState(null);//obtiene si hay user logueado
    const [modalVisible, setModalVisible] = useState(false);
    const [viewPropietario, setViewPropietario] = useState(false);
    const [propietaryData, setPropietaryData] = useState(null);
    const [callMesero, setCallMesero] = useState(false);
    const [selectIndexOpcion, setSelectIndexOpcion] = useState(0);//seleccionar el index del boton
    const [messageMesero, setMessageMesero] = useState('');//mensaje del mesero
    const [modalMessageVisible, setModalMessageVisible] = useState(false);//modal de mensaje del mesero
    const [checkSesion, setCheckSesion] = useState(false);
    const [messageApi, setMessageApi] = useState('');
    const [imgPromotion, setImgPromotion] = useState([]);
    const [progress, setProgress] = useState(false);
    const [posMaps, setPosMaps] = useState({
        latitude: -25.290509,
        longitude: -57.579017,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.0421,
    });

    //destructuring
    const { name } = navigation.route;
    console.log("navigation", name);

    const refresh_IconTabBar = useSelector(state => state.isIcon);//actulaiza el icono de "tabBar home", segun si hay orden
    const stateToken = useSelector(state => state.token);

    const dispatch = useDispatch();
    //destructuring
    const { id } = navigation.route.params;

    useEffect(() => {
        if (modalMessageVisible) {
            setTimeout(() => {
                setModalMessageVisible(false);
            }, 1100);
        }
    }, [modalMessageVisible]);


    useEffect(() =>
        navigation.navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action;
            if (refresh_IconTabBar) {
                return;
            }

            e.preventDefault();

        }), [refresh_IconTabBar, navigation.navigation]);



    useEffect(() => {
        getDataStorageUser();
    }, [stateToken]);

    useEffect(() => {
        if (dataStorageUser !== null) {
            refresScrollCuerrentOrder();
            obtenerPromociones();
        } else {
            // getCurrentOrder();
        }
    }, [dataStorageUser]);

    useEffect(() => {
        //obtiene las categorias de los productos
        getMenuCategories(id)
            .then((response) => {
                // console.log("medu-data", response ? response.map(item => item.products) : []);
                setcategories(response)
                // console.log("categories", response);
            })
            .catch((error) => {
                console.log(error);
            });
        //Obtiene los datos del local
        postDetailsLocal(id)
            .then((response) => {
                // console.log("name-local-detalles", response);
                setPosMaps({
                    //pasar de string a numero
                    latitude: parseFloat(response.latitude),
                    longitude: parseFloat(response.longitude),
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.0421,
                });
                setlocal(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //refresScroll getMenuCategories
    const refreshScrollMenuCategories = () => {
        getMenuCategories(id)
            .then((response) => {
                setcategories(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //refresScroll detailsLocal
    const refresScrollDetailsLocal = () => {
        postDetailsLocal(id)
            .then((response) => {
                setlocal(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //refresScroll CurrentOrder=>verifica si esta aun su orden pendiente
    const refresScrollCuerrentOrder = () => {
        getCurrentOrder(dataStorageUser)
            .then(res => {
                if (!res.message) {
                    // console.log("res", res);
                    setPropietaryData(res);
                    dispatch(setIcon(false));//actualiza icono TabBar Home
                    // navigation.navigate("Menu", {
                    //     id: res.venue_id,
                    // });
                } else {
                    dispatch(setIcon(true));//actualiza icono TabBar Home,
                }
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    const obtenerPromociones = () => {
        getPromociones(dataStorageUser)
            .then(res => {
                console.log("res", res);
                // setImgPromotion(res ? res.map(item => item.photos_urls) : []);
                setImgPromotion(res);
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    let numOrderCode = propietaryData ? propietaryData.code : null;

    const handleCallMesero = () => {
        setProgress(true);
        let bodyCall = {};
        bodyCall.order_id = propietaryData ? propietaryData.order_id : null;
        bodyCall.message = messageMesero;

        //valido que no haya un mensaje vacio
        if (messageMesero !== '') {
            setProgress(true);
            postCallMesero({ body: dataStorageUser, call: bodyCall })
                .then(res => {
                    if (res.message) {
                        setProgress(false);
                        setMessageMesero('');
                        setMessageApi(res.message);
                        setModalMessageVisible(true);
                        setCheckSesion(true);
                        // setTimeout(() => {
                        //     setCallMesero(false);
                        // }, 10);
                        setCallMesero(false);
                        setTimeout(() => {
                            setModalMessageVisible(true);
                        }, 100);
                    } else {
                    }
                })
                .catch(err => {
                    console.log("err", err);
                });
        } else {
            //agregar setTimeout para abrir en ios dos modales
            setCallMesero(false);
            setTimeout(() => {
                setModalMessageVisible(true);
            }, 100);
            setCheckSesion(false);
            setMessageApi("Ingrese un mensaje");
            setProgress(false);
        }
    }

    //obtiene el data del async storage=> datos del usuario
    const getDataStorageUser = async () => {
        const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
        const valueJson = JSON.parse(value);//convierto el data a json
        setDataTokenUser(valueJson);//seteo el data del async storage
        // console.log("dataStorageUser", dataStorageUser);
    };

    //muestra opciones si price_formatted es 0
    const showPrice = (price_formatted) => {
        if (price_formatted === '0') {
            return 'Ver Opciones';
        } else if (price_formatted === '0.00') {
            return 'Ver Opciones';
        } else {
            return price_formatted;
        }
    }

    //muestra el currentCode
    const showCurrentCode = (item) => {
        if (item.price_formatted === '0') {
            return;
        } else if (item.price_formatted === '0.00') {
            return;
        } else {
            return item.currency_code;
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f9fafc' }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            console.log("refresh-scroll");
                            refresScrollCuerrentOrder();
                            dispatch(setRefreshCarrito(true));//actualiza el estado de refreshCarrito
                            refreshScrollMenuCategories();
                            refresScrollDetailsLocal();
                        }}
                    />
                }
            >
                <LinearGradient
                    colors={["black", "#191820"]}
                    style={stylesMenu.styleGradient}
                >

                    <View >
                        <View style={stylesMenu.header}>
                            <View style={{ marginLeft: '10%' }}>
                                <TouchableOpacity onPress={() =>
                                    // navigation.navigation.navigate('Home-Principal')
                                    navigation.navigation.goBack()
                                }>
                                    <View style={{ backgroundColor: 'rgba(206,40,40,255)', borderRadius: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon
                                            name="chevron-left"
                                            size={30}
                                            color="#ffffff"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                {propietaryData !== null ? (
                                    <>
                                        <View style={stylesMenu.iconContent}>
                                            <TouchableOpacity onPress={() => { setViewPropietario(true) }}>
                                                <Icon
                                                    name="person"
                                                    size={30}
                                                    color="#fff"
                                                    style={{ padding: 5 }}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={stylesMenu.iconContent}>
                                            <TouchableOpacity onPress={() => {
                                                setCallMesero(true);
                                                setSelectIndexOpcion(0);
                                            }}>
                                                <Icon
                                                    name="call"
                                                    size={30}
                                                    color="#fff"
                                                    style={{ padding: 5 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : null}

                                <View style={stylesMenu.iconContent}>
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Icon
                                            name="information-outline"
                                            size={30}
                                            type="material-community"
                                            color="#fff"
                                            style={{ padding: 5 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible || viewPropietario || callMesero}
                    >
                        <View style={stylesMenu.centeredView}>
                            <View style={[stylesMenu.modalView, { height: modalVisible ? '60%' : null }]}>
                                {modalVisible &&
                                    <>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={stylesMenu.textName}>{local ? local.name : ''}</Text>
                                            <Text style={stylesMenu.subTitle}>{local ? local.address : ''}</Text>
                                            <Text style={stylesMenu.subTitle}>{local ? local.telephone : ''}</Text>
                                            <Text style={stylesMenu.subTitle}>{local ? local.email : ''}</Text>
                                        </View>

                                        <MapView
                                            style={{ flex: 1 }}
                                            initialRegion={posMaps}
                                            // provider={PROVIDER_GOOGLE}
                                            showsUserLocation={true}
                                        >

                                            <MapView.Marker
                                                coordinate={{
                                                    latitude: posMaps.latitude,
                                                    longitude: posMaps.longitude,
                                                }}
                                            />
                                        </MapView>
                                    </>
                                }

                                {viewPropietario &&
                                    <>
                                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#656565' }}>
                                            Propietario
                                        </Text>
                                        <Text style={{ textAlign: 'center', fontSize: 15, color: '#656565' }}>
                                            {propietaryData ? propietaryData.current_owner_user_name : ''}
                                        </Text>
                                        <Divider />
                                    </>
                                }

                                {callMesero &&
                                    <>
                                        <Input
                                            placeholder="Escriba su consulta (opcional)"
                                            inputContainerStyle={stylesMenu.input}
                                            onChangeText={(text) => setMessageMesero(text)}
                                            value={messageMesero}
                                            multiline={true}
                                        />
                                        {/* <Divider /> */}
                                    </>
                                }
                                {progress && (
                                    <LinearProgress
                                        color={'#ce2828'}
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
                                {!viewPropietario && !modalVisible &&
                                    <>
                                        <ButtonGroup
                                            onPress={(value) => {
                                                // console.log("buton", value);
                                                if (value === 0) {
                                                    setSelectIndexOpcion(value);
                                                    handleCallMesero();
                                                    // setTimeout(() => {
                                                    //     setCallMesero(false);
                                                    // }, 10);

                                                } else {
                                                    setSelectIndexOpcion(value);
                                                    setTimeout(() => {
                                                        setCallMesero(false);
                                                    }, 10);
                                                }
                                            }}
                                            vertical={true}
                                            buttons={['Llamar Mesero', 'Cancelar']}//comente=> se usara mas adelante
                                            selectedIndex={selectIndexOpcion}
                                            containerStyle={{ borderRadius: 10 }}
                                            buttonContainerStyle={stylesMenu.buttonStyle}
                                            selectedButtonStyle={{
                                                backgroundColor: '#ce2828',
                                                borderRadius: 10,
                                            }}
                                            innerBorderStyle={{
                                                width: 0,
                                                color: 'transparent',
                                            }}
                                        />
                                    </>

                                }

                                {!callMesero &&
                                    <Button
                                        title="Aceptar"
                                        containerStyle={{ marginTop: 20, borderRadius: 10 }}
                                        buttonStyle={{ height: 60 }}
                                        color="#ce2828"
                                        onPress={() => {
                                            setModalVisible(false) || setViewPropietario(false) || setCallMesero(false)

                                        }
                                        }
                                    />
                                }

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalMessageVisible}
                    >
                        <View style={stylesMenu.centerViewNotifi}>
                            <View style={[stylesMenu.modalViewNotifi, { backgroundColor: checkSesion ? '#09b29d' : '#cc2827' }]}>
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
                                    <Text style={stylesMenu.textTitleModalNotific}>
                                        {messageApi}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Image
                        source={{ uri: local ? local.banner_url : '' }}
                        style={stylesMenu.imgBanner}
                    />

                    <View style={stylesMenu.contentImgAvatarView}>
                        <View style={stylesMenu.textViewPosition}>
                            <View>
                                <Image
                                    source={{ uri: local ? local.logo_url : '' }}
                                    style={stylesMenu.imgAvatar}
                                />

                                {propietaryData !== null ? (
                                    <View style={stylesMenu.cardDescStyle}>
                                        <Text
                                            style={stylesMenu.titleStyleCode}>
                                            {numOrderCode}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>


                            <View style={stylesMenu.contentText}>
                                <Text style={{ color: '#fdfaf8', fontSize: 20 }}>
                                    {local ? local.name : ''}
                                </Text>

                                <Text style={{ color: '#fdfaf8', fontSize: 15 }}>
                                    {local ? local.address : ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={stylesMenu.contentList}>
                    <View style={stylesMenu.contentScroll}>
                        {imgPromotion ? (
                            <FlatList
                                data={imgPromotion}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                    >
                                        <View style={stylesMenu.contentViewImgPromotion}>
                                            <Image
                                                source={{ uri: item }}
                                                style={stylesMenu.contentImgPromotion}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        ) : null}



                        {categories ? (
                            <View>
                                <FlatList
                                    data={categories}
                                    horizontal={true}
                                    //ocultar la barra de scroll
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <View key={index}>
                                            <View style={stylesMenu.headerTitle}>
                                                <TouchableOpacity onPress={() => setindexSelected(index)}>
                                                    <Text style={{
                                                        color: indexSelected === index ? '#be4946' : '#727373',
                                                        fontWeight: indexSelected === index ? 'bold' : 'normal'
                                                    }}>
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )}
                                />
                            </View>
                        ) : null}
                        <Divider />


                        {/*muestra el index seleccionado*/}
                        <View>
                            {categories ? categories.map((item, index1) => (item.products.map((item, index) => (
                                <View key={index}>
                                    {indexSelected === index1 ? (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                if (name === 'Map-Menu') {
                                                    navigation.navigation.navigate('Map-Order-Details', { id: item.id })
                                                } else {
                                                    navigation.navigation.navigate('Order-Details', { id: item.id })
                                                }
                                            }}
                                        >
                                            <View>
                                                <View style={stylesMenu.contentItem}>
                                                    <View style={stylesMenu.positionItem}>
                                                        {item.promotion_reference ? (
                                                            <View style={stylesMenu.contentPromotion}>
                                                                <ImageBackground
                                                                    source={{ uri: item.photo_url }}
                                                                    imageStyle={stylesMenu.imgCardPromotion}
                                                                >
                                                                    <View style={stylesMenu.viewPromotion}>
                                                                        <Text style={stylesMenu.titleCardPromotion}>
                                                                            {item.promotion_reference} OFF
                                                                        </Text>
                                                                    </View>
                                                                </ImageBackground>
                                                            </View>
                                                        ) : (
                                                            <Image
                                                                source={{ uri: item.photo_url }}
                                                                style={stylesMenu.imgCard}
                                                            />
                                                        )}

                                                        <View style={stylesMenu.contentTextCard}>
                                                            <Text style={stylesMenu.titleCard}>
                                                                {item.name}
                                                            </Text>
                                                            <Text style={stylesMenu.titleSecundaryCard}>
                                                                {item.name}
                                                            </Text>

                                                            {item.promotion_price_formatted &&
                                                                <Text style={stylesMenu.titlePriceCardPromotion}>
                                                                    {showCurrentCode(item)} {item.promotion_price_formatted}
                                                                </Text>
                                                            }

                                                            <Text style={[stylesMenu.titlePriceCard,
                                                            {
                                                                color: item.promotion_price_formatted ? '#71767a' : '#a83e42',
                                                                textDecorationLine: item.promotion_price_formatted ? 'line-through' : 'none',
                                                                textDecorationStyle: item.promotion_price_formatted ? 'solid' : undefined
                                                            }]}>
                                                                {showCurrentCode(item)} {showPrice(item.price_formatted)}
                                                            </Text>
                                                        </View>
                                                    </View>


                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (name === 'Map-Menu') {
                                                                navigation.navigation.navigate('Map-Order-Details', { id: item.id })
                                                            } else {
                                                                navigation.navigation.navigate('Order-Details', { id: item.id })
                                                            }
                                                        }}
                                                    >
                                                        <View style={stylesMenu.contentBotonSiguiente}>
                                                            <Icon
                                                                name='chevron-right'
                                                                size={30}
                                                                color='#fff6ef'
                                                                containerStyle={{ top: '5%' }}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>

                            )))) : null}
                        </View>
                    </View>
                </View >
            </ScrollView>
        </View >
    );
}

export default Menu;