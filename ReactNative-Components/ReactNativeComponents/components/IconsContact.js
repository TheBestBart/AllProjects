import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class IconsContact extends React.Component{
    render() {
        return(
            <View style={styles.container2}>
                <IconComponentCounter data={this.props.data} size={this.props.size} color={this.props.color} actions={this.props.actions}/>
            </View>
        );
    }
}

const IconComponent = (props) => {
    return (
       <TouchableHighlight style={styles.iconComponent} onPress={props.action} underlayColor="white"> 
        <View style={styles.view}>
            <Ionicons name={props.name} size={props.size} color={props.color} style={{}} />
            <Text style={{ color: props.color, fontSize: 18 }}>{props.text}</Text>
        </View>
      </TouchableHighlight>  
    )
}
const IconComponentCounter = (props) => {
    const data = props.data;
    const component = data.map((d,index) =>
        <IconComponent key={ d.text.toUpperCase()} name={d.name} text={d.text} size={props.size} color={props.color} action={props.actions[index]}/>
    );
    return (component);
}

const styles = StyleSheet.create({
    container2: {
        justifyContent: 'center',
        flexDirection: 'row',
        height:80,

    },
    view:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    iconComponent: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor:'lightgray',
        borderWidth:0.25,
        paddingTop:10,
        paddingBottom:10,
    }

});
