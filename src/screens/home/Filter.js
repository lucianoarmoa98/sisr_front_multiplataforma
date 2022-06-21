import React, { Component, useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native';
import { Button, Card, Divider, FAB, Icon, Input, Slider, Text } from '@rneui/base';
import { stylesHome } from '../../styles/styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { getMenuCategoriesFilter } from '../../api/api';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions/action';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const { height, width } = Dimensions.get('window');

//array precios ejemplos
const prices = [
    {
        id: 1,
        price: '10.000',
    },
    {
        id: 2,
        price: '20.000',
    },
    {
        id: 3,
        price: '30.000',
    },
    {
        id: 4,
        price: '40.000',
    },
];

const Filter = () => {
    const [categories, setcategories] = useState([]);
    const [isfetched, setisfetched] = useState(false);//img de carga
    const [precieSelected, setPrecieSelected] = useState([]);//select de precio
    const [categorySelected, setCategorySelected] = useState([]);//select de categoria
    const [isColorSelected, setIsColorSelected] = useState(false);//color de rango de precio
    const [isColorTextSelected, setIsColorTextSelected] = useState(false);//color de texto
    const [value, setValue] = useState(0);//valor del slider

    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

    const multiSliderValuesChange = (values) => setMultiSliderValue(values)

    const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux


    useEffect(() => {
        // let body = {}
        // body.venue_id = id
        getMenuCategoriesFilter()
            .then((response) => {
                setcategories(response)
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

    //cierra modal de busqueda con filtro
    const closeFilter = () => {
        dispatch(setFilter(false));
    }

    //selecciona la categoria
    const selectCategory = (item) => {
        let newArray = [...categorySelected];
        if (newArray.includes(item)) {
            newArray = newArray.filter((itemArray) => itemArray !== item);
        } else {
            newArray.push(item);
        }
        setCategorySelected(newArray);
    }
    console.log("categorySelected", categorySelected);


    //selecciona el precio de rango
    const onSelectPrice = (id) => {
        console.log("id", id);
        if (precieSelected.includes(id)) {
            //si esta seleccionado lo elimino
            const newPrice = precieSelected.filter((price) => price !== id);
            setPrecieSelected(newPrice);

            setIsColorSelected(!isColorSelected);
            setIsColorTextSelected(!isColorTextSelected);
        } else {
            //si no esta seleccionado lo agrego
            setPrecieSelected([...precieSelected, id]);
        }
    };

    // console.log('selecciono--', precieSelected);

    return (
        <View style={stylesHome.viewContentDimensions}>

            <Animatable.View
                animation="fadeInUpBig"
                style={stylesHome.footer}
            >
                <ScrollView>
                    <SafeAreaView >

                        <View>
                            <Text style={stylesHome.textStyle}>Categorias</Text>
                        </View>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            width={60}
                            height={60}
                            visible={isfetched}
                            style={{ marginLeft: 10, borderRadius: 8 }}>

                            {categories ? (
                                <FlatList
                                    data={categories}
                                    horizontal={true}
                                    //ocultar la barra de scroll
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                selectCategory(item.id);
                                            }}
                                        >
                                            <Card containerStyle={[stylesHome.cardCategory,
                                            {
                                                backgroundColor: categorySelected.includes(item.id) ? 'rgb(206, 40, 41)' : '#fff',
                                            }]
                                            }>
                                                <Image
                                                    source={{ uri: item.photo_url }}
                                                    style={{
                                                        height: 60,
                                                        width: 60,
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        alignSelf: 'center',
                                                    }}
                                                />
                                            <Text>{item.name}</Text>
                                            </Card>

                                        </TouchableOpacity>
                                    )}
                                />
                            ) : null}
                        </ShimmerPlaceholder>

                        <Divider style={{ backgroundColor: '#c1c1c1', marginVertical: 10 }} />

                        <Text style={stylesHome.textStyle}>Rango de Precios</Text>
                        <View style={{  alignSelf: 'center' }}>
                            {/*multi slider*/}
                            <MultiSlider
                                markerStyle={{
                                    ...Platform.select({
                                        ios: {
                                            height: 30,
                                            width: 30,
                                            shadowColor: '#000000',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3
                                            },
                                            shadowRadius: 1,
                                            shadowOpacity: 0.1
                                        },
                                        android: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 50,
                                            backgroundColor: '#1792E8'
                                        }
                                    })
                                }}
                                pressedMarkerStyle={{
                                    ...Platform.select({
                                        android: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 20,
                                            backgroundColor: '#148ADC'
                                        }
                                    })
                                }}
                                selectedStyle={{
                                    backgroundColor: '#1792E8'
                                }}
                                trackStyle={{
                                    backgroundColor: '#CECECE'
                                }}
                                touchDimensions={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    slipDisplacement: 40
                                }}
                                values={[multiSliderValue[0], multiSliderValue[1]]}
                                sliderLength={310}
                                onValuesChange={multiSliderValuesChange}
                                min={0}
                                max={100}
                                allowOverlap={false}
                                minMarkerOverlapDistance={10}
                            />
                        </View>


                        {/* <View>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                width={60}
                                height={60}
                                visible={isfetched}
                                style={{ marginLeft: 10, borderRadius: 8 }}>

                                {prices ? (
                                    <FlatList
                                        data={prices}
                                        horizontal={true}
                                        //ocultar la barra de scroll
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                onPress={() => {
                                                    onSelectPrice(item.id);
                                                }}
                                            >
                                                <Card containerStyle={{
                                                    borderRadius: 8,
                                                    width: 100,
                                                    //backgroundColor: isColorSelected ? 'rgb(206, 40, 41)' : '#fff',
                                                    //solo cambia de color el id seleccionado
                                                    backgroundColor: precieSelected.includes(item.id) ? 'rgb(206, 40, 41)' : '#fff',
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: precieSelected.includes(item.id) ? '#fff' : '#000',
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Gs. {item.price}
                                                    </Text>
                                                </Card>

                                            </TouchableOpacity>
                                        )}
                                    />
                                ) : null}
                            </ShimmerPlaceholder>
                        </View> */}

                        <Divider style={{ backgroundColor: '#c1c1c1', marginVertical: 10 }} />
                        <View style={stylesHome.buttonContent}>
                            <TouchableOpacity
                                onPress={closeFilter}>
                                <Text style={stylesHome.styleCancel}>Cancelar</Text>
                            </TouchableOpacity>

                            <Button
                                title={'Aplicar Filtros'}
                                onPress={closeFilter}
                                buttonStyle={stylesHome.buttonStyleAplicar}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </Animatable.View>
        </View>
    );
}

export default Filter;

