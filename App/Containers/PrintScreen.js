import React, {useState} from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/PrintScreenStyle'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS
const { formatMoney } = new Format()

const PrintScreen = (props) => {

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

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    props.navigation.navigate('Preview', { data: values })

    return false
  }

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
        <TouchableOpacity activeOpacity={0.9} style={styles.btnSave} onPress={(e) => {formProps.handleSubmit(e)}}>
          <Icon name='eye' size={25} color="#fff" />
          <Text style={styles.btnLabel}>Preview</Text>
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

PrintScreen.navigationOptions =({ navigation }) => {
  return {
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default PrintScreen
