import React, { useEffect, useState } from "react";
import { Icon, Input, Text, Button, withBadge } from "@rneui/base";
import { Dimensions, FlatList, ImageBackground, Platform, RefreshControl, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { stylesHome } from "../../styles/styles";
import Promociones from "./Promociones";
import Cercano_restaurants from "./Cercano_restaurants";
import CategoriesRestaurants from "./CategoriesRestaurants";
import Todos_restaurants from "./Todos_restaurants";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./Filter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentOrder } from "../../api/api";
import { setIcon, setQrScaner, setRefresHome } from "../../redux/actions/action";
import ModalScreen from "../modal/ModalScreen";
//import messaging from '@react-native-firebase/messaging';


const { height, width } = Dimensions.get('window');

const Home_screen = ({ navigation }) => {
  const [dataStorage, setDataStorage] = useState(null);//obtiene si hay pedido en el carrito
  const [dataStorageUser, setDataTokenUser] = useState(null);//obtiene si hay user logueado
  const [refreshing, setRefreshing] = useState(false);//muestra icono, si no esta logueado no muestra el icono

  const refresh_Filter = useSelector(state => state.isFilter);
  const refresh_Carrito = useSelector(state => state.refreshCarrito);//actualiza los datos home
  const stateViewModal = useSelector(state => state.viewModal);

  const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

  //agregar el badge a un icono con style
  const BadgedIconNoti = withBadge(1, {
    size: 10,
    badgeStyle: {
      backgroundColor: '#ce2828',
      borderRadius: 10,
      left: -8,
      top: -5,
    },
  })(Icon);

  const BadgedIconEcomer = withBadge(dataStorage ? dataStorage.length : 0, {
    size: 10,
    badgeStyle: {
      backgroundColor: '#ce2828',
      borderRadius: 10,
      left: -8,
      top: -5,
    },
  })(Icon);


  let iconData = dataStorage ? dataStorage.length > 0 : false

  // useEffect(() => {
  //   const foregroundSuscribe = messaging().onMessage(async (remoteMessage) => {
  //     console.log("notification: ", remoteMessage);
  //   }
  //   );

  //   // const topicSuscribe = messaging()
  //   // .subscribeToTopic('sisr')
  //   // .then(() => console.log('Subscribed to topic "sisr"'));

  //   const sendBackgroundMessage = async () => {
  //     await messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //       console.log("notification-Push: ", remoteMessage);
  //     }
  //     );
  //   }
    
  //   // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   //   console.log("background: ", remoteMessage);
  //   // });
    
  //   return () => {
  //     foregroundSuscribe();
  //     sendBackgroundMessage();
  //     // topicSuscribe();
  //     // backgroundSuscribe();
  //   }
  // }, []);

  useEffect(() => {
    getDataStorageCurrenOrder();
    getDataStorageUser();
  }, [refresh_Carrito]);

  useEffect(() => {
    if (dataStorageUser !== null) {
      setRefreshing(true);
      //Verifica si tiene una orden en curso=>Api
      getCurrentOrder(dataStorageUser)
        .then(res => {
          if (!res.message) {
            dispatch(setIcon(false));//actualiza icono TabBar Home, si hay orden en el carrito.Oculta el icono
            dispatch(setQrScaner(true));//verifica si scaneo el qr
            navigation.navigate("Menu", {
              id: res.venue_id,
            });
          } else {
            dispatch(setIcon(true));//actualiza icono TabBar Home, si no hay orden en el carrito.Muestra el icono
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      setRefreshing(false);
    }
  }, [dataStorageUser]);

  //obtiene el data del async storage
  const getDataStorageCurrenOrder = async () => {
    const value = await AsyncStorage.getItem('@addCarrito');//obtengo el data del async storage
    const valueJson = JSON.parse(value);//convierto el data a json
    setDataStorage(valueJson);//seteo el data en el state
  };

  //obtiene el data del async storage=> datos del usuario
  const getDataStorageUser = async () => {
    const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
    const valueJson = JSON.parse(value);//convierto el data a json
    setDataTokenUser(valueJson);//seteo el data del async storage
  };



  return (
    <View style={{ flex: 1, backgroundColor: "rgba(249,250,252,255)" }}>
      {/* <StatusBar backgroundColor="#E12D31" barStyle="light-content" /> */}
      <LinearGradient
        colors={["rgba(249,250,252,255)", "rgba(249,250,252,255)"]}
        style={stylesHome.viewContentTopHome}
      >

        <View style={{ justifyContent: 'flex-end', marginBottom: 10, flexDirection: 'row' }}>
          {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', right: 15 }}>

            <Icon
              //icono de ubicacion
              name="location-pin"
              size={30}
              color="rgba(115,115,115,255)"
            // style={{ marginRight: '90%' }}
            />
            <View>

              <Text style={stylesHome.titleHomeScreenRed}>Delivery</Text>
              <Text style={stylesHome.titleHomeScreenGray}>Asuncion, Paraguay</Text>
            </View>

            <TouchableOpacity>
              <Icon
                //icono de desplegar
                name="expand-more"
                size={30}
                color="rgba(115,115,115,255)"
                style={{ top: 10 }}
              />
            </TouchableOpacity>
          </View> */}

          {/* <TouchableOpacity>
            <View style={{ right: '50%' }}>
              {refreshing &&
                <>
                  {iconData ? <BadgedIconEcomer
                    type="ionicons"
                    name="shopping-cart"
                    color='rgba(115,115,115,255)'

                  /> :
                    <Icon
                      type="ionicons"
                      name="shopping-cart"
                      color='rgba(115,115,115,255)'
                    />}
                </>
              }
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity>
            {refreshing &&
              <>
                {false ? <BadgedIconNoti
                  type="material-community"
                  name="bell-outline"
                  color='rgba(115,115,115,255)'
                /> :
                  <Icon
                    name="bell-outline"
                    type="material-community"
                    color='rgba(115,115,115,255)'
                  />}
              </>
            }
          </TouchableOpacity>
        </View>

      </LinearGradient>



      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              console.log("refresh-scroll");
              dispatch(setRefresHome(true));
            }}
          />
        }
      >
        <Search />
        <Promociones />
        <Cercano_restaurants navigation={navigation} />
        <CategoriesRestaurants navigation={navigation} />
        <Todos_restaurants navigation={navigation} />
      </ScrollView>
      {stateViewModal ? <ModalScreen navigation={navigation} /> : null}
      {refresh_Filter && <Filter />}
    </View>
  );
}
export default Home_screen;