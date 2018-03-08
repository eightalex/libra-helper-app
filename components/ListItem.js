import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

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

export default ListItem;