import { Dimensions, Platform, StyleSheet } from "react-native";
const { height, width } = Dimensions.get('window');

export const stylesLogin = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        // backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 12,
        marginLeft: 10,
        color: '#fffeff'

    },
    input: {
        // width: '90%',
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 15,
        height: 60,
        borderWidth: 1,
        borderColor: '#e4e5e5',
        borderRightWidth: 1,

    },
    //centrar container
    containerView: {
        // marginTop: '10%',
        marginTop: Platform.OS === 'ios' ? '20%': '10%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    container: {
        alignSelf: 'center',
        width: '100%',
    },
    buttonStyle: {
        backgroundColor: 'rgb(206, 40, 41)',
        borderRadius: 15,
        height: 65,
        // width: '90%',
        // marginBottom: '8%',
    },
    buttonCenter: {
        //centrar boton
        alignSelf: 'center',
        width: '95%',
        // marginLeft: '3%',
        // marginRight: '3%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    textColor: {
        color: 'rgb(206, 40, 41)',
        marginLeft: '4%',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
    textCenter: {
        textAlign: 'center',
        // fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(206, 40, 41)',
        marginTop: '5%',
    },
    textTitle: {
        // marginLeft: '5%',
        marginBottom: '5%',
    }

});

//----------------stylesHome----------------
export const stylesHome = StyleSheet.create({
    titlePrincipalRestauranst: {
        fontSize: 18,
        marginBottom: 12,
        marginTop: 10,
    },
    viewContentTopHome: {
        paddingTop: Platform.OS === 'ios' ? 65 : 35,
        paddingHorizontal: 30,
        width: width
    },
    viewContentDimensions: {
        shadowOpacity: 0,
        position: "absolute",
        // marginTop: height > 700 ? '75%' : '40%',
        marginTop: Platform.OS === 'ios' ? '90%' : height > 700 ? '75%' : '40%',
        width: '100%',
        height: '100%'
    },
    titleHomeScreenRed: {
        color: '#b93233',
        fontSize: 13,
        marginLeft: 5
    },
    titleHomeScreenGray: {
        color: '#838484',
        fontSize: 13,
        marginLeft: 5
    },
    footer: {
        // flex: 4,
        backgroundColor: '#fff',
        borderColor: '#e4e5e5',
        borderWidth: 1,
        //eliminar el borde de abajo
        borderBottomWidth: 0,
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // borderRadius: 30,
        paddingHorizontal: 3,
        paddingVertical: 1,
        zIndex: 1,
        // marginBottom: '5%',
    },
    input: {
        // width: '80%',
        backgroundColor: 'white',
        // textAlign: 'center',
        paddingLeft: '5%',
        borderRadius: 15,
        height: 58,
        borderWidth: 1,
        borderColor: '#e4e5e6',
        borderRightWidth: 1,

    },
    contentIpunt: {
        marginTop: '5%',
        width: '90%',
        //poner de forma horizontal
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: '5%',
        marginRight: '5%',

    },
    textStyle: {
        fontSize: 20,
        // fontWeight: 'bold',
        // color: 'rgb(206, 40, 41)',
        marginTop: '5%',
        marginLeft: '5%',
    },
    cardCategory: {
        borderRadius: 8,
        // width: '90%',
    },
    buttonContent: {
        //poner ambos botones de forma horizontal
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10%',
        marginLeft: '5%',
        marginRight: '5%',
        // alignSelf: 'center',
    },
    styleCancel: {
        color: 'rgb(206, 40, 41)',
        marginLeft: '20%',
        marginTop: '5%',
        fontSize: 20,
        // fontWeight: 'bold',
    },
    buttonStyleAplicar: {
        backgroundColor: 'rgb(206, 40, 41)',
        borderRadius: 10,
        height: 50,
        marginBottom: '8%',
        marginLeft: '5%',
    },
    contentIcon: {
        //poner ambos botones de forma horizontal
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: '2%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    cardDescStyle: {
        borderRadius: 10,
        backgroundColor: '#ce2828',
        borderColor: '#fff',
        borderWidth: 0,
        padding: 10,
        margin: 0,
    },
    cardIconReaccion: {
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 10,
        margin: 0,
    },
    imgBackground: {
        height: 150,
        width: width * 0.9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    imgPie: {
        padding: 6,
        width: width * 0.9,
        borderColor: '#EEE',
        borderTopWidth: 0,
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFF',
    },
    textPieImg: {
        //poner ambos textos de forma horizontal
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
    },
    textName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    titleAddress: {
        color: '#5f5f5f',
        marginRight: '10%',
        alignSelf: 'center',
    },
    contentText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginTop: 10,
        marginBottom: 10
    },
    styleOpen: {
        color: '#197b5f',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

//----------------stylesProfile----------------
export const stylesProfile = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 15,
        marginLeft: 10,
        color: '#fffeff'

    },
    contentList: {
        //poner ambos botones de forma horizontal
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10%',
        marginLeft: '5%',
    },
    textStyle: {
        fontSize: 20,
        marginTop: '5%',
        marginLeft: '5%',
    },
    contentBtnSesion: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    btnStyle: {
        backgroundColor: '#E12D31',
        width: 200,
        height: 100,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    textColor: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 15,
        height: 60,
        borderWidth: 1,
        borderColor: '#e4e5e5',
        borderRightWidth: 1,

    },
    inputDisabled: {
        // width: '90%',
        backgroundColor: '#e8ecef',
        textAlign: 'center',
        borderRadius: 15,
        height: 60,
        borderWidth: 1,
        borderColor: '#e4e5e5',
        borderRightWidth: 1,

    },
    btnUpdate: {
        backgroundColor: 'rgba(249,250,252,255)',
        width: '100%',
        height: Platform.OS === 'ios' ? 70 : height > 700 ? 70 : 40,
        borderRadius: 10,
    },
    btnUpdateOpcion: {
        backgroundColor: 'rgba(249,250,252,255)',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    textColorSelect: {
        color: '#fffdfd',
        fontWeight: 'bold',
    },
    titleStyleButton: {
        color: '#b93234',
        fontWeight: 'bold',
    },
    titleStyleButtonOpcion: {
        color: '#5f5f5f',
        fontWeight: 'bold',
    },
});

//----------------stylesQr----------------
export const stylesQr = StyleSheet.create({
    contentView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    containerImage: {
        flex: 1,
        backgroundColor: '#E12D31',
    },
    btnCancel: {
        backgroundColor: '#E12D31',
        width: 200,
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 20,
    },
    contentBtnQr: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    btnQrSesion: {
        backgroundColor: '#E12D31',
        width: 200,
        height: 100,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    btnQrScaner: {
        backgroundColor: '#ffffff',
        width: 150,
        height: 80,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    textColor: {
        color: '#fff',
        fontSize: 20,
    },
    header: {
        flex: 2,
        // justifyContent: 'center',
        top: 80,
        alignItems: 'center',
    },
    logo: {
        width: 500,
        height: 220,
        marginBottom: 20,
    },
    text: {
        color: '#fffafa',
        // marginTop: 5,
        fontSize: 28,
        marginTop: 20,
    },
    titleDos: {
        color: '#fffafa',
        // marginTop: 5,
        fontSize: 18,
        marginTop: 20,
    },
});

//----------------stylesOrderDetails----------------
export const stylesOrderDetails = StyleSheet.create({
    viewContentBack: {
        backgroundColor: 'rgba(206,40,40,255)', 
        borderRadius: 10, 
        width: 40, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#cc2827',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 15,
        marginLeft: 10,
        color: '#fffeff'

    },
    contentViewHeader: {
        // paddingTop: 35,
        paddingTop: Platform.OS === 'ios' ? 65 : 35,
        opacity: 0.9,
        paddingHorizontal: 30,
        width: width
    },
    contentIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        right: '50%',
    },
    imgStyles: {
        height: 320,
        width: 320,
        overflow: 'hidden',
        // resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    contentButton: {
        left: '60%',
        // top: -15,
        top: Platform.OS === 'ios' ? -20 : -15,
        position: 'absolute'
    },
    contentInput: {
        top: 20,
        marginBottom: 10
    },
    inputStyles: {
        backgroundColor: 'white',
        paddingLeft: '2%',
        borderRadius: 15,
        height: 100,
        top: 10,
        borderWidth: 1,
        borderColor: '#e4e5e6',
        borderRightWidth: 1,
    },
    textInstructions: {
        color: '#5f5f5f',
        top: '5%'
    },
    contentTextInstructions: {
        marginLeft: '5%',
        top: 20
    },
    addContent: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(206,40,40,255)'
    },
    viewButtonAdd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    iconAdd: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e95e5f',
        padding: 15
    },
    textMonto: {
        color: '#fea9aa',
        fontSize: 18
    },
    textPrecie: {
        color: '#fffefd',
        fontSize: 25
    },
    textTitleDetails: {
        fontSize: 20,
        marginBottom: '5%'
    },
    titleDescription: {
        color: '#5f5f5f',
        top: '5%'
    },
    titleName: {
        fontSize: 20,
    },
    viewTitleContent: {
        alignSelf: 'center',
        top: -35,
        // width: 250
    }

});

