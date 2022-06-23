import React, { useEffect, useState } from "react";
import { Icon, Input, Text, Button, ListItem, Image } from "@rneui/base";
import { Dimensions, FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { getLocales } from "../../api/api";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { stylesCategoriesRestaurants, stylesHome } from "../../styles/styles";

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
            <View style={{ marginLeft: '5%' }}>
                <Text style={stylesHome.titlePrincipalRestauranst}>
                    Categorías
                </Text>
            </View>

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
                                <View style={stylesCategoriesRestaurants.contentCategories}>
                                    <Image
                                        source={{ uri: item.banner_url }}
                                        style={stylesCategoriesRestaurants.contentImgCategories}
                                    />
                                    <Text style={{ alignSelf: 'center', marginLeft: 10 }}>{item.name}</Text>
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