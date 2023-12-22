import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, __spread } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import firebase from 'firebase/app'
import SubmitReg from '../assets/custom_buttons/submitreg'
import { logOut } from '../fireBaseAPI.js'
import ClassroomScreen from '../screens/classroom'
import LogHoursScreen from '../screens/logHours'
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'firebase/auth'
import LogHoursSecond from './LogHoursSecond'
import StudentClassroomView from './StudentClassroomView'
import SettingsScreen from './SettingsScreen'
const wait = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}
function Dashboard() {
    const navigation = useNavigation()
    const currentUserUID = firebase.auth().currentUser.uid
    const [firstName, setfirstName] = useState('')
    const [grade, setGrade] = useState('')
    const [totalHours, setTotalHours] = useState(0)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        async function getData() {
            let doc = await firebase
                .firestore()
                .collection('users')
                .doc(currentUserUID)
                .get()
            if (!doc.exists) {
            } else {
                let dataObj = doc.data()
                setfirstName(dataObj.firstName)
                setGrade(dataObj.grade)
                setTotalHours(dataObj.totalHours)
            }
        }
        getData()
    }, [])

    const logOutButton = () => {
        logOut()
        navigation.navigate('Login')
    }
    return (
        <View style={styles.container}>
            <Text style={{ color: '#000' }}>
                Welcome {firstName} in grade {grade} with {totalHours} hours
            </Text>
            <SubmitReg text="Log Out" onPress={logOutButton} />
        </View>
    )
}
const Drawer = createDrawerNavigator()

export default function DrawerNav() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerShown: 'true',
                }}
            />
            <Drawer.Screen
                name="classroom"
                component={ClassroomScreen}
                options={{
                    title: 'Classroom',
                }}
            />
            <Drawer.Screen
                name="logHours"
                component={LogHoursScreen}
                options={{
                    title: 'Log Hours',
                    headerShown: 'true',
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    headerShown: 'true',
                }}
            />
            <Drawer.Screen
                name="LogHoursSecond"
                component={LogHoursSecond}
                options={{
                    drawerItemStyle: {
                        display: 'none',
                    },
                }}
            />
            <Drawer.Screen
                name="StudentClassroomView"
                component={StudentClassroomView}
                options={{
                    drawerItemStyle: {
                        display: 'none',
                    },
                }}
            />
        </Drawer.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollview: {
        backgroundColor: 'white',
        position: 'relative',
    },
})
