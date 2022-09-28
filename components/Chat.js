import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import 'react-native-gesture-handler';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {

        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'This is a sytem message',
                    createdAt: new Date(),
                    system: true
                }
            ],
        })
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={styles.bubble}
            />
        )
    }

    render() {
        const { color } = this.props.route.params;

        return (
            <View style={[{ backgroundColor: color }, styles.container]}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
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