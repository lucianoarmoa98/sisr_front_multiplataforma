import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Stacks
// import MapaScreen from '../screens/Mapa/mapa_screen';

// Home Stack screens
// import CategoriesScreen from '../screens/Categories/categories';
// import RestaurantScreen from '../screens/Restaurant';

import Home_screen from '../screens/home/Home_screen';
//MapScreen
import OrdersScreen from '../screens/orders/Orders_screen';
//Profile Stack screen
import ProfileScreen from '../screens/Perfil/ProfileScreen';

import { Icon } from '@rneui/base';
import QrScreen from '../screens/Qr/Qr_screen';
import Menu from '../screens/menu/Menu';
import OrderDetails from '../screens/menu/OrderDetails';
import SplashScreenMesa from '../screens/splash/Splash_Screen_Mesa';
import { useDispatch, useSelector } from 'react-redux';
import MapsScreen from '../screens/map/MapsScreen';
import OrderTypePayment from '../screens/orders/OrderTypePayment';
import Pago from '../screens/orders/Pago';
import SplashJoinScreen from '../screens/splash/Splash_Join_Screen';
import { setViewModal } from '../redux/actions/action';
import CategoriesScreen from '../screens/categories/CategoriesScreen';



const HomeStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const MapsStack = createNativeStackNavigator();
const QRStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


const MainTabScreen = ({ navigation }) => {
  const refres_Splash = useSelector(state => state.splashScreen);//actualizar splash, al scanear qr
  const refresh_Icon = useSelector(state => state.isIcon);//actualiza el icono, segun si hay orden
  const stateToken = useSelector(state => state.token);//verifica si tiene token

  const dispatch = useDispatch();
  console.log('refresh_Icon', refresh_Icon);

  return (
    <Tab.Navigator
      // initialRouteName="HomeScreen" activeColor="#fff">
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          //console.log("route", route.name);
          if (route.name === 'Home') {
            return (
              <Icon
                type="ionicon"
                // reverse={focused}
                name={
                  focused
                    ? 'ios-home'
                    : 'ios-home'
                }
                size={focused ? 30 : size}
                containerStyle={{
                  zIndex: focused ? 1 : 0,
                  marginTop: focused ? -30 : 0,
                  borderWidth: focused ? 5 : 0,
                  borderColor: focused ? '#ffffff' : '#ffffff',
                }}
                iconStyle={{
                  padding: focused ? 8 : 0,
                  borderRadius: focused ? 50 : 0,
                  backgroundColor: focused ? '#d3282b' : '#ffffff',
                }}
                color={focused ? '#ffffff' : '#d3282b'}
              />
            );
          } else if (route.name === 'Qr') {
            return (
              <Icon
                name={
                  focused
                    ? 'qr-code'
                    : 'qr-code'
                }
                // reverse={focused}
                size={focused ? 30 : size}
                containerStyle={{
                  zIndex: focused ? 1 : 0,
                  marginTop: focused ? -30 : 0,
                  borderWidth: focused ? 5 : 0,
                  borderColor: focused ? '#ffffff' : '#ffffff',

                }}
                iconStyle={{
                  padding: focused ? 8 : 0,
                  borderRadius: focused ? 50 : 0,
                  backgroundColor: focused ? '#d3282b' : '#ffffff',
                }}
                color={focused ? '#ffffff' : '#d3282b'}
              />
            );
          } else if (route.name === 'Maps') {
            return (
              <Icon
                // reverse={focused}
                name={
                  focused
                    ? 'map'
                    : 'map'
                }
                size={focused ? 30 : size}
                containerStyle={{
                  zIndex: focused ? 1 : 0,
                  marginTop: focused ? -30 : 0,
                  borderWidth: focused ? 5 : 0,
                  borderColor: focused ? '#ffffff' : '#ffffff',
                }}
                iconStyle={{
                  padding: focused ? 8 : 0,
                  borderRadius: focused ? 50 : 0,
                  backgroundColor: focused ? '#d3282b' : '#ffffff',
                }}
                color={focused ? '#ffffff' : '#d3282b'}
              />
            );
          } else if (route.name === 'Orders') {
            return (
              <Icon
                // reverse={focused}
                name={
                  focused
                    ? 'shopping-bag'
                    : 'shopping-bag'
                }
                size={focused ? 30 : size}
                containerStyle={{
                  zIndex: focused ? 1 : 0,
                  marginTop: focused ? -30 : 0,
                  borderWidth: focused ? 5 : 0,
                  borderColor: focused ? '#ffffff' : '#ffffff',
                }}
                iconStyle={{
                  padding: focused ? 8 : 0,
                  borderRadius: focused ? 50 : 0,
                  backgroundColor: focused ? '#d3282b' : '#ffffff',
                }}
                color={focused ? '#ffffff' : '#d3282b'}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Icon
                name={
                  focused
                    ? 'person'
                    : 'person'
                }
                // reverse={focused}
                size={focused ? 30 : size}
                containerStyle={{
                  zIndex: focused ? 1 : 0,
                  marginTop: focused ? -30 : 0,
                  borderWidth: focused ? 5 : 0,
                  borderColor: focused ? '#ffffff' : '#ffffff',
                }}
                iconStyle={{
                  padding: focused ? 8 : 0,
                  borderRadius: focused ? 50 : 0,
                  backgroundColor: focused ? '#d3282b' : '#ffffff',
                }}
                color={focused ? '#ffffff' : '#d3282b'}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          display: refres_Splash ? 'flex' : 'none',//oculta el tabbar, al scanear la mesa
          height: 60,
        },
        tabBarShowLabel: true,

      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: 'Inicio',
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          // tabBarItemStyle: {
          //   display: refresh_Icon ? 'flex' : 'none',//oculta el tabbar, al scanear la mesa
          // }

        })}

      />
      <Tab.Screen
        name="Qr"
        component={QRStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarItemStyle: {
            display: refresh_Icon ? 'flex' : 'none',//oculta el tabbar, al scanear la mesa
          }
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (stateToken) {
              e.preventDefault()
              navigation.navigate('Qr');
            } else {
              e.preventDefault()
              dispatch(setViewModal(true))
            }
          }
        })}
      />
      <Tab.Screen
        name="Maps"
        component={MapsStackScreen}
        options={{
          tabBarShowLabel: false,
          //elavar icono al presionar
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarItemStyle: {
            display: refresh_Icon ? 'flex' : 'none',//oculta el tabbar, al scanear la mesa
          }
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (stateToken) {
              e.preventDefault()
              navigation.navigate('Orders');
            } else {
              e.preventDefault()
              dispatch(setViewModal(true))
            }
          }
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Perfil',
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (stateToken) {
              e.preventDefault()
              navigation.navigate('Profile');
            } else {
              e.preventDefault()
              dispatch(setViewModal(true))
            }
          }
        })}
      />
    </Tab.Navigator>
  )
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#E12D31',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home-Principal"
      component={Home_screen}
      options={({ route }) => ({
        headerShown: false,
      })}
    />
    <HomeStack.Screen
      name="Menu"
      component={Menu}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="Order-Details"
      component={OrderDetails}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="CategoriesScreen"
      component={CategoriesScreen}
      options={{
        headerShown: false,
      }}
    />
    {/* <HomeStack.Screen
      name="RestaurantBeverage"
      component={RestaurantBeverageScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="RestaurantMap"
      component={RestaurantMapScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="Product"
      component={ProductScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="ProductGroup"
      component={ProductGroupScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="Order"
      component={OrderScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="Finished"
      component={FinishedScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <HomeStack.Screen
      name="CategoriesRestaurant"
      component={CategoriesRestaurantsScreen}
      options={{
        headerShown: false,
      }}
    /> */}
  </HomeStack.Navigator>
);

