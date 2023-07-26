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
            <ImageBackground source={require('../assets/phone.jpg')} style={styles.backgroundImage}>
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
                                <TouchableOpacity style={[styles.color, styles.orange]} onPress={() => this.setState({ color: '#474056' })} />
                                <TouchableOpacity style={[styles.color, styles.blue]} onPress={() => this.setState({ color: '#8A95A5' })} />
                                <TouchableOpacity style={[styles.color, styles.grey]} onPress={() => this.setState({ color: '#B9C6AE' })} />
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

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: -100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        fontSize: 50,
        fontWeight: '900',
        color: '#de7264',
        marginTop: 130,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    startBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '88%',
        height: '35%',
        padding: 20,
        marginTop: 180,
        borderRadius: 10,
    },
    nameInput: {
        fontSize: 16,
        borderColor: 'gray',
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderRadius: 9,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        padding: 10,
        marginBottom: 20,
    },
    chooseBackgroundPrompt: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 10,
    },
    colorWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colors: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    color: {
        borderRadius: 22.5,
        width: 45,
        height: 45,
        marginLeft: 10,
    },
    black: {
        backgroundColor: '#090C08',
    },
    orange: {
        backgroundColor: '#c95618',
    },
    blue: {
        backgroundColor: '#18b8c9',
    },
    grey: {
        backgroundColor: '#8a9191',
    },
    startChatButton: {
        backgroundColor: '#76bac4',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 10,
        elevation: 5, //  Android shadow
        shadowColor: '#000', // iOS shadow 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});