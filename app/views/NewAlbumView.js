'use strict'

import React, {Component} from 'react'
import BackButton         from '../components/BackButton'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.cnr}>
      <BackButton />
      <View style={style.inputCnr}>
        <TextInput {...props} style={style.input} value={props.text} placeholder={'Enter album name'} autoFocus={true}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  cnr: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  inputCnr: {
    width: '60%',
  },
  input: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
  }
})
