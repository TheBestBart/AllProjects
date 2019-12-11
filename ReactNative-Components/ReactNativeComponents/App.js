import React from 'react';
import { Text, ScrollView } from 'react-native';
import OrderStatus from "./components/OrderStatus";
import { SizeTable } from "./components/SizeTable";
import Summary from "./components/Summary";
import { Regulations } from "./components/Regulations";
import PurchaseStatusList from "./components/PurchaseStatusList"
import PropTypes from "prop-types";  

export default class App extends React.Component {

 constructor(props) {
        super(props);  
        
        super(props);
        this.state = { name: 'md-arrow-up' }
        this.onPressButton1 = this.onPressButton1.bind(this);
        this.onPressButton2 = this.onPressButton2.bind(this);
        this.onPressButton3 = this.onPressButton3.bind(this);
        this.changeSign = this.changeSign.bind(this)

        this.onSwitchAction = this.onSwitchAction.bind(this);
    }
    
    uriPaypal = 'https://banner2.cleanpng.com/20180823/jfo/kisspng-paypal-logo-brand-font-payment-paypal-logo-icon-paypal-icon-logo-png-and-vecto-5b7f273deebfa6.7493516515350597739779.jpg';
    uri2 = 'https://mpng.pngfly.com/20180824/jbf/kisspng-mastercard-logo-credit-card-visa-brand-mastercard-logo-icon-paypal-icon-logo-png-and-v-5b8036c0e7dcf3.7313769415351292809497.jpg';
    text = ['przesylka zostala do Ciebie dostarczona', 'Dziekujemy za zaufanie i zachecamy do ponownych zakupow'];
    dataToIconsContact = [{ name:'md-phone-landscape', text: 'telefon' }, { name: 'md-mail', text: 'Email' }, { name: 'ios-images', text:'FAQ' }];
    dataToSizeTable2 = require('./mockup-data/sizes');
    dataToPurchaseStatus = [
        {
            date: ['15.10.2019','15.00'],
            part: 'dostarczono',
            backgroundColor: 'white',
            text: this.text
        },
        {
            date: ['15.10.2019','15.00'],
            part: 'wysylka',
            backgroundColor: 'white',
            text: this.text
        },
        {
            date: ['15.10.2019','15.00'],
            part: 'kompletowanie',
            backgroundColor: 'white',
            text: this.text
        }
    ];

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

    dataToPurchaseStatusList = [{
        date: ['15.10.2019', '15.00'],
        part: 'Dostarczono',
        backgroundColor: 'blue',
        text: ['Przesylka została przez Ciebie dostarczona'],
    },
    {
        date: ['15.10.2019', '15.00'],
        part: 'Dostarczono',
        backgroundColor: 'blue',
        text: ['Przesylka została przez Ciebie dostarczona'],
    },
    {
        date: ['15.10.2019', '15.00'],
        part: 'Dostarczono',
        backgroundColor: 'blue',
        text: ['Przesylka została przez Ciebie dostarczona'],
    }]

    text2 = "Zapoznalem sie i akceptuje Regulamin serwisu. Wyrazam zgode na przetwarzanie moich danych".repeat(2);

    onPressButton1() {
        console.log('You tapped the button1!');
    }
    onPressButton2() {
        console.log('You tapped the button2!');
    }
    onPressButton3() {
        console.log('You tapped the button3!');
    }
    changeSign() {
        let{ name } = this.state;
        name === 'md-arrow-up' ? this.setState({ name: 'md-arrow-down' }) : this.setState({ name: 'md-arrow-up' });
    }
    onSwitchAction() {
        console.log("switch works");
    }

    images = [this.uri2, this.uriPaypal];
    actions = [this.onPressButton1, this.onPressButton2, this.onPressButton3];

