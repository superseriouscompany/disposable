'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {createUser}       from '../actions/user'
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
    if( !this.state.email || (this.state.newUser && !this.state.name) ) { return }

    this.props.login({
      email: this.state.email,
      name:  this.state.name,
    }).then(() => {
      this.setState({
        newUser: true
      })
    }).catch((err) => {
      if( err.message == 409 ) {
        return this.setState({
          existingUser: true
        })
      }
      alert(err && err.message)
      console.error(err)
    })
  }

  render() { return (
    <View style={style.container}>
      <View style={style.fields}>
        { this.state.newUser ?
          <TextInput
            placeholder={'Name'}
            style={[style.input]}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            autoCorrect={false}
            autoCapitalize="words"
            />
        : this.state.existingUser ?
          <TouchableOpacity onPress={() => this.setState({existingUser: null})}>
            <Text>
              Looks like you already have an account.
              {"\n\n"}
              Check your email for a link to sign in!
              {"\n\n"}
              Or tap anywhere to go back.
            </Text>
          </TouchableOpacity>
        :
          <TextInput
            placeholder={'Email'}
            style={[style.input]}
            value={this.state.email}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => this.setState({email})}
            keyboardType="email-address"
            />
        }
      </View>
      { !this.state.existingUser ?
        <TouchableOpacity style={style.button} onPress={this.login}>
          <Text style={style.buttonText}>Enter</Text>
        </TouchableOpacity>
      : null }
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
    login: (user) => {
      return dispatch(createUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
