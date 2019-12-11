import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';



export default class OrderStatus extends React.Component 
{
    static propTypes = {
        orderNumber: PropTypes.number,
        orderStatus: PropTypes.string,
    }
    
    render() {
        let { orderNumber, orderStatus } = this.props

        return(
                <View style={ styles.container }>
                    <View style={ styles.view }>
                        <Text style={ styles.numerText }>
                            Numer zamówienia
                        </Text>
                        <Text style={ styles.number }>
                            { orderNumber }
                        </Text>
                    </View>
                    <View style={ styles.view }>
                        <Text style={ styles.statusText } >
                           Status zamówienia
                        </Text>
                        <Text style={ styles.status }>
                            { orderStatus }
                        </Text>
                    </View>
                </View>
            );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    view: {
        flex: 1,
        flexDirection: 'column',
    },
    numerText: {
        textAlign: 'left',
        paddingLeft: 10,
        fontSize: 15
    },
    statusText: {
        textAlign:'right',
        paddingRight:10,
        fontSize:15,
    },
    number: {
        textAlign: 'left',
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 17
    },
    status: {
        textAlign: 'right',
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 17
    }
});