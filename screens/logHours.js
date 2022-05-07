import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
import * as Font from 'expo-font'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function LogHoursScreen() {
    const navigation = useNavigation()
    const windowHeight = useWindowDimensions().height
    return (
        <ScrollView>
            <View style={[{ minHeight: Math.round(windowHeight) }]}>
                <View style={styles.container}>
                    <View style={styles.rectRow}>
                        <View style={styles.rect}>
                            <Text style={styles.logHours}>Log Hours</Text>
                            <Text style={styles.event}>Event</Text>
                            <View style={styles.placeholderStack}>
                                <TextInput
                                    placeholder="Ex: Minnie's Food Pantry"
                                    textBreakStrategy="highQuality"
                                    style={styles.placeholder}
                                    paddingLeft={20}
                                ></TextInput>
                                <Text style={styles.organizationName}>
                                    Organization Name:
                                </Text>
                            </View>
                            <Text style={styles.description}>Description:</Text>
                            <TextInput
                                placeholder="Ex: "
                                textBreakStrategy="highQuality"
                                style={styles.placeholder1}
                                paddingLeft={20}
                            ></TextInput>
                            <Text style={styles.sponsor}>Sponsor</Text>
                            <Text style={styles.sponsorName}>
                                Sponsor Name:
                            </Text>
                            <TextInput
                                placeholder="Ex: "
                                textBreakStrategy="highQuality"
                                style={styles.placeholder2}
                                paddingLeft={20}
                            ></TextInput>
                            <Text style={styles.sponsorEmail}>
                                Sponsor Email:
                            </Text>
                            <TextInput
                                placeholder="Ex: "
                                textBreakStrategy="highQuality"
                                style={styles.placeholder3}
                                paddingLeft={20}
                            ></TextInput>
                            <Text style={styles.sponsorPhone}>
                                Sponsor Phone:
                            </Text>
                            <TextInput
                                placeholder="Ex: "
                                textBreakStrategy="highQuality"
                                style={styles.placeholder4}
                                paddingLeft={20}
                            ></TextInput>
                            <View style={styles.nextButton}>
                                <TouchableOpacity
                                    style={styles.submitbutton}
                                    onPress={() =>
                                        navigation.navigate('LogHoursSecond')
                                    }
                                >
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.event1}>Event</Text>
                        <Text style={styles.loremIpsum}>Lorem Ipsum</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
        flexDirection: 'row',
    },
    rect: {
        width: '52%',
        height: '90%',
        marginTop: '5%',
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 9,
        borderColor: '#000000',
        borderRadius: 69,
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        bottom: 4,
        textAlignVertical: 'center',
        fontStyle: 'italic',
    },
    logHours: {
        // fontFamily: 'roboto-700',
        color: '#121212',
        fontSize: 20,
        marginTop: 13,
        marginLeft: 132,
    },
    nextButton: {
        width: 150,
        height: 50,
        marginTop: '10%',
        marginLeft: '55%',
    },
    event: {
        //fontFamily: 'roboto-700',
        color: '#121212',
        marginTop: 20,
        marginLeft: 48,
    },
    submitbutton: {
        backgroundColor: '#feb914',
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: '#feb914',
        height: '100%',
        width: '100%',
        padding: 10,
        borderRadius: 30,
    },
    placeholder: {
        top: 15,
        left: 0,
        position: 'absolute',
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
    },
    organizationName: {
        top: 0,
        left: 12,
        position: 'absolute',
        //fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 11,
    },
    placeholderStack: {
        width: 284,
        height: 68,
        marginTop: 16,
        marginLeft: 36,
        marginBottom: 10,
    },
    description: {
        // fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 11,
        marginTop: 14,
        marginLeft: 48,
    },
    placeholder1: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    sponsor: {
        // fontFamily: 'roboto-700',
        color: '#121212',
        marginTop: 22,
        marginLeft: 48,
    },
    sponsorName: {
        // fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 11,
        marginTop: 17,
        marginLeft: 48,
    },
    placeholder2: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginTop: 1,
        marginLeft: 36,
    },
    sponsorEmail: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 11,
        marginTop: 14,
        marginLeft: 48,
    },
    placeholder3: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    sponsorPhone: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        fontSize: 11,
        marginTop: 20,
        marginLeft: 41,
    },
    placeholder4: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: 56,
        width: 284,
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
        marginLeft: 36,
    },
    NextButton: {
        height: 36,
        width: 100,
        backgroundColor: '#feb914',
        borderWidth: 1,
        borderRadius: 27,
        marginTop: 200,
        marginLeft: 0,
    },
    event1: {
        //fontFamily: 'roboto-700',
        color: '#121212',
        marginLeft: 121,
        marginTop: 57,
    },
    loremIpsum: {
        //   fontFamily: 'roboto-regular',
        color: '#121212',
        marginLeft: 125,
        marginTop: 130,
    },
    rectRow: {
        height: '100%',
        flexDirection: 'row',
        flex: 1,
        marginRight: -354,
        marginLeft: 9,

        //marginTop: 67,
    },
})
