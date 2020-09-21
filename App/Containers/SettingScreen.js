import React from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Platform,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'

import { Formik } from 'formik'
import * as Yup from 'yup'

import SettingsActions from '../Redux/SettingsRedux'

// Styles
import styles from './Styles/SettingScreenStyle'

const OS = Platform.OS

const SettingScreen = (props) => {
  const { setting } = props

  const Scheme = Yup.object().shape({
    atasNama: Yup.string()
              .required("*Wajib diisi"),
    noRekAgen: Yup.string()
                .required("*Wajib diisi"),
    namaAgen: Yup.string()
              .required("*Wajib diisi"),
    alamatAgen: Yup.string()
                .required("*Wajib diisi"),
    merchantID: Yup.string()
                .required("*Wajib diisi"),
    noDebit: Yup.string()
              .required("*Wajib diisi"),
  })

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)

    props.saveSetting({
      atasNama: values.atasNama,
      noRekAgen: values.noRekAgen,
      namaAgen: values.namaAgen,
      alamatAgen: values.alamatAgen,
      merchantID: values.merchantID,
      noDebit: values.noDebit
    })
    ToastAndroid.show('Berhasil disimpan!', ToastAndroid.SHORT)
    return false
  }

  const renderForm = formProps => {
    return (
      <KeyboardAvoidingView style={styles.inputView}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Atas Nama</Text>
          <TextInput 
            placeholder="Atas Nama"
            onChangeText={(value) => formProps.setFieldValue('atasNama', value)}
            value={formProps.values.atasNama}
            style={styles.inputText}
            autoCapitalize="words"
          />
          <Text style={styles.error}>{formProps?.errors?.atasNama}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>No. Rekening Agen</Text>
          <TextInput 
            placeholder="1234567890"
            onChangeText={(value) => formProps.setFieldValue('noRekAgen', value)}
            value={formProps.values.noRekAgen}
            style={styles.inputText}
            keyboardType="numeric"
          />
          <Text style={styles.error}>{formProps?.errors?.noRekAgen}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Nama Agen</Text>
          <TextInput 
            placeholder="Nama Agen"
            onChangeText={(value) => formProps.setFieldValue('namaAgen', value)}
            value={formProps.values.namaAgen}
            style={styles.inputText}
            autoCapitalize="words"
          />
          <Text style={styles.error}>{formProps?.errors?.namaAgen}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Alamat Agen</Text>
          <TextInput 
            placeholder="Jl. Raya Sepatan Kecamatan Sepatan"
            onChangeText={(value) => formProps.setFieldValue('alamatAgen', value)}
            value={formProps.values.alamatAgen}
            style={styles.inputText}
            autoCapitalize="sentences"
          />
          <Text style={styles.error}>{formProps?.errors?.alamatAgen}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Merchant ID</Text>
          <TextInput 
            placeholder="Merchant ID"
            onChangeText={(value) => formProps.setFieldValue('merchantID', value)}
            value={formProps.values.merchantID}
            style={styles.inputText}
            autoCapitalize="words"
          />
          <Text style={styles.error}>{formProps?.errors?.merchantID}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Nomor Debit</Text>
          <TextInput 
            placeholder="1234567890"
            onChangeText={(value) => formProps.setFieldValue('noDebit', value)}
            value={formProps.values.noDebit}
            style={styles.inputText}
            keyboardType="numeric"
          />
          <Text style={styles.error}>{formProps?.errors?.noDebit}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.9} style={styles.btnSave} onPress={(e) => {formProps.handleSubmit(e)}}>
          <Icon name='save' size={25} color="#fff" />
          <Text style={styles.btnLabel}>Simpan</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Formik 
          onSubmit={handleSubmit}
          validationSchema={Scheme}
          validateOnChange={false}
          initialValues={{
            atasNama: setting?.data?.atasNama ?? '',
            noRekAgen: setting?.data?.noRekAgen ?? '',
            namaAgen: setting?.data?.namaAgen ?? '',
            alamatAgen: setting?.data?.alamatAgen ?? '',
            merchantID: setting?.data?.merchantID ?? '',
            noDebit: setting?.data?.noDebit ?? ''
          }}
        >
          {formProps => renderForm(formProps)}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  setting: state.setting.setting
})

const mapDispatchToProps = (dispatch) => ({
  saveSetting: value => dispatch(SettingsActions.saveSetting(value))
})

SettingScreen.navigationOptions =({ navigation }) => {
  return {
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
