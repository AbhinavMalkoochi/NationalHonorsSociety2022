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
    const [loading, setLoading] = useState(false)
    const [isTeacher, setIsTeacher] = useState(false)

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
        const classStudents = []

        return firebase
            .firestore()
            .collection('classroom')
            .doc(classroomDocID)
            .collection('students')
            .onSnapshot(
                async (snapshot) => {
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
    const kickStudent = (ID) => {
        loading = true
        firebase
            .firestore()
            .collection('classroom')
            .doc(classroomDocID)
            .collection('students')
            .doc(JSON.stringify(ID))
            .delete()
        firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .collection('classrooms')
            .doc(JSON.stringify(ID))
            .delete()
        loading = false
    }
    if (loading) {
        return (
            <View>
                <Text>loading</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>Teacher Name: </Text>
                <Text>Teacher Email: {email}</Text>

                <FlatList
                    data={students}
                    renderItem={({ item }) => (
                        <View style={styles.studentContainer}>
                            <Text>{item.firstName}</Text>
                            <Text>{item.lastName}</Text>
                            <TouchableOpacity
                                onPress={() => kickStudent(item.key)}
                            >
                                <Text>Kick</Text>
                            </TouchableOpacity>
                        </View>
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
