import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import './assets/css/bootstrapV441.rtl.css';
import './assets/css/fontawesome.css';

import './assets/css/custom.css';

import logo from './assets/img/arm-final.png'
import farm from './assets/img/right-pic.png'

import SubMenu from './components/common/subMenu';
//per 
import PrivateRoute from './components/security/PrivateRoute'
import Login from './components/security/login'

//super admin level

//admin level
import User from './forms/admin/user/index';
import BaseInfo from './forms/baseInfo/baseInfo/index';
import Period from './forms/baseInfo/period/index';
import Operation from './forms/baseInfo/operation/index';
import WBS from './forms/execution/wbs/index';
import StudyWBS from './forms/execution/studyWbs/index';
import PermissionStructure from './forms/admin/perStructure/index';

//user level
import Company from './forms/contracts/company/index'
import Town from './forms/contracts/town/index'
import Contract from './forms/contracts/contract/index'
import Agreement from './forms/contracts/agreement/index'
import Project from './forms/contracts/project/index'
import Extension from './forms/contracts/extension/index'
import ValueChange from './forms/contracts/valueChange/index'
import ContractCycle from './forms/contracts/contractCycle/index'
import ProjectCycle from './forms/contracts/projectCycle/index'
import Insurance from './forms/contracts/insurance/index'
import InsuranceAppendix from './forms/contracts/insuranceAppendix/index'

import Tender from './forms/tender/tender/index'

import Delivery from './forms/delivery/delivery/index'
import TempDelivery from './forms/delivery/tempDelivery/index'

import WeeklyOperation from './forms/execution/weeklyOperation/index'
import WeeklyOperationPlan from './forms/execution/weeklyOperationPlan/index'
import WeeklyWeather from './forms/execution/weeklyWeather/index'
import WeeklyUser from './forms/execution/weeklyUser/index'
import WeeklyMachine from './forms/execution/weeklyMachine/index'
import StudyOperation from './forms/execution/studyOperation/index'

import CreditPredict from './forms/financial/creditPredict/index'
import InvoiceConsultant from './forms/financial/invoiceConsultant/index'
import InvoiceContractor from './forms/financial/invoiceContractor/index'
import InvoiceConsultantApprove from './forms/financial/invoiceConsultantApprove/index'
import InvoiceContractorApprove from './forms/financial/invoiceContractorApprove/index'
import InvoiceContractorPay from './forms/financial/invoiceContractorPay/index'
import InvoiceConsultantPay from './forms/financial/invoiceConsultantPay/index'

import Home from './components/home'
import Test from './components/test'

import ReportExcel from './reports/excel/index'
import ReportWeb from './reports/web/index'
import Web_Invoice_Contractor from './reports/web/Web_Invoice_Contractor'
import Web_invoice_consultant from './reports/web/Web_invoice_consultant'
import Web_insurance from './reports/web/Web_insurance'
import Web_contractCycle from './reports/web/Web_contractCycle'
import Web_tender from './reports/web/Web_tender'
import Web_contract from './reports/web/Web_contract'
import Web_Document from './reports/web/Web_Document'
import Dashboard_Execute from './reports/dashboard/index'
import Web_delivery from './reports/web/delivery'
//import notification from './reports/notification/index'
import notif_invoice from './reports/notification/notif_invoice'
import notif_insurance from './reports/notification/notif_insurance'
import notif_zamin from './reports/notification/notif_zamin'
import notif_extension from './reports/notification/notif_extension'
import notif_pishraft from './reports/notification/notif_pishraft'



