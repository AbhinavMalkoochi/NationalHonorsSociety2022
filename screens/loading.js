import React, { useEffect } from 'react'
import { ActivityIndicator, View, __spread } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase/app'
import 'firebase/auth'

export default function Loading() {
    const navigation = useNavigation()
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Dashboard')
            } else {
                navigation.navigate('Login')
            }
        })
    })
    return (
        <View>
            <ActivityIndicator size="large" />
        </View>
    )
}
