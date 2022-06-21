import React, { useEffect, useState } from "react";
import { Icon, Input, Text, Button, ListItem, Image } from "@rneui/base";
import { Dimensions, FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { getLocales } from "../../api/api";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get('window');

const CategoriesRestaurants = ({ navigation }) => {
    const [popularRestaurants, setPopularRestaurants] = useState([]);
    const [isfetched, setisfetched] = useState(false);

    const stateRefresHome = useSelector(state => state.refresHome);

    useEffect(() => {
        getLocales()
            .then((response) => {
                //console.log('restauran', response.data.data);
                setPopularRestaurants(response.data.data);
                setisfetched(true);
            })
            .catch((error) => {
                console.log(error);
            });
        //desmontar el useEffect
        return () => {
            setisfetched(true);
        };
    }, [stateRefresHome]);



    return (
        <View>
            <ListItem.Content
                //agregar de forma horizontal
                style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: '5%', marginRight: '2%' }}
            >
                {/* <TouchableOpacity
                //onPress={() => navigation.navigate('Mapa')}
                > */}
                <View>
                    <Text
                        style={{
                            fontSize: 18,
                            // fontWeight: 'bold',
                            // // color: '#000',
                            marginBottom: 10,
                            marginTop: 10,
                        }}>
                        Categorías
                    </Text>
                </View>
                {/* </TouchableOpacity> */}
            </ListItem.Content>

            <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                width={100}
                height={100}
                visible={isfetched}
                style={{ marginLeft: isfetched ? '1%' : '5%', borderRadius: isfetched ? 0 : 50 }}
                >

                {popularRestaurants ? (
                    <FlatList
                        data={popularRestaurants}
                        horizontal={true}
                        //ocultar la barra de scroll
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                 navigation.navigate('CategoriesScreen', { id: item.id });
                                }}
                                // style={{ flex: 1, marginRight: 10, marginLeft: 10 }}
                                >
                                <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                    <Image
                                        source={{ uri: item.banner_url }}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                        }}
                                    />
                                    <Text style={{alignSelf: 'center'}}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                ) : null}
            </ShimmerPlaceholder>
        </View>
    );
}
export default CategoriesRestaurants;