//----------------stylesOrders----------------
export const stylesOrders = StyleSheet.create({
    textStatus: {
        color: '#b5393c',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '5%',
    },
    textCache: {
        color: '#b5393c',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '20%',
    },
    imgStyle: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    textTitle: {
        fontSize: 20,

    },
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 15,
        marginLeft: 10,
        color: '#fffeff'

    },
    contentList: {
        //poner ambos botones de forma horizontal
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10%',
        marginLeft: '5%',
    },
    textStyle: {
        fontSize: 20,
        marginTop: '5%',
        marginLeft: '5%',
    },
    contentBtnSesion: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    btnStyle: {
        backgroundColor: '#E12D31',
        width: 200,
        height: 100,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    textColor: {
        color: '#fff',
        fontSize: 20,
    },
    btnUpdateOpcion: {
        backgroundColor: 'rgba(249,250,252,255)',
        width: '100%',
        height: 50,
        borderRadius: 10,
    },
    textColorSelect: {
        color: '#fffdfd',
        fontWeight: 'bold',
    },
    titleStyleButton: {
        color: '#b93234',
        fontWeight: 'bold',
    },
    titleStyleButtonOpcion: {
        color: '#5f5f5f',
        fontWeight: 'bold',
    },
    contentViewMonto: {
        backgroundColor: '#ce2828',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: "absolute",
        width: '100%',
        height: '100%',
    },
    contentViewText: {
        color: '#fda7a4',
        marginLeft: '5%',
        marginTop: '5%',
    },
    contentViewTextTotal: {
        color: '#ffe0e3',
        fontSize: 20,
        marginLeft: '5%',
        marginTop: '5%',
    },
    contentViewBtnMonto: {
        marginTop: '5%',
    },
    btnEnviarPedido: {
        borderRadius: 10,
        width: '90%',
        height: 60,
        alignSelf: 'center',
        marginTop: '5%',
        // alignItems: 'center',
    },
    dividerStyle: {
        backgroundColor: '#ea8381',
        marginTop: '10%',
        width: '90%',
        alignSelf: 'center',
        //agregar al border un dashed
        // borderStyle: 'dashed',
    },
    contentTextMonto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        top: 10
    },
    textColorTodo: {
        color: 'rgba(95,95,95,255)' 
    }

});

