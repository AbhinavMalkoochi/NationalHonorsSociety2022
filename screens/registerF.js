import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    __spread,
    Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import NextButton from '../assets/custom_buttons/nextbutton'

export default function Register() {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [emailAddress, setemailAddress] = useState('')
    const [schoolName, setschoolName] = useState('')
    const navigation = useNavigation()

    const submitForm = () => {}
    const emptyState = () => {
        setfirstName('')
        setlastName('')
        setemailAddress('')
        setschoolName('')
    }

    const handlePress = () => {
        if (!firstName) {
            Alert.alert('First name is required')
        } else if (!lastName) {
            Alert.alert('Last name is required.')
        } else if (!emailAddress) {
            Alert.alert('Email is required.')
        } else if (!schoolName) {
            Alert.alert('School name is required.')
        } else {
            /*
  registrationFirst(
  firstName,
  lastName,
  emailAddress,
  schoolName
  );
        */

            emptyState()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.lastback}></View>
            <View style={styles.secondblue}></View>
            <View style={styles.goldback}></View>
            <View style={styles.finalblue}></View>
            <Image
                source={require('../assets/images/NHSLogoSquare.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={[styles.subtextpos, { top: '25%' }]}>
                <Text style={styles.subtext}>Registration</Text>
            </View>
            <Text style={styles.regtext}> Personal Information </Text>
            <View style={[styles.credentialbox, { height: '35%' }]}>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#d6d4d4"
                    style={styles.reginput}
                    multiline={false}
                    value={firstName}
                    onChangeText={(text) => setfirstName(text)}
                />
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#d6d4d4"
                    style={[styles.reginput, { top: '8%' }]}
                    multiline={false}
                    value={lastName}
                    onChangeText={(text) => setlastName(text)}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#d6d4d4"
                    style={[styles.reginput, { top: '16%' }]}
                    multiline={false}
                    value={emailAddress}
                    onChangeText={(text) => setemailAddress(text)}
                />
                <TextInput
                    placeholder="School Name"
                    placeholderTextColor="#d6d4d4"
                    style={[styles.reginput, { top: '24%' }]}
                    multiline={false}
                    value={schoolName}
                    onChangeText={(text) => setschoolName(text)}
                />
            </View>
            <View
                style={{
                    top: '72.5%',
                    left: '40%',
                    position: 'absolute',
                }}
            >
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#feb914' }}>
                        Already have an account?
                    </Text>
                </TouchableOpacity>
            </View>
            <NextButton
                text="NEXT"
                onPress={() => {
                    navigation.navigate('RegisterSecond', {
                        firstName,
                        lastName,
                        emailAddress,
                        schoolName,
                    })
                    handlePress()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f2644',
        justifyContent: 'center',
        alignItems: 'center',
    },

    lastback: {
        backgroundColor: '#fff',
        height: '95%',
        width: '95%',
    },
    secondblue: {
        backgroundColor: '#0f2644',
        height: '90%',
        width: '90%',
        position: 'absolute',
    },
    goldback: {
        backgroundColor: '#feb914',
        position: 'absolute',
        height: '85%',
        width: '85%',
    },
    finalblue: {
        backgroundColor: '#0f2644',
        height: '80%',
        width: '80%',
        position: 'absolute',
    },
    logo: {
        height: '20%',
        width: '20%',
        top: '8%',
        position: 'absolute',
    },
    subtext: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        //fontFamily:'Cremona-Regular'
    },
    subtextpos: {
        position: 'absolute',
        top: '30%',
    },
    credentialbox: {
        backgroundColor: '#585858',
        height: '29%',
        width: '75%',
        top: '40%',
        position: 'absolute',
        padding: 10,
        borderWidth: 1,
        borderRadius: 25,
    },
    usernameinput: {
        padding: 10,
        fontSize: 18,
        height: 100,
    },
    passwordinput: {
        padding: 10,
        height: '30%',
        marginTop: 15,
    },
    register: {
        top: '84%',
        position: 'absolute',
        alignItems: 'center',
    },
    regtext: {
        top: '35%',
        fontStyle: 'italic',
        color: '#feb914',
        position: 'absolute',
        fontSize: 30,
    },
    reginput: {
        padding: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#fff',
        width: '75%',
        left: '5%',
    },
})