class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      topMenuHovered: 0,
      topMenuClicked: 0,
      showSettingMenu: false,
      currentUser: {}
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.topMenuHandleBlur = this.topMenuHandleBlur.bind(this);
    this.topMenuHandleHover = this.topMenuHandleHover.bind(this);
    this.topMenuHandleClick = this.topMenuHandleClick.bind(this);
    this.settingClick = this.settingClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
  
    this.setState({ currentUser: {} });
    localStorage.clear();
    window.location.reload();
  }
  onLogin() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    if (user)
      this.setState({ currentUser: { name: user.name, lastLoginDate: user.last_login, role_id: user.role_id } });

  }
  componentDidMount() {
    this.onLogin();
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  settingClick() {
    this.setState(prevState => ({
      showSettingMenu: !prevState.showSettingMenu
    }));
  }
  topMenuHandleClick(i) {
    this.setState({ topMenuClicked: i });
  }
  topMenuHandleHover(i) {
    this.setState({ topMenuHovered: i });
  }
  topMenuHandleBlur() {
    this.setState({ topMenuHovered: -1 });
  }
  menuClassNames(i) {
    let names = [''];
    if (this.state.topMenuHovered === i)
      names.push('zoom', '');
    if (this.state.topMenuClicked === i)
      names.push('activeMenu');
    return names.join(' ');
  }


  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // console.log('You clicked outside of me!');
      //console.log(event.target)
      if (this.state.showSettingMenu)
        this.setState({ showSettingMenu: false })
    }
  }
  render() {
    return (
      <Router>

        <div className='container-fluid' dir="RTL">
          <div className='row topRiboon'>
            <div className=" main-ribon"> سامانه مدیریت پروژه شرکت شهرک های کشاورزی  </div>
            <div className="col-1 ml-auto" >

              <i className={this.state.currentUser.role_id && this.state.currentUser.role_id ==11 ? "fas fa-tools" : 'hidden'}
                style={{ margin: '8px', cursor: 'pointer', color: '#bdbdbd' }} onClick={this.settingClick}></i>

              <div className={this.state.showSettingMenu ? "dropdown-menu show" : "dropdown-menu"} ref={this.setWrapperRef}>
                <Link onClick={() => this.setState({ showSettingMenu: false })} className="dropdown-item" to="/baseinfo" >اطلاعات پایه</Link>
                <Link onClick={() => this.setState({ showSettingMenu: false })} className="dropdown-item" to="/period" >دوره ها</Link>
                <Link onClick={() => this.setState({ showSettingMenu: false })} className="dropdown-item" to="/operation" >عملیات اجرایی</Link>
                <Link onClick={() => this.setState({ showSettingMenu: false })} className="dropdown-item" to="/user" >مدیریت کاربران </Link>
                 <Link onClick={() => this.setState({ showSettingMenu: false })} className="dropdown-item" to="/permissionStructure" >مدیریت دسترسی ها</Link> 
              </div>

            </div>
            <div className="col-1">
              <div className='top-left'>
                <i className="fas fa-user" style={{ color: '#bdbdbd', margin: '8px 10px 7px' }}></i>
                <span className='nameofuser'> {this.state.currentUser.name} </span>
              </div>
              {this.state.currentUser.name && <div className="logout" onClick={this.onLogout} style={{ marginTop: '-34px' }}>
                خروج
            </div>}
            </div>
          </div>
          <div className='row navagition'>
            <div className='col-3'>
              <img src={logo} style={{ width: '81%',float:'right' , marginTop: '1%',paddingTop:'-3%' }} />
              

            </div>
            <div className='col-8'>
              <ul>
                <li style={{width: '7%'}}>
                <Link to="/" >
                  <div className={this.menuClassNames(0)} onMouseEnter={() => this.topMenuHandleHover(0)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(0)}>
                    <i className="fa fa-home" ></i>
                    خانه
                   </div>  </Link>
                </li>
                <li >
                  <div className={this.menuClassNames(1)} onMouseEnter={() => this.topMenuHandleHover(1)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(1)}>
                    <i className="far fa-file-contract" ></i>
                    قراردادها
                  </div>
                </li>
                <li >
                  <div className={this.menuClassNames(2)} onMouseEnter={() => this.topMenuHandleHover(2)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(2)}>
                    <i className="fas fa-chart-line" ></i>
                        پیشرفت
                  </div>
                </li>
                <li>
                  <div className={this.menuClassNames(3)} onMouseEnter={() => this.topMenuHandleHover(3)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(3)}>
                    <i className="fa fa-handshake"></i>
                        تحویل
                  </div>
                </li>
                <li>
                  <div className={this.menuClassNames(4)} onMouseEnter={() => this.topMenuHandleHover(4)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(4)}>
                    <i className="fas fa-donate" ></i>
                        مالی
                  </div>
                </li>
                <li>
                  <div className={this.menuClassNames(5)} onMouseEnter={() => this.topMenuHandleHover(5)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(5)}>
                    <i className="fas fa-gavel" ></i>
                          مناقصه
                  </div>
                </li>
                <li>
                  <div className={this.menuClassNames(6)} onMouseEnter={() => this.topMenuHandleHover(6)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(6)}>
                    <i className="fas fa-file-signature" ></i>
                  گزارشات
                  </div>
                </li>
                <li>
                  <div className={this.menuClassNames(7)} onMouseEnter={() => this.topMenuHandleHover(7)} onMouseLeave={this.topMenuHandleBlur} onClick={() => this.topMenuHandleClick(7)}>
                    <i className="fas fa-bell" ></i>
                  هشدارها
                  </div>
                </li>

              </ul>
            </div>
            <div className='col-1 farmcol'>
              <img className='farmlogo' src={farm} style={{ width: '93px', marginTop: "10px" }} />
            </div>
          </div>
          <div className='row subNavagition'>
            <SubMenu type={this.state.topMenuClicked}></SubMenu>
          </div>
          <div className='row content'>
            <Switch>
              <PrivateRoute path="/baseInfo" component={BaseInfo} role="admin" />
              <PrivateRoute path="/period" component={Period} role="admin" />
              <PrivateRoute path="/operation" component={Operation} role="admin" />
              <PrivateRoute path="/wbs" component={WBS} role="admin" />
              <PrivateRoute path="/studyWbs" component={StudyWBS} role="admin" />
              <PrivateRoute path="/user" component={User} role="admin" />
              <PrivateRoute path="/permissionStructure" component={PermissionStructure} role="admin" />

              <PrivateRoute path="/company" component={Company} />
              <PrivateRoute path="/town" component={Town} />
              <PrivateRoute path="/contract" component={Contract} />
              <PrivateRoute path="/agreement" component={Agreement} />
              <PrivateRoute path="/project" component={Project} />
              <PrivateRoute path="/extension" component={Extension} />
              <PrivateRoute path="/tempDelivery" component={TempDelivery} />
              <PrivateRoute path="/delivery" component={Delivery} />
              <PrivateRoute path="/invoiceContractorApprove" component={InvoiceContractorApprove} />
              <PrivateRoute path="/invoiceContractorPay" component={InvoiceContractorPay} />
              <PrivateRoute path="/invoiceConsultantApprove" component={InvoiceConsultantApprove} />
              <PrivateRoute path="/invoiceConsultantPay" component={InvoiceConsultantPay} />
              <PrivateRoute path="/invoiceContractor" component={InvoiceContractor} />
              <PrivateRoute path="/invoiceConsultant" component={InvoiceConsultant} />
              <PrivateRoute path="/creditPredict" component={CreditPredict} />
              <PrivateRoute path="/weeklyOperation" component={WeeklyOperation} />
              <PrivateRoute path="/weeklyOperationPlan" component={WeeklyOperationPlan} />
              <PrivateRoute path="/weeklyWeather" component={WeeklyWeather} />
              <PrivateRoute path="/weeklyMachine" component={WeeklyMachine} />
              <PrivateRoute path="/weeklyUser" component={WeeklyUser} />
              <PrivateRoute path="/studyOperation" component={StudyOperation} />

              <PrivateRoute path="/contractCycle" component={ContractCycle} />
              <PrivateRoute path="/projectCycle" component={ProjectCycle} />
              <PrivateRoute path="/valueChange" component={ValueChange} />
              <PrivateRoute path="/tender" component={Tender} />

              <PrivateRoute path="/insurance" component={Insurance} />
              <PrivateRoute path="/insuranceAppendix" component={InsuranceAppendix} />

              <PrivateRoute path="/report-excel" component={ReportExcel} />
              <PrivateRoute path="/report-Web" component={ReportWeb} />
              <PrivateRoute path="/Web_Invoice_Contractor" component={Web_Invoice_Contractor} />
              <PrivateRoute path="/Web_invoice_consultant" component={Web_invoice_consultant} />
              <PrivateRoute path="/Web_insurance" component={Web_insurance} />
              <PrivateRoute path="/Web_contractCycle" component={Web_contractCycle} />
              <PrivateRoute path="/Web_tender" component={Web_tender} />
              <PrivateRoute path="/Web_contract" component={Web_contract} />
              <PrivateRoute path="/Web_Document" component={Web_Document} />
              <PrivateRoute path="/report-dashboard" component={Dashboard_Execute} />
              {/* <PrivateRoute path="/Web_delivery" component={Web_delivery} /> */}

              {/* <PrivateRoute path="/notification" component={notification} /> */}
              <PrivateRoute path="/notif_invoice" component={notif_invoice} />
              <PrivateRoute path="/notif_pishraft" component={notif_pishraft} />
              <PrivateRoute path="/notif_extension" component={notif_extension} />
              <PrivateRoute path="/notif_zamin" component={notif_zamin} />
              <PrivateRoute path="/notif_insurance" component={notif_insurance} />
              

              <Route path="/test">
                <Test />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/" component={Web_delivery} onLogin={this.onLogin} />
              {/* <Route path="/">
                <Home />
              </Route> */}

            </Switch>
          </div>
        </div>
      </Router>

    );
  }


}

export default App;