const OrdersStackScreen = ({ navogation }) => (
  <OrdersStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#E12D31',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <OrdersStack.Screen
      name="Order"
      component={OrdersScreen}
      options={{ headerShown: false }}
    />
    <OrdersStack.Screen
      name="OrderTypePay"
      component={OrderTypePayment}
      options={{ headerShown: false }}
    />
    <OrdersStack.Screen
      name="OrderPago"
      component={Pago}
      options={{ headerShown: false }}
    />
  </OrdersStack.Navigator>
);

const MapsStackScreen = ({ navogation }) => (
  <MapsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#E12D31',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <MapsStack.Screen
      name="Map"
      component={MapsScreen}
      options={{ headerShown: false }}
    />
    <MapsStack.Screen
      name="Map-Menu"
      component={Menu}
      options={{ headerShown: false }}
    />
    <MapsStack.Screen
      name="Map-Order-Details"
      component={OrderDetails}
      options={{ headerShown: false }}
    />
  </MapsStack.Navigator>
);

const QRStackScreen = ({ navigation }) => (
  <QRStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#E12D31',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <QRStack.Screen
      name="InitiQr"
      component={QrScreen}
      options={{
        headerShown: false,
      }}
    />
    <QRStack.Screen
      name="QRConfirmation"
      component={SplashScreenMesa}
      options={{
        headerShown: false,
      }}
    />
    <QRStack.Screen
      name="Join"
      component={SplashJoinScreen}
      options={{
        headerShown: false,
      }}
    />
  </QRStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#E12D31',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    {/* <ProfileStack.Screen
      name="ProfileEdit"
      component={ProfileEditScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfileFavorite"
      component={ProfileFavScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfileHistory"
      component={ProfileHistoryScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfileTerms"
      component={ProfileTermsScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfileConfig"
      component={ProfileConfigScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="RegistrationData"
      component={RegistrationDataScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfileNosotros"
      component={ProfileNosotrosScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfilePrivacidad"
      component={ProfilePrivacidadScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    {/* <ProfileStack.Screen
      name="ProfileContactanos"
      component={ProfileContactanosScreen}
      options={{
        headerShown: false,
      }}
    /> */}
  </ProfileStack.Navigator>
);
