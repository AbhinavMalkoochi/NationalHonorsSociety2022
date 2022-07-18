import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    Text,
    View,
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
export default function TeacherClassroomView({ route }) {
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
    const [loading, setLoading] = useState(false)
    const VolunteerPageNavigation = ({ item }) => {
        navigation.navigate('StudentVolunteerInfo', { item: item })
    }
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

        return firebase
            .firestore()
            .collection('classroom')
            .doc(classroomDocID)
            .collection('students')
            .onSnapshot(
                async (snapshot) => {
                    const classStudents = []
                    for (let student of snapshot.docs) {
                        const ID = await firebase
                            .firestore()
                            .collection('users')
                            .doc(student.data().studentReference)
                            .get()

                        classStudents.push({
                            ...ID.data(),
                            identification: student.data(),
                            key: student.id,
                        })
                    }
                    setLoading(false)
                    setStudents(classStudents)
                },
                (error) => {
                    setLoading(false)
                    setError(error.message)
                }
            )
    }, [])

    if (students.length <= 0) {
        return (
            <View>
                <Text>loading</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>Teacher Name: {students[0].firstName}</Text>
                <Text>Teacher Email: {email}</Text>

                <FlatList
                    data={students}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.studentContainer}
                            onPress={() => VolunteerPageNavigation({ item })}
                        >
                            <Text>{item.firstName}</Text>
                            <Text>{item.lastName}</Text>
                            <Text>{item.totalHours}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    studentContainer: {
        flexDirection: 'row',
        width: 500,
        height: 250,
        marginTop: 50,
        backgroundColor: '#feb914',
        borderRadius: 25,
        marginLeft: 20,
    },
})
