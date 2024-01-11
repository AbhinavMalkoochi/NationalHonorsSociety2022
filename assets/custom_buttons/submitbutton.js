import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default function FlatButton({ text, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.submitbutton}
            activeOpacity={0.8}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    submitbutton: {
        position: 'absolute',
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 10,
        padding: 30,
        backgroundColor: '#feb914',
        height: '7%',
        width: '40%',
        alignSelf: 'center',
        left: '48%',
        top: '67.5%',
    },
    buttonText: {
        fontSize: 25,
        bottom: 5,
        textAlign: 'center',
        color: 'white',
        textAlignVertical: 'center',
        fontStyle: 'italic',
    },
})
