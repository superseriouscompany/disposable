import React, {Component} from 'react'
import Banner             from '../components/Banner'
import SwipeHint          from '../components/SwipeHint'
import DevPanel           from '../components/DevPanel'
import BackButton         from '../components/BackButton'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={{flex: 1}}>
      <BackButton />
      <View style={style.container} {...props.panResponder.panHandlers}>
        <Banner />
        <View style={style.wheel}>
          <Image source={require('../images/Wheel.png')} style={[style.gear, {
            transform: [
              { rotate: `${(props.wind / 10) % 360}deg` }
            ]
          }]} />
        </View>

        <View style={style.bottomCnr}>
          { props.activated ?
            <View style={style.statusCnr}>
              <View style={style.progressCnr}>
                <View style={[style.progress, {
                  width: `${Math.min(1, props.photosRemaining / props.totalPhotos) * 100}%`,
                }]}>
                  <View style={[style.progress, style.complete, {
                    width: `${Math.min(1, props.wind / props.thresh) * 100}%`,
                  }]} />
                </View>
              </View>
              <Text style={style.count}>{props.photosRemaining} left</Text>
            </View>
          :
            <SwipeHint style={style.hint} />
          }
        </View>
      </View>
      <DevPanel />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wheel: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gear: {
    width: 40,
    aspectRatio: 1,
  },

  bottomCnr: {
    height: 60,
    marginTop: 10,
  },

  statusCnr: {
    width: '40%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  progressCnr: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    flex: 1,
    height: 20,
    marginRight: 5,
    overflow: 'hidden',
  },

  progress: {
    backgroundColor: 'black',
    height: '100%',
  },

  complete: {
    backgroundColor: '#ffc50c',
    position: 'absolute',
    left: 0,
    top: 0,
  },

  spent: {
    fontSize: 120,
    textAlign: 'center',
  },
})
