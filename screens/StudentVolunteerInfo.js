import {
    ReactNative,
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import 'firebase/auth'
import firebase from 'firebase/app'
import { EventEmitter } from 'expo-modules-core'
import reactStringReplace from 'react-string-replace'
import { isLoading } from 'expo-font'
export default function StudentVolunteerInfo({ route }) {
    const [student, setStudent] = useState('')
    const navigation = useNavigation()
    const [volunteerEvents, setVolunteerEvents] = useState([])

    useEffect(() => {
        const volunteerEvent = []
        const { item } = route?.params || {}
        setStudent(item)
        firebase
            .firestore()
            .collection('users')
            .doc(item)
            .collection('VolunteerDateTime')
            .get()
            .then(async (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    volunteerEvent.push({ ...doc.data(), key: doc.id })
                })
                setVolunteerEvents(volunteerEvent)
                setLoading(false)
            })
            .catch((error) => {
                console.log('Error getting documents: ', error)
            })

        /*
        if (volunteerEvents.length > 0) {
            
            const events = []
            let image1 = volunteerEvents[0].attachment1
            image1 = image1.slice(1, -1)
            events.push({ ...image1 })
            setAttachmentOne(image1)
            setVolunteerEvents()
            setAttachments(events)
        }*/
    }, [])
    useEffect(() => {
        if (volunteerEvents.length > 0) {
            setVolunteerEvents(
                volunteerEvents.map((eg) => ({
                    ...eg,
                    attachmentO: eg.attachment1.slice(1, -1),
                    attachmentT: eg.attachment2.slice(1, -1),
                    setAttachmentThree: eg.attachment3.slice(1, -1),
                    images: [
                        eg.attachment1.slice(1, -1),
                        eg.attachment2.slice(1, -1),
                        eg.attachment3.slice(1, -1),
                    ],
                }))
            )
        }
    }, [volunteerEvents])

    if (volunteerEvents.length <= 0) {
        return (
            <View>
                <Text>{student}</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>Ok sure </Text>
                <FlatList
                    data={volunteerEvents}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity style={styles.classroomBox}>
                                <Text style={styles.classroomTitle}>
                                    {item.date}
                                </Text>
                            </TouchableOpacity>
                            <Text></Text>
                            <FlatList
                                data={item.images}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            height: 200,
                                            width: 200,
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: item,
                                            }}
                                            style={{
                                                height: 200,
                                                width: 200,
                                            }}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    )}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rect: {
        flex: 1,
        backgroundColor: 'rgba(5,66,121,1)',
    },
    classroomBox: {
        flexDirection: 'row',
        width: 250,
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
