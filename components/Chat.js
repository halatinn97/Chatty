import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import 'react-native-gesture-handler';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
// Import the functions you need from the SDKs you need

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
            }
        };

        const firebaseConfig = {
            apiKey: "AIzaSyA-nx6HuctS1D61E_muRJrCYpZ0PnwZwN8",
            authDomain: "chatty-a7d2d.firebaseapp.com",
            projectId: "chatty-a7d2d",
            storageBucket: "chatty-a7d2d.appspot.com",
            messagingSenderId: "305480742013",
            appId: "1:305480742013:web:f915fb2d7458bdb7b86d14",
            measurementId: "G-JN0C41084N"
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar || '',
                },
            });
        });
        this.setState({
            messages,
        });
    };


    componentDidMount() {

        //Display username in navigation
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

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
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    }


    //Appends new message to previous  
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages(this.state.messages[0]);
        });
    }

    addMessages = (message) => {

        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user,
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

    render() {
        const { color, name } = this.props.route.params;

        return (
            <View style={[{ backgroundColor: color }, styles.container]}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
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