
import React from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import PropTypes from 'prop-types'


export class Regulations extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {value: false, isCollapsed: false};
           

        this.changeSwitchValue = this.changeSwitchValue.bind(this);
        this.changeIsCollapsedValue = this.changeIsCollapsedValue.bind(this);
    }

    static propTypes = {
        switchAction: PropTypes.func,
        text: PropTypes.string.isRequired,
        maxChars: PropTypes.number,
        actionsAndWords: PropTypes.arrayOf(PropTypes.object),
    };

    changeSwitchValue() {
        let { value } = this.state;
        let { switchAction } = this.props;
        value ? this.setState({value: false}) : this.setState({value: true})
        switchAction();
    }

    changeIsCollapsedValue() {
        let { isCollapsed } = this.state;
        isCollapsed ? this.setState({isCollapsed: false}) : this.setState({isCollapsed: true});
    }

    render() {
        let { text, maxChars = 100, actionsAndWords } = this.props;
        let { value, isCollapsed } = this.state;
        let actionToCollapse = text.length > maxChars && this.changeIsCollapsedValue;
        let ViewComponent = actionToCollapse ? TouchableOpacity : View;
        let index = Array.isArray(actionsAndWords) ? getIndex(text, actionsAndWords) : false;
        let usedText = index
            ? getTextsArray(text, actionsAndWords, maxChars, isCollapsed, actionsAndWords)
            : getTextTableWithoutIndex(text, maxChars, isCollapsed );

        return (
            <View style={styles.container}>
                <View style={styles.switchView}>
                    <Switch value={value} onChange={this.changeSwitchValue} trackColor={{true: 'black'}}/>
                </View>
                <ViewComponent style={styles.textView} onPress={actionToCollapse}>
                        {text.length < maxChars
                                ?<Text style={styles.textStyle}>{usedText}</Text>
                                :<View>
                                        <Text style={styles.textStyle}>{usedText} </Text>
                                            <View>
                                            {!isCollapsed
                                                ?<View style={styles.noActive}>
                                                        <Text style={styles.collapsetextStyle}>
                                                            ROZWIŃ
                                                        </Text>
                                                        <AntDesign
                                                            name={'down'}
                                                            size={em(1)}
                                                            color={'black'}
                                                            />
                                                </View>
                                                :<View style={styles.activeParentView}>
                                                        <View style={styles.active}>
                                                            <Text style={styles.collapsetextStyle}>
                                                                ZWIŃ
                                                            </Text>
                                                            <AntDesign
                                                                    name={'up'}
                                                                    size={em(1)}
                                                                    color={'black'}
                                                                />
                                                        </View>
                                                </View>
                                                }
                                        </View>
                                </View>
                        }
                </ViewComponent>                        
            </View>
        )
    }
    
}

const styles = {
container: {
flexDirection: 'row',
justifyContent:'flex-start',
    },
textView: {
flex: 1,
},
text: {
fontSize: em(1.1),
lineHeight: (1.25),
},
switchView: {
   justifyContent: 'flex-start',
alignItems: 'center',
paddingRight: em(1),
},
noActive: {
bottom: 0,
        right: 0,
        flexDirection: 'row',
alignItems: 'center',
backgroundColor: 'white',
position: 'absolute',
    },
    activeParentView: {
        flex: 1,
        height: em(1.25),
    },
    active: {
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
    },
    collapsetextStyle: {
        fontWeight: '500'
    },
hitSlop: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
},
keyWordStyle: {
        color: 'black',
        textDecorationLine: 'underline'
},
textStyle: {
        color: '#707070'
}
};


const em = (n) => n * 12;

const getTextTableWithoutIndex = (text, numberOfCharacters, isCollapsed) => { // dziala
    if(text.length > numberOfCharacters && !isCollapsed) {
        let firstPart = text.substring(0, numberOfCharacters) + '...';

        return firstPart;
            
    }

    return [text];
};

const getFirstPartText = (text, numberOfCharacters) => {
    if(text.length > numberOfCharacters) {
        let firstPart = text.substring(0, numberOfCharacters) + '...';

        return firstPart;
    }

    return [text];
};

