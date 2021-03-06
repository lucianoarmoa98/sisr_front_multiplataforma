import React, { Component, useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Animated,
    Image,
    FlatList,
    ImageBackground
} from 'react-native';

import { Card, Icon, ListItem, Text } from '@rneui/base';
import { getLocales } from '../../api/api';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { stylesHome } from '../../styles/styles';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window');

export default Todos_restaurants = ({ navigation }) => {
    const [string, setString] = useState('');
    const [restaurants, setrestaurants] = useState([]);
    const [rating, setrating] = useState(5);
    const [isfetched, setisfetched] = useState(false);
    const [favoriteIcon, setFavoriteIcon] = useState([]);//array de restaurantes favoritos
    const [starIcon, setStarIcon] = useState(false);

    const stateRefresHome = useSelector(state => state.refresHome);

    useEffect(() => {
        getLocales()
            .then((response) => {
                //console.log('restauran', response.data);
                setrestaurants(response.data.data);
                setisfetched(true);
            })
            .catch((error) => {
                console.log(error);
            });
        //desmontar el useEffect
        return () => {
            setisfetched(true);
        }

    }, [stateRefresHome]);

    //selecciona el restaurante favorito
    const selectIcon = (id) => {
        if (favoriteIcon.includes(id)) {
            //si el id esta en el array, lo elimina
            const newFavoriteIcon = favoriteIcon.filter(item => item !== id);
            setFavoriteIcon(newFavoriteIcon);//actualiza el array
        } else {
            //si no esta en el array, lo agrega
            setFavoriteIcon([...favoriteIcon, id]);//actualiza el array
        }
    }


    return (
        <View style={{ }}>
            <View style={{ marginLeft: '5%' }}>
                <Text style={stylesHome.titlePrincipalRestauranst}>
                    Todos los Restaurantes
                </Text>
            </View>

            <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                width={width * 0.8}
                height={120}
                visible={isfetched}
                style={{ marginLeft: 10, borderRadius: 8 }}>

                {restaurants ? restaurants.map((item, index) => (
                    <ListItem
                        key={index}
                        containerStyle={{ backgroundColor: "rgba(249,250,252,255)" }}
                        style={{
                            alignSelf: 'center',
                            marginBottom: 10,
                            borderRadius: 10,

                        }}
                    >
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('Menu', { id: item.id })}
                            >
                                <ImageBackground
                                    source={{ uri: item.banner_url }}
                                    style={stylesHome.imgBackground}
                                >
                                    <View style={stylesHome.contentIcon}>
                                        {true && <View style={stylesHome.cardDescStyle}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#fff',
                                                }}>
                                                15% off
                                            </Text>
                                        </View>}

                                        <TouchableOpacity
                                            onPress={() => selectIcon(item.id)}>
                                            <Card containerStyle={stylesHome.cardIconReaccion}>
                                                <Icon
                                                    name='favorite'
                                                    size={20}
                                                    // color={favoriteIcon ? '#ce2828' : '#737373'}
                                                    color={favoriteIcon.includes(item.id) ? '#ce2828' : '#737373'}
                                                    style={{
                                                    }}
                                                />
                                            </Card>
                                        </TouchableOpacity>

                                    </View>
                                </ImageBackground>

                                <View style={stylesHome.imgPie}>
                                    <View style={stylesHome.textPieImg}>
                                        <Text style={stylesHome.textName}
                                        >
                                            {item.name}
                                        </Text>

                                        <TouchableOpacity onPress={() => navigation.navigate('Menu', {
                                            id: item.id,
                                        })}>

                                            <Text style={stylesHome.styleOpen}>
                                                Abrir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={stylesHome.contentText}>
                                        <TouchableOpacity onPress={() => setStarIcon(!starIcon)}>
                                            <Icon
                                                name={starIcon ? 'star' : 'star-outline'}
                                                size={20}
                                                color={starIcon ? '#ce2828' : '#5f5f5f'}
                                            />
                                        </TouchableOpacity>

                                        <Text style={{ marginRight: '6%', alignSelf: 'center' }}>
                                            <Text style={{ color: starIcon ? '#ce2828' : '#5f5f5f' }}>4.5</Text>
                                            <Text style={{ color: '#5f5f5f' }}>(6k)</Text>
                                        </Text>

                                        <Text style={stylesHome.titleAddress}>
                                            {item.address}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ListItem>
                )) : null}
            </ShimmerPlaceholder>
        </View>
    );
};
