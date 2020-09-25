import {connect} from '../../Lib/OsmiProvider'

export default connect({
  container: 'bg-gray-100 flex',
  body: 'flex',
  inputView: 'flex mt-2 mb-5 mx-3',
  inputWrapper: 'flex',
  inputLabel: 'mb-1 font-bold',
  inputText: 'py-2 px-2 mb-1 bg-white rounded-lg shadow-md flex',
  inputNominal: 'px-2 mb-1 bg-white rounded-lg shadow-md row items-center',
  error: 'text-red-600 mb-1',
  btnSave: 'flex row items-center justify-center bg-blue-500 mt-3 rounded-lg shadow-md px-3 py-2',
  btnSaveDisabled: 'bg-blue-400',
  btnLabel: 'text-white ml-3 font-bold text-base py-2',
  btnCancel: 'flex row items-center justify-center bg-red-500 mt-5 rounded-lg shadow-md px-3 py-2',
  modalPrinter: 'bg-white w-p-80 rounded-lg p-5 shadow-md',
  modalTitle: 'font-bold text-lg mb-3',
  modalItem: 'pb-3 mb-3 border-b border-gray-500',
  modalItemLabel: 'font-bold text-base'
})
