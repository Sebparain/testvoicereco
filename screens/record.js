import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import { Input, Button, Card, ListItem, Icon, Badge } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { connect } from 'react-redux'


function Record({ sendToLibrary }) {

    const [isRecording, setIsRecording] = useState(false)
    const [recording, setRecording] = useState(false)
    const [permissionAudio, setPermissionAudio] = useState(false)
    const [albumPermission, setAlbumPermission] = useState(false)


    

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync()
            setPermissionAudio(status === 'granted')
            const { album } = MediaLibrary.requestPermissionsAsync()
            setAlbumPermission(album === 'granted')

        })()

    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="ios-microphone" size={60} color={isRecording ? "red" : "black"} onPress={() => {
                    (async () => {
                        if (!isRecording) {
                            setIsRecording(true)
                            Audio.setAudioModeAsync({
                                allowsRecordingIOS: true,
                                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                                playsInSilentModeIOS: true,
                                shouldDuckAndroid: true,
                                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                                playThroughEarpieceAndroid: false,
                                staysActiveInBackground: true,
                            })
                            const record = new Audio.Recording();

                            await record.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                            await record.startAsync()

                            setRecording(record)




                        } else {
                            setIsRecording(false)
                            await recording.stopAndUnloadAsync()
                             sendToLibrary(recording)

                            console.log(recording._uri)
                        //     let test = recording

                        //     var sendAudioToBack = async (audio) => {
                        //         const data = new FormData();


                        //         data.append('audio', {
                        //             uri: audio._uri,
                        //             type: 'audio/mp3',
                        //             name: 'monaudio.mp3'
                        //         });

                        //         var response = await fetch("http://192.168.1.23:3000/sendToGoogle", {
                        //         method: 'POST',
                        //         body: data
                        //     })

                        //     }
                        //     let audio = recording
                        //     sendAudioToBack(audio)

                         }
                    })()
                }

                } />

            </View>
            <Input />

        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        sendToLibrary: function (music) {
            dispatch({ type: "addLibrary", music: music })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Record)