//----------------stylesMaps----------------
export const stylesMaps = StyleSheet.create({
    contentUber: {
        position: 'absolute',
        left: '70%',
        // marginTop: 15,
        marginTop: Platform.OS === 'ios' ? 35 : 15,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 60
    },
    viewUber: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    textUber: {
        fontSize: 20,
        padding: 5,
        alignSelf: 'center'
    },
    scrollViewStyle: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 5,
    },
    scrollImgView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10
    },
    openStyle: {
        color: '#197b5f',
        fontSize: 15,
        fontWeight: 'bold',
    },
    addressStyle: {
        color: '#5f5f5f',
        marginLeft: '5%'
    },
    loadingScreen: {
        marginLeft: 10,
        borderRadius: 8,
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 5,
    },
    imgBackground: {
        height: 150,
        width: width * 0.9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    imgPie: {
        padding: 6,
        width: width * 0.9,
        borderColor: '#EEE',
        borderTopWidth: 0,
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFF',
    },
    textPieImg: {
        //poner ambos textos de forma horizontal
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
    },
    textName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(247,0,56, 0.1)',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(247,0,56, 0.5)',
    },
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: 'rgba(130,4,150, 1)',
    },
});

//----------------stylesMenu----------------
export const stylesMenu = StyleSheet.create({
    cardDescStyle: {
        borderRadius: 10,
        backgroundColor: '#ce2828',
        borderColor: '#fff',
        borderWidth: 0,
        padding: 10,
        margin: 0,
        marginTop: -10,
        width: '80%',
        alignSelf: 'center',
    },
    titleStyleCode: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
    },
    contentImgPromotion: {
        height: 130,
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
    contentViewImgPromotion: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10
    },
    modalViewNotifi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centerViewNotifi: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    textTitleModalNotific: {
        fontSize: 15,
        marginLeft: 10,
        color: '#fffeff'

    },
    buttonStyle: {
        height: 60,
    },
    textName: {
        fontSize: 20,
        alignSelf: 'center',
        marginRight: 'auto',
        color: '#727373',
    },
    textHorarios: {
        color: '#727373',
    },
    subTitle: {
        fontSize: 15,
        color: '#727373',
        alignSelf: 'center',
        marginRight: 'auto'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // width: '100%',
        // height: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        width: '95%',
        // height: null,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    styleGradient: {
        // paddingTop: 35,
        paddingTop: Platform.OS === 'ios' ? 65 : 35,
        opacity: 0.9,
        // paddingHorizontal: 30,
        width: width,
        height: 270
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        right: '50%',
        zIndex: Platform.OS === 'ios' ? 0 : 1,
    },
    iconContent: {
        backgroundColor: '#cc2a28',
        width: 40,
        borderRadius: 8,
        marginLeft: 15,
        // margin: 5,
    },
    imgBanner: {
        height: 280,
        // width: width * 0.9,
        width: '100%',
        overflow: 'hidden',
        opacity: 0.3,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: '-20%',
        zIndex: Platform.OS === 'ios' ? -1 : 0,
    },
    imgAvatar: {
        height: 80,
        width: 80,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'contain'
    },
    contentImgAvatarView: {
        // top: '62%',
        top: Platform.OS === 'ios' ? '62%' : '55%',
        right: '3%',
        zIndex: 1,
        position: 'absolute'
    },
    contentList: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        top: -10,
        backgroundColor: '#f9fafc'
    },
    contentScroll: {
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '5%'
    },
    contentText: {
        marginRight: '12%',
        width: '60%',
        top: '2%'
    },
    textViewPosition: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        // height: 100,
        marginLeft: '1%',
        marginRight: '1%',
    },
    positionItem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        top: 10
    },
    imgCard: {
        borderRadius: 10,
        resizeMode: 'contain',
        width: 60,
        height: 60,
        marginLeft: '7%',
    },
    imgCardPromotion: {
        borderRadius: 10,
        resizeMode: 'contain',
        width: 60,
        height: 60,
    },
    contentPromotion: {
        marginLeft: '7%',
    },
    contentTextCard: {
        marginRight: 'auto',
        left: 3
    },
    titleCard: {
        left: 5,
        // fontSize: 15,
        fontWeight: 'bold',
        width: '95%'
    },
    titleCardPromotion: {
        left: 5,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'rgba(255,235,231,255)',
        width: 60
    },
    viewPromotion: {
        backgroundColor: '#cf2829',
        // transform: [{ rotate: "-55deg" }],
        marginTop: 8,
        // right: 25,
        // borderRadius: 10,
        borderBottomRightRadius: 10,
        borderTopEndRadius: 10,
        width: 69,
        marginBottom: 5,
        left: 5,
    },
    titleSecundaryCard: {
        left: 5,
        fontSize: 12,
        color: '#606060'
    },
    titlePriceCard: {
        left: 5,
        fontSize: 15,
        marginBottom: 15
        // color: '#a83e42',
    },
    titlePriceCardPromotion: {
        left: 5,
        fontSize: 15,
        color: '#a83e42',
    },
    contentBotonSiguiente: {
        borderRadius: 50,
        backgroundColor: '#cf2925',
        padding: 5,
        width: 50,
        height: 50,
        top: 15,
        marginRight: 10
    },
    headerTitle: {
        alignSelf: 'center',
        margin: 10
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        paddingLeft: Platform.OS === 'ios' ? 10 : 4,
        borderRadius: 15,
        height: 150,
        borderWidth: 1,
        borderColor: '#e4e5e5',
        borderRightWidth: 1,
        marginBottom: 10,
    },
});

