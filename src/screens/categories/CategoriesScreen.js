import React, { useEffect, useState } from "react";
import { Icon, Input, Text, Button, ListItem, Image, Card } from "@rneui/base";
import { Dimensions, FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { stylesCategoriesScreen } from "../../styles/styles";
import { getLocales } from "../../api/api";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";


const CategoriesScreen = ({ navigation }) => {
    const [categoriesRestaurants, setCategoriesRestaurants] = useState([]);
    const [isfetched, setisfetched] = useState(false);
    const [favoriteIcon, setFavoriteIcon] = useState([]);//array de restaurantes favoritos
    const [starIcon, setStarIcon] = useState(false);

    const { height, width } = Dimensions.get('window');


    useEffect(() => {
        getLocales()
            .then((response) => {
                setCategoriesRestaurants(response.data.data);
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
        <View style={{ flex: 1, backgroundColor: "rgba(249,250,252,255)" }}>
            <LinearGradient
                colors={["rgba(249,250,252,255)", "rgba(249,250,252,255)"]}
                style={stylesCategoriesScreen.viewContentHeader}
            >

                <View style={{ justifyContent: 'flex-end', marginBottom: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', right: 15 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <View style={stylesCategoriesScreen.viewContentBack}>
                                <Icon
                                    name="chevron-left"
                                    size={30}
                                    color="#ffffff"
                                />
                            </View>

                        </TouchableOpacity>
                        {/* <Icon
                            //icono de ubicacion
                            name="location-pin"
                            size={30}
                            color="rgba(115,115,115,255)"
                        // style={{ marginRight: '90%' }}
                        />
                        <View>

                            <Text style={{ color: '#b93233', fontSize: 13, marginLeft: 5 }}>Delivery</Text>
                            <Text style={{ color: '#838484', fontSize: 13, marginLeft: 5 }}>Asuncion, Paraguay</Text>
                        </View>

                        <TouchableOpacity>
                            <Icon
                                //icono de desplegar
                                name="expand-more"
                                size={30}
                                color="rgba(115,115,115,255)"
                                style={{ top: 10 }}
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>

            </LinearGradient>

            <ScrollView>
                <Text style={stylesCategoriesScreen.titlePrimary}>Categorías</Text>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={100}
                    height={100}
                    visible={isfetched}
                    style={{ borderRadius: isfetched ? 0 : 50, marginLeft: isfetched ? 5 : 20 }}
                >
                    {categoriesRestaurants ? (
                        <FlatList
                            data={categoriesRestaurants}
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
                                    <View style={stylesCategoriesScreen.contentCategories}>
                                        <Image
                                            source={{ uri: item.banner_url }}
                                            style={stylesCategoriesScreen.contentImgCategories}
                                        />
                                        <Text style={{ alignSelf: 'center', marginLeft: 10 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : null}
                </ShimmerPlaceholder>




                <Text style={stylesCategoriesScreen.titleSecundary}>Todos los Restaurantes</Text>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        width={width * 0.8}
                        height={120}
                        visible={isfetched}
                        style={{ borderRadius: isfetched ? 0 : 10 }}
                    >

                        {categoriesRestaurants ? categoriesRestaurants.map((item, index) => (
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
                                            style={stylesCategoriesScreen.imgBackground}
                                        >
                                            <View style={stylesCategoriesScreen.contentIcon}>
                                                {true && <View style={stylesCategoriesScreen.cardDescStyle}>
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
                                                    <Card containerStyle={stylesCategoriesScreen.cardIconReaccion}>
                                                        <Icon
                                                            name='favorite'
                                                            size={20}
                                                            color={favoriteIcon.includes(item.id) ? '#ce2828' : '#737373'}
                                                            style={{
                                                            }}
                                                        />
                                                    </Card>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>

                                        <View style={stylesCategoriesScreen.imgPie}>
                                            <View style={stylesCategoriesScreen.textPieImg}>
                                                <Text style={stylesCategoriesScreen.textName}
                                                >
                                                    {item.name}
                                                </Text>

                                                <TouchableOpacity onPress={() => navigation.navigate('Menu', {
                                                    id: item.id,
                                                })}
                                                >
                                                    <Text style={{
                                                        color: '#197b5f',
                                                        fontSize: 15,
                                                        fontWeight: 'bold',
                                                    }}
                                                    >
                                                        Abrir
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={stylesCategoriesScreen.contentText}>
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


                                                <Text style={stylesCategoriesScreen.titleAddress}>
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


            </ScrollView>
        </View>
    );
}
export default CategoriesScreen;