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
import FlatButton from '../assets/custom_buttons/submitbutton.js'
import { useNavigation } from '@react-navigation/native'
import { signIn } from '../fireBaseAPI.js'
import { ScrollView } from 'react-native-gesture-handler'

//screens: classroom, announcements, logging hours
export default function Login() {
    const [username, setusernameLog] = useState('')
    const [password, setpasswordLog] = useState('')
    const navigation = useNavigation()

    const submitForm = () => {}
    const registerHandler = () => {}
    const forgotPassHandler = () => {}
    const toRegister = () => {}
    const addPerson = () => {
        if (!username) {
            Alert.alert('Email field is required.')
        }

        if (!password) {
            Alert.alert('Password field is required.')
        }
        signIn(username, password)
        setusernameLog('')
        setpasswordLog('')
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
        >
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
                <View style={styles.subtextpos}>
                    <Text style={[styles.subtext, { fontSize: 25 }]}>
                        Celebrating 100 Years{'\n'} of Service
                    </Text>
                </View>
                <View style={styles.credentialbox}>
                    <View style={styles.usernameinput}>
                        <TextInput
                            placeholder="Enter Username"
                            placeholderTextColor="#d6d4d4"
                            multiline={false}
                            value={username}
                            onChangeText={(text) => setusernameLog(text)}
                            style={{
                                top: '30%',
                                right: '3%',
                                borderBottomWidth: 3,
                                borderBottomColor: '#fff',
                                width: 260,
                            }}
                        />
                    </View>

                    <View style={styles.passwordinput}>
                        <TextInput
                            placeholder="Enter Password"
                            placeholderTextColor="#d6d4d4"
                            secureTextEntry={true}
                            value={password}
                            multiline={false}
                            onChangeText={(text) => setpasswordLog(text)}
                            style={{
                                top: '4%',
                                right: '3%',
                                borderBottomWidth: 3,
                                borderBottomColor: '#fff',
                                width: 260,
                            }}
                        />
                    </View>
                </View>

                <View style={{ left: '52%', top: '63%', position: 'absolute' }}>
                    <TouchableOpacity onPress={() => forgotPassHandler}>
                        <Text
                            style={{
                                color: '#feb914',
                            }}
                        >
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatButton text="SIGN IN" onPress={addPerson} />
                <View style={styles.register}>
                    <Text style={{ color: 'white', fontSize: 15 }}>
                        New to NHS?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text
                            style={{
                                color: '#feb419',
                                fontWeight: 'bold',
                                textDecorationLine: 'underline',
                                fontSize: 15,
                            }}
                        >
                            Register New Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        height: 180,
        width: 180,
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
        height: 230,
        width: 290,
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
        marginTop: 5,
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
        left: '5%',
        width: 270,
    },
})
