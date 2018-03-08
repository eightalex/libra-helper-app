import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TextInput,
    ScrollView
} from 'react-native';
import ListItem from './components/ListItem';
import initialData from './data_debug';

const instructions = Platform.select({
    android: '1. Use this beautiful libra helper\n' +
             '2. ???\n' +
             '3. PROFIT!'
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: false,
            data: initialData
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(title) {
        title = title.toLowerCase();

        let data = initialData
            .map(item => ({
                ...item,
                list: item.list.filter(listItem => listItem.title.toLowerCase().includes(title))
            }))
            .filter(item => item.list.length > 0);

        let search = title.length > 0;

        this.setState({ search, data });
    }

    render() {
        return (
            <View style={styles.app}>
                <ScrollView style={styles.list}>
                    {this.state.data.map((group, index) =>
                        <ListItem key={index}
                                  groupName={group.groupName}
                                  list={group.list}
                        />
                    )}
                </ScrollView>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleChange}
                    placeholder="Start typing..."
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    list: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
    },
    inputContainer: {

    },
    input: {
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16
    }
});