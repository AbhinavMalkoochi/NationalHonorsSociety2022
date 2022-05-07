import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
export default function LogHoursSecond() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.rect1}>
                <Text style={styles.logHours1}>Log Hours</Text>
                <Text style={styles.log2}>Log</Text>
                <View style={styles.enterHoursHereStack}>
                    <Text style={styles.enterHoursHere}>Enter Hours here:</Text>
                    <TextInput
                        placeholder="Ex: 3"
                        textBreakStrategy="highQuality"
                        keyboardType="numeric"
                        style={styles.placeholder1}
                    ></TextInput>
                </View>
                <Text style={styles.date}>Date:</Text>
                <TextInput
                    placeholder="Ex: "
                    textBreakStrategy="highQuality"
                    style={styles.placeholder2}
                ></TextInput>
                <Text style={styles.attachments}>Attachments</Text>
                <TextInput
                    placeholder="Ex: "
                    textBreakStrategy="highQuality"
                    style={styles.placeholder3}
                ></TextInput>
                <View style={styles.nextButton}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={navigation.navigate('LogHoursSecond')}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        bottom: 4,
        textAlignVertical: 'center',
        fontStyle: 'italic',
    },
    nextButton: {
        width: 150,
        height: 50,
        marginTop: '10%',
        marginLeft: '55%',
    },
    submitButton: {
        backgroundColor: '#feb914',
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: '#feb914',
        height: '100%',
        width: '100%',
        padding: 10,
        borderRadius: 30,
    },
    rect1: {
        width: 357,
        height: 679,
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 9,
        borderColor: '#000000',
        borderRadius: 69,
        marginTop: 67,
        marginLeft: 9,
    },
    logHours1: {
        // fontFamily: "roboto-700",
        color: '#121212',
        fontSize: 20,
        marginTop: 13,
        marginLeft: 132,
    },
    log2: {
        // fontFamily: "roboto-700",
        color: '#121212',
        marginTop: 20,
        marginLeft: 48,
    },
    enterHoursHere: {
        top: 0,
        left: 12,
        position: 'absolute',
        //fontFamily: "roboto-regular",
        color: '#121212',
        fontSize: 11,
    },
    placeholder1: {
        top: 12,
        left: 0,
        position: 'absolute',
        //fontFamily: "roboto-regular",
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 63,
        backgroundColor: 'rgba(15,15, 15,0.07)',
    },
    enterHoursHereStack: {
        width: 284,
        height: 68,
        marginTop: 16,
        marginLeft: 36,
    },
    date: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        fontSize: 11,
        marginTop: 14,
        marginLeft: 48,
    },
    placeholder2: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 63,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    attachments: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        fontSize: 11,
        marginTop: 17,
        marginLeft: 48,
    },
    placeholder3: {
        //fontFamily: "roboto-regular",
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 63,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    materialButtonDanger1: {
        height: 36,
        width: 100,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 27,
        marginTop: 262,
        marginLeft: 208,
    },
})
