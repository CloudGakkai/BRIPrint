import React, {useState, useEffect} from 'react'
import {
  KeyboardAvoidingView,
  DeviceEventEmitter,
  NativeEventEmitter,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  FlatList,
  Modal,
  View,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from 'react-native-bluetooth-escpos-printer';
import moment from 'moment'
import { connect } from 'react-redux'
import SettingActions from '../Redux/SettingsRedux'
import PrintActions from '../Redux/PrintRedux'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/PrintScreenStyle'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS
const { formatMoney } = new Format()

const Scheme = Yup.object().shape({
  penerima: Yup.string()
    .required("*Wajib diisi"),
  rekTujuan: Yup.string()
    .required("*Wajib diisi"),
  bank: Yup.string()
    .required("*Wajib diisi"),
  nominal: Yup.string()
    .required("*Wajib diisi")
})

const PrintScreen = (props) => {
  const { printer } = props
  const [availableDevices, setAvailableDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState([])
  const [bluetooth, setBluetooth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [connectedDevice, setConnectedDevice] = useState(null)
  const [showModal, setShowModal] = useState(false)
  let _listeners = [];

  const _deviceAlreadPaired = (rsp) => {
    let ds = null;
    if (typeof(rsp.devices) == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {
      }
    }
    if(ds && ds.length) {
      let pared = selectedDevice;
      pared = pared.concat(ds||[]);
      setSelectedDevice(pared)
    }
  }

  const _deviceFoundEvent =(rsp) => {//alert(JSON.stringify(rsp))
    let r = null;
    try {
      if (typeof(rsp.device) == "object") {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {//alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = availableDevices || [];
      if(found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          setAvailableDevices(found)
        }
      }
    }
  }

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then((enabled)=> {
      setBluetooth(enabled)
      setLoading(false)
    }, (err)=> {
      setBluetooth(false)
      alert('Harap aktifkan Bluetooth!')
    });

    _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp)=> {
        _deviceAlreadPaired(rsp)
      }));
    _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_DEVICE_FOUND, (rsp)=> {
        _deviceFoundEvent(rsp)
      }));
    _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
        props.setPrinter([])
      }
    ));
    _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, ()=> {
        ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
      }
    ))
  }, [])

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)

    props.saveDataPrint(values)
    props.navigation.navigate('Preview')

    return false
  }

  const _scanPrinter = () => {
    setLoading(true)
    setShowModal(true)
    BluetoothManager.scanDevices()
      .then((s)=> {
        let ss = s;
        let found = ss.found;
        try {
          found = JSON.parse(found);//@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        let fds = availableDevices;
        if(found && found.length){
          fds = found;
        }

        setAvailableDevices(fds)
        setLoading(false)
      }, (er)=> {
        setLoading(false)
        alert('error' + JSON.stringify(er));
      });
  }

  const onConnect = selected => {
    setShowModal(false)
    setLoading(true)

    BluetoothManager.connect(selected.address)
    .then((s)=>{
      setLoading(false)
      props.setPrinter(selected)
    },(e)=>{
      setLoading(false)
      alert('Gagal menghubungkan, silahkan coba lagi.')
      console.tron.log("=== error log onConnect ===", e);
    })
  }

  const _renderModalPrinter = () => (
    <Modal
    transparent={true}
    visible={showModal}
    onRequestClose={() => setShowModal(false)}>
      <View style={apply('flex items-center justify-center bg-soft-black')}>
        <View style={styles.modalPrinter}>
          <Text style={styles.modalTitle}>Pilih Printer:</Text>

          {loading ? (
            <View style={apply('items-center justify-center')}>
              <ActivityIndicator size='large' color={apply('blue-500')} />
            </View>
          ) : (
            <FlatList
              data={[...availableDevices, ...selectedDevice].filter((v,i,a)=>a.findIndex(t=>(t.address === v.address))===i)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} activeOpacity={0.9} onPress={() => onConnect(item)}>
                  <Text style={styles.modalItemLabel}>{item?.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  )

  const renderForm = formProps => {
    return (
      <KeyboardAvoidingView style={styles.inputView}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Nama Penerima</Text>
        <TextInput
          placeholder="Nama Penerima"
          onChangeText={(value) => formProps.setFieldValue('penerima', value)}
          value={formProps.values.penerima}
          style={styles.inputText}
          autoCapitalize="words"
        />
        <Text style={styles.error}>{formProps?.errors?.penerima}</Text>
      </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Rekening Tujuan</Text>
          <TextInput
            placeholder="1234567890"
            onChangeText={(value) => formProps.setFieldValue('rekTujuan', value)}
            value={formProps.values.rekTujuan}
            style={styles.inputText}
            keyboardType="numeric"
          />
          <Text style={styles.error}>{formProps?.errors?.nominal}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Bank</Text>
          <TextInput
            placeholder="Mandiri/BTN/BCA"
            onChangeText={(value) => formProps.setFieldValue('bank', value)}
            value={formProps.values.bank}
            style={styles.inputText}
            autoCapitalize="words"
          />
          <Text style={styles.error}>{formProps?.errors?.bank}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Nominal</Text>
          <View style={styles.inputNominal}>
            <Text>Rp</Text>
            <TextInput
              placeholder="10.000"
              onChangeText={(value) => formProps.setFieldValue('nominal', formatMoney(value))}
              value={formProps.values.nominal}
              style={apply('flex')}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.nominal}</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Printer Dipilih</Text>
          {bluetooth ? (
            <TouchableOpacity
              style={[styles.btnSave, styles.inputText, apply("py-3 mt-0")]}
              activeOpacity={1}
              disabled={loading}
              onPress={() => _scanPrinter()}>
              <Icon name={loading ? 'loader' : 'printer'} size={25} color={apply("black")} />
              {!loading ? (
                <Text style={[styles.btnLabel, apply("text-black")]}>{
                  printer ? printer?.name : 'Pilih Printer'
                }</Text>
              ) : null}
            </TouchableOpacity>
          ) : (
            <View style={apply("full items-center")}>
              <Text style={[styles.inputLabel, apply("text-red text-center")]}>Harap Aktifkan Bluetooth!</Text>
            </View>
          )}
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.btnSave} onPress={(e) => {formProps.handleSubmit(e)}}>
          <Icon name='eye' size={25} color="#fff" />
          <Text style={styles.btnLabel}>Preview</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {_renderModalPrinter()}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={Scheme}
          validateOnChange={false}
          initialValues={{
            penerima: '',
            rekTujuan: '',
            bank: '',
            nominal: ''
          }}
        >
          {formProps => renderForm(formProps)}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  setting: state.setting.setting,
  printer: state.setting.printer
})

const mapDispatchToProps = dispatch => ({
  saveDataPrint: value => dispatch(PrintActions.saveDataPrint(value)),
  setPrinter: value => dispatch(SettingActions.setPrinter(value))
})

PrintScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintScreen)
