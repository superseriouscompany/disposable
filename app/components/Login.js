'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'


class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {}
  }

  login() {
    this.props.login()
  }

  render() { return (
    <View style={style.container}>
      <View style={style.fields}>
        <TextInput
          placeholder={'Name'}
          style={[style.input]}
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}
          />
        <TextInput
          placeholder={'Email'}
          style={[style.input]}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          />
      </View>
      <TouchableOpacity style={style.button} onPress={this.login}>
        <Text style={style.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  fields: {
    paddingLeft: '20%',
    paddingRight: '20%',
  },

  button: {
    alignItems: 'center',
  },

  buttonText: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ffc50c',
    overflow: 'hidden',
    color: 'white',
    fontSize: 20,
  },

  input: {
    height: 25,
    padding: 5,
    borderColor: '#c9c9c9',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 25,
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      return dispatch({type: 'scene:change', scene: 'Cam'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
