import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, __spread } from 'react-native'
import RegistrationSecond from './screens/register'
import Register from './screens/registerF'
import Dashboard from './screens/dashboard'
import Loading from './screens/loading'
import Login from './screens/login'
import { navigationRef } from './RootNavigation'
import LogHoursScreen from './screens/logHours'
import LogHoursSecond from './screens/LogHoursSecond'
import apiKeys from './config/keys.js'
import firebase from 'firebase/compat/app'
import DrawerNav from './screens/dashboard'
import StudentClassroomView from './screens/StudentClassroomView'
import ClassroomScreen from './screens/classroom'
import TeacherClassroomView from './screens/TeacherClassroomView'
import StudentVolunteerInfo from './screens/StudentVolunteerInfo'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="RegisterSecond"
                    component={RegistrationSecond}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Loading"
                    component={Loading}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="logHours"
                    component={LogHoursScreen}
                    options={{
                        title: 'Log Hours',
                        headerShown: 'true',
                    }}
                />

                <Stack.Screen
                    name="LogHoursSecond"
                    component={LogHoursSecond}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
                <Stack.Screen
                    name="Classroom"
                    component={ClassroomScreen}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
                <Stack.Screen
                    name="StudentClassroomView"
                    component={StudentClassroomView}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
                <Stack.Screen
                    name="TeacherClassroomView"
                    component={TeacherClassroomView}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
                <Stack.Screen
                    name="StudentVolunteerInfo"
                    component={StudentVolunteerInfo}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
                <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
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