    render() { 
        console.log(this.dataToIconsContact);
            return (
                <ScrollView>
                <PayStatus                     
                    color='green'                     
                    name='md-checkmark-circle'
                    text='platnosc przebiegla pomyslnie'
                    size={ 70 }
                />
                <Regulations
                    switchAction={this.onSwitchAction}
                    maxChars={50}
                    text={this.text2}
                    actionsAndWords={[{action: this.onPressButton2, word: 'Zapoznalem'}, {action: this.onPressButton1, word: 'Regulamin'},{action: () => console.log('akceptuje'), word: 'akceptuje'}]}
                />
                <PurchaseStatusList
                    data = {this.dataToPurchaseStatusList}
                    nameDown = 'md-arrow-down'
                    nameUp = 'md-arrow-up'
                />
                <OrderStatus
                    status='OPŁACONO'
                    number='#685JKKD3'
                />

                <IconsContact
                    data={ this.dataToIconsContact }
                    color='#1d1406'
                    size={25}
                    actions = {this.actions}
                />

                <MyPurchase
                    status='W trakcie realizacji'
                    number='#232SD3'
                    date='23.09.2019, 14.00'
                    component={<AnyDiv/>}
                    nameUp='md-arrow-up'
                    nameDown='md-arrow-down'
                />
                <SizeTable
                    data={this.dataToSizeTable2}
                    evenColor='#fcfcfc'
                    oddColor='#d4cece'
                    component={<AnyDiv/>}
                    name={this.state.name}
                    onPress={this.changeSign}
                />
                <Summary
                    price={4000}
                    delivery={100}
                    discount={-1000}
                    totalPrice={3000}
                    currency='PLN'
                />

            </ScrollView>
        );
    } 
}


function AnyDiv() {
    return(
        <Text style={ { textAlign: 'center' } }>
            if you add any component to MyPurchase Component props it will be shown here
        </Text>
    )
}


export default class App extends React.Component
{
constructor(props) {
        super(props);
        this.state = { name: 'md-arrow-up' }
        this.onPressButton1 = this.onPressButton1.bind(this);
        this.onPressButton2 = this.onPressButton2.bind(this);
        this.onPressButton3 = this.onPressButton3.bind(this);
        this.changeSign = this.changeSign.bind(this)

        this.onSwitchAction = this.onSwitchAction.bind(this);
    }
    

    render() {

        return(
            <ScrollView>
                <PayStatus                     
                    color='green'                     
                    name='md-checkmark-circle'
                    text='platnosc przebiegla pomyslnie'
                    size={ 70 }
                /> 
                <Regulations
                    switchAction={this.onSwitchAction}
                    maxChars={50}
                    text={this.text2}
                    actionsAndWords={[{action: this.onPressButton2, word: 'Zapoznalem'}, {action: this.onPressButton1, word: 'Regulamin'},{action: () => console.log('akceptuje'), word: 'akceptuje'}]}
                />
                <PurchaseStatusList
                    data = {this.dataToPurchaseStatusList}
                    nameDown = 'md-arrow-down'
                    nameUp = 'md-arrow-up'
                />
                <OrderStatus
                    status='OPŁACONO'
                    number='#685JKKD3'
                />

                <IconsContact
                    data={ this.dataToIconsContact }
                    color='#1d1406'
                    size={25}
                    actions = {this.actions}
                />

                <MyPurchase
                    status='W trakcie realizacji'
                    number='#232SD3'
                    date='23.09.2019, 14.00'
                    component={<AnyDiv/>}
                    nameUp='md-arrow-up'
                    nameDown='md-arrow-down'
                />
                <SizeTable
                    data={this.dataToSizeTable2}
                    evenColor='#fcfcfc'
                    oddColor='#d4cece'
                    component={<AnyDiv/>}
                    name={this.state.name}
                    onPress={this.changeSign}
                />
                <Summary
                    price={4000}
                    delivery={100}
                    discount={-1000}
                    totalPrice={3000}
                    currency='PLN'
                />



            </ScrollView>
        );
    }
}
