import React, { useEffect, useState } from "react";
import { Image, Text } from "@rneui/base";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { getLocales } from "../../api/api";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";


const { height, width } = Dimensions.get('window');

const Promociones = ({ navigation, props, route }) => {
    const [promos, setPromos] = useState([]);
    const [isfetched, setisfetched] = useState(false);

    const stateRefresHome = useSelector(state => state.refresHome);

    useEffect(() => {
        getLocales()
            .then((response) => {
                //console.log('restauran', response.data);
                setPromos(response.data.data);
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
            <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                width={width * 0.7}
                height={130}
                visible={isfetched}
                style={{ marginLeft: 10, borderRadius: 8 }}>

                {promos ? (
                    <FlatList
                        data={promos}
                        horizontal={true}
                        //ocultar la barra de scroll
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                // onPress={() => {
                                //   goToRestaurant(item.id);
                                // }}
                                style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                <Image
                                    source={{ uri: item.banner_url }}
                                    style={{
                                        height: 130,
                                        width: 250,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                ) : null}
            </ShimmerPlaceholder>
        </View>
    );
}
export default Promociones;