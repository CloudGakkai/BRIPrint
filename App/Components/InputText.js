import React from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/InputTextStyle'

const InputText = () => {
  return (
    <View style={styles.container}>
      <Text>InputText Component</Text>
    </View>
  )
}

// // Prop type warnings
// InputText.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// InputText.defaultProps = {
//   someSetting: false
// }

export default InputText
