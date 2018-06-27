import React from 'react'
import Imtoken from './Imtoken'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'
import storage from 'modules/storage';

class AuthByImtoken extends React.Component {

  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    const _props = this.props
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        let language = 'en-US'
        let currency = 'USD'
        if(window.Wallet.language.indexOf('zh') !== -1){
          language = 'zh-CN'
        }
        if(window.Wallet.currency === 'CNY'){
          currency = 'CNY'
        }

        storage.wallet.storeUnlockedAddress("imtoken", window.Wallet.address)
        _props.dispatch({type:'locales/setLocale', payload:{locale:language}});
        _props.dispatch({type:'settings/preferenceChange',payload:{language,currency}})
        _props.dispatch({type: 'sockets/unlocked'});
        Toast.hide()
      })
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
          let language = 'en-US'
          let currency = 'USD'
          if(window.Wallet.language.indexOf('zh') !== -1){
            language = 'zh-CN'
          }
          if(window.Wallet.currency === 'CNY'){
            currency = 'CNY'
          }
          storage.wallet.storeUnlockedAddress("imtoken", window.Wallet.address)
          _props.dispatch({type:'locales/setLocale', payload:{locale:language}});
          _props.dispatch({type:'settings/preferenceChange',payload:{language,currency}})
          _props.dispatch({type: 'sockets/unlocked'});
         Toast.hide()
        })
      })
    }
  }

  goToDex = () => {
    routeActions.gotoPath('/dex');
  }
  goToFace2Face = () => {
    routeActions.gotoPath('/face2face');
  }
  render () {
    return (
      <div>
        <NavBar
          className=""
          mode="light"
          leftContent={null &&[
            <span onClick={()=>{}} className="color-black-1" key="1"><WebIcon type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1" key="1"  onClick={()=>{}}><WebIcon type="question-circle-o" /></span>
          ]}
        >
          <div>
            Auth By Imtoken
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="bg-white">
          <div className="pt35 pb35">
            <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
              <div className="col text-center">
                <div className="d-inline-block color-black-1 text-center border-grey-300" style={{
                  width: '40px',
                  height: '40px',
                  lineHeight: '40px',
                  borderRadius: '50em',
                }}>
                  <img className="rounded-circle" width="100%" src="https://docs.token.im/images/im-token-logo.png" alt=""/>
                </div>
              </div>
              <div className="col-auto text-center" style={{width: '30px'}}>
                <WebIcon type="swap" className={`color-black-1 fs20`}/>
              </div>
              <div className="col text-center">
                <div className="d-inline-block color-black-1 text-center border-grey-300" style={{
                  width: '40px',
                  height: '40px',
                  lineHeight: '38px',
                  borderRadius: '50em',
                  border: '1px solid'
                }}>
                  <i className={`icon-LRC fs24`}/>
                </div>
              </div>
            </div>
            <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center lh1">
              <div className="col text-center">
                <div className="color-black-2 fs16">imToken</div>
              </div>
              <div className="col-auto text-center position-relative" style={{width: '30px'}}>
                <div className="color-black-3 fs16"></div>
              </div>
              <div className="col text-center">
                <div className="color-black-2 fs16">Loopring Dex</div>
              </div>
            </div>
          </div>

          <div className="divider 1px zb-b-t"></div>
          <div className="p15">
            <Button type="primary" onClick={this.goToDex}>授权登录</Button>
            { false && <Button type="primary"  onClick={this.goToDex}>进入DEX</Button> }
            { false && <Button type="primary"  onClick={this.goToFace2Face}>Face2Face</Button> }
          </div>
        </div>

      </div>
    )
  }

}

export default connect()(AuthByImtoken)