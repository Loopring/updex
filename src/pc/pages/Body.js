import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import {connect} from 'dva'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal';
import { TabBar,NavBar,Icon,Tabs } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import UserCenter from '../account/UserCenter';
import Markets from '../tickers/Markets';
import PlaceOrderForm from '../orders/PlaceOrderForm';
import PlaceOrder from 'mobile/orders/PlaceOrderPage';
import HelperOfDepth from '../orders/HelperOfDepth';
import HelperOfMyMarketOrders from 'mobile/orders/HelperOfMyMarketOrders';
import ListMarketFills from '../fills/ListMarketFills';
import HelperOfBalance from '../orders/HelperOfBalance';
import MarketTitckers from 'mobile/tickers/ListMarketTickers';
import Kline from 'mobile/charts/Kline';
import Header from './Header'
import PanelHeader from './PanelHeader'
import PanelWrapper from './PanelWrapper'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {match,location,dispatch,collapsed} = this.props;
    const showLayer = (id)=>{
      dispatch({
        type:"layers/showLayer",
        payload:{id}
      })
    }
    return (
      <div style={{height:'100vh',overflow:'none' }}>
        <div className="pl5 pr0" style={{height:'6.5rem',paddingTop:'0rem'}}>
         <Header />
        </div>
        <div className="row no-gutters ml0 mr0">
          <div className="col-auo m5 mr0 mb0 d-flex flex-column" style={{height:'94vh',width:'40rem'}}>
            <PanelWrapper>
              <PanelHeader title="Place Order" />
              <div className="pt5"></div>
              <PlaceOrderForm location={location} match={match} />
            </PanelWrapper>
            <PanelWrapper className="mt5">
              <PanelHeader title="Wallet Balances" />
              <HelperOfBalance />
            </PanelWrapper>
            <PanelWrapper className="mt5" style={{flex:'1'}}>
              <PanelHeader title="My Orders" />
              <div style={{flex:'1',overflow:'auto'}}>
                <HelperOfMyMarketOrders />
              </div>
            </PanelWrapper>
          </div>
          <div className="col-auto m5 mr0 mb0 d-flex flex-column" style={{height:'94vh',width:'37.5rem'}}>
            <PanelWrapper style={{flex:'1'}}>
              <PanelHeader title="Order Book" />
              <HelperOfDepth />
            </PanelWrapper>
            { !collapsed &&
              <div className="mt5">
                <PanelWrapper style={{height:'40vh'}}>
                  <PanelHeader title="Trade History" />
                  <ListMarketFills />
                </PanelWrapper>
              </div>
            }
          </div>
          <div className="col m5 mr0 mb0  d-flex flex-column" style={{height:'94vh'}}>
            <PanelWrapper style={{flex:'1'}}>
              <PanelHeader title="Charts" />
              <Kline />
            </PanelWrapper>
          </div>
          { collapsed &&
            <div className="col-auto m5 mr0 mb0  d-flex flex-column" style={{height:'94vh',width:'37.5rem'}}>
              <PanelWrapper style={{flex:'1'}}>
                <PanelHeader title="Trade History" />
                <ListMarketFills />
              </PanelWrapper>
            </div>
          }
         
        </div>
      </div>
    )
  }
}

export default connect(({layers})=>{
  let collapsed 
  if(layers.SidebarOfMarkets){
    collapsed = !layers.SidebarOfMarkets.visible
  }else{
    collapsed = true // default value
  }
  return {
    collapsed
  }
})(Home)
