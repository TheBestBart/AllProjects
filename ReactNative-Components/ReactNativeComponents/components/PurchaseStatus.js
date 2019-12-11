// ---- Purchase Status
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const em = (n) => n * 12;

export class PurchaseStatus extends React.PureComponent
{
    static propTypes = {
        date: PropTypes.arrayOf(PropTypes.string).isRequired,
        part: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        text: PropTypes.arrayOf(PropTypes.string).isRequired,
        id: PropTypes.number,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        nameDown: PropTypes.string,
        nameUp: PropTypes.string,
        isActive: PropTypes.func,
        isShown: PropTypes.bool,
    };

    render() {
        console.log(this.props.part);
        let { isFirst, isLast, date, part, backgroundColor, text, isActive, id, isShown, nameUp, nameDown } = this.props;
        let currentStyle = getCurrentStyle(isShown);
        let name = isShown ? nameUp : nameDown;

        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.leftView}>
                        {date.map((d, i) =>
                            <Text key={i} style={currentStyle.dateTextStyle}>
                                {d}
                            </Text>
                        )}
                    </View>
                    <View style={styles.lineDotView}>
                        {isFirst
                            ? <View style={[styles.unseenLine, {borderColor: backgroundColor}]}/>
                            : <View style={styles.line}/>
                        }
                        <View style={currentStyle.dotStyle}/>
                        {isLast && !isShown
                            ? <View style={[styles.unseenLine, {borderColor: backgroundColor}]}/>
                            : <View style={styles.line}/>
                        }
                    </View>
                    <View style={styles.rightView}>
                        <TouchableOpacity style={styles.rightTextView} onPress={() => { isActive(id) }}>
                            <Text style={currentStyle.partTextStyle}>
                                {part.toUpperCase()}
                            </Text>
                            <Ionicons
                                name={name}
                                color='#AFAFAF'
                                size={15}
                                style={{marginHorizontal: em(1)}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {isShown && <Component text={text}/>}
            </View>
        )
    }
}

