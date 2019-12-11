import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class MyPurchase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            name: props.nameUp,
        };
        this.onPress = this.onPress.bind(this);
    }

    static propTypes = {
        onPress: PropTypes.func.isRequired,
        name: PropTypes.string,
        orderDate: PropTypes.string,
        orderNumber: PropTypes.number,
        orderStatus: PropTypes.string,
    }

    onPress() {
        let { isShown } = this.state;
        let { nameUp, nameDown } = this.props;

        !isShown
            ? this.setState({ isShown: true, name: nameUp })
            : this.setState({ isShown:false, name: nameDown });
    }

    render() {
        let { isShown, name } = this.state;
        let { orderDate, orderNumber, orderStatus, component} = this.props;

        return (
            <View>
                <MainComponent
                    onPress={ this.onPress }
                    name={ name }
                    orderDate={ orderDate }
                    orderNumber={ orderNumber }
                    orderStatus={ orderStatus }
                />
                { isShown && component }
            </View>
        )
    }
}

function MainComponent(props) {
    let { onPress, name, orderDate, orderNumber, orderStatus } = props;

    return (

        <View style={ styles.container }>
            <View style={ styles.view }>
                <Text style={ styles.number }>
                    { orderNumber }
                </Text>
                <Ionicons
                    name={ name }
                    color='black'
                    size={ 18 }
                    onPress={ onPress }
                    style={ styles.icon }
                />
            </View>
            <View style={ styles.view }>
                <Text style={ styles.date }>
                    { orderDate }
                </Text>
                <Text style={ styles.status }>
                    { orderStatus }
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height:50,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        paddingRight:10,
        flex:1,
        textAlign:'right',
    },
    status: {
        textAlign:'right',
        paddingRight:10,
        flex:1,
        fontSize: 15  
    },
    number: {
        textAlign:'left',
        paddingLeft:10,
        fontWeight:'bold',
        fontSize:18,
        flex:1,
        
    },
    date: {
        textAlign:'left',
        paddingLeft:10,
        flex:1,
        fontSize:15
    }
});

// propsy = {
//     orderDate,  - data zamowienia
//     orderNumber, - id lub numer zamowienia
//     orderStatus, - status zamowienia
//     component, -  komponent ktory ma sie pojawic po nacisnieciu ikonki
//     nameUp, - nazwa ikonki przed nacisnieciem
//     nameDown - nazwa ikonki po nacisnieciu
// }