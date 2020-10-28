import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Platform,
  Image,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { PrintBRI, PrintBCA } from '../Services/Print'
import { BluetoothEscposPrinter } from '@cloudgakkai/react-native-bluetooth-escpos-printer';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather'

// Styles
import styles from './Styles/PreviewScreenStyle'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS

const PreviewScreen = (props) => {
  const { setting, print, navigation } = props
  const dateNow = moment(new Date()).format('DD MMM, YYYY HH:mm')

  const maskingDebit = text => {
    const getMaskedText = text.substring(6, 12)
    return text.replace(getMaskedText, "******")
  }

  useEffect(() => {
    navigation.setParams("print", _print)
  }, [])

  const _print = async () => {
    if(setting?.namaBank.toLowerCase().includes("bri")) {
      await PrintBRI(setting, print, dateNow)
    } else {
      await PrintBCA(setting, print, dateNow)
    }
  }

  return (
    <View style={apply('flex bg-white')}>
      <ScrollView showVerticalScrollIndicator={false} contentContainerStyle={apply('px-4 pt-7 pb-12')}>
        <Image
          source={{ uri: `data:${setting.logo.mime};base64,${setting.logo.data}` }}
          style={styles.imgLogo}
        />

        {setting?.namaBank.toLowerCase().includes("bri") && (
          <View style={apply('items-center justify-center mb-5')}>
              <Text style={[styles.normal, apply('text-center')]}>{setting?.namaAgen}</Text>
              <Text style={[styles.normal, apply('text-center')]}>{setting?.alamatAgen}</Text>
          </View>
        )}

        {setting?.namaBank.toLowerCase().includes("bri") && (
          <View style={apply('full row items-center justify-between my-5')}>
            <Text style={styles.normal}>MERCHANT ID :</Text>
            <Text style={styles.normal}>{setting?.merchantID}</Text>
          </View>
        )}

        {setting?.namaBank.toLowerCase().includes("bri") && (
          <View>
            <Text style={styles.normal}>DEBIT (SWIPE)</Text>
            <Text style={[styles.normal, apply('font-bold mb-5')]}>{maskingDebit(setting?.noDebit)}</Text>
          </View>
        )}

        <Text style={[styles.normal, apply('my-5')]}>{dateNow}</Text>

        <Text style={styles.title}>TRANSFER DARI TABUNGAN</Text>
        <Text style={styles.title}>ASAL</Text>
        <View style={styles.rowLeft}>
          <Text style={[styles.normal, apply("mr-5")]}>Bank</Text>
          <Text style={styles.secondCol}>: {setting?.namaBank}</Text>
        </View>
        <View style={styles.rowLeft}>
          <Text style={[styles.normal, apply("mr-3")]}>Nama</Text>
          <Text style={styles.secondCol}>: {setting?.atasNama}</Text>
        </View>
        <View style={[styles.rowLeft, apply('mb-1')]}>
          <Text style={styles.normal}>No. Rek</Text>
          <Text style={styles.secondCol}>: {setting?.noRekAgen}</Text>
        </View>

        <Text style={styles.title}>TUJUAN</Text>
        <View style={styles.rowLeft}>
          <Text style={[styles.normal, apply("mr-5")]}>Bank</Text>
          <Text style={styles.secondCol}>: {print?.bank}</Text>
        </View>
        <View style={styles.rowLeft}>
          <Text style={[styles.normal, apply("mr-3")]}>Nama</Text>
          <Text style={styles.secondCol}>: {print?.penerima}</Text>
        </View>
        <View style={[styles.rowLeft, apply('mb-5')]}>
          <Text style={styles.normal}>No. Rek</Text>
          <Text style={styles.secondCol}>: {print?.rekTujuan}</Text>
        </View>

        <View style={apply('full row items-center justify-between mb-7')}>
          <Text style={[styles.normal, apply('font-bold')]}>TOTAL</Text>
          <Text style={[styles.normal, apply('font-bold')]}>Rp {print?.nominal}</Text>
        </View>

        <View style={apply('items-center justify-content')}>
          {setting?.namaBank.toLowerCase().includes("bri") ?
            ( <View>
              <Text style={styles.textFooter}>Informasi lebih lanjut, silahkan</Text>
              <Text style={styles.textFooter}>hubungi CONTACT BRI di 1417</Text>
              <Text style={[styles.textFooter, apply('mb-4')]}>atau 1500017</Text>
            </View> ) : <Text style={styles.textFooter}>STATUS: BERHASIL</Text>
          }


          <Text style={[styles.textFooter, apply('mb-4')]}>*** Terima Kasih ***</Text>
          <Text style={[styles.textFooter, apply('mb-7')]}>--- CUSTOMER COPY ---</Text>
        </View>
      </ScrollView>
      <View style={apply("full absolute bottom-0 px-3 py-2")}>
        <TouchableOpacity style={styles.btnPrint} activeOpacity={0.9} onPress={() => _print()}>
          <Icon name='printer' size={25} color="#fff" />
          <Text style={styles.btnLabel}>Cetak</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  setting: state.setting.setting,
  print: state.print.data
})

const mapDispatchToProps = (dispatch) => ({

})

PreviewScreen.navigationOptions = ({ navigation }) => {
  const { param = {} } = navigation.state

  return {
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55},
    // headerRight: () => (
    //   <TouchableOpacity style={apply('mr-5')} activeOpacity={0.8} onPress={() => print()}>
    //     <Icon name='printer' size={25} color={apply('black')} />
    //   </TouchableOpacity>
    // )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen)