//----------------stylesOrderTypePayment----------------
export const stylesOrderTypePayment = StyleSheet.create({
    textTitle: {
        fontSize: 20,
        color: '#626464'
    },
    textCheck: {
        color: '#626464'
    },
    containetCheck: {
        height: 60,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f9fafc'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2b2b2b'
    },
    containerText: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    containerButton: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#ce2828'
    },
    viewButtonContent: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 30
    },
    viewCheckContent: {
        alignSelf: 'center',
        width: '95%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

//----------------stylesPago----------------
export const stylesPago = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        // backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 15,
        marginLeft: 10,
        color: '#fffeff'

    },
    input: {
        width: '95%',
        backgroundColor: 'white',
        paddingLeft: 10,
        textAlign: 'center',
        borderRadius: 15,
        height: 60,
        borderWidth: 1,
        borderColor: '#e4e5e5',
        borderRightWidth: 1,
        alignSelf: 'center',

    },
    textTitle: {
        marginLeft: '5%',
        marginBottom: 5,
        fontSize: 15,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginBottom: 20
    },
    containerText: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    viewButtonContent: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 30,
        marginBottom: 30
    },
    containerButton: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#ce2828'
    },
    containetCheck: {
        height: 60,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f9fafc'
    },
    textCheck: {
        color: '#626464'
    },
    viewCheckContent: {
        alignSelf: 'center',
        width: '95%'
    }
});

