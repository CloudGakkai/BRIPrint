import React, { useState } from 'react'
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
  Text,
  Image, Modal, ActivityIndicator, FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import SettingsActions from '../Redux/SettingsRedux'
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker';

import { Formik } from 'formik'
import * as Yup from 'yup'

// Styles
import styles from './Styles/SettingScreenStyle'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS

const Scheme = Yup.object().shape({
  logo: Yup.object()
    .required("*required"),
  namaAgen: Yup.string()
    .required("*Wajib diisi"),
  alamatAgen: Yup.string()
    .required("*Wajib diisi"),
  merchantID: Yup.string()
    .required("*Wajib diisi"),
  noDebit: Yup.string()
    .required("*Wajib diisi"),
  namaBank: Yup.string()
    .required('*Wajib diisi'),
  atasNama: Yup.string()
    .required("*Wajib diisi"),
  noRekAgen: Yup.string()
    .required("*Wajib diisi"),
})

const SettingScreen = (props) => {
  const { setting } = props
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)

    props.saveSetting({
      logo: values.logo,
      namaAgen: values.namaAgen,
      alamatAgen: values.alamatAgen,
      merchantID: values.merchantID,
      noDebit: values.noDebit,
      namaBank: values.namaBank,
      atasNama: values.atasNama,
      noRekAgen: values.noRekAgen,
    })

    ToastAndroid.show('Pengaturan berhasil disimpan!', ToastAndroid.SHORT)
    return false
  }

  const renderForm = formProps => {
    return (
      <KeyboardAvoidingView style={styles.inputView}>
        {_renderModalUpload(formProps)}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Unggah Logo</Text>
          {!formProps.values.logo ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.btnSave, styles.inputText, apply("py-3 mt-0")]}
              onPress={() => setShowModal(true)}>
              <Icon name='upload' size={25} color={apply('black')} />
              <Text style={[styles.btnLabel, apply('text-black')]}>Unggah</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
              style={styles.btnRemoveLogo}
              activeOpacity={1}
              onPress={() => formProps.setFieldValue('logo', null)}>
                <Icon name='x' size={15} color={apply('white')} />
              </TouchableOpacity>
              <Image
                source={{ uri: `data:${formProps.values.logo.mime};base64,${formProps.values.logo.data}` }}
                style={styles.imgLogo}
              />
            </View>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Nama Agen</Text>
          <TextInput
            placeholder="Nama Agen"
            onChangeText={(value) => formProps.setFieldValue('namaAgen', value)}
            value={formProps.values.namaAgen}
            style={styles.inputText}
            autoCapitalize="characters"
          />
          <Text style={styles.error}>{formProps?.errors?.namaAgen}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Alamat Agen</Text>
          <TextInput
            placeholder="Jl. Raya Sepatan Kecamatan Sepatan"
            onChangeText={(value) => formProps.setFieldValue('alamatAgen', value)}
            multiline={true}
            textAlignVertical='top'
            numberOfLines={3}
            value={formProps.values.alamatAgen}
            style={styles.inputText}
            autoCapitalize="characters"
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
            keyboardType="numeric"
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
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Nama Bank</Text>
          <TextInput
            placeholder="BRI"
            onChangeText={(value) => formProps.setFieldValue('namaBank', value)}
            value={formProps.values.namaBank}
            style={styles.inputText}
            autoCapitalize="characters"
          />
          <Text style={styles.error}>{formProps?.errors?.namaBank}</Text>
        </View>
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
        <TouchableOpacity activeOpacity={0.9} style={styles.btnSave} onPress={(e) => {formProps.handleSubmit(e)}}>
          <Icon name='save' size={25} color="#fff" />
          <Text style={styles.btnLabel}>Simpan</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  const openGallery = formProps => {
    setShowModal(false)

    ImagePicker.openPicker({
      cropping: false,
      includeBase64: true
    }).then(image => {
      formProps.setFieldValue('logo', {
        mime: image.mime,
        data: image.data
      })
    });
  }

  const openCamera = formProps => {
    setShowModal(false)

    ImagePicker.openCamera({
      cropping: false,
      includeBase64: true
    }).then(image => {
      formProps.setFieldValue('logo', {
        mime: image.mime,
        data: image.data
      })
    });
  }

  const _renderModalUpload = formProps => (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <TouchableOpacity
      activeOpacity={1}
      style={apply('flex items-center justify-center bg-soft-black')}
      onPress={() => setShowModal(false)}>
        <View style={styles.modalUpload}>
          <Text style={styles.modalTitle}>Unggah Logo</Text>

          <View style={apply('full row items-center justify-center')}>
            <TouchableOpacity activeOpacity={1} style={styles.modalCol} onPress={() => openCamera(formProps)}>
              <Icon name='camera' size={45} color={apply('black')} />
              <Text style={styles.modalLabel}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[styles.modalCol, apply('ml-5')]} onPress={() => openGallery(formProps)}>
              <Icon name='image' size={45} color={apply('black')} />
              <Text style={styles.modalLabel}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={Scheme}
          validateOnChange={false}
          initialValues={{
            logo: setting?.logo ?? null,
            namaBank: setting?.namaBank ?? '',
            atasNama: setting?.atasNama ?? '',
            noRekAgen: setting?.noRekAgen ?? '',
            namaAgen: setting?.namaAgen ?? '',
            alamatAgen: setting?.alamatAgen ?? '',
            merchantID: setting?.merchantID ?? '',
            noDebit: setting?.noDebit ?? ''
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
