import React, { useState } from 'react'
import { StyleSheet, Text, View, ListGroupItem } from 'react-native';
import { Input, Button, Card, ListItem, Icon, Badge } from 'react-native-elements';
import { connect } from 'react-redux'
import { Audio } from 'expo-av'
import { FontAwesome } from '@expo/vector-icons';
import { ListGroup } from 'react-native-elements'
import * as MediaLibrary from 'expo-media-library';

function Library(props) {

    let libraryTab = props.library.map((music, i) => {
        return (
            
            <View style={{ marginTop: 50, display: "flex", flexDirection: "row"}}>
                <FontAwesome key={i} name="play" size={24} color="black" onPress={
                    () => {
                        (async () => {
                            const playBack = new Audio.Sound()
                            Audio.setAudioModeAsync({
                                allowsRecordingIOS: false,
                                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                                playsInSilentModeIOS: true,
                                shouldDuckAndroid: true,
                                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                                playThroughEarpieceAndroid: false,
                                staysActiveInBackground: true,
                            })
                            await playBack.loadAsync({ uri: music.getURI() })
                            await playBack.playAsync()
                        })()
                    }
                } />
                <Text style={{fontSize: 20, marginLeft: 20}}>Fichier Audio</Text>
                
            </View>


        )
    })

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ marginTop: 50, marginLeft: 30 }}>
                {libraryTab}
            </View>

           

        </View>
    )
}

function mapStateToProps(state) {
    return { library: state.library }
}

export default connect(
    mapStateToProps,
    null
)(Library)