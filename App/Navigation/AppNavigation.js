import { createAppContainer } from 'react-navigation'
import SettingScreen from '../Containers/SettingScreen'
import HomeScreen from '../Containers/HomeScreen'
import { createStackNavigator } from 'react-navigation-stack'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Setting: { screen: SettingScreen },
  Home: { screen: HomeScreen },
}, {
  // Default config for all screens
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
