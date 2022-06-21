import React, { useEffect, useRef, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import RootStackScreen from "./navegation/RootStackScreen";
import MainTabScreen from "./navegation/MainTabScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "./redux/actions/action";



export const MyApp = () => {
  const [dataToken, setDataToken] = useState(null);

  const stateToken = useSelector(state => state.token);
  // console.log("stateToken", stateToken);

  const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

  //obtengo el data del async storage
  useEffect(() => {
    getDataStorage();
  }, [stateToken]);//se actualiza al editar el perfil del usuario

  useEffect(() => {

    if (dataToken !== null) {
      // console.log("tiene token");
      dispatch(setToken(true));
    } else {
      // console.log("esta vacio");
      dispatch(setToken(false));
    }

  }, [dataToken]);





  //obtiene el data del async storage
  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem('@dataStorage');//obtengo el data del async storage
    const valueJson = JSON.parse(value);//convierto el data a json
    setDataToken(valueJson);//seteo el data del async storage
  };


  return (
    <>
      {stateToken ? <MainTabScreen />
        :
        <RootStackScreen />
      }
    </>

  );
};