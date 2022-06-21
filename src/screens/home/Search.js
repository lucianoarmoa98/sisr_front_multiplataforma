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
} from 'react-native';
import { Button, FAB, Icon, Input } from '@rneui/base';
import { stylesHome } from '../../styles/styles';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/actions/action';


const Search = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

  //abre modal de busqueda con filtro
  const openFilter = () => {
    dispatch(setFilter(true));
  }






  return (
    <View style={stylesHome.contentIpunt}>

      <View style={{ width: '85%' }}>
        <Input
          inputContainerStyle={stylesHome.input}
          placeholder="Buscar"
          leftIcon={
            // <TouchableOpacity>
              <Icon
                name="magnify"
                type="material-community"
                color="#c72c2c"
                size={24}
              />
            // </TouchableOpacity>
          }
        />
      </View>

      <View>
        <Button
          onPress={openFilter}
          icon={
            <Icon
              name="filter-variant"
              type="material-community"
              color="#737374"
              size={24}
            />
          }
          buttonStyle={{
            backgroundColor: "#fff",
            borderRadius: 10,
            borderColor: "#e4e5e6",
            borderWidth: 1,
            width: 58,
            height: 58,
          }}
        />
      </View>
    </View>
  );
}

export default Search;

