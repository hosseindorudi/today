const enums ={
    //Custom


    Module_Operator : 100,

    //Module_Agent : 200,
    Module_Customer : 300,
    Module_Definition : 400,

    //Module_Financial : 500,
    //Module_Treasury : 600,
    //Module_Warehouse : 700,
    //Module_Asset : 800,
    //Module_OfficeAutomation : 900,
    //Module_HumanResource : 1000,
    //Module_Payroll : 1100,
    //Module_AssemblyAffairs : 1200,
    //Module_Purchasing : 1300,
    //Module_Manufacturing : 1400,
    //Module_PPB : 1500,
    //Module_Project : 1600,
    //Module_Logistic : 1700,
    Module_Business : 1800,
    //Module_Contract : 1900,
    //Module_Trading : 2000,
    //Module_InternationalAffairs : 2100,
    Module_Marketing : 2200,
    //Module_OrganizationalSales : 2300,
    //Module_Store : 2400,
    //Module_Distribution : 2500,
    Module_AfterSales : 2600,
    //Module_CRM : 2700,
    //Module_Club : 2800,
    //Module_Education : 2900,
    Module_Poll : 3000,
    //Module_BalancedScorecard : 3100,
    //Module_BusinessIntelligence : 3200,

    Module_Setting : 9900,
    //Module_System : 10000,


    Operator_Dashboard_Update_w : 100102,
    Operator_Dashboard_ChangePassword_w : 100108,
    Operator_Group_Permission_w : 107108,
    Operator_Operator_ChangePassword_w : 110108,
    Customer_Customer_ChangePassword_w : 305108,
    Marketing_PhoneBook_SendMessage_w : 2203108,


    AfterSales_New_Registered : 2600110,
    AfterSales_New_Registered_Create_w : 2600111,
    AfterSales_New_Registered_Read_r : 2600112,
    AfterSales_New_Registered_Update_w : 2600113,
    AfterSales_New_Registered_Delete_w : 2600114,
    AfterSales_New_Registered_Import_w : 2600115,
    AfterSales_New_Registered_Export_r : 2600116,
    AfterSales_New_Registered_Log_r : 2600117,

    AfterSales_New_SendToCompany : 2600120,
    AfterSales_New_SendToCompany_Create_w : 2600121,
    AfterSales_New_SendToCompany_Read_r : 2600122,
    AfterSales_New_SendToCompany_Update_w : 2600123,
    AfterSales_New_SendToCompany_Delete_w : 2600124,
    AfterSales_New_SendToCompany_Import_w : 2600125,
    AfterSales_New_SendToCompany_Export_r : 2600126,
    AfterSales_New_SendToCompany_Log_r : 2600127,

    AfterSales_New_Admission : 2600130,
    AfterSales_New_Admission_Create_w : 2600131,
    AfterSales_New_Admission_Read_r : 2600132,
    AfterSales_New_Admission_Update_w : 2600133,
    AfterSales_New_Admission_Delete_w : 2600134,
    AfterSales_New_Admission_Import_w : 2600135,
    AfterSales_New_Admission_Export_r : 2600136,
    AfterSales_New_Admission_Log_r : 2600137,

    AfterSales_New_InputQualityControl : 2600140,
    AfterSales_New_InputQualityControl_Read_r : 2600142,
    AfterSales_New_InputQualityControl_Export_r : 2600146,
    AfterSales_New_InputQualityControl_Log_r : 2600147,
    AfterSales_New_InputQualityControl_Qc_w : 2600148,

    AfterSales_New_AssignToTechnician : 2600150,
    AfterSales_New_AssignToTechnician_Read_r : 2600152,
    AfterSales_New_AssignToTechnician_Export_r : 2600156,
    AfterSales_New_AssignToTechnician_Log_r : 2600157,
    AfterSales_New_AssignToTechnician_Assign_w : 2600158,

    AfterSales_New_Repair : 2600160,
    AfterSales_New_Repair_Read_r : 2600162,
    AfterSales_New_Repair_Export_r : 2600166,
    AfterSales_New_Repair_Log_r : 2600167,
    AfterSales_New_Repair_Repair_w : 2600168,

    AfterSales_New_OutputQualityControl : 2600170,
    AfterSales_New_OutputQualityControl_Read_r : 2600172,
    AfterSales_New_OutputQualityControl_Export_r : 2600176,
    AfterSales_New_OutputQualityControl_Log_r : 2600177,
    AfterSales_New_OutputQualityControl_Qc_w : 2600178,

    AfterSales_New_Replacement : 2600180,
    AfterSales_New_Replacement_Read_r : 2600182,
    AfterSales_New_Replacement_Export_r : 2600186,
    AfterSales_New_Replacement_Log_r : 2600187,
    AfterSales_New_Replacement_Replacement_w : 2600188,

    AfterSales_New_TakeBack : 2600190,
    AfterSales_New_TakeBack_Read_r : 2600192,
    AfterSales_New_TakeBack_Export_r : 2600196,
    AfterSales_New_TakeBack_Log_r : 2600197,
    AfterSales_New_TakeBack_TakeBack_w : 2600198,

    AfterSales_New_DeliveryInPerson : 2600200,
    AfterSales_New_DeliveryInPerson_Read_r : 2600202,
    AfterSales_New_DeliveryInPerson_Export_r : 2600206,
    AfterSales_New_DeliveryInPerson_Log_r : 2600207,
    AfterSales_New_DeliveryInPerson_Delivery_w : 2600208,

    AfterSales_New_Courier : 2600210,
    AfterSales_New_Courier_Read_r : 2600212,
    AfterSales_New_Courier_Export_r : 2600216,
    AfterSales_New_Courier_Log_r : 2600217,
    AfterSales_New_Courier_Send_w : 2600218,

    AfterSales_New_PostToAgent : 2600220,
    AfterSales_New_PostToAgent_Read_r : 2600222,
    AfterSales_New_PostToAgent_Export_r : 2600226,
    AfterSales_New_PostToAgent_Log_r : 2600227,
    AfterSales_New_PostToAgent_Post_w : 2600228,

    AfterSales_New_PostToCustomer : 2600230,
    AfterSales_New_PostToCustomer_Read_r : 2600232,
    AfterSales_New_PostToCustomer_Export_r : 2600236,
    AfterSales_New_PostToCustomer_Log_r : 2600237,
    AfterSales_New_PostToCustomer_Post_w : 2600238,

    AfterSales_New_Archive : 2600240,
    AfterSales_New_Archive_Read_r : 2600242,
    AfterSales_New_Archive_Export_r : 2600246,
    AfterSales_New_Archive_Log_r : 2600247,

    //Custom



    //Operator - 100
    ////////////////////////////////////////////////////////////

    //Dashboard
    Operator_Dashboard_Index : 100100,
    Operator_Dashboard_Index_Read_r : 100101,


    //tbl_Opr_AccessList
    Operator_AccessList_Read_r : 101102,


    //tbl_Opr_BruteForce
    Operator_BruteForce : 102100,
    Operator_BruteForce_Read_r : 102102,
    Operator_BruteForce_Delete_w : 102104,
    Operator_BruteForce_Export_r : 102106,
    Operator_BruteForce_Log_r : 102107,


    //tbl_Opr_Event
    Operator_Event : 103100,
    Operator_Event_Read_r : 103102,
    Operator_Event_Export_r : 103106,


    //tbl_Opr_FailedHistory
    Operator_FailedHistory : 104100,
    Operator_FailedHistory_Read_r : 104102,
    Operator_FailedHistory_Export_r : 104106,
    Operator_FailedHistory_Log_r : 104107,


    //tbl_Opr_Group
    Operator_Group : 106100,
    Operator_Group_Create_w : 106101,
    Operator_Group_Read_r : 106102,
    Operator_Group_Update_w : 106103,
    Operator_Group_Delete_w : 106104,
    Operator_Group_Import_w : 106105,
    Operator_Group_Export_r : 106106,
    Operator_Group_Log_r : 106107,


    //tbl_Opr_LoginHistory
    Operator_LoginHistory : 107100,
    Operator_LoginHistory_Read_r : 107102,
    Operator_LoginHistory_Export_r : 107106,
    Operator_LoginHistory_Log_r : 107107,


    //tbl_Opr_OnlineOperator
    Operator_OnlineOperator : 109100,
    Operator_OnlineOperator_Read_r : 109102,
    Operator_OnlineOperator_Delete_w : 109104,
    Operator_OnlineOperator_Export_r : 109106,
    Operator_OnlineOperator_Log_r : 109107,


    //tbl_Opr_Operator
    Operator_Operator : 110100,
    Operator_Operator_Create_w : 110101,
    Operator_Operator_Read_r : 110102,
    Operator_Operator_Update_w : 110103,
    Operator_Operator_Delete_w : 110104,
    Operator_Operator_Import_w : 110105,
    Operator_Operator_Export_r : 110106,
    Operator_Operator_Log_r : 110107,



    //Customer - 300
    ////////////////////////////////////////////////////////////

    //Dashboard
    Customer_Dashboard_Index : 300100,
    Customer_Dashboard_Index_Read_r : 300101,


    //tbl_Cst_BruteForce
    Customer_BruteForce : 305100,
    Customer_BruteForce_Read_r : 305102,
    Customer_BruteForce_Delete_w : 305104,
    Customer_BruteForce_Export_r : 305106,
    Customer_BruteForce_Log_r : 305107,


    //tbl_Cst_Courier
    Customer_Courier : 306100,
    Customer_Courier_Create_w : 306101,
    Customer_Courier_Read_r : 306102,
    Customer_Courier_Update_w : 306103,
    Customer_Courier_Delete_w : 306104,
    Customer_Courier_Import_w : 306105,
    Customer_Courier_Export_r : 306106,
    Customer_Courier_Log_r : 306107,


    //tbl_Cst_Customer
    Customer_Customer : 307100,
    Customer_Customer_Create_w : 307101,
    Customer_Customer_Read_r : 307102,
    Customer_Customer_Update_w : 307103,
    Customer_Customer_Delete_w : 307104,
    Customer_Customer_Import_w : 307105,
    Customer_Customer_Export_r : 307106,
    Customer_Customer_Log_r : 307107,


    //tbl_Cst_Event
    Customer_Event : 308100,
    Customer_Event_Read_r : 308102,
    Customer_Event_Export_r : 308106,
    Customer_Event_Log_r : 308107,


    //tbl_Cst_FailedHistory
    Customer_FailedHistory : 309100,
    Customer_FailedHistory_Read_r : 309102,
    Customer_FailedHistory_Export_r : 309106,
    Customer_FailedHistory_Log_r : 309107,


    //tbl_Cst_Group
    Customer_Group : 310100,
    Customer_Group_Create_w : 310101,
    Customer_Group_Read_r : 310102,
    Customer_Group_Update_w : 310103,
    Customer_Group_Delete_w : 310104,
    Customer_Group_Import_w : 310105,
    Customer_Group_Export_r : 310106,
    Customer_Group_Log_r : 310107,


    //tbl_Cst_LoginHistory
    Customer_LoginHistory : 311100,
    Customer_LoginHistory_Read_r : 311102,
    Customer_LoginHistory_Export_r : 311106,
    Customer_LoginHistory_Log_r : 311107,


    //tbl_Cst_OnlineCustomer
    Customer_OnlineCustomer : 313100,
    Customer_OnlineCustomer_Read_r : 313102,
    Customer_OnlineCustomer_Delete_w : 313104,
    Customer_OnlineCustomer_Export_r : 313106,
    Customer_OnlineCustomer_Log_r : 313107,



    //Definition - 400
    ////////////////////////////////////////////////////////////

    //Dashboard
    Definition_Dashboard_Index : 400100,
    Definition_Dashboard_Index_Read_r : 400101,


    //tbl_Dfn_AdditionalService
    Definition_AdditionalService : 401100,
    Definition_AdditionalService_Create_w : 401101,
    Definition_AdditionalService_Read_r : 401102,
    Definition_AdditionalService_Update_w : 401103,
    Definition_AdditionalService_Delete_w : 401104,
    Definition_AdditionalService_Import_w : 401105,
    Definition_AdditionalService_Export_r : 401106,
    Definition_AdditionalService_Log_r : 401107,


    //tbl_Dfn_AdmissionAccessory
    Definition_AdmissionAccessory : 403100,
    Definition_AdmissionAccessory_Create_w : 403101,
    Definition_AdmissionAccessory_Read_r : 403102,
    Definition_AdmissionAccessory_Update_w : 403103,
    Definition_AdmissionAccessory_Delete_w : 403104,
    Definition_AdmissionAccessory_Import_w : 403105,
    Definition_AdmissionAccessory_Export_r : 403106,
    Definition_AdmissionAccessory_Log_r : 403107,


    //tbl_Dfn_AnswerPageFailed
    Definition_AnswerPageFailed : 404100,
    Definition_AnswerPageFailed_Create_w : 404101,
    Definition_AnswerPageFailed_Read_r : 404102,
    Definition_AnswerPageFailed_Update_w : 404103,
    Definition_AnswerPageFailed_Delete_w : 404104,
    Definition_AnswerPageFailed_Import_w : 404105,
    Definition_AnswerPageFailed_Export_r : 404106,
    Definition_AnswerPageFailed_Log_r : 404107,


    //tbl_Dfn_Area
    Definition_Area : 405100,
    Definition_Area_Create_w : 405101,
    Definition_Area_Read_r : 405102,
    Definition_Area_Update_w : 405103,
    Definition_Area_Delete_w : 405104,
    Definition_Area_Import_w : 405105,
    Definition_Area_Export_r : 405106,
    Definition_Area_Log_r : 405107,


    //tbl_Dfn_CancellationOfAdmission
    Definition_CancellationOfAdmission : 406100,
    Definition_CancellationOfAdmission_Create_w : 406101,
    Definition_CancellationOfAdmission_Read_r : 406102,
    Definition_CancellationOfAdmission_Update_w : 406103,
    Definition_CancellationOfAdmission_Delete_w : 406104,
    Definition_CancellationOfAdmission_Import_w : 406105,
    Definition_CancellationOfAdmission_Export_r : 406106,
    Definition_CancellationOfAdmission_Log_r : 406107,


    //tbl_Dfn_CancellationOfWarranty
    Definition_CancellationOfWarranty : 407100,
    Definition_CancellationOfWarranty_Create_w : 407101,
    Definition_CancellationOfWarranty_Read_r : 407102,
    Definition_CancellationOfWarranty_Update_w : 407103,
    Definition_CancellationOfWarranty_Delete_w : 407104,
    Definition_CancellationOfWarranty_Import_w : 407105,
    Definition_CancellationOfWarranty_Export_r : 407106,
    Definition_CancellationOfWarranty_Log_r : 407107,


    //tbl_Dfn_City
    Definition_City : 408100,
    Definition_City_Create_w : 408101,
    Definition_City_Read_r : 408102,
    Definition_City_Update_w : 408103,
    Definition_City_Delete_w : 408104,
    Definition_City_Import_w : 408105,
    Definition_City_Export_r : 408106,
    Definition_City_Log_r : 408107,


    //tbl_Dfn_Color
    Definition_Color : 409100,
    Definition_Color_Create_w : 409101,
    Definition_Color_Read_r : 409102,
    Definition_Color_Update_w : 409103,
    Definition_Color_Delete_w : 409104,
    Definition_Color_Import_w : 409105,
    Definition_Color_Export_r : 409106,
    Definition_Color_Log_r : 409107,


    //tbl_Dfn_Company
    Definition_Company : 410100,
    Definition_Company_Create_w : 410101,
    Definition_Company_Read_r : 410102,
    Definition_Company_Update_w : 410103,
    Definition_Company_Delete_w : 410104,
    Definition_Company_Import_w : 410105,
    Definition_Company_Export_r : 410106,
    Definition_Company_Log_r : 410107,


    //tbl_Dfn_Country
    Definition_Country : 411100,
    Definition_Country_Create_w : 411101,
    Definition_Country_Read_r : 411102,
    Definition_Country_Update_w : 411103,
    Definition_Country_Delete_w : 411104,
    Definition_Country_Import_w : 411105,
    Definition_Country_Export_r : 411106,
    Definition_Country_Log_r : 411107,


    //tbl_Dfn_Currency
    Definition_Currency : 412100,
    Definition_Currency_Create_w : 412101,
    Definition_Currency_Read_r : 412102,
    Definition_Currency_Update_w : 412103,
    Definition_Currency_Delete_w : 412104,
    Definition_Currency_Import_w : 412105,
    Definition_Currency_Export_r : 412106,
    Definition_Currency_Log_r : 412107,


    //tbl_Dfn_Defect
    Definition_Defect : 413100,
    Definition_Defect_Create_w : 413101,
    Definition_Defect_Read_r : 413102,
    Definition_Defect_Update_w : 413103,
    Definition_Defect_Delete_w : 413104,
    Definition_Defect_Import_w : 413105,
    Definition_Defect_Export_r : 413106,
    Definition_Defect_Log_r : 413107,


    //tbl_Dfn_Device
    Definition_Device : 414100,
    Definition_Device_Create_w : 414101,
    Definition_Device_Read_r : 414102,
    Definition_Device_Update_w : 414103,
    Definition_Device_Delete_w : 414104,
    Definition_Device_Import_w : 414105,
    Definition_Device_Export_r : 414106,
    Definition_Device_Log_r : 414107,


    //tbl_Dfn_ImportingCompany
    Definition_ImportingCompany : 415100,
    Definition_ImportingCompany_Create_w : 415101,
    Definition_ImportingCompany_Read_r : 415102,
    Definition_ImportingCompany_Update_w : 415103,
    Definition_ImportingCompany_Delete_w : 415104,
    Definition_ImportingCompany_Import_w : 415105,
    Definition_ImportingCompany_Export_r : 415106,
    Definition_ImportingCompany_Log_r : 415107,


    //tbl_Dfn_InputQualityControl
    Definition_InputQualityControl : 416100,
    Definition_InputQualityControl_Create_w : 416101,
    Definition_InputQualityControl_Read_r : 416102,
    Definition_InputQualityControl_Update_w : 416103,
    Definition_InputQualityControl_Delete_w : 416104,
    Definition_InputQualityControl_Import_w : 416105,
    Definition_InputQualityControl_Export_r : 416106,
    Definition_InputQualityControl_Log_r : 416107,


    //tbl_Dfn_Model
    Definition_Model : 418100,
    Definition_Model_Create_w : 418101,
    Definition_Model_Read_r : 418102,
    Definition_Model_Update_w : 418103,
    Definition_Model_Delete_w : 418104,
    Definition_Model_Import_w : 418105,
    Definition_Model_Export_r : 418106,
    Definition_Model_Log_r : 418107,


    //tbl_Dfn_OrganizationalRole
    Definition_OrganizationalRole : 419100,
    Definition_OrganizationalRole_Create_w : 419101,
    Definition_OrganizationalRole_Read_r : 419102,
    Definition_OrganizationalRole_Update_w : 419103,
    Definition_OrganizationalRole_Delete_w : 419104,
    Definition_OrganizationalRole_Import_w : 419105,
    Definition_OrganizationalRole_Export_r : 419106,
    Definition_OrganizationalRole_Log_r : 419107,


    //tbl_Dfn_OutputQualityControl
    Definition_OutputQualityControl : 420100,
    Definition_OutputQualityControl_Create_w : 420101,
    Definition_OutputQualityControl_Read_r : 420102,
    Definition_OutputQualityControl_Update_w : 420103,
    Definition_OutputQualityControl_Delete_w : 420104,
    Definition_OutputQualityControl_Import_w : 420105,
    Definition_OutputQualityControl_Export_r : 420106,
    Definition_OutputQualityControl_Log_r : 420107,


    //tbl_Dfn_Part
    Definition_Part : 421100,
    Definition_Part_Create_w : 421101,
    Definition_Part_Read_r : 421102,
    Definition_Part_Update_w : 421103,
    Definition_Part_Delete_w : 421104,
    Definition_Part_Import_w : 421105,
    Definition_Part_Export_r : 421106,
    Definition_Part_Log_r : 421107,


    //tbl_Dfn_PartGroup
    Definition_PartGroup : 422100,
    Definition_PartGroup_Create_w : 422101,
    Definition_PartGroup_Read_r : 422102,
    Definition_PartGroup_Update_w : 422103,
    Definition_PartGroup_Delete_w : 422104,
    Definition_PartGroup_Import_w : 422105,
    Definition_PartGroup_Export_r : 422106,
    Definition_PartGroup_Log_r : 422107,


    //tbl_Dfn_Province
    Definition_Province : 423100,
    Definition_Province_Create_w : 423101,
    Definition_Province_Read_r : 423102,
    Definition_Province_Update_w : 423103,
    Definition_Province_Delete_w : 423104,
    Definition_Province_Import_w : 423105,
    Definition_Province_Export_r : 423106,
    Definition_Province_Log_r : 423107,


    //tbl_Dfn_Quality
    Definition_Quality : 424100,
    Definition_Quality_Create_w : 424101,
    Definition_Quality_Read_r : 424102,
    Definition_Quality_Update_w : 424103,
    Definition_Quality_Delete_w : 424104,
    Definition_Quality_Import_w : 424105,
    Definition_Quality_Export_r : 424106,
    Definition_Quality_Log_r : 424107,


    //tbl_Dfn_QuestionnaireType
    Definition_QuestionnaireType : 425100,
    Definition_QuestionnaireType_Create_w : 425101,
    Definition_QuestionnaireType_Read_r : 425102,
    Definition_QuestionnaireType_Update_w : 425103,
    Definition_QuestionnaireType_Delete_w : 425104,
    Definition_QuestionnaireType_Import_w : 425105,
    Definition_QuestionnaireType_Export_r : 425106,
    Definition_QuestionnaireType_Log_r : 425107,


    //tbl_Dfn_RepairsPerformed
    Definition_RepairsPerformed : 426100,
    Definition_RepairsPerformed_Create_w : 426101,
    Definition_RepairsPerformed_Read_r : 426102,
    Definition_RepairsPerformed_Update_w : 426103,
    Definition_RepairsPerformed_Delete_w : 426104,
    Definition_RepairsPerformed_Import_w : 426105,
    Definition_RepairsPerformed_Export_r : 426106,
    Definition_RepairsPerformed_Log_r : 426107,


    //tbl_Dfn_ReplacementType
    Definition_ReplacementType : 428100,
    Definition_ReplacementType_Create_w : 428101,
    Definition_ReplacementType_Read_r : 428102,
    Definition_ReplacementType_Update_w : 428103,
    Definition_ReplacementType_Delete_w : 428104,
    Definition_ReplacementType_Import_w : 428105,
    Definition_ReplacementType_Export_r : 428106,
    Definition_ReplacementType_Log_r : 428107,


    //tbl_Dfn_Section
    Definition_Section : 429100,
    Definition_Section_Create_w : 429101,
    Definition_Section_Read_r : 429102,
    Definition_Section_Update_w : 429103,
    Definition_Section_Delete_w : 429104,
    Definition_Section_Import_w : 429105,
    Definition_Section_Export_r : 429106,
    Definition_Section_Log_r : 429107,


    //tbl_Dfn_SendType
    Definition_SendType : 430100,
    Definition_SendType_Create_w : 430101,
    Definition_SendType_Read_r : 430102,
    Definition_SendType_Update_w : 430103,
    Definition_SendType_Delete_w : 430104,
    Definition_SendType_Import_w : 430105,
    Definition_SendType_Export_r : 430106,
    Definition_SendType_Log_r : 430107,


    //tbl_Dfn_StatusDeviceEnd
    Definition_StatusDeviceEnd : 431100,
    Definition_StatusDeviceEnd_Create_w : 431101,
    Definition_StatusDeviceEnd_Read_r : 431102,
    Definition_StatusDeviceEnd_Update_w : 431103,
    Definition_StatusDeviceEnd_Delete_w : 431104,
    Definition_StatusDeviceEnd_Import_w : 431105,
    Definition_StatusDeviceEnd_Export_r : 431106,
    Definition_StatusDeviceEnd_Log_r : 431107,


    //tbl_Dfn_StatusDeviceProgress
    Definition_StatusDeviceProgress : 432100,
    Definition_StatusDeviceProgress_Create_w : 432101,
    Definition_StatusDeviceProgress_Read_r : 432102,
    Definition_StatusDeviceProgress_Update_w : 432103,
    Definition_StatusDeviceProgress_Delete_w : 432104,
    Definition_StatusDeviceProgress_Import_w : 432105,
    Definition_StatusDeviceProgress_Export_r : 432106,
    Definition_StatusDeviceProgress_Log_r : 432107,


    //tbl_Dfn_StatusDeviceStart
    Definition_StatusDeviceStart : 433100,
    Definition_StatusDeviceStart_Create_w : 433101,
    Definition_StatusDeviceStart_Read_r : 433102,
    Definition_StatusDeviceStart_Update_w : 433103,
    Definition_StatusDeviceStart_Delete_w : 433104,
    Definition_StatusDeviceStart_Import_w : 433105,
    Definition_StatusDeviceStart_Export_r : 433106,
    Definition_StatusDeviceStart_Log_r : 433107,


    //tbl_Dfn_VehicleType
    Definition_VehicleType : 434100,
    Definition_VehicleType_Create_w : 434101,
    Definition_VehicleType_Read_r : 434102,
    Definition_VehicleType_Update_w : 434103,
    Definition_VehicleType_Delete_w : 434104,
    Definition_VehicleType_Import_w : 434105,
    Definition_VehicleType_Export_r : 434106,
    Definition_VehicleType_Log_r : 434107,


    //tbl_Dfn_WarrantyType
    Definition_WarrantyType : 435100,
    Definition_WarrantyType_Create_w : 435101,
    Definition_WarrantyType_Read_r : 435102,
    Definition_WarrantyType_Update_w : 435103,
    Definition_WarrantyType_Delete_w : 435104,
    Definition_WarrantyType_Import_w : 435105,
    Definition_WarrantyType_Export_r : 435106,
    Definition_WarrantyType_Log_r : 435107,



    //Business - 1800
    ////////////////////////////////////////////////////////////

    //Dashboard
    Business_Dashboard_Index : 1800100,
    Business_Dashboard_Index_Read_r : 1800101,


    //tbl_Bsn_Activated
    Business_Activated : 1801100,
    Business_Activated_Read_r : 1801102,
    Business_Activated_Export_r : 1801106,
    Business_Activated_Log_r : 1801107,


    //tbl_Bsn_RegistrationGood
    Business_RegistrationGood : 1802100,
    Business_RegistrationGood_Create_w : 1802101,
    Business_RegistrationGood_Read_r : 1802102,
    Business_RegistrationGood_Update_w : 1802103,
    Business_RegistrationGood_Delete_w : 1802104,
    Business_RegistrationGood_Import_w : 1802105,
    Business_RegistrationGood_Export_r : 1802106,
    Business_RegistrationGood_Log_r : 1802107,



    //Marketing - 2200
    ////////////////////////////////////////////////////////////

    //Dashboard
    Marketing_Dashboard_Index : 2200100,
    Marketing_Dashboard_Index_Read_r : 2200101,


    //tbl_Mrk_Message
    Marketing_Message : 2201100,
    Marketing_Message_Create_w : 2201101,
    Marketing_Message_Read_r : 2201102,
    Marketing_Message_Update_w : 2201103,
    Marketing_Message_Delete_w : 2201104,
    Marketing_Message_Import_w : 2201105,
    Marketing_Message_Export_r : 2201106,
    Marketing_Message_Log_r : 2201107,


    //tbl_Mrk_Outbox
    Marketing_Outbox : 2202100,
    Marketing_Outbox_Read_r : 2202102,
    Marketing_Outbox_Export_r : 2202106,
    Marketing_Outbox_Log_r : 2202107,


    //tbl_Mrk_PhoneBook
    Marketing_PhoneBook : 2203100,
    Marketing_PhoneBook_Create_w : 2203101,
    Marketing_PhoneBook_Read_r : 2203102,
    Marketing_PhoneBook_Update_w : 2203103,
    Marketing_PhoneBook_Delete_w : 2203104,
    Marketing_PhoneBook_Import_w : 2203105,
    Marketing_PhoneBook_Export_r : 2203106,
    Marketing_PhoneBook_Log_r : 2203107,


    //tbl_Mrk_PhoneNumber
    Marketing_PhoneNumber : 2204100,
    Marketing_PhoneNumber_Create_w : 2204101,
    Marketing_PhoneNumber_Read_r : 2204102,
    Marketing_PhoneNumber_Update_w : 2204103,
    Marketing_PhoneNumber_Delete_w : 2204104,
    Marketing_PhoneNumber_Import_w : 2204105,
    Marketing_PhoneNumber_Export_r : 2204106,
    Marketing_PhoneNumber_Log_r : 2204107,


    //tbl_Mrk_PollLink
    Marketing_PollLink : 2205100,
    Marketing_PollLink_Read_r : 2205102,
    Marketing_PollLink_Export_r : 2205106,
    Marketing_PollLink_Log_r : 2205107,



    //AfterSales - 2600
    ////////////////////////////////////////////////////////////

    //Dashboard
    AfterSales_Dashboard_Index : 2600100,
    AfterSales_Dashboard_Index_Read_r : 2600101,


    //tbl_Afs_InitialAdmission
    AfterSales_InitialAdmission : 2606100,
    AfterSales_InitialAdmission_Read_r : 2606102,
    AfterSales_InitialAdmission_Delete_w : 2606104,
    AfterSales_InitialAdmission_Export_r : 2606106,
    AfterSales_InitialAdmission_Log_r : 2606107,



    //Poll - 3000
    ////////////////////////////////////////////////////////////

    //Dashboard
    Poll_Dashboard_Index : 3000100,
    Poll_Dashboard_Index_Read_r : 3000101,


    //tbl_Pll_AnswerPage
    Poll_AnswerPage : 3003100,
    Poll_AnswerPage_Create_w : 3003101,
    Poll_AnswerPage_Read_r : 3003102,
    Poll_AnswerPage_Delete_w : 3003104,
    Poll_AnswerPage_Export_r : 3003106,
    Poll_AnswerPage_Log_r : 3003107,


    //tbl_Pll_QuestionPage
    Poll_QuestionPage : 3006100,
    Poll_QuestionPage_Create_w : 3006101,
    Poll_QuestionPage_Read_r : 3006102,
    Poll_QuestionPage_Update_w : 3006103,
    Poll_QuestionPage_Delete_w : 3006104,
    Poll_QuestionPage_Import_w : 3006105,
    Poll_QuestionPage_Export_r : 3006106,
    Poll_QuestionPage_Log_r : 3006107,



    //Setting - 9900
    ////////////////////////////////////////////////////////////

    //Dashboard
    Setting_Dashboard_Index : 9900100,
    Setting_Dashboard_Index_Read_r : 9900101,


    //tbl_Stn_Domain
    Setting_Domain : 9900100,
    Setting_Domain_Create_w : 9900101,
    Setting_Domain_Read_r : 9900102,
    Setting_Domain_Update_w : 9900103,
    Setting_Domain_Delete_w : 9900104,
    Setting_Domain_Import_w : 9900105,
    Setting_Domain_Export_r : 9900106,
    Setting_Domain_Log_r : 9900107,


    //tbl_Stn_Setting
    Setting_Setting : 9901100,
    Setting_Setting_Read_r : 9901102,
    Setting_Setting_Update_w : 9901103,
    Setting_Setting_Log_r : 9901107,


};
module.exports ={
  enums,
};
