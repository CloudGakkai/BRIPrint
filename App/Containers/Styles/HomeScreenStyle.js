import {connect} from '../../Lib/OsmiProvider'

export default connect({
  container: 'bg-white flex py-3',
  header: 'mx-3',
  hi: 'text-xl font-bold',
  greeting: 'text-base',
  body: 'row items-center justify-center mt-5 mx-3',
  btnPrint: 'rounded-lg flex bg-white shadow-md items-center justify-center mr-3 px-5 py-5',
  btnPrintLabel: 'mt-2 font-bold text-black',
  btnSetting: 'rounded-lg flex bg-blue-500 shadow-md items-center justify-center px-5 py-5',
  btnSettingLabel: 'mt-2 font-bold text-white',
  footer: 'flex justify-end items-center mb-1',
  img: 'w-25 h-25 mb-1'
})