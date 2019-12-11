import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class YourDiscount extends React.Component
{
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        onClick: PropTypes.func,
        onAdd: PropTypes.func,
    }

    render(){
       
        let { data, onClick, onAdd } = this.props;
        return(
            <View style={styles.container}>
                <DiscountViewCounter data={data} onClick={onClick}/>
                <FirstView onAdd = {onAdd}/>
            </View>
        )
    }
}
const FirstView = (props) => {
    return(
        <TouchableOpacity style={styles.firstView} onClick = {props.onAdd}>
                <Text className="p-yourdiscount">+</Text>
                <Text className="p2-yourdiscount">Dodaj swój kod rabatowy</Text>
        </TouchableOpacity>
    )
}

const DiscountView = (props) => {

    return(
        <View className={ props.active ? "discount-div-yourdiscount-active":"discount-div-yourdiscount"} onClick={() => props.onClick(props.id)}>
            <Text> {props.name} </Text>
        </View>
    )
}

const DiscountViewCounter = (props) => {
    const component = props.data.map((d,index) =>
        <DiscountDiv key={d.id} id={d.id} name={d.name} percent={d.percent} active={d.active} onClick={props.onClick}/>
    );

    return( component );
}