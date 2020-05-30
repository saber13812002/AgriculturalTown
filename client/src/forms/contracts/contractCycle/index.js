import React, { Component } from 'react';
import { saveItem, getAllItem, removeItem, updateItem } from '../../../api/index';
import { message, Select } from 'antd';
import moment from 'moment-jalaali';
import DatePicker from 'react-datepicker2';
import Grid from '../../../components/common/grid3';
import Loading from '../../../components/common/loading';
import { columns, storeIndex, pageHeder, emptyItem } from './statics'
import { successDuration, successMessage, errorMessage, errorDuration, selectDefaultProp, datePickerDefaultProp } from '../../../components/statics'

class PayInvoiceContractor extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();

        this.state = {
            columns: columns, rows: [], contracts: [], periods: [], StatusContract: [],
            isFetching: true, obj: { ...emptyItem }, showPanel: false, status: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.newClickHandle = this.newClickHandle.bind(this);
        this.editClickHandle = this.editClickHandle.bind(this);
        this.deleteClickHandle = this.deleteClickHandle.bind(this);
        this.displayClickHandle = this.displayClickHandle.bind(this);
        this.saveBtnClick = this.saveBtnClick.bind(this);
        this.cancelBtnClick = this.cancelBtnClick.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    scrollToFormRef = () => window.scrollTo({ top: this.formRef.offsetTop, behavior: 'smooth' })
    scrollToGridRef = () => window.scrollTo({ top: 0, behavior: 'smooth', })

    fetchData() {
        Promise.all([getAllItem(storeIndex), getAllItem('contract'), getAllItem('BaseInfo'), getAllItem('periods')]).then((response) => {
            let contracts = response[1].data.map(a => { return { key: a.id, label: a.contract_no + ' - ' + a.company, value: a.id, title: a.title } });
            let periods = response[2].data.map(a => { return { key: a.id, label: a.title, value: a.id, end_date: a.end_date, start_date: a.start_date } });
            let StatusContract = response[3].data.filter(a => a.groupid === 23).map(a => { return { key: a.id, label: a.title, value: a.id } });
            let data = response[0].data;
            data.forEach(e => {
                e.date = e.date ? moment(e.date) : undefined;
                e.signification_date = e.signification_date ? moment(e.signification_date) : undefined;
            });

            this.setState({
                isFetching: false, rows: data, contracts, periods, StatusContract,
                obj: { ...emptyItem }, showPanel: false, status: '', contractTitle: '',
            });
        }).catch((error) => console.log(error))
    }
    componentDidMount() {
        this.fetchData();
    }

    saveBtnClick() {
        let obj = this.state.obj;
        obj.date = obj.date ? obj.date.format() : '';
        obj.signification_date = obj.signification_date ? obj.signification_date.format() : '';
        var formData = new FormData();
       
        if (obj.f_file_record)
        formData.append("file_record", obj.f_file_record); 
     
     
             formData.append("data", JSON.stringify(obj));

        if (this.state.status === 'new')
            saveItem(obj, storeIndex).then((response) => {
                if (response.data.type !== "Error") {
                    message.success(successMessage, successDuration);
                    this.fetchData();
                }
                else {
                    message.error(errorMessage, errorDuration);
                    console.log('error : ', response);
                }
            }).catch((error) => { console.log(error); message.error(errorMessage, errorDuration); });
        else {
            updateItem(obj, storeIndex).then((response) => {
                if (response.data.type !== "Error") {
                    message.success(successMessage, successDuration);
                    this.fetchData();
                }
                else {
                    message.error(errorMessage, errorDuration);
                    console.log('error : ', response);
                }
            }).catch((error) => { console.log(error); message.error(errorMessage, errorDuration); });
        }
    }
    fileChange(e, name) {
        let ob = this.state.obj;
        if (!name)
            ob[e.target.name] = e.target.files[0];
        else
            ob[name] = e;
        this.setState({ obj: ob });
    }
    handleChange(e, name) {
        let ob = this.state.obj;
        if (!name)
            ob[e.target.name] = e.target.value;
        else
            ob[name] = e;

        this.setState({ obj: ob });
    }
    dateChange(name, value) {
        let ob = this.state.obj;
        ob[name] = value;
        this.setState({ obj: ob });
    }
    selectChange(name, values) {
        let { obj, contractTitle, contracts, rows, invioces } = this.state;
        obj[name] = values;

        if (name === 'contract_id') {
            let cont = contracts.find(a => a.key === obj.contract_id);
            contractTitle = cont && cont.title ? cont.title : '';
            let prevCont = rows.filter(a => a.contract_id === obj.contract_id)
                .sort((a, b) => (a.invoice_no > b.invoice_no) ? 1 : ((b.invoice_no > a.invoice_no) ? -1 : 0))[0];
            obj.prev_id = prevCont ? prevCont.no : 0;
            obj.prev_price = prevCont ? prevCont.price : 0;

            let prevInvo = invioces.filter(a => a.contract_id === obj.contract_id)
                .sort((a, b) => (a.invoice_no > b.invoice_no) ? 1 : ((b.invoice_no > a.invoice_no) ? -1 : 0))[0];
            obj.prev_approve_id = prevInvo ? prevInvo.no : 0;
            obj.prev_approve_price = prevInvo ? prevInvo.manager_price : 0;

        }
        this.setState({ obj, contractTitle });
    }
    editClickHandle(item) {
        let cont = this.state.contracts.find(a => a.key == item.contract_id);
        let contractTitle = cont && cont.title ? cont.title : '';
        this.setState({ contractTitle, obj: item, status: 'edit', showPanel: true }, () => { this.scrollToFormRef(); });
    }
    displayClickHandle(item) {
        let cont = this.state.contracts.find(a => a.key == item.contract_id);
        let contractTitle = cont && cont.title ? cont.title : '';
        this.setState({ contractTitle, obj: item, status: 'display', showPanel: true }, () => { this.scrollToFormRef() });
    }
    deleteClickHandle(item) {
        //console.log(item)
        removeItem(item.id, storeIndex).then((response) => {
            if (response.data.type !== "Error") {
                this.fetchData();
                message.success(successMessage, successDuration);
            }
            else {
                message.error(errorMessage, errorDuration);
                console.log('error : ', response);
            }
        }).catch((error) => console.log(error))
    }
    newClickHandle() {
        this.setState({ status: 'new', showPanel: true }, () => { this.scrollToFormRef(); });
    }
    cancelBtnClick() {
        this.setState({ obj: { ...emptyItem }, status: '', showPanel: false }, () => { this.scrollToGridRef(); });
    }
    deleteFile(name) {
        let ob = this.state.obj;
        ob[name] = false;
        this.setState({ obj: ob });
    }
    render() {
        const { isFetching } = this.state;
        if (isFetching) {
            return (<Loading></Loading>)
        }
        else {
            return (
                <div className="app-main col-12" >
                    <div className="row" >
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            {pageHeder}
                                        </div>
                                        <div className='col-1  ml-auto'>
                                            <i className="fa fa-plus-circle add-button" onClick={this.newClickHandle}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Grid columns={this.state.columns} rows={this.state.rows}
                                        editClick={this.editClickHandle}
                                        displayClick={this.displayClickHandle}
                                        deleteClick={this.deleteClickHandle}></Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={(ref) => this.formRef = ref} className={this.state.showPanel ? 'row' : 'row hidden'}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    {this.state.status === 'new' ? 'اضافه کردن آیتم جدید' : this.state.status === 'edit' ? 'ویرایش آیتم' : 'مشاهده آیتم'}
                                </div>
                                <div className="card-body">
                                    <form>
                                    <div className="row">
                                            <div className="col-4">
                                                <div className="form-group">
                                                    <label htmlFor="contract_id" className="">شماره پیمان/ قرارداد</label>
                                                    <Select  {...selectDefaultProp} disabled={this.state.status === 'display'} options={this.state.contracts}
                                                        value={this.state.obj.contract_id} onSelect={(values) => this.selectChange("contract_id", values)} />
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group">
                                                    <label htmlFor="status_id" className="">چرخه پیمان</label>
                                                    <Select  {...selectDefaultProp} disabled={this.state.status === 'display'} options={this.state.StatusContract}
                                                        value={this.state.obj.status_id} onSelect={(values) => this.selectChange("status_id", values)} />
                                                </div>
                                            </div>
									       <div className="col-4">
                                                <div className="form-group">
                                                    <label htmlFor="date" className="">تاریخ</label>
                                                    <DatePicker onChange={value => this.dateChange('date', value)}
                                                        value={this.state.obj.date}
                                                        disabled={this.state.status === 'display'} {...datePickerDefaultProp} />
                                                </div>
                                            </div>
										</div>
								    <div className="row">
									  <div className="col-4">
                                            <div className="form-group">
                                                <label htmlFor="period_id" className="">دوره</label>
                                                {this.state.period_id && <label className="form-control">{this.state.periods.find(a => a.key === this.state.period_id).label}</label>}
                                                {!this.state.period_id && <Select  {...selectDefaultProp} disabled={this.state.status === 'display'} options={this.state.periods}
                                                    value={this.state.period_id} onSelect={(values) => this.setState({ period_id: values })} />}
                                            </div>
                                        </div>
										 <div className="col-4">
                                                <div className="form-group">
                                                    <label htmlFor="f_file_record" className="">بارگذاری صورتجلسه</label>
                                                    {this.state.status !== 'display' && <input name="f_file_record" className="form-control" onChange={this.fileChange} type='file'
                                                    />}
                                                    {this.state.obj.file_record && <div><a target="_blank" href={this.state.obj.file_record}>مشاهده فایل</a>
                                                        {this.state.status === 'edit' && <i className="far fa-trash-alt" style={{ marginRight: '8px' }}
                                                            onClick={() => this.deleteFile('file_record')}></i>}</div>}
                                                </div>
                                            </div>
							            <div className="col-4">
                                                <div className="form-group">
                                                    <label htmlFor="signification_date" className="">تاریخ ابلاغ</label>
                                                    <DatePicker onChange={value => this.dateChange('signification_date', value)}
                                                        value={this.state.obj.signification_date}
                                                        disabled={this.state.status === 'display'} {...datePickerDefaultProp} />
                                                </div>
                                            </div>
									</div>
								     <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="decsciption" className="">توضیحات</label>
                                                    <input name="decsciption" className="form-control" onChange={this.handleChange}
                                                        value={this.state.obj.decsciption} disabled={this.state.status === 'display'} />
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.status !== 'display' && <input type="button" className="btn btn-primary" style={{ margin: "10px" }} onClick={this.saveBtnClick} value="ذخیره" />}
                                        <input type="button" className="btn btn-outline-primary" style={{ margin: "10px" }} value="بستن" onClick={this.cancelBtnClick} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    }

}
export default PayInvoiceContractor;