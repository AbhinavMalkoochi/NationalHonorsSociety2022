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
    ScrollView,
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import { createClasroomFb } from '../fireBaseAPI'
import 'firebase/auth'
import firebase from 'firebase/app'

export default function SettingsScreen() {
    const navigation = useNavigation()
    const db = firebase.firestore()
    const currentUserUID = firebase.auth().currentUser.uid
    const [forceReload, setForceReload] = useState(false)
    const [student, setStudent] = useState({})
    const [firstNameEdit, setFirstNameEdit] = useState(false)
    const [lastNameEdit, setLastNameEdit] = useState(false)
    const [usernameEdit, setUsernameEdit] = useState(false)
    const [passwordEdit, setPasswordEdit] = useState(false)
    const [schoolNameEdit, setSchoolNameEdit] = useState(false)
    const [gradeEdit, setGradeEdit] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [grade, setGrade] = useState('')

    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .get()
            .then((doc) => {
                setStudent(doc.data())
            })
    }, [forceReload])

    const changeFirstName = () => {
        setForceReload(!forceReload)
        setFirstNameEdit(false)
        db.collection('users')
            .doc(currentUserUID)
            .update({ firstName: firstName })
    }
    const changeLastName = () => {
        setForceReload(!forceReload)
        setLastNameEdit(false)
        db.collection('users')
            .doc(currentUserUID)
            .update({ lastName: lastName })
    }
    const changeUsername = () => {
        setForceReload(!forceReload)
        setUsernameEdit(false)
        db.collection('users')
            .doc(currentUserUID)
            .update({ username: username })
    }

    const changePassword = () => {
        setForceReload(!forceReload)
        setPasswordEdit(false)
        db.collection('users')
            .doc(currentUserUID)
            .update({ password: password })
    }
    const changeSchoolName = () => {
        setForceReload(!forceReload)
        setSchoolNameEdit(false)
        db.collection('users')
            .doc(currentUserUID)
            .update({ schoolName: schoolName })
    }
    const changeGrade = () => {
        setForceReload(!forceReload)
        setGradeEdit(false)
        db.collection('users').doc(currentUserUID).update({ grade: grade })
    }
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
        >
            <View style={styles.container}>
                <View style={styles.rectRow}>
                    <View style={styles.rect}>
                        <View style={{ height: 110 }}>
                            <Text style={{ left: '10%', marginTop: '5%' }}>
                                First Name:
                            </Text>

                            <TextInput
                                defaultValue={student.firstName}
                                style={styles.textInput}
                                paddingLeft={20}
                                editable={firstNameEdit}
                                onChangeText={(text) => setFirstName(text)}
                            />
                            <View style={styles.editImageComp}>
                                <TouchableOpacity
                                    onPress={() => setFirstNameEdit(true)}
                                >
                                    <Image
                                        source={require('../assets/icons/edit-2.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.saveimageComp}>
                                <TouchableOpacity
                                    onPress={() => changeFirstName()}
                                >
                                    <Image
                                        source={require('../assets/icons/save.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 110 }}>
                            <Text style={{ left: '10%', marginTop: '5%' }}>
                                Last Name :
                            </Text>
                            <TextInput
                                defaultValue={student.lastName}
                                style={styles.textInput}
                                paddingLeft={20}
                                editable={lastNameEdit}
                                onChangeText={(text) => setLastName(text)}
                            />
                            <View style={styles.editImageComp}>
                                <TouchableOpacity
                                    onPress={() => setLastNameEdit(true)}
                                >
                                    <Image
                                        source={require('../assets/icons/edit-2.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.saveimageComp}>
                                <TouchableOpacity
                                    onPress={() => changeLastName()}
                                >
                                    <Image
                                        source={require('../assets/icons/save.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 110 }}>
                            <Text style={{ left: '10%', marginTop: '5%' }}>
                                Username:
                            </Text>
                            <TextInput
                                defaultValue={student.username}
                                style={styles.textInput}
                                paddingLeft={20}
                                editable={usernameEdit}
                                onChangeText={(text) => setUsername(text)}
                            />
                            <View style={styles.editImageComp}>
                                <TouchableOpacity
                                    onPress={() => setUsernameEdit(true)}
                                >
                                    <Image
                                        source={require('../assets/icons/edit-2.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.saveimageComp}>
                                <TouchableOpacity
                                    onPress={() => changeUsername()}
                                >
                                    <Image
                                        source={require('../assets/icons/save.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 110 }}>
                            <Text style={{ left: '10%', marginTop: '5%' }}>
                                Password:
                            </Text>
                            <TextInput
                                defaultValue={student.password}
                                style={styles.textInput}
                                paddingLeft={20}
                                editable={passwordEdit}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <View style={styles.editImageComp}>
                                <TouchableOpacity
                                    onPress={() => setPasswordEdit(true)}
                                >
                                    <Image
                                        source={require('../assets/icons/edit-2.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.saveimageComp}>
                                <TouchableOpacity
                                    onPress={() => changePassword()}
                                >
                                    <Image
                                        source={require('../assets/icons/save.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 110 }}>
                            <Text style={{ left: '10%', marginTop: '5%' }}>
                                School Name:
                            </Text>
                            <TextInput
                                defaultValue={student.schoolName}
                                style={styles.textInput}
                                paddingLeft={20}
                                editable={schoolNameEdit}
                                onChangeText={(text) => setSchoolName(text)}
                            />
                            <View style={styles.editImageComp}>
                                <TouchableOpacity
                                    onPress={() => setSchoolNameEdit(true)}
                                >
                                    <Image
                                        source={require('../assets/icons/edit-2.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.saveimageComp}>
                                <TouchableOpacity
                                    onPress={() => changeSchoolName()}
                                >
                                    <Image
                                        source={require('../assets/icons/save.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 110 }}>
                            <Text style={{ left: '10%', marginTop: '5%' }}>
                                Grade:
                            </Text>
                            <TextInput
                                defaultValue={JSON.stringify(student.grade)}
                                style={styles.textInput}
                                paddingLeft={20}
                                editable={gradeEdit}
                                onChangeText={(text) => setGrade(text)}
                            />
                            <View style={styles.editImageComp}>
                                <TouchableOpacity
                                    onPress={() => setGradeEdit(true)}
                                >
                                    <Image
                                        source={require('../assets/icons/edit-2.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.saveimageComp}>
                                <TouchableOpacity onPress={() => changeGrade()}>
                                    <Image
                                        source={require('../assets/icons/save.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
        flexDirection: 'row',
    },
    rect: {
        width: '100%',
        height: '95%',
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 9,
        borderColor: '#000000',
        borderRadius: 69,
    },
    rectRow: {
        height: '99%',
        flexDirection: 'row',
        width: '100%',
    },
    textInput: {
        color: '#121212',
        height: 75,
        width: 275,
        left: '5%',
        borderRadius: 20,
        backgroundColor: 'rgba(15,15, 15,0.07)',
    },
    editImageComp: {
        height: 25,
        width: 25,
        left: 310,
        bottom: 49,
    },
    saveimageComp: {
        height: 25,
        width: 25,
        left: 350,
        bottom: 75,
    },
})
