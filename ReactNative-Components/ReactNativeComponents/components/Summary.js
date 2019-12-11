import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Summary extends React.Component {

    render() {
        const { price, delivery, discount, totalPrice } =  this.props;
        const has = Object.prototype.hasOwnProperty;
        const isNotNull = (has.call(this.props, 'discount') && discount !== null);

        return(
            <View style={styles.container}>
                 <View style={ styles.summary }><Text style={ styles.text }>Podsumowanie</Text></View>
                 <View style={ styles.view }>
                     <Text>Cena</Text>
                     <Text>{ price }</Text>
                 </View>
                 <View style={ styles.view }>
                      <Text>Dostawa</Text>
                      <Text>{ delivery }</Text>
                 </View>
                { isNotNull && <DiscountView discount={ discount } styleInfo={ styles.view } />  }
                 <View style={ styles.totalSummary }>
                      <Text style={ styles.text }>ŁĄCZNA KWOTA</Text>
                      <Text style={ styles.text }>{ totalPrice }</Text>
                 </View>
            </View>
        )
    }
}

function DiscountView(props) {
    const { styleInfo, discount } =  props;
    return (
        <View style={ styleInfo }>
            <Text>Wartość rabatów</Text>
            <Text style={ { color: 'red' } }>{ discount }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'rgb(230, 224, 224)',
        borderRadius: 10,
    },
    summary: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        marginLeft: 15,
        fontSize: 22,
    },
    view: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
        borderBottomColor: 'rgb(175, 171, 171)',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        height: 36,
    },
    totalSummary: {
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
        fontSize: 22,
        flexDirection: 'row',
        height: 36,
    },
    text: {
        fontWeight: 'bold',
    }
});

// props = {
//      price, - cena za przedmioty
//      delivery, -  cena przesylki
//      discount, -  wysokosc rabatu
//      totalPrice - suma calkowita kosztow
// }
