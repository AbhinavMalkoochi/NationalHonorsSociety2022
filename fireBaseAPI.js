import firebase from 'firebase/app'
import 'firebase/firestore'
import { Alert } from 'react-native'
import { JumpingTransition } from 'react-native-reanimated'
import * as RootNavigation from './RootNavigation'
let ida = ' '
export async function registration(
    firstName,
    lastName,
    emailAddress,
    schoolName,
    username,
    password,
    grade
) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(username, password)

        const currentUser = firebase.auth().currentUser

        const db = firebase.firestore()
        db.collection('users')
            .doc(currentUser.uid)
            .set({
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                schoolName: schoolName,
                username: username,
                password: password,
                grade: Number(grade),
            })
    } catch (err) {
        Alert.alert('There is something wrong!!!!', err.message)
    }
}

export async function hoursCompleted(
    hours,
    date,
    totalHours,
    organization,
    description,
    sponsorName,
    sponsorEmail,
    sponsorNum,
    attachment1,
    attachment2,
    attachment3
) {
    try {
        const currentUser = firebase.auth().currentUser

        const db = firebase.firestore()
        db.collection('users')
            .doc(currentUser.uid)
            .collection('VolunteerDateTime')
            .doc()
            .set({
                hours: Number(hours),
                date: Number(date),
                totalHours: Number(totalHours),
                organization: organization,
                description: description,
                sponsorName: sponsorName,
                sponsorEmail: sponsorEmail,
                sponsorNum: Number(sponsorNum),
                attachment1: JSON.stringify(attachment1),
                attachment2: JSON.stringify(attachment2),
                attachment3: JSON.stringify(attachment3),
            })
    } catch (err) {
        Alert.alert('There is something wrong!!!!', err.message)
    }
    try {
        const currentUser = firebase.auth().currentUser
        const db = firebase.firestore()
        db.collection('users')
            .doc(currentUser.uid)
            .update({
                totalHours: Number(totalHours),
            })
    } catch (err) {
        Alert.alert('There is something wrong!!!!', err.message)
    }
}

// Creates a new classroom document
export async function createClasroomFb(
    classroomName,
    classroomCode,
    teacherName,
    teacherEmail,
    userID
) {
    try {
        const currentUser = firebase.auth().currentUser
        const db = firebase.firestore()
        db.collection('classroom').doc().set({
            Classroom_Name: classroomName,
            Classroom_Code: classroomCode,
            teacherName: teacherName,
            teacherEmail: teacherEmail,
            teacherID: userID,
        })
    } catch (err) {
        Alert.alert('There is something wrong!!!!', err.message)
    }
}

// Returns the clasroom document with the given classroom code
export async function joinClasroomFb(joinCode) {
    try {
        const db = firebase.firestore()
        return await db
            .collection('classroom')
            .where('Classroom_Code', '==', joinCode)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    return querySnapshot.docs[0].id
                }
            })
            .catch((error) => {
                Alert.alert('Error getting documents: ', error.message)
            })
    } catch (err) {
        Alert.alert('There is something wrong!!!!', err.message)
    }
}

export async function joinClassHelper(joinCode, currentUserUID) {
    let log = ' '
    log = await joinClasroomFb(joinCode)
    studentClassDoc(log, currentUserUID)
}

// Adds the student to the classroom doc
export async function studentClassDoc(classroomDocID, currentUserUID) {
    const db = firebase.firestore()
    let docRef = db.collection('users').doc(currentUserUID)
    try {
        db.collection('classroom')
            .doc(classroomDocID)
            .collection('students')
            .doc(JSON.stringify(currentUserUID))
            .set({ studentReference: currentUserUID })
    } catch (err) {
        Alert.alert('There is something wrong 2!!!!', err.message)
    }
    studentClassAssign(classroomDocID, currentUserUID)
}

// Adds classroom ID to student doc
export async function studentClassAssign(classroomDocID, currentUserUID) {
    const db = firebase.firestore()
    try {
        db.collection('users')
            .doc(currentUserUID)
            .collection('classrooms')
            .doc(classroomDocID)
            .set({ classroomDocID: classroomDocID })
    } catch (err) {
        Alert.alert('There is something wrong 2!!!!', err.message)
    }
}

/*
const getDate = () => {
    documentRef.get().toPromise()
    return Promise((resolve, reject) => {
        var documentRef = db.collection('users').doc(currentUser.uid)
        teacherID = currentUser.uid
        documentRef
            .get()
            .toPromise()
            .then((doc) => {
                teacherName = doc.data().firstName
                teacherEmail = doc.data().emailAddress
                teacherPhone = doc.data().phoneNumber
                resolve(firstName)
                resolve(emailAddress)
                resolve(phoneNumber)
            })
            .catch(function (error) {
                console.log('Error getting document:', error)
                reject(err)
            })
    })
}*/
export async function signIn(username, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(username, password)
        RootNavigation.navigate('Dashboard', { username: { username } })
    } catch (err) {
        Alert.alert('There is something wrong!!!!', err.message)
    }
}

export async function logOut() {
    try {
        await firebase.auth().signOut()
    } catch (err) {
        Alert.alert('There is something wrong!', err.message)
    }
}

/*
export async function registrationSec(username,password,grade) {
    try {
  
      const currentUser = firebase.auth().currentUser;
  
      const db = firebase.firestore();
      db.collection("users")
        .doc('UQ5QSsQZ6xrNnSMT1qJt')
        .collection('classUsers')
        .add({            
          username:username,
          password:password,
          grade:grade
        });
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
    }
  }
  */
