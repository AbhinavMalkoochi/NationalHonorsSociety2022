import React, { useState } from 'react'
import { registration } from '../fireBaseAPI.js'
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
import SubmitReg from '../assets/custom_buttons/submitreg'

export default function RegistrationSecond({ route }) {
    const navigation = useNavigation()
    const { firstName, lastName, emailAddress, schoolName } = route.params
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [grade, setGrade] = useState('')

    const emptyState = () => {
        setUsername('')
        setPassword('')
        setGrade('')
    }

    const handlePressSec = () => {
        if (!username) {
            Alert.alert('Username is required')
        } else if (!password) {
            Alert.alert(' Password is required.')
        } else if (!grade) {
            Alert.alert('Grade is required.')
        } else {
            registration(
                firstName,
                lastName,
                emailAddress,
                schoolName,
                username,
                password,
                grade
            )
            navigation.navigate('Loading')
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
            <View style={[styles.credentialbox, { height: 240 }]}>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#d6d4d4"
                    style={[styles.reginput, { top: '2%' }]}
                    multiline={false}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#d6d4d4"
                    style={[styles.reginput, { top: '8%' }]}
                    multiline={false}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <TextInput
                    placeholder="Grade Level (else N/A)"
                    placeholderTextColor="#d6d4d4"
                    style={[styles.reginput, { top: '14%' }]}
                    multiline={false}
                    onChangeText={(text) => setGrade(text)}
                    value={grade}
                />
            </View>
            <SubmitReg text="Submit" onPress={handlePressSec} />
            <View
                style={{
                    top: '64.5%',
                    left: '59%',
                    position: 'absolute',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{ color: '#feb914' }}>Previous Page</Text>
                </TouchableOpacity>
            </View>
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
        height: 820,
        width: 380,
    },
    secondblue: {
        backgroundColor: '#0f2644',
        height: 800,
        width: 360,
        position: 'absolute',
    },
    goldback: {
        backgroundColor: '#feb914',
        position: 'absolute',
        height: 780,
        width: 340,
    },
    finalblue: {
        backgroundColor: '#0f2644',
        height: 760,
        width: 320,
        position: 'absolute',
    },
    logo: {
        height: 130,
        width: 130,
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
        height: 200,
        width: 300,
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
        height: 200,
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
        width: 260,
        left: '5%',
    },
})
