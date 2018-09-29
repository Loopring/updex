import React from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import Pages from './pages'
import Orders from './orders'
import Tokens from './tokens'
import Account from './account'
import Markets from './tickers/Markets'
import MarketsSearch from './tickers/ListSearchTickers'
import MarketDetail from './tickers/Detail'
import MarketModals from './tickers/Modals'
import Convert from './tokens/ConvertForm'
import PlaceOrder from './orders/PlaceOrderPage'
import UserCenter from './account/UserCenter'
import Notifications from './notifications/Notifications'
import ListTodos from './notifications/ListTodos'
import CommonModals from '../components/Modals'
import storage from 'modules/storage'

const UnLogged = ()=>{
  const isLogged = !!storage.wallet.getUnlockedAddress()
  if(isLogged){
    return <Redirect to="/dex" />
  }else{
    return (
      <Redirect to="/auth" />
    )
  }
}
const Logged = ()=>{
  // const isLogged =  !!storage.wallet.getUnlockedAddress()
  const isLogged =  true
  if(isLogged){
    return (
      <div>
        <Switch>
          <Route path={`/pc/trade`} component={Pages.Home} />
          <Route path={`/pc/trade2`} component={Pages.Home2} />
          <Route path={`/pc/trade3`} component={Pages.Home3} />
          <Redirect from="/pc" to="/pc/trade" />
        </Switch>
        <CommonModals />
        <Orders.Modals />
        <Tokens.Modals />
        <Account.Modals />
        <MarketModals />
      </div>
    )
  }else{
    return <Redirect to="/auth" />
  }
}

export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path={`/pc`}  component={Logged} />
      </Switch>
    );
  }
}




