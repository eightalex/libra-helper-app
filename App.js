import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';
import ListItem from './components/ListItem';
import initialData from './data';

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
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleChange}
                    placeholder="Start typing..."
                />
                <ScrollView style={styles.list}>
                    {this.state.data.map((group, index) =>
                        <ListItem key={index}
                                  groupName={group.groupName}
                                  list={group.list}
                        />
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginLeft: 30,
        marginRight: 30,
        fontSize: 30
    },
    list: {
        paddingLeft: 30,
        paddingRight: 30
    }
});