import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types'
import { PurchaseStatus } from "./PurchaseStatus";


export class PurchaseStatusList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {active: 0, name: props.nameDown};
        this.isActive = this.isActive.bind(this);
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({...PurchaseStatus.propTypes})).isRequired,
        nameUp: PropTypes.string,
        nameDown: PropTypes.string
    };

    isActive(id) {

        (id === this.state.active)
            ? this.setState({active: false})
            : this.setState({active: id});
    }

    render() {
        
        let {data, nameUp, nameDown} = this.props;
        let {active} = this.state;
        let Purchase =
            <View>
                {data.map((d, i) =>
                    <PurchaseStatus
                        isFirst={i === 0}
                        isLast={i === data.length - 1}
                        date={d.date}
                        part={d.part}
                        backgroundColor={d.backgroundColor}
                        text={d.text}
                        nameUp={nameUp}
                        nameDown={nameDown}
                        isShown={active === i}
                        id={i}
                        isActive={this.isActive}
                        key={i}
                    />
                )}
            </View>

        return Purchase;
    }
}



// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import PropTypes from 'prop-types'
// import PurchaseStatus from "./PurchaseStatus";

// export default class PurchaseStatusList extends React.Component{
//     static propTypes = {
//         data: PropTypes.arrayOf(PurchaseStatus.propTypes).isRequired
//     };
//     render() {
//         let { data } = this.props;
//         let Purchase = <View>
//             {data.map((d, i) =>
//                 <PurchaseStatus
//                     isFirst={i === 0}
//                     isLast={i === data.length - 1}
//                     date={d.date}
//                     part={d.part}
//                     backgroundColor={d.backgroundColor}
//                     text={d.text}
//                 />
//             )}
//         </View>

//         return Purchase;
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column'
//     }
// });
