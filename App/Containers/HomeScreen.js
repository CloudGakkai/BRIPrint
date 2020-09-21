import React, { useState, useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, StatusBar, Image, View, Text } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'

import styles from './Styles/HomeScreenStyle'

const HomeScreen = (props) => {
  const [greeting, setGreeting] = useState('')
  const { navigation } = props

  useEffect(() => {
    getJam()
  }, [])

  const getJam = () => {
    const date = new Date()
    const jam = date.getHours()

    if(jam<=3) {
      setGreeting('Selamat Malam')
    } else if(jam<=10) {
      setGreeting('Selamat Pagi')
    } else if(jam<=14) {
      setGreeting('Selamat Siang')
    } else if(jam<=18) {
      setGreeting('Selamat Sore')
    } else if(jam<=24) {
      setGreeting('Selamat Malam')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.hi}>Hai, {props?.setting != null ? props?.setting?.data?.namaAgen : 'Agent'}!</Text>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnPrint} onPress={() => navigation.navigate('Print')}>
          <Icon name='printer' size={45} color="#000" />
          <Text style={styles.btnPrintLabel}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnSetting} onPress={() => navigation.navigate('Setting')}>
          <Icon name='settings' size={45} color="#fff" />
          <Text style={styles.btnSettingLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Image source={require('../Images/CloudGakkai.jpg')} style={styles.img} />
        <Text>CloudGakkai</Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  setting: state.setting.setting
})

export default connect(mapStateToProps)(HomeScreen)
