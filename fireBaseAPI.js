import * as firebase from 'firebase'
import 'firebase/firestore'
import { Alert } from 'react-native'
import * as RootNavigation from './RootNavigation'
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
