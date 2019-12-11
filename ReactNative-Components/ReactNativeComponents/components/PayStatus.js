import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default class PayStatus extends React.Component
{

    render() {
        let { name, color, size,  text } = this.props;

        return (
            <View style={ styles.container }>
                <View style={ styles.icon }>
                    <Ionicons
                        name = { name }
                        color = { color }
                        size = { size }
                    />
                </View>
                <View style={ styles.text }><Text style={ { fontSize: 20 }}>{ text }</Text></View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: 100,
    },
    text: {
        flex: 4,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black',
        justifyContent: 'center',
    },
    icon: {
        flex: 2,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 24,
    },
});

// props ={
//     name,
//     color,
//     size,
//     text,
// }