//----------------stylesPago----------------
export const stylesJoinScreen = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textTitleModal: {
        fontSize: 15,
        marginLeft: 10,
        color: '#fffeff'

    },
    contentText: {
        marginTop: '30%',
        marginLeft: '5%',
    },
    inputContainer: {
        width: 70,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 70,
        borderWidth: 1,
        borderColor: '#e4e5e5',
        borderRightWidth: 1,
        alignSelf: 'center',
    },
    inputText: {
        color: '#ce2828',
        fontWeight: 'bold',
        fontSize: 30
    },
    contentInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: 35,
    },
    titlePrincipal: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginBottom: 20
    },
    titleSecundary: {
        fontSize: 18,
        marginBottom: 20
    },
    textTitle: {
        marginLeft: '5%',
        marginBottom: 5,
        fontSize: 15,
    },
    viewContentIcon: {
        backgroundColor: '#ce2828',
        width: 80,
        height: 60,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 80,
    },
    iconStyle: {
        padding: 12,
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginBottom: 20
    },
});

//----------------stylesModal----------------
export const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        height: '50%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: '90%',
        height: '40%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleModal: {
        fontSize: 20,
        color: '#737373'
    },
    buttonStyle: {
        height: 60,
    }
});

//----------------stylesCategoriesScreen----------------
export const stylesCategoriesScreen = StyleSheet.create({
    viewContentBack:{
        backgroundColor: 'rgba(206,40,40,255)', 
        borderRadius: 10, 
        width: 40, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    contentCategories: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    contentImgCategories: {
        height: 40,
        width: 40,
        borderRadius: 10,
        overflow: 'hidden',
    },
    viewContentHeader: {
        paddingTop: Platform.OS === 'ios' ? 65 : 35,
        paddingHorizontal: 30,
        width: width
    },
    titlePrimary: {
        marginLeft: '5%',
        marginTop: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    titleSecundary: {
        marginLeft: '5%',
        marginTop: 20,
        fontSize: 18,
    },
    imgBackground: {
        height: 150,
        width: width * 0.9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    contentIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: '2%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    cardDescStyle: {
        borderRadius: 10,
        backgroundColor: '#ce2828',
        borderColor: '#fff',
        borderWidth: 0,
        padding: 10,
        margin: 0,
    },
    cardIconReaccion: {
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 0,
        padding: 10,
        margin: 0,
    },
    imgPie: {
        padding: 6,
        width: width * 0.9,
        borderColor: '#EEE',
        borderTopWidth: 0,
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#FFF',
    },
    textPieImg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
    },
    textName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    contentText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginTop: 10,
        marginBottom: 10
    },
    titleAddress: {
        color: '#5f5f5f',
        marginRight: '10%',
        alignSelf: 'center',
    },
});

//----------------stylesCategoriesRestaurants----------------
export const stylesCategoriesRestaurants = StyleSheet.create({
    contentCategories: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    contentImgCategories: {
        height: 40,
        width: 40,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
