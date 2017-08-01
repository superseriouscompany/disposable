'use strict'

import React, {Component} from 'react'
import BackButton         from '../components/BackButton'
import {
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View>
      <BackButton />
      <Text>Halp</Text>
    </View>
  )
}