const Component = ({ text }) => {
    return(
        <View style={styles.main}>
            <View style={styles.leftViewInsideAddComponent}/>
            <View style={styles.lineViewInsideComponent}>
                <View style={styles.lineInsideComponent}/>
            </View>
            <View style={styles.rightViewInsideAddComponent}>
                <View>
                    {text.map((t, i) =>
                        <Text key={i} style={[styles.textComponent,{paddingBottom: i !== text.length-1 ? em(1) : 0}]}>
                            {t}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    )
};

Component.propTypes = {
    text: PurchaseStatus.propTypes.text
};

function getCurrentStyle(isShown) {
    return {
        dotStyle : !isShown ? styles.dot : styles.activeDot,
        partTextStyle : !isShown ? styles.rightText : styles.activeRightText,
        dateTextStyle : !isShown ? styles.leftText : styles.activeLeftText,
    }
}

const styles = {
    container: {
        flexDirection: 'column'
    },
    main: {
        flexDirection: 'row',
    },
    leftView: {
        paddingTop: em(1.15),
        flex: 2,
        flexDirection: 'column',
        height: em(4.5),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    leftText: {
        color: '#AFAFAF',
        lineHeight: em(1.25),
        fontSize: em(1.15),
    },
    activeLeftText: {
        color: 'black',
        lineHeight: em(1.25),
        fontSize: em(1.15),
    },
    rightView: {
        flex: 5,
        flexDirection: 'row',
        paddingVertical: em (1),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dot: {
        width: em(1.5),
        height: em(1.5),
        borderWidth: 2,
        borderRadius: em(0.85),
        backgroundColor: 'white',
        borderColor: '#EAEAEA',
    },
    activeDot: {
        width: em(1.5),
        height: em(1.5),
        borderWidth: 2,
        borderRadius: em(0.85),
        backgroundColor: 'white',
        borderColor: '#272727',
    },
    line: {
        flex: 1,
        width: 1,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    unseenLine :{
        flex: 1,
        width: 1,
        borderWidth: 1,
    },
    rightTextView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems:'center',
    },
    rightText: {
        color: '#AFAFAF',
        fontWeight: 'bold',
        fontSize: em(1.25),
        lineHeight: em(1.5),
    },
    activeRightText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: em(1.25),
        lineHeight: em(1.5),
    },
    lineDotView: {
        justifyContent:'space-around',
        alignItems: 'center',
        paddingHorizontal: em(0.75),
    },
    rightViewInsideAddComponent: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    leftViewInsideAddComponent: {
        flex: 2,
    },
    lineViewInsideComponent: {
        justifyContent:'space-around',
        alignItems: 'center',
        width: em(1.5),
        marginHorizontal: em(0.75),
        paddingHorizontal: 1,
    },
    lineInsideComponent: {
        flex: 1,
        width: 1,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    textComponent: {
        color: '#272727',
        fontSize: em(1.15),
        lineHeight: em(1.25),
    },
};



// import React from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';

// export default class PurchaseStatus extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             isShown: false,
//             name: props.nameDown,
//         };

//         this.onPress = this.onPress.bind(this);
//     }

//     onPress() {
//         let { isShown } = this.state;
//         let { nameUp, nameDown } = this.props;

//         !isShown
//             ? this.setState({ isShown: true, name: nameDown })
//             : this.setState({ isShown: false, name: nameUp });
//     }

//     static propTypes = {
//         isFirst: PropTypes.bool.isRequired,
//         isLast: PropTypes.bool.isRequired,
//         date: PropTypes.arrayOf(PropTypes.string).isRequired,
//         part: PropTypes.string.isRequired,
//         backgroundColor: PropTypes.string.isRequired,
//         text: PropTypes.arrayOf(PropTypes.string).isRequired,
//         nameUp: PropTypes.string,
//         nameDown: PropTypes.string
//     };

//     render() {
//         let { name, isShown } = this.state;
//         let { isFirst, isLast, date, part, backgroundColor, text } = this.props;
//         let currentStyle = getCurrentStyle(isShown);
//         styles.unseenLine.borderColor =  backgroundColor;

//         return(
//             <View style={styles.container}>
//                 <View style={styles.main}>
//                     <View style={styles.leftView}>
//                         {date.map((d, i) =>
//                             <Text key={i} style={currentStyle.dateTextStyle}>
//                                 {d}
//                             </Text>
//                         )}
//                     </View>
//                     <View style={styles.lineDotView}>
//                         {isFirst ? <View style={styles.unseenLine}/> : <View style={styles.line}/>}
//                         <View style={currentStyle.dotStyle}/>
//                         {isLast && !isShown? <View style={styles.unseenLine}/> : <View style={styles.line}/>}
//                     </View>
//                     <View style={styles.rightView}>
//                         <View style={styles.rightTextView}>
//                             <Text style={currentStyle.partTextStyle}>
//                                 {part.toUpperCase()}
//                             </Text>
//                             <Ionicons
//                                 name={name}
//                                 color='#AFAFAF'
//                                 size={22}
//                                 onPress={ this.onPress }
//                                 style={{marginLeft: 30}}
//                             />
//                         </View>
//                     </View>
//                 </View>
//                 {isShown && <Component text={text}/>}
//             </View>
//         )
//     }
// }

// const Component = ({ text }) => {
//     return(
//         <View style={styles.main}>
//             <View style={styles.leftViewInsideAddComponent}>
//             </View>
//             <View style={styles.lineDotView}>
//                 <View style={styles.line}/>
//             </View>
//             <View style={styles.rightViewInsideAddComponent}>
//                 <View styles={{flex:1}}>
//                     {text.map((t, i) =>
//                         <Text key={i} style={styles.textComponent}>
//                             {t}
//                         </Text>
//                     )}
//                 </View>
//             </View>
//         </View>
//     )
// };

// Component.propTypes = {
//     text: PurchaseStatus.propTypes.text
// }

// function getCurrentStyle(isShown) {
//     return {
//         dotStyle : !isShown ? styles.dot : styles.activeDot,
//         partTextStyle : !isShown ? styles.rightText : styles.activeRightText,
//         dateTextStyle : !isShown ? styles.leftText : styles.activeLeftText,
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column'
//     },
//     main: {
//         flexDirection: 'row',
//     },
//     leftView: {
//         flex: 2,
//         flexDirection: 'column',
//         height: 55,
//         alignItems: 'flex-end',
//         justifyContent: 'flex-end',
//     },
//     leftText: {
//         color: '#AFAFAF',
//         fontSize: 14,
//     },
//     activeLeftText: {
//         color: 'black',
//         fontSize: 14,
//     },
//     rightView: {
//         flex: 5,
//         flexDirection: 'row',
//         height: 55,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//     },
//     dot: {
//         width: 20,
//         height: 20,
//         borderWidth: 2,
//         borderRadius: 10,
//         backgroundColor: 'white',
//         borderColor: '#EAEAEA',
//     },
//     activeDot: {
//         width: 20,
//         height: 20,
//         borderWidth: 2,
//         borderRadius: 10,
//         backgroundColor: 'white',
//         borderColor: '#272727',
//     },
//     line: {
//         flex:1,
//         width: 2,
//         borderWidth: 2,
//         borderColor: '#EAEAEA',
//     },
//     unseenLine :{
//         flex:1,
//         width: 2,
//         borderWidth: 2,
//     },
//     rightTextView: {
//         justifyContent: 'center',
//         flexDirection: 'row'
//     },
//     rightText: {
//         color: '#AFAFAF',
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
//     activeRightText: {
//         color: 'black',
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
//     lineDotView: {
//         justifyContent:'space-around',
//         alignItems: 'center',
//         width: 40,
//     },
//     rightViewInsideAddComponent: {
//         flex: 5,
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//     },
//     leftViewInsideAddComponent: {
//         flex: 2,
//     },
//     textComponent: {
//         color: '#272727',
//     },
// });


// // props ={
// //     name,  - nazwa ikonki
// //     color, - kolor - ikonki
// //     size, - rozmiar - ikonki
// //     text, - text statusu platnosci
// // }
