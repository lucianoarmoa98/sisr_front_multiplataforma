import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, FlatList, ImageBackground, Linking, Modal, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { Card, Icon, Image } from "@rneui/base";
import { getLocales } from "../../api/api";
import { stylesMaps } from "../../styles/styles";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const dataPosition = [{
    id: 1,
    name: "Local 1",
    latitude: -25.298506,
    longitude: -57.578890
},
{
    id: 2,
    name: "Local 2",
    latitude: -25.290509,
    longitude: -57.579017
},
{
    id: 3,
    name: "Local 3",
    latitude: -25.298197963103547,
    longitude: -57.58005642388666
},
]

const MapsScreen = ({ navigation }) => {
    const [locales, setLocales] = useState([]);
    const [isfetched, setisfetched] = useState(false);
    const [mapVisibility, setMapVisibility] = useState(0);
    console.log("mapVisibility", mapVisibility);
    const [nameUber, setNameUber] = useState("");
    const [latitudeUber, setLatitudeUber] = useState(0);
    const [longitudeUber, setLongitudeUber] = useState(0);
    const [pos, setPos] = useState({
        latitude: -25.290509,
        longitude: -57.579017,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.0421,
    });

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const CARD_HEIGHT = height / 2;
    const CARD_WIDTH = CARD_HEIGHT - 10;

    useEffect(() => {
        getLocales()
            .then((response) => {
                //console.log('restauran', response.data);
                setLocales(response.data.data);
                setisfetched(true);
            })
            .catch((error) => {
                console.log(error);
            });
        //desmontar el useEffect
        return () => {
            setisfetched(true);
        };

    }, []);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            const auth = Geolocation.requestAuthorization("whenInUse");
            if (auth === "granted") {
                // do something if granted...
            }
        }

        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
                // do something if granted...
                Geolocation.getCurrentPosition(
                    (position) => {
                        // console.log("gps", position);
                    },
                    (error) => {
                        console.log("error", error);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }
        }
    }, []);

    const mapRef = React.useRef(null);
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })


    const onViewRef = useRef((viewableItems) => {
        const index = viewableItems.changed[0].index;
        const item = viewableItems.changed[0].item;

        mapRef.current.animateToRegion({
            latitude: item ? parseFloat(item.latitude) : -25.290509,
            longitude: item ? parseFloat(item.longitude) : -57.579017,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.0421,
        }, 1000);
        setMapVisibility(index);
    })



    //abre una app externa
    const openApp = (item) => {
        // if (Platform.OS === 'ios') {
        //     Linking.openURL(`uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${item.latitude}&dropoff[longitude]=${item.longitude}&dropoff[nickname]=${item.name}`);
        // }


        //verifico que este instalada la app
        if (Platform.OS === 'android') {
            Linking.openURL(`uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${item.latitude}&dropoff[longitude]=${item.longitude}&dropoff[nickname]=${item.name}`)
                .then(supported => {
                    if (supported) {
                        console.log("supported", supported);
                    } else {
                        console.log("not supported");
                    }
                }
                ).catch(err => {
                    //abre playstore
                    Linking.openURL(`https://play.google.com/store/apps/details?id=com.ubercab&hl=es_419`)
                }
                );
        }
    }

    const openUber = () => {
        //verifico que este instalada la app
        if (Platform.OS === 'android') {
            {
                locales ? locales.map((item, index) => {
                    if (index === mapVisibility) {
                        Linking.openURL(`uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${item.latitude}&dropoff[longitude]=${item.longitude}&dropoff[nickname]=${item.name}`)
                            .then(supported => {
                                if (supported) {
                                    console.log("supported", supported);
                                } else {
                                    console.log("not supported");
                                }
                            }
                            ).catch(err => {
                                //abre playstore
                                Linking.openURL(`https://play.google.com/store/apps/details?id=com.ubercab&hl=es_419`)
                            }
                            );
                    }
                }
                ) : null
            }
        }
    }


    return (
        <View style={{ flex: 1 }}>
             <MapView
                style={{ flex: 1 }}
                ref={mapRef}
                initialRegion={pos}
                // provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            // userLocationAnnotationTitle={"Mi ubicación"}
            >
                {locales ? locales.map((item, index) => {

                    return (

                        <MapView.Marker
                            key={index}
                            coordinate={{
                                // latitude: item ? parseFloat(item.latitude) : 0,
                                latitude: mapVisibility === index ? parseFloat(item.latitude) : 0,
                                // longitude: item ? parseFloat(item.longitude) : 0,
                                longitude: mapVisibility === index ? parseFloat(item.longitude) : 0,
                            }}
                            title={item.name}
                            //abrir uber app
                            onPress={() => { openApp(item) }}
                        >

                            <View>
                                <View style={stylesMaps.viewUber}>
                                    <Text style={{ padding: 5 }}>Pedir Uber</Text>
                                </View>
                                <Icon
                                    name="room"
                                    size={30}
                                    color="#d3282b"
                                />
                            </View>
                            {/* <Animated.View style={[stylesMaps.markerWrap, opacityStyle]}>
                                <Animated.View style={[stylesMaps.ring, scaleStyle]} />
                                <View style={stylesMaps.marker} />
                            </Animated.View> */}
                        </MapView.Marker>
                    )
                }) : null}
            </MapView>

            <View style={stylesMaps.contentUber}>
                <TouchableOpacity onPress={() => { openUber() }}>
                    <Text style={stylesMaps.textUber}>
                        Uber
                    </Text>
                </TouchableOpacity>
            </View>

            {isfetched ? (
                <FlatList
                    data={locales}
                    style={stylesMaps.scrollViewStyle}
                    horizontal={true}
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    snapToInterval={CARD_WIDTH}
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View
                            style={stylesMaps.scrollImgView}
                            key={item.id}
                        >
                            <TouchableOpacity
                                //que no sea transparente
                                activeOpacity={0.9}
                                onPress={() => navigation.navigate('Map-Menu', {
                                    id: item.id,
                                })}
                            >

                                <Image
                                    source={{ uri: item.banner_url }}
                                    style={stylesMaps.imgBackground}
                                />

                                <View style={stylesMaps.imgPie}>

                                    <View style={stylesMaps.textPieImg}>
                                        <Text style={stylesMaps.textName}
                                        >
                                            {item.name}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('Map-Menu', {
                                                    id: item.id,
                                                })
                                            }}
                                        >

                                            <Text style={stylesMaps.openStyle}>
                                                Abrir
                                            </Text>
                                        </TouchableOpacity>

                                    </View>


                                    <View>
                                        <Text style={stylesMaps.addressStyle}>
                                            {item.address}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                width={width * 0.7}
                height={130}
                visible={isfetched}
                style={stylesMaps.loadingScreen}>
            </ShimmerPlaceholder>
            }

        </View>
    );
}
export default MapsScreen;