const reverse = (string) => {
    let array = [];
    for(let i = string.length - 1; i >= 0; i --){
        array.push(string[i]);
    }
    return array.join('');
};

const getIndex = (strings, actionsAndWords) => {
    let isArray = Array.isArray(strings);
let stringsValue = isArray ? strings : strings.toString();
    let index = [];
    !isArray && actionsAndWords.sort((a,b) => {
        return b.word.length - a.word.length;
    })

actionsAndWords.map( word => {
        if(stringsValue.includes(word.word) && isArray) {
            index.push(stringsValue.indexOf(word.word))
        }
        if(stringsValue.includes(word.word) && !isArray) {
            let start = stringsValue.indexOf(word.word);
            let end = stringsValue.indexOf(word.word) + word.word.length;
            index.push({start: start, end: end});
            stringsValue = stringsValue.substring(0,start) + reverse(word.word) + stringsValue.substring(end);
        }
    });
    
    index.sort( (a, b) => {
return isArray ? a - b : a.start - b.start;
    });
    
    return index;
};

const getFirstPartFromStringsArray = (stringsArray, numberOfCharacters) => {
    let array = [];
    let sum = 0;
    let differ = 0;

    for(let i = 0; i < stringsArray.length; i++){
        differ = numberOfCharacters - sum;
        sum += stringsArray[i].length;

        if(sum > numberOfCharacters){
            array.push(getFirstPartText(stringsArray[i], differ));
            break;
        }
        else{
            array.push(stringsArray[i]);
        }
}

    return array;
};

const groupTextsWithIndex = (text, indexArray) => {
    let array = [];
    text = text.toString();
    
    for(let i = 0; i < indexArray.length; i++) {

        if(i === 0 && indexArray.length > 1) {
            array.push(text.substring(0, indexArray[i].start));
            array.push(text.substring(indexArray[i].start, indexArray[i].end));
        }else if(i !== indexArray.length - 1 && indexArray.length > 1) {
            array.push(text.substring(indexArray[i-1].end, indexArray[i].start));
            array.push(text.substring(indexArray[i].start, indexArray[i].end));
        }else if(indexArray.length === 1) {
            array.push(text.substring(0, indexArray[i].start));
            array.push(text.substring(indexArray[i].start, indexArray[i].end));
            array.push(text.substring(indexArray[i].end));
        }else {
            array.push(text.substring(indexArray[i-1].end, indexArray[i].start));
            array.push(text.substring(indexArray[i].start, indexArray[i].end));
            array.push(text.substring(indexArray[i].end));
        }
}

return array

};

const getStringsArray = (text, actionsAndWords, numberOfCharacters, isCollapsed) => {
let index = getIndex(text, actionsAndWords);
    let empty = index.length === 0;
    let isLonger = numberOfCharacters > text.length;
    let selectedArray = !empty && groupTextsWithIndex(text, index);

    if(!empty && isLonger || !empty && isCollapsed && !isLonger) {
        return selectedArray;
    }else if(!empty && !isCollapsed && !isLonger) {
        return [getFirstPartFromStringsArray(selectedArray, numberOfCharacters), selectedArray]
    }else {
        return text;
    }
};

const getTextsArray = (strings, actionsAndWords, numberOfCharacters, isCollapsed) => {
    let array = getStringsArray(strings, actionsAndWords, numberOfCharacters, isCollapsed);
let arrayOfText = [];
let isArrayOfArrays = array.length >= 2 && Array.isArray(array[1]) ? true : false;
let indexFromText = isArrayOfArrays ? getIndex(array[1], actionsAndWords) : getIndex(array, actionsAndWords) ;
let counter = 0;
let usedArray = isArrayOfArrays ? array[0] : array;

usedArray.map((t, index) => {
if(index === indexFromText[counter]) {
let action = actionsAndWords.find( object => {
 return object.word === t && object.action;
            });
            
action = !action ? false : action;
arrayOfText.push(<Text key={index} onPress={action.action} hitSlop={styles.hitSlop} style={styles.keyWordStyle}>{t}</Text>)
counter ++;
   }else{
   arrayOfText.push(<Text style={styles.textStyle} key={index}>{t}</Text>)
   }
    });
    
return arrayOfText;
};