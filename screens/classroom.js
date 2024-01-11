import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import ModalDropdown from 'react-native-modal-dropdown'
import { createClasroomFb } from '../fireBaseAPI'
import 'firebase/auth'
import firebase from 'firebase/app'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { joinClasroomFb } from '../fireBaseAPI'
import { joinClassHelper } from '../fireBaseAPI'
import { hasStartedLocationUpdatesAsync } from 'expo-location'
export default function ClassroomScreen() {
    const [modalDropFlag, setModalDrop] = useState(false)
    const navigation = useNavigation()
    const [classroomName, setClassroomName] = useState('')
    const [classroomCode, setClassroomCode] = useState('')
    const [joinCode, setJoinCode] = useState('')
    const [classroomDocID, setClassroomDocID] = useState('')
    const currentUserUID = firebase.auth().currentUser.uid
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ref, setRef] = useState('')
    const [loading, setLoading] = useState(true) // Set loading to true on component mount
    const [classrooms, setClassrooms] = useState([])
    const [classroomObj, setClassroomObj] = useState([])
    const [forceReload, setForceReload] = useState(false)
    const [joinFlag, setJoinFlag] = useState(false)
    const classroomRef = []
    const [error, setError] = useState('')

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
                setName(dataObj.firstName + dataObj.lastName)
                setEmail(dataObj.emailAddress)
            }
        }
        getData()
    }, [])

    const createClassroom = (text) => {
        setClassroomName(text)
        let charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let temp = ''
        for (let i = 0; i < 10; i++) {
            temp += charset[Math.floor(Math.random() * charset.length)]
        }
        setClassroomCode(temp)
    }

    const onCreateSubmit = () => {
        createClasroomFb(
            classroomName,
            classroomCode,
            name,
            email,
            currentUserUID
        )
        onJoinSubmit()
        setForceReload(!forceReload)
    }
    const onJoinSubmit = () => {
        joinClassHelper(joinCode, currentUserUID)
        setJoinFlag(true)
        setForceReload(!forceReload)
    }
    {
        /* useEffect(() => {
        const dataUpdate = async () => {
            setLoading(true)
            const data = []
            let a = await firebase
                .firestore()
                .collection('users')
                .doc(currentUserUID)
                .collection('classrooms')
                .get()

            a.forEach((doc) => {
                data.push({
                    ...doc.data(),
                    key: doc.id,
                })
            })
            setClassrooms(data)
            const promises = []
            promises = classrooms.map((classroom) => {
                let item = classroom[i].classroomDocID
                    await firebase
                    .firestore()
                    .collection('classroom')
                    .doc(item)
                    .get()
                    .catch((error) => {
                        Alert.alert(
                            'Error getting documents: ',
                            error.message
                        )
                    })
                })            
                Promise.all(promises).then((items)=>{setClassroomObj(items)}).catch((error)=>{Alert.alert('Error getting documents: ', error.message)})

        }
        dataUpdate().catch((err) => {
            Alert.alert('There is something wrong!!!!', err.message)
        })
    }, [])*/
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .collection('classrooms')
            .onSnapshot(
                async (snapshot) => {
                    const userClassrooms = []
                    for (let classroom of snapshot.docs) {
                        const ID = await firebase
                            .firestore()
                            .collection('classroom')
                            .doc(classroom.data().classroomDocID)
                            .get()
                        if (ID.exists) {
                            userClassrooms.push({
                                ...ID.data(),
                                identification: classroom.data(),
                                ID: classroom.id,
                            })
                        } else {
                            firebase
                                .firestore()
                                .collection('users')
                                .doc(currentUserUID)
                                .collection('classrooms')
                                .doc(classroom.data().classroomDocID)
                                .delete()
                        }
                    }

                    setLoading(false)
                    setClassrooms(userClassrooms)
                },
                (error) => {
                    setLoading(false)
                    setError(error.message)
                }
            )
    }, [])

    {
        /*
            for (let i = 0; i < classrooms.length; i++) {
                let item = classrooms[i].classroomDocID
                try {
                    let a = await firebase
                        .firestore()
                        .collection('classroom')
                        .doc(item)
                        .get()
                        .catch((error) => {
                            Alert.alert(
                                'Error getting documents: ',
                                error.message
                            )
                        })
                        
                    classroomRef.push(a.data())
                } catch (err) {
                    setLoading(false)
                    Alert.alert('There is something wrong!!!!', err.message)
                }
            }
            //classroomRef.push(db.collection('classroom').doc(`${item}`).get())
            setClassroomObj(classroomRef) // Unsubscribe from events when no longer in use

            
useEffect(() => {
        const refUpdate = async () => {
            for (let i = 0; i < classrooms.length; i++) {
                let item = classrooms[i].classroomDocID
                try {
                    let a = await firebase
                        .firestore()
                        .collection('classroom')
                        .doc(item)
                        .get()
                        .catch((error) => {
                            Alert.alert(
                                'Error getting documents: ',
                                error.message
                            )
                        })
                    classroomRef.push(a.data())
                } catch (err) {
                    setLoading(false)
                    Alert.alert('There is something wrong!!!!', err.message)
                }
            }
            //classroomRef.push(db.collection('classroom').doc(`${item}`).get())
            setClassroomObj(classroomRef) // Unsubscribe from events when no longer in use
        }
        refUpdate().catch((err) => {
            Alert.alert('There is something wrong!!!!', err.message)
        })
    }, [classrooms])



*/
    }

    const modalHandler = () => {
        setModalDrop(true)
    }

    {
        /*
  birthdays.map((item) => {
        try {
            const db = firebase.firestore()
            db.collection('Birthdays')
                .where(
                    firebase.firestore.FieldPath.documentId(),
                    '==',
                    item.birthdayID
                )
                .limit(1)
                .get()
                .then((querySnapshot) => {
                    matchingBirthday.push({
                        // ????
                    })
                })
                .catch((error) => {
                    Alert.alert('Error getting documents: ', error.message)
                })
        } catch (err) {
            Alert.alert('There is something wrong!!!!', err.message)
        }
    })

    
   const onJoinSubmit = async () => {
        const db = firebase.firestore()
        db.collection('classroom')
            .where('Classroom_Code', '==', joinCode)
            .limit(1)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setClassroomDocID(doc.id)
                    console.log(doc.id)
                })
            })
            .catch((error) => {
                Alert.alert('Error getting documents: ', error)
            })
        studentClassDoc()
    }
    const studentClassDoc = async () => {
        let docRef = db.collection('users').doc(currentUserUID)
        setRef(docRef)
        db = firebase.firestore()
        try {
            let docRef = db.collection('users').doc(currentUserUID)
            setRef(docRef)
            db.collection('classroom')
                .doc(classroomDocID)
                .collection('students')
                .doc(currentUserUID)
                .set({ studentReference: docRef.id })
        } catch (err) {
            Alert.alert('There is something wrong!!!!', err.message)
        }
    }








*/
    }
    const leaveClassroom = (classroomID) => {
        loading = true
        firebase
            .firestore()
            .collection('classroom')
            .doc(classroomDocID)
            .collection('students')
            .doc(JSON.stringify(classroomID))
            .delete()
        firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .collection('classrooms')
            .doc(JSON.stringify(classroomID))
            .delete()
        loading = false
    }
    const validateTeacher = async ({ item }) => {
        const db = firebase.firestore()
        db.collection('classroom')
            .doc(item.ID)
            .collection('teachers')
            .doc(currentUserUID)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return true
                } else {
                    return false
                }
            })
            .catch((error) => {
                Alert.alert('Error getting documents: ', error.message)
            })
    }
    const studentTeacherHandler = ({ item }) => {
        if (validateTeacher(item)) {
            navigation.navigate('TeacherClassroomView', {
                teacherName: item.teacherName,
                teacherID: currentUserUID,
                classroomCode: item.Classroom_Code,
                classroomDocID: item.ID,
                classroomName: item.Classroom_Name,
                teacherEmail: item.teacherEmail,
            })
        } else {
            navigation.navigate('StudentClassroomView', {
                teacherName: item.teacherName,
                teacherID: item.teacherID,
                classroomCode: item.Classroom_Code,
                classroomDocID: item.ID,
                classroomName: item.Classroom_Name,
                teacherEmail: item.teacherEmail,
            })
        }
    }
    if (loading) {
        return (
            <View>
                <Text>loading</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.rect}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={classrooms}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => studentTeacherHandler({ item })}
                                style={styles.classroomBox}
                            >
                                <Text style={styles.classroomTitle}>
                                    {item.ID}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={() => leaveClassroom(item)}>
                        <Text> Leave</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => modalHandler(item.ID)}
                    >
                        <Image
                            source={require('../assets/images/AddButton.png')}
                            resizeMode="contain"
                            style={{ width: 35, height: 35 }}
                        />
                    </TouchableOpacity>
                    <Modal visible={modalDropFlag}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                textAlignVertical="top"
                                textAlign="center"
                                style={{ top: '5%' }}
                            >
                                {joinCode}
                            </Text>
                            <View style={styles.inputStack}>
                                <Text>Enter Join Code</Text>
                                <TextInput
                                    paddingLeft={20}
                                    style={styles.textInputStack}
                                    onChangeText={(text) => setJoinCode(text)}
                                ></TextInput>
                                <Button
                                    title="Submit"
                                    onPress={() => onJoinSubmit()}
                                />
                                <Text style={{ paddingTop: 50 }}>
                                    Enter Classroom Name
                                </Text>
                                <TextInput
                                    paddingLeft={20}
                                    style={styles.textInputStack}
                                    onChangeText={(text) =>
                                        createClassroom(text)
                                    }
                                ></TextInput>
                                <Button
                                    title="Submit"
                                    onPress={() => onCreateSubmit()}
                                />
                            </View>

                            <Button
                                title="Close"
                                onPress={() => setModalDrop(false)}
                            />
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    rect: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
    },
    buttonContainer: {
        //marginLeft: 350,
        left: 370,
        width: 100,
        height: 100,
    },
    modalContainer: {
        height: '15%',
        width: '25%',
        left: '70%',
        marginTop: 20,
        backgroundColor: 'white',
    },
    classroomBox: {
        width: 500,
        height: 250,
        marginTop: 50,
        backgroundColor: '#feb914',
        borderRadius: 25,
        marginLeft: 20,
    },
    classTitleContainer: {
        width: '90%',
        height: '20%',
        //backgroundColor: 'white',
        marginTop: 30,
        marginLeft: 30,
    },
    classroomTitle: {
        fontSize: 50,
    },
    inputStack: {
        height: '100%',
        width: '100%',
        padding: '5%',
        paddingTop: '20%',
    },
    textInputStack: {
        //fontFamily: 'roboto-regular',
        color: '#121212',
        height: '20%',
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
    },
})
