import {connect} from '../../Lib/OsmiProvider'

export default connect({
  container: 'bg-gray-100 flex',
  body: 'flex',
  inputView: 'flex mt-2 mb-5 mx-3',
  inputWrapper: 'flex',
  inputLabel: 'mb-1 font-bold',
  inputText: 'py-2 px-2 mb-1 bg-white rounded-lg shadow-md',
  error: 'text-red-600 mb-1',
  btnSave: 'flex row items-center justify-center bg-blue-500 mt-3 rounded-lg shadow-md px-3 py-2',
  btnLabel: 'text-white ml-3 font-bold text-base py-2',
  imgLogo: 'w-320 h-70',
  modalUpload: 'bg-white w-p-80 rounded-lg p-5 shadow-md',
  modalTitle: 'font-bold text-lg mb-5',
  modalCol: 'flex items-center justify-center',
  modalLabel: 'font-bold text-xl mt-1',
  btnRemoveLogo: 'absolute z-20 right-3 top--5 items-center justify-center rounded-full w-20 h-20 bg-red-500'
})
