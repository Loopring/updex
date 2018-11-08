export default [
  require('./locales/model').default,
  require('./sockets/SocketsModel').default,
  require('./orders/ListModel').default,
  require('./orders/PlaceOrderModel').default,
  require('./orders/PlaceOrderHelperModel').default,
  require('./orders/P2POrderModel').default,
  require('./fills/ListModel').default,
  require('./tokens/ListModel').default,
  require('./tokens/TransferModel').default,
  require('./tokens/ConvertModel').default,
  require('./transactions/ListModel').default,
  require('./account/model').default,
  require('./settings/model').default,
  require('LoopringUI/modules/LayersModel').default,
  require('LoopringUI/modules/ModalsModel').default,
  require('LoopringUI/modules/TabsModel').default,
  // require('./wallet/model').default,
  require('./settings/gasModel').default,
  require('./settings/ttlModel').default,
  require('./sign/SignModel').default,
]


