import {register} from "LoopringJS/relay/rpc/account";
import {
  fromKeystore,
  fromPrivateKey,
  fromMnemonic,
  createMnemonic,
  path,
  MetaMaskAccount,
  TrezorAccount,
  LedgerAccount
} from "LoopringJS/ethereum/account";
import {mnemonictoPrivatekey} from "LoopringJS/ethereum/mnemonic";
import {formatKey} from "LoopringJS/common/formatter";
import storage from '../storage/'
import intl from 'react-intl-universal';

let unlockedType = storage.wallet.getUnlockedType()
let unlockedAddress = storage.wallet.getUnlockedAddress()
if(unlockedAddress) {
  unlockedType = 'address'
} else {
  unlockedType = ''
}

export default {
  namespace: 'wallet',
  state: {
    address: unlockedAddress || "",
    unlockType: unlockedType || "locked",
    password: "",
    account: null
  },
  reducers: {
    unlock(state, {payload}) {
      const {address, unlockType, account, password} = payload;
      return {
        ...state,
        address,
        unlockType,
        account,
        password: password || state.password
      }
    },
    lock(state, {payload}) {
      window.WALLET = null;
      return {
        ...state,
        address: "",
        unlockType: "locked",
        password: "",
        account: null
      }
    },
    setPassword(state, {payload}) {
      const {password} = payload;
      return {
        ...state,
        password
      }
    }
  },
  effects: {
    * unlockWallet({payload}, {put, call}) {
      const {address, unlockType} = payload;
      storage.wallet.storeUnlockedAddress(unlockType,address);
      window.WALLET = {address, unlockType};
      //yield call(register, {owner:payload.address});
      yield put({type: 'unlock', payload});
      yield put({type: 'sockets/unlocked'});
      yield put({type: 'placeOrder/unlock'});
    },
    * unlockAddressWallet({payload}, {put}) {
      const unlockType = 'address';
      yield put({type: 'unlockWallet', payload: {...payload, unlockType}})
    },
    * unlockKeyStoreWallet({payload}, {put}) {
      const {keystore, password, cb} = payload;
      try {
        const account = fromKeystore(keystore, password);
        const address = account.getAddress();
        const unlockType = 'keystore';
        yield put({type: 'unlockWallet', payload: {address, unlockType, account, password}});
        cb()
      } catch (e) {
        cb(e)
      }
    },
    * unlockMnemonicWallet({payload}, {put}) {
      const {mnemonic, dpath, password} = payload;
      const account = fromMnemonic(mnemonic, dpath, password);
      const address = account.getAddress();
      const unlockType = 'mnemonic';
      yield put({type: 'unlockWallet', payload: {address, unlockType, account, password}});
    },
    * unlockPrivateKeyWallet({payload}, {put}) {
      const {privateKey} = payload;
      const account = fromPrivateKey(privateKey);
      const address = account.getAddress();
      const unlockType = 'privateKey';
      yield put({type: 'unlockWallet', payload: {address, unlockType, account}});
    },
    * unlockMetaMaskWallet({payload}, {put}) {
      const {address} = payload;
      const unlockType = 'metaMask';
      window.account = new MetaMaskAccount(window.web3);
      yield put({type: 'unlockWallet', payload: {address, unlockType}});
    },
    * unlockTrezorWallet({payload}, {put}) {
      const {dpath,address} = payload;
      const account = new TrezorAccount(dpath);
      const unlockType = 'trezor';
      yield put({type: 'unlockWallet', payload: {address, unlockType, account}});
    },
    * unlockLedgerWallet({payload}, {put}) {
      const {ledger, dpath} = payload;
      const account = new LedgerAccount(ledger, dpath);
      const address = yield account.getAddress();
      const unlockType = 'ledger';
      yield put({type: 'unlockWallet', payload: {address, unlockType, account}});
    },
    * createWallet({payload}, {put}) {
      const {password, cb} = payload;
      const mnemonic = createMnemonic();
      const privateKey = formatKey(mnemonictoPrivatekey(mnemonic, `${path}/0`));
      const account = fromPrivateKey(privateKey);
      const address = account.getAddress();
      const unlockType = 'privateKey';
     // yield put({type: "unlockWallet", payload: {address, unlockType, account,password}});
      cb({mnemonic, privateKey, keystore: account.toV3Keystore(password),address});
    }
  }
}
