import React, { useEffect, useState } from "react";
import { Icon, Input, Text, Button, withBadge, ButtonGroup } from "@rneui/base";
import { Dimensions, FlatList, ImageBackground, Modal, Platform, RefreshControl, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setViewModal } from "../../redux/actions/action";
import { stylesModal } from "../../styles/styles";


const ModalScreen = ({ navigation }) => {
    const [selectIndexOpcion, setSelectIndexOpcion] = useState(0);;//seleccionar el index del boton
    const dispatch = useDispatch();//dispatch para llamar a las acciones => setea el estado a redux

    const stateViewModal = useSelector(state => state.viewModal);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={stateViewModal}
            >
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={stylesModal.titleModal}>Para continuar, Iniciar sesión</Text>
                        </View>


                        <ButtonGroup
                            onPress={(value) => {
                                // console.log("buton", value);
                                if (value === 0) {
                                    setSelectIndexOpcion(value);
                                    setTimeout(() => {
                                        dispatch(setViewModal(false));
                                        navigation.navigate('SignInScreen');
                                    }, 10);

                                } else {
                                    setSelectIndexOpcion(value);
                                    setTimeout(() => {
                                        dispatch(setViewModal(false))
                                    }, 10);
                                }
                            }}
                            vertical={true}
                            buttons={['Aceptar', 'Cancelar']}//comente=> se usara mas adelante
                            selectedIndex={selectIndexOpcion}
                            containerStyle={{ borderRadius: 10, marginTop: 40 }}
                            buttonContainerStyle={stylesModal.buttonStyle}
                            selectedButtonStyle={{
                                backgroundColor: '#ce2828',
                                borderRadius: 10,
                            }}
                            //selectedTextStyle={stylesOrders.textColorSelect}
                            //textStyle={stylesOrders.titleStyleButtonOpcion}
                            innerBorderStyle={{
                                width: 0,
                                color: 'transparent',
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default ModalScreen;