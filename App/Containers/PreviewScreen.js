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
    const getMaskedText = text.substring(5, 11)
    return text.replace(getMaskedText, "******")
  }

  useEffect(() => {
    navigation.setParams("print", _print)
  }, [])

  const _print = async () => {
    const logo = setting?.logo?.data
    const debit = maskingDebit(setting?.noDebit)

    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      await BluetoothEscposPrinter.printPic(logo, {width: 444, left: 0})
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText(`${setting?.namaAgen}\r\n`, {});
      await BluetoothEscposPrinter.printText(`${setting?.alamatAgen}\r\n`, {});
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      await BluetoothEscposPrinter.printColumn(
        [14, 18],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ["MERCHANT ID :", setting?.merchantID],
        {},
      );
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText("DEBIT (SWIPE)\r\n", {});
      await BluetoothEscposPrinter.setBlob(1)
      await BluetoothEscposPrinter.printText(`${debit}\r\n`, {
        fonttype: 0,
      });
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.setBlob(0)
      await BluetoothEscposPrinter.printText(`${dateNow}\r\n`, {});
      await BluetoothEscposPrinter.setBlob(1)
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText("TRANSFER BANK LAIN\r\n", {
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      await BluetoothEscposPrinter.printText("DARI TABUNGAN\r\n", {
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      await BluetoothEscposPrinter.printText("ASAL\r\n", {
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      await BluetoothEscposPrinter.setBlob(0)
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
        ["Bank", `: ${setting?.namaBank}`],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
        ["Nama", `: ${setting?.atasNama}`],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
        ["No. Rek", `: ${setting?.noRekAgen}`],
        {},
      );
      await BluetoothEscposPrinter.setBlob(1)
      await BluetoothEscposPrinter.printText("TUJUAN\r\n", {
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      await BluetoothEscposPrinter.setBlob(0)
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
        ["Bank", `: ${print?.bank}`],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
        ["Nama", `: ${print?.penerima}`],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
        ["No. Rek", `: ${print?.rekTujuan}`],
        {},
      );
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.setBlob(1)
      await BluetoothEscposPrinter.printColumn(
        [6, 27],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ["TOTAL", `Rp ${print?.nominal}`],
        {
          fonttype: 0,
        },
      );
      await BluetoothEscposPrinter.setBlob(0)
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText("\r\n\r\n", {});
      await BluetoothEscposPrinter.printText("Informasi lebih lanjut, silahkan hubungi CONTACT BRI di 14017\r\natau 1500017\r\n", {});
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText("*** Terima Kasih ***\r\n", {});
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText("--- CUSTOMER COPY ---\r\n", {});
      await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

      ToastAndroid.show("Struk berhasil dicetak!", ToastAndroid.LONG)
    } catch (e) {
      ToastAndroid.show(e.message || "ERROR", ToastAndroid.LONG)
    }
  }

  return (
    <View style={apply('flex bg-white')}>
      <ScrollView showVerticalScrollIndicator={false} contentContainerStyle={apply('px-4 pt-7 pb-12')}>
        <Image
          source={{ uri: `data:${setting.logo.mime};base64,${setting.logo.data}` }}
          style={styles.imgLogo}
        />

        <View style={apply('items-center justify-center mb-5')}>
          <Text style={[styles.normal, apply('text-center')]}>{setting?.namaAgen}</Text>
          <Text style={[styles.normal, apply('text-center')]}>{setting?.alamatAgen}</Text>
        </View>

        <View style={apply('full row items-center justify-between mb-5')}>
          <Text style={styles.normal}>MERCHANT ID :</Text>
          <Text style={styles.normal}>{setting?.merchantID}</Text>
        </View>

        <Text style={styles.normal}>DEBIT (SWIPE)</Text>
        <Text style={[styles.normal, apply('font-bold mb-5')]}>{maskingDebit(setting?.noDebit)}</Text>

        <Text style={[styles.normal, apply('mb-5')]}>{dateNow}</Text>

        <Text style={styles.title}>TRANSFER BANK LAIN</Text>
        <Text style={styles.title}>DARI TABUNGAN</Text>
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
          <Text style={styles.textFooter}>Informasi lebih lanjut, silahkan</Text>
          <Text style={styles.textFooter}>hubungi CONTACT BRI di 1417</Text>
          <Text style={[styles.textFooter, apply('mb-4')]}>atau 1500017</Text>

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
