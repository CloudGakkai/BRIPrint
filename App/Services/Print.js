import { ToastAndroid } from 'react-native'
import { BluetoothEscposPrinter } from '@cloudgakkai/react-native-bluetooth-escpos-printer';
import moment from 'moment'

const maskingDebit = text => {
  const getMaskedText = text.substring(6, 12)
  return text.replace(getMaskedText, "******")
}

export const PrintBRI = async (setting, print, dateNow) => {
  const logo = setting?.logo?.data
  const debit = maskingDebit(setting?.noDebit)

  try {
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);

    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
    logo && await BluetoothEscposPrinter.printPic(logo, {width: 444, left: 0})
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.printText(`${setting?.namaAgen}\r\n`, {});
    await BluetoothEscposPrinter.printText(`${setting?.alamatAgen}\r\n`, {});
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
    await BluetoothEscposPrinter.printColumn(
      [14, 18],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      ["MERCHANT ID :", setting?.merchantID],
      {},
    );
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("DEBIT (SWIPE)\r\n", {});
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printText(`${debit}\r\n`, {
      fonttype: 0,
    });
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printText(`${dateNow}\r\n`, {});
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("TRANSFER BANK LAIN\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printText("DARI TABUNGAN\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printText("ASAL\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Bank", `: ${setting?.namaBank}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Nama", `: ${setting?.atasNama}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["No. Rek", `: ${setting?.noRekAgen}`],
      {},
    );
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printText("TUJUAN\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Bank", `: ${print?.bank}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Nama", `: ${print?.penerima}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["No. Rek", `: ${print?.rekTujuan}`],
      {},
    );
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printColumn(
      [6, 27],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      ["TOTAL", `Rp ${print?.nominal}`],
      {
        fonttype: 0,
      },
    );
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.printText("\r\n\r\n", {});
    await BluetoothEscposPrinter.printText("Informasi lebih lanjut, silahkan hubungi CONTACT BRI di 14017\r\natau 1500017\r\n", {});
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("*** Terima Kasih ***\r\n", {});
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("--- CUSTOMER COPY ---\r\n", {});
    await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

    ToastAndroid.show("Struk berhasil dicetak!", ToastAndroid.LONG)
  } catch (e) {
    ToastAndroid.show(e.message || "ERROR", ToastAndroid.LONG)
  }
}

export const PrintBCA = async (setting, print, dateNow) => {
  const logo = setting?.logo?.data
  const debit = maskingDebit(setting?.noDebit)

  try {
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
    logo && await BluetoothEscposPrinter.printPic(logo, {width: 444, left: 0})
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printText(`${dateNow}\r\n`, {});
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("TRANSFER DARI TABUNGAN\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printText("ASAL\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Bank", `: ${setting?.namaBank}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Nama", `: ${setting?.atasNama}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["No. Rek", `: ${setting?.noRekAgen}`],
      {},
    );
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printText("TUJUAN\r\n", {
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Bank", `: ${print?.bank}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["Nama", `: ${print?.penerima}`],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [10, 22],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT],
      ["No. Rek", `: ${print?.rekTujuan}`],
      {},
    );
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.setBlob(1)
    await BluetoothEscposPrinter.printColumn(
      [6, 27],
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      ["TOTAL", `Rp ${print?.nominal}`],
      {
        fonttype: 0,
      },
    );
    await BluetoothEscposPrinter.setBlob(0)
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.printText("\r\n\r\n", {});
    await BluetoothEscposPrinter.printText("STATUS: BERHASIL\r\n", {});
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("*** Terima Kasih ***\r\n", {});
    await BluetoothEscposPrinter.printText("\r\n", {});
    await BluetoothEscposPrinter.printText("--- CUSTOMER COPY ---\r\n", {});
    await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

    ToastAndroid.show("Struk berhasil dicetak!", ToastAndroid.LONG)
  } catch (e) {
    ToastAndroid.show(e.message || "ERROR", ToastAndroid.LONG)
  }
}
