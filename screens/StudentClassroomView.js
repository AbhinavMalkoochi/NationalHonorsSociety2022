import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Button,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native'
import 'firebase/auth'
import firebase from 'firebase/app'
export default function StudentClassroomView({ route }) {
    const navigation = useNavigation()
    const [classroomName, setClassroomName] = useState('')
    const [classroomCode, setClassroomCode] = useState('')
    const [classroomDocID, setClassroomDocID] = useState('')
    const currentUserUID = firebase.auth().currentUser.uid
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [teacherID, setTeacherID] = useState('')
    const [students, setStudents] = useState([])
    const [studentID, setStudentID] = useState([])
    useEffect(() => {
        const {
            teacherName,
            teacherID,
            classroomCode,
            classroomDocID,
            classroomName,
            teacherEmail,
        } = route?.params || {}
        setName(teacherName)
        setTeacherID(teacherID)
        setClassroomCode(classroomCode)
        setClassroomDocID(classroomDocID)
        setClassroomName(classroomName)
        setEmail(teacherEmail)
    }, [])
    useEffect(() => {
        const data = []

        const user = firebase
            .firestore()
            .collection('classroom')
            .doc(classroomDocID)
            .collection('students')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((documentSnapshot) => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    })
                })

                setStudentID(data)
            })
        return () => user()
    }, [])

    useEffect(() => {
        const studentRef = []
        const db = firebase.firestore()
        for (let i = 0; i < studentID.length; i++) {
            let item = studentID[i].studentReference
            studentRef.push(db.collection('users').doc(`${item}`).get())
        }
        setStudents(studentRef) // Unsubscribe from events when no longer in use
    }, [studentID])

    return (
        <View>
            <Text>Teacher Name: {name}</Text>
            <Text>Teacher Email: {email}</Text>
            <FlatList
                data={students}
                renderItem={({ item }) => (
                    <View style={styles.studentContainer}>
                        <Text>{item.firstName}</Text>
                        <Text>{item.lastName}</Text>
                    </View>
                )}
            />
        </View>
    )
}
