const express = require('express');
const router = express.Router();

/* API routes */
router.use('/BaseInfo', require('./baseinfo/BaseInfoRoutes'));
router.use('/Operation', require('./baseinfo/OperationRoutes'));
router.use('/Period', require('./baseinfo/PeriodRoutes'));

router.use('/Company', require('./contract/CompanyRoutes'));
router.use('/Town', require('./contract/TownRoutes'));
router.use('/Contract', require('./contract/ContractRoutes'));
router.use('/Project', require('./contract/ProjectRoutes'));
router.use('/Extension', require('./contract/ExtensionRoutes'));

router.use('/User', require('./perm/UserRoutes'));
router.use('/PermissionStructure', require('./perm/PermissionStructureRoutes'));
router.use('/Approve', require('./perm/ApproveRoutes'));
router.use('/Role', require('./perm/RoleRoutes'));

router.use('/Delivery', require('./delivery/DeliveryRoutes'));
router.use('/TempDelivery', require('./delivery/TempDeliveryRoutes'));

router.use('/WBS', require('./execution/WBSRoutes'));
router.use('/WeeklyOperation', require('./execution/WeeklyOperationRoutes'));
router.use('/WeeklyOperationDetail', require('./execution/WeeklyOperationDetailRoutes'));
router.use('/WeeklyWeather', require('./execution/WeeklyWeatherRoutes'));
router.use('/WeeklyWeatherDetail', require('./execution/WeeklyWeatherDetailRoutes'));
router.use('/WeeklyUser', require('./execution/WeeklyUserRoutes'));
router.use('/WeeklyUserDetail', require('./execution/WeeklyUserDetailRoutes'));
router.use('/WeeklyMachine', require('./execution/WeeklyMachineRoutes'));
router.use('/WeeklyMachineDetail', require('./execution/WeeklyMachineDetailRoutes'));

router.use('/CreditPredict', require('./financial/CreditPredictRoutes'));
router.use('/InvoiceConsultant', require('./financial/InvoiceConsultantRoutes'));
router.use('/InvoiceContractor', require('./financial/InvoiceContractorRoutes'));
router.use('/PayInvoiceConsultant', require('./financial/PayInvoiceConsultantRoutes'));
router.use('/PayInvoiceContractor', require('./financial/PayInvoiceContractorRoutes'));

module.exports = router;