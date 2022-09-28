import React from 'react';
import { ImageBackground, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            color: ''
        };
    }

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.appTitle}>Chatty</Text>
                    <View style={styles.startBox}>
                        {/*Allow user to input name to display in chat*/}
                        <TextInput
                            style={styles.nameInput}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder='Your Name'
                        />
                        {/*Allow user to pick background color on touch*/}
                        <View style={styles.colorWrapper}>
                            <Text style={[styles.chooseBackgroundPrompt, styles.label]}>Choose Background Color:</Text>
                            <View style={styles.colors}>
                                <TouchableOpacity style={[styles.color, styles.black]} onPress={() => this.setState({ color: '#090C08' })} />
                                <TouchableOpacity style={[styles.color, styles.lilac]} onPress={() => this.setState({ color: '#474056' })} />
                                <TouchableOpacity style={[styles.color, styles.blue]} onPress={() => this.setState({ color: '#8A95A5' })} />
                                <TouchableOpacity style={[styles.color, styles.green]} onPress={() => this.setState({ color: '#B9C6AE' })} />
                            </View>
                        </View>
                        {/*Allow user to enter chat*/}
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.startChatButton} onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
                                <Text style={styles.buttonText}>Start Chatting</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        alignItems: 'flex-start',
        padding: '30%'
    },
    startBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '88%',
        height: '44%',
        padding: '5%',
        marginTop: '28%',
    },
    nameInput: {
        fontSize: 16,
        borderColor: 'gray',
        height: 50,
        width: '88%',
        borderWidth: 1,
        borderRadius: 9,
        fontWeight: '300',
        color: '#757083',
        opacity: '50%',
        padding: '1%',
    },
    chooseBackgroundPrompt: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: '100%',
        alignSelf: 'center'
    },
    colorWrapper: {
        width: '88%',
        height: '60%',
        justifyContent: 'center',
        marginLeft: '6%',
    },
    label: {
        marginBottom: '8%',
    },
    colors: {
        flexDirection: 'row',
        marginBottom: 1,
        justifyContent: 'space-between'
    },
    color: {
        borderRadius: '50%',
        width: 45,
        height: 45,
    },
    black: {
        backgroundColor: '#090C08',
    },
    lilac: {
        backgroundColor: '#474056',
    },
    blue: {
        backgroundColor: '#8A95A5',
    },
    green: {
        backgroundColor: '#B9C6AE',
    },
    startChatButton: {
        backgroundColor: '#757083',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30%',
    },
    buttonWrapper: {
        width: '88%',
        justifyContent: 'end',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    }
});