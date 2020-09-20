import { createAppContainer } from 'react-navigation'
import PreviewScreen from '../Containers/PreviewScreen'
import PrintScreen from '../Containers/PrintScreen'
import SettingScreen from '../Containers/SettingScreen'
import HomeScreen from '../Containers/HomeScreen'
import { createStackNavigator } from 'react-navigation-stack'

import styles from './Styles/NavigationStyles'
import { findLastIndex } from 'lodash'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Print: { screen: PrintScreen },
  Setting: { screen: SettingScreen },
  Preview: { screen: PreviewScreen },
}, {
  // Default config for all screens
  initialRouteName: 'Home'
})

export default createAppContainer(PrimaryNav)
