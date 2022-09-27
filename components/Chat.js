import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import 'react-native-gesture-handler';


export default class Chat extends React.Component {
    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
    }


    render() {
        const { color } = this.props.route.params;
        return (
            <ScrollView contentContainerStyle={[{ backgroundColor: color }, styles.container]}>
                <View>
                    <Text style={styles.chatTitle}>Chat here</Text>
                </View>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatTitle: {
        color: '#FFFFFF'
    }
})