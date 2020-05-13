﻿import moment from 'moment-jalaali';
export const columns = [
    { dataIndex: 'id',key: 'id', title: 'شناسه ' }, 
    { dataIndex: 'contract',key: 'contract', title: 'شماره پیمان/ قرارداد' },
    { dataIndex: 'contractor_date',key: 'contractor_date', title: 'تاریخ درخواست پیمانکار' , render: function (text) { return  text&&moment.isMoment(text)?text.format('jYYYY/jMM/jDD') :''}},
    { dataIndex: 'consultant_date',key: 'consultant_date', title: 'تاریخ درخواست مشاور' , render: function (text) { return  text&&moment.isMoment(text)?text.format('jYYYY/jMM/jDD') :''}}, 
    { dataIndex: 'branch_date',key: 'branch_date', title: 'تاریخ درخواست مدیر شعبه' , render: function (text) { return  text&&moment.isMoment(text)?text.format('jYYYY/jMM/jDD') :''}},
    { dataIndex: 'manager_date',key: 'manager_date', title: 'تاریخ درخواست مدیر طرح' , render: function (text) { return  text&&moment.isMoment(text)?text.format('jYYYY/jMM/jDD') :''}},
    { dataIndex: 'commision_date',key: 'commision_date', title: 'تاریخ تشکیل کمیسیون' , render: function (text) { return  text&&moment.isMoment(text)?text.format('jYYYY/jMM/jDD') :''}},
    // { dataIndex: 'file_record',key: 'file_record', title: 'سند صورتجلسه' }, 
    // { dataIndex: 'file_signification',key: 'file_signification', title: 'سند ابلاغ صورتجلسه' }, 
    // { dataIndex: 'creator_id',key: 'creator_id', title: 'ایجاد کننده' }, 
    // { dataIndex: 'editor_id',key: 'editor_id', title: 'ویرایش کننده' }, 
    // { dataIndex: 'edit_date',key: 'edit_date', title: 'تاریخ ویرایش' , render: function (text) { return text?text.format('jYYYY/jMM/jDD'):'' }},
    // { dataIndex: 'create_date',key: 'create_date', title: 'تاریخ ایجاد' , render: function (text) { return text?text.format('jYYYY/jMM/jDD'):'' }},

   ];

export const storeIndex = "delivery";
export const pageHeder = 'تحویل قطعی';

export const emptyItem = { contractor_date : undefined ,consultant_date : undefined ,branch_date : undefined ,manager_date : undefined ,commision_date : undefined ,file_record : '' ,file_signification : '' ,contract_id : ''  ,project_id: '' };

