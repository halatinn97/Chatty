import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import 'react-native-gesture-handler';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';


// Import functions from SDKs
const firebase = require('firebase');
require('firebase/firestore')


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                avatar: '',
                name: '',
            },
            isConnected: false,
        };

        //Set up Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyA-nx6HuctS1D61E_muRJrCYpZ0PnwZwN8",
            authDomain: "chatty-a7d2d.firebaseapp.com",
            projectId: "chatty-a7d2d",
            storageBucket: "chatty-a7d2d.appspot.com",
            messagingSenderId: "305480742013",
            appId: "1:305480742013:web:f915fb2d7458bdb7b86d14",
            measurementId: "G-JN0C41084N"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    //Retrieve collection data & store in messages
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // Go through each document
        querySnapshot.forEach((doc) => {
            // Get QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });
        });
        this.setState({
            messages,
        });
    };

    //Read & update messages in storage
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
        } catch (error) {
            console.log(error.message);
        }
    }


    componentDidMount() {

        //Display username in navigation
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        //If user is online --> authenticate & load messages via Firebase 

        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({
                    isConnected: true,
                });
                console.log('online');


                //Anonymous user authentication 
                this.referenceChatMessages = firebase.firestore().collection('messages');


                this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        firebase.auth().signInAnonymously();
                    }
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                        },
                    });
                    this.unsubscribe = this.referenceChatMessages
                        .orderBy('createdAt', 'desc')
                        .onSnapshot(this.onCollectionUpdate);
                    this.saveMessages();
                });
            }
            // If user is offline --> load & display messages from asyncStorage
            else {
                this.setState({
                    isConnected: false,
                });
                console.log('offline');
                this.getMessages();
            }
        })
    }



    //Save messages to database
    addMessages = () => {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user,
        });
    }

    //Appends new message to previous  
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.saveMessages();
            this.addMessages();
            this.deleteMessages();
        });
    }

    //Allows bubble customization   
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={styles.bubble}
            />
        )
    }

    //Hides input when offline
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }


    render() {
        const { color, name } = this.props.route.params;

        return (
            <View style={[{ backgroundColor: color }, styles.container]}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: name,
                    }}
                />
                {/*Prevent hidden input field on Android*/}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatTitle: {
        color: '#FFFFFF'
    },
    bubble: {
        left: {
            backgroundColor: 'white',
        },
        right: {
            backgroundColor: 'blue'
        }
    }
})