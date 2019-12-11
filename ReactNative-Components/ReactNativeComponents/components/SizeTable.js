import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export class SizeTable extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            isShown: false,
            name: props.nameUp,
        };
        this.onPress = this.onPress.bind(this);
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        oddColor: PropTypes.string,
        evenColor: PropTypes.string,
        component: PropTypes.object,
        nameUp: PropTypes.string,
        nameDown: PropTypes.string,
    };

    onPress() {
        let { isShown } = this.state;
        let { nameUp, nameDown } = this.props;

        !isShown
            ? this.setState({ isShown: true, name: nameUp })
            : this.setState({ isShown: false, name: nameDown });
    }

    render() {
        const { oddColor, evenColor, data, component }  = this.props;
        let { isShown, name }  = this.state;
        let keys =  Object.keys(data);

        return(
            <View>
                <View style={styles.container}>
                    { keys.map((key, index) =>
                        <View key={key} style={styles.mainView}>
                            <View style={index === 0 ? styles.firstViewInsideHeader : styles.viewInsideHeader}>
                                <Text style={{fontWeight: 'bold'}}>
                                    {key.toUpperCase()}
                                </Text>
                                {index === keys.length - 1 &&
                                    <Ionicons
                                        name={ name }
                                        color='black'
                                        size={ 18 }
                                        onPress={ this.onPress }
                                        style={ styles.icon }
                                    />
                                }
                            </View>
                            <OneKeyViews
                                data={data[key]}
                                evenColor={evenColor}
                                oddColor={oddColor}
                                isFirst={index === 0}
                            />
                        </View>
                     )}
                </View>
                {isShown && component}
            </View>
        )
    }
}

const OneKeyViews = ({ data, oddColor, evenColor, isFirst }) => {
    let styleInfo = isFirst ? styles.firstViewInsideList : styles.viewInsideList;

    return(
        data.map((d, i) =>
            <View key={d.key} style={{ backgroundColor: ifOdd(i, oddColor, evenColor) }}>
                <View style={styleInfo} >
                    <Text>
                        {d.name}
                    </Text>
                </View>
            </View>
        )
    )
};

OneKeyViews.propTypes = {
    data: PropTypes.array.isRequired,
    isFirst: PropTypes.bool.isRequired,
    oddColor: SizeTable.propTypes.oddColor,
    evenColor: SizeTable.propTypes.evenColor,
};

function ifOdd(index, colorOdd, colorEven) {
    return index % 2 === 0 ? colorOdd : colorEven;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    mainView: {
        flex: 1,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: 'darkgray',
        borderBottomColor: 'darkgray',
    },
    firstViewInsideHeader: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderRightColor: 'darkgray',
        borderLeftWidth: 0.5,
        borderLeftColor: 'darkgray',
        borderBottomWidth: 0.5,
        borderBottomColor: 'darkgray',
        flexDirection: 'row',
    },
    viewInsideHeader: {
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderRightColor: 'darkgray',
        borderBottomWidth: 0.5,
        borderBottomColor: 'darkgray',
        flexDirection: 'row',
    },
    firstViewInsideList: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: 'darkgray',
        borderLeftWidth: 0.5,
        borderLeftColor: 'darkgray',
    },
    viewInsideList: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: 'darkgray',
    },
})


    // <Header onPress={this.onPress} name={name} />
// propsy = {
//	 oddColor, -  kolor do nieparzystych wierszy
//	 evenColor, -  kolor do parzystych wierszy
//	 data = {cm, inches}, - dane kolnierzy w cm i calach
//	 component, -  komponent ktory ma sie pojawic po nacisnieciu ikonki
//	 nameUp, - nazwa ikonki przed nacisnieciem
//	 nameDown - nazwa ikonki po nacisnieciu
// }
{/*{data.map((d, i) =>*/}
{/*    <View key={i} style={{ backgroundColor: ifOdd(i, oddColor, evenColor), flexDirection: 'row' }}>*/}
{/*        <OneView data={d.cm} styleInfo={styles.viewInsideListLeft}/>*/}
{/*        <OneView data={d.inch} styleInfo={styles.viewInsideListRight}/>*/}
{/*    </View>*/}
{/*)}*/}
// const Header = ({ name, onPress, key }) => {
//     return(
//         <View style={styles.header}>
//             <View style={styles.viewInsideHeaderLeft}>
//                 <Text>KOŁNIERZ(CM)</Text>
//             </View>
//             <View style={styles.viewInsideHeaderRight}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <Text>KOŁNIERZ(INCHES)</Text>
//                     <Ionicons
//                         name={name}
//                         color='black'
//                         size={20}
//                         onPress={onPress}
//                         style={{ paddingLeft: 10 }}
//                     />
//                 </View>
//             </View>
//         </View>
//     )
// }
// Header.propTypes = {
//     name: PropTypes.string,
//     onPress: PropTypes.func,
// }
//
// const OneView = ({ data, styleInfo }) => {
//     return(
//         <View style={styleInfo}>
//             <Text>{data}</Text>
//         </View>
//     )
// }
//
// OneView.propTypes = {
//     data: PropTypes.number,
//     styleInfo: PropTypes.object,
// }
