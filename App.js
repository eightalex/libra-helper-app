import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView
} from 'react-native';
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

class ListItem extends Component {
    render() {
        return (
            <View>
                <Text style={styles.list__title}>{this.props.groupName}</Text>
                {this.props.list.map((elem, index) => {
                    return (
                        <View key={index} style={styles.list__item}>
                            <Text style={styles.list__code}>{elem.code}</Text>
                            <Text style={styles.list__text}>{elem.title}</Text>
                        </View>
                    );
                })}
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
    },
    list__title: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 24
    },
    list__item: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7
    },
    list__code: {
        marginRight: 10,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 16
    },
    list__text: {
        fontSize: 16
    }
});