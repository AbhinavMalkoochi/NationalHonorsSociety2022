import { ReactNative, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import 'firebase/auth'
import firebase from 'firebase/app'
export default function StudentVolunteerInfo({ route }) {
    const [student, setStudent] = useState({})
    const navigation = useNavigation()
    const [volunteerEvents, setVolunteerEvents] = useState([{}])
    const { item } = route?.params || {}
    setStudent(item)
    useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('VolunteerDateTime')
            .onSnapshot((querySnapshot) => {
                const volunteerEvent = []
                querySnapshot.forEach((doc) => {
                    volunteerEvent.push(doc.data())
                })
                setVolunteerEvents(volunteerEvent)
            })
    }, [])
    return (
        <View>
            <View style={styles.rect}>
                <FlatList
                    style={{ flex: 1 }}
                    data={volunteerEvents}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.classroomBox}>
                            <Text style={styles.classroomTitle}>
                                {item.hours}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    rect: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
    },
    classroomBox: {
        width: 500,
        height: 250,
        marginTop: 50,
        backgroundColor: '#feb914',
        borderRadius: 25,
        marginLeft: 20,
    },
    classroomTitle: {
        fontSize: 50,
    },
})
