 const enums = {
     //Custom
     Module_Operator : 100,
     Module_Agent : 200,
     Module_Customer : 300,
     Module_Definition : 400,
     //Module_HumanResource : 500,
     //Module_Financial : 600,
     //Module_Warehouse : 700,
     //Module_Treasury : 800,
     Module_Business : 900,
     //Module_SupplyChain : 1000,
     //Module_Store : 1100,
     Module_Distribution : 1200,
     Module_AfterSales : 1300,
     //Module_CustomerRelationshipManagement : 1400,
     //Module_Club : 1500,
     Module_Survey : 1600,
     //Module_BalancedScorecard : 1700,
     //Module_BusinessIntelligence : 1800,
     //Module_Setting : 9900,
     //Module_System : 10000,
 
 
     Operator_Group_Permission_w : 107108,
     Operator_Operator_ChangePassword_w : 110108,
     Customer_Customer_ChangePassword_w : 305108,
 
 
     AfterSales_New_Registered : 1300110,
     AfterSales_New_Registered_Create_w : 1300111,
     AfterSales_New_Registered_Read_r : 1300112,
     AfterSales_New_Registered_Update_w : 1300113,
     AfterSales_New_Registered_Delete_w : 1300114,
     AfterSales_New_Registered_Import_w : 1300115,
     AfterSales_New_Registered_Export_r : 1300116,
     AfterSales_New_Registered_Log_r : 1300117,
 
     AfterSales_New_SendToCompany : 1300120,
     AfterSales_New_SendToCompany_Create_w : 1300121,
     AfterSales_New_SendToCompany_Read_r : 1300122,
     AfterSales_New_SendToCompany_Update_w : 1300123,
     AfterSales_New_SendToCompany_Delete_w : 1300124,
     AfterSales_New_SendToCompany_Import_w : 1300125,
     AfterSales_New_SendToCompany_Export_r : 1300126,
     AfterSales_New_SendToCompany_Log_r : 1300127,
     
     AfterSales_New_Admission : 1300130,
     AfterSales_New_Admission_Create_w : 1300131,
     AfterSales_New_Admission_Read_r : 1300132,
     AfterSales_New_Admission_Update_w : 1300133,
     AfterSales_New_Admission_Delete_w : 1300134,
     AfterSales_New_Admission_Import_w : 1300135,
     AfterSales_New_Admission_Export_r : 1300136,
     AfterSales_New_Admission_Log_r : 1300137,
 
     AfterSales_New_InputQualityControl : 1300140,
     AfterSales_New_InputQualityControl_Read_r : 1300142,
     AfterSales_New_InputQualityControl_Export_r : 1300146,
     AfterSales_New_InputQualityControl_Log_r : 1300147,
     AfterSales_New_InputQualityControl_Qc_w : 1300148,
 
     AfterSales_New_AssignToTechnician : 1300150,
     AfterSales_New_AssignToTechnician_Read_r : 1300152,
     AfterSales_New_AssignToTechnician_Export_r : 1300156,
     AfterSales_New_AssignToTechnician_Log_r : 1300157,
     AfterSales_New_AssignToTechnician_Assign_w : 1300158,
 
     AfterSales_New_Repair : 1300160,
     AfterSales_New_Repair_Read_r : 1300162,
     AfterSales_New_Repair_Export_r : 1300166,
     AfterSales_New_Repair_Log_r : 1300167,
     AfterSales_New_Repair_Repair_w : 1300168,
 
     AfterSales_New_OutputQualityControl : 1300170,
     AfterSales_New_OutputQualityControl_Read_r : 1300172,
     AfterSales_New_OutputQualityControl_Export_r : 1300176,
     AfterSales_New_OutputQualityControl_Log_r : 1300177,
     AfterSales_New_OutputQualityControl_Qc_w : 1300178,
 
     AfterSales_New_Replacement : 1300180,
     AfterSales_New_Replacement_Read_r : 1300182,
     AfterSales_New_Replacement_Export_r : 1300186,
     AfterSales_New_Replacement_Log_r : 1300187,
     AfterSales_New_Replacement_Replacement_w : 1300188,
 
     AfterSales_New_TakeBack : 1300190,
     AfterSales_New_TakeBack_Read_r : 1300192,
     AfterSales_New_TakeBack_Export_r : 1300196,
     AfterSales_New_TakeBack_Log_r : 1300197,
     AfterSales_New_TakeBack_TakeBack_w : 1300198,
 
     AfterSales_New_DeliveryInPerson : 1300200,
     AfterSales_New_DeliveryInPerson_Read_r : 1300202,
     AfterSales_New_DeliveryInPerson_Export_r : 1300206,
     AfterSales_New_DeliveryInPerson_Log_r : 1300207,
     AfterSales_New_DeliveryInPerson_Delivery_w : 1300208,
 
     AfterSales_New_Courier : 1300210,
     AfterSales_New_Courier_Read_r : 1300212,
     AfterSales_New_Courier_Export_r : 1300216,
     AfterSales_New_Courier_Log_r : 1300217,
     AfterSales_New_Courier_Send_w : 1300218,
 
     AfterSales_New_PostToAgent : 1300220,
     AfterSales_New_PostToAgent_Read_r : 1300222,
     AfterSales_New_PostToAgent_Export_r : 1300226,
     AfterSales_New_PostToAgent_Log_r : 1300227,
     AfterSales_New_PostToAgent_Post_w : 1300228,
 
     AfterSales_New_PostToCustomer : 1300210,
     AfterSales_New_PostToCustomer_Read_r : 1300232,
     AfterSales_New_PostToCustomer_Export_r : 1300236,
     AfterSales_New_PostToCustomer_Log_r : 1300217,
     AfterSales_New_PostToCustomer_Post_w : 1300218,
 
     AfterSales_New_Archive : 1300240,
     AfterSales_New_Archive_Read_r : 1300242,
     AfterSales_New_Archive_Export_r : 1300246,
     AfterSales_New_Archive_Log_r : 1300247,
 
     //Custom
 
 
     //Operator - 100
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     Operator_Dashboard_Index : 100100,
     Operator_Dashboard_Index_Read_r : 100101,
 
 
     //tbl_Opr_AccessList
     Operator_AccessList : 101100,
     Operator_AccessList_Create_w : 101101,
     Operator_AccessList_Read_r : 101102,
     Operator_AccessList_Update_w : 101103,
     Operator_AccessList_Delete_w : 101104,
     Operator_AccessList_Import_w : 101105,
     Operator_AccessList_Export_r : 101106,
     Operator_AccessList_Log_r : 101107,
 
 
     //tbl_Opr_AllowedIp
     Operator_AllowedIp : 102100,
     Operator_AllowedIp_Create_w : 102101,
     Operator_AllowedIp_Read_r : 102102,
     Operator_AllowedIp_Update_w : 102103,
     Operator_AllowedIp_Delete_w : 102104,
     Operator_AllowedIp_Import_w : 102105,
     Operator_AllowedIp_Export_r : 102106,
     Operator_AllowedIp_Log_r : 102107,
 
 
     //tbl_Opr_BruteForce
     Operator_BruteForce : 103100,
     Operator_BruteForce_Create_w : 103101,
     Operator_BruteForce_Read_r : 103102,
     Operator_BruteForce_Update_w : 103103,
     Operator_BruteForce_Delete_w : 103104,
     Operator_BruteForce_Import_w : 103105,
     Operator_BruteForce_Export_r : 103106,
     Operator_BruteForce_Log_r : 103107,
 
 
     //tbl_Opr_Event
     Operator_Event : 104100,
     Operator_Event_Create_w : 104101,
     Operator_Event_Read_r : 104102,
     Operator_Event_Update_w : 104103,
     Operator_Event_Delete_w : 104104,
     Operator_Event_Import_w : 104105,
     Operator_Event_Export_r : 104106,
     Operator_Event_Log_r : 104107,
 
 
     //tbl_Opr_FailedHistory
     Operator_FailedHistory : 105100,
     Operator_FailedHistory_Create_w : 105101,
     Operator_FailedHistory_Read_r : 105102,
     Operator_FailedHistory_Update_w : 105103,
     Operator_FailedHistory_Delete_w : 105104,
     Operator_FailedHistory_Import_w : 105105,
     Operator_FailedHistory_Export_r : 105106,
     Operator_FailedHistory_Log_r : 105107,
 
 
     //tbl_Opr_Group
     Operator_Group : 107100,
     Operator_Group_Create_w : 107101,
     Operator_Group_Read_r : 107102,
     Operator_Group_Update_w : 107103,
     Operator_Group_Delete_w : 107104,
     Operator_Group_Import_w : 107105,
     Operator_Group_Export_r : 107106,
     Operator_Group_Log_r : 107107,
 
 
     //tbl_Opr_LoginHistory
     Operator_LoginHistory : 108100,
     Operator_LoginHistory_Create_w : 108101,
     Operator_LoginHistory_Read_r : 108102,
     Operator_LoginHistory_Update_w : 108103,
     Operator_LoginHistory_Delete_w : 108104,
     Operator_LoginHistory_Import_w : 108105,
     Operator_LoginHistory_Export_r : 108106,
     Operator_LoginHistory_Log_r : 108107,
 
 
     //tbl_Opr_OnlineOperator
     Operator_OnlineOperator : 109100,
     Operator_OnlineOperator_Create_w : 109101,
     Operator_OnlineOperator_Read_r : 109102,
     Operator_OnlineOperator_Update_w : 109103,
     Operator_OnlineOperator_Delete_w : 109104,
     Operator_OnlineOperator_Import_w : 109105,
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
 
 
     //tbl_Opr_PolicyOs
     Operator_PolicyOs : 115100,
     Operator_PolicyOs_Create_w : 115101,
     Operator_PolicyOs_Read_r : 115102,
     Operator_PolicyOs_Update_w : 115103,
     Operator_PolicyOs_Delete_w : 115104,
     Operator_PolicyOs_Import_w : 115105,
     Operator_PolicyOs_Export_r : 115106,
     Operator_PolicyOs_Log_r : 115107,
 
 
 
     //Agent - 200
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     Agent_Dashboard_Index : 200100,
     Agent_Dashboard_Index_Read_r : 200101,
 
 
     //tbl_Agn_AccessList
     Agent_AccessList : 201100,
     Agent_AccessList_Create_w : 201101,
     Agent_AccessList_Read_r : 201102,
     Agent_AccessList_Update_w : 201103,
     Agent_AccessList_Delete_w : 201104,
     Agent_AccessList_Import_w : 201105,
     Agent_AccessList_Export_r : 201106,
     Agent_AccessList_Log_r : 201107,
 
 
     //tbl_Agn_Agent
     Agent_Agent : 203100,
     Agent_Agent_Create_w : 203101,
     Agent_Agent_Read_r : 203102,
     Agent_Agent_Update_w : 203103,
     Agent_Agent_Delete_w : 203104,
     Agent_Agent_Import_w : 203105,
     Agent_Agent_Export_r : 203106,
     Agent_Agent_Log_r : 203107,
 
 
     //tbl_Agn_AllowedIp
     Agent_AllowedIp : 204100,
     Agent_AllowedIp_Create_w : 204101,
     Agent_AllowedIp_Read_r : 204102,
     Agent_AllowedIp_Update_w : 204103,
     Agent_AllowedIp_Delete_w : 204104,
     Agent_AllowedIp_Import_w : 204105,
     Agent_AllowedIp_Export_r : 204106,
     Agent_AllowedIp_Log_r : 204107,
 
 
     //tbl_Agn_BruteForce
     Agent_BruteForce : 205100,
     Agent_BruteForce_Create_w : 205101,
     Agent_BruteForce_Read_r : 205102,
     Agent_BruteForce_Update_w : 205103,
     Agent_BruteForce_Delete_w : 205104,
     Agent_BruteForce_Import_w : 205105,
     Agent_BruteForce_Export_r : 205106,
     Agent_BruteForce_Log_r : 205107,
 
 
     //tbl_Agn_Event
     Agent_Event : 206100,
     Agent_Event_Create_w : 206101,
     Agent_Event_Read_r : 206102,
     Agent_Event_Update_w : 206103,
     Agent_Event_Delete_w : 206104,
     Agent_Event_Import_w : 206105,
     Agent_Event_Export_r : 206106,
     Agent_Event_Log_r : 206107,
 
 
     //tbl_Agn_FailedHistory
     Agent_FailedHistory : 207100,
     Agent_FailedHistory_Create_w : 207101,
     Agent_FailedHistory_Read_r : 207102,
     Agent_FailedHistory_Update_w : 207103,
     Agent_FailedHistory_Delete_w : 207104,
     Agent_FailedHistory_Import_w : 207105,
     Agent_FailedHistory_Export_r : 207106,
     Agent_FailedHistory_Log_r : 207107,
 
 
     //tbl_Agn_Group
     Agent_Group : 209100,
     Agent_Group_Create_w : 209101,
     Agent_Group_Read_r : 209102,
     Agent_Group_Update_w : 209103,
     Agent_Group_Delete_w : 209104,
     Agent_Group_Import_w : 209105,
     Agent_Group_Export_r : 209106,
     Agent_Group_Log_r : 209107,
 
 
     //tbl_Agn_LoginHistory
     Agent_LoginHistory : 210100,
     Agent_LoginHistory_Create_w : 210101,
     Agent_LoginHistory_Read_r : 210102,
     Agent_LoginHistory_Update_w : 210103,
     Agent_LoginHistory_Delete_w : 210104,
     Agent_LoginHistory_Import_w : 210105,
     Agent_LoginHistory_Export_r : 210106,
     Agent_LoginHistory_Log_r : 210107,
 
 
     //tbl_Agn_OnlineAgent
     Agent_OnlineAgent : 211100,
     Agent_OnlineAgent_Create_w : 211101,
     Agent_OnlineAgent_Read_r : 211102,
     Agent_OnlineAgent_Update_w : 211103,
     Agent_OnlineAgent_Delete_w : 211104,
     Agent_OnlineAgent_Import_w : 211105,
     Agent_OnlineAgent_Export_r : 211106,
     Agent_OnlineAgent_Log_r : 211107,
 
 
     //tbl_Agn_PolicyOs
     Agent_PolicyOs : 215100,
     Agent_PolicyOs_Create_w : 215101,
     Agent_PolicyOs_Read_r : 215102,
     Agent_PolicyOs_Update_w : 215103,
     Agent_PolicyOs_Delete_w : 215104,
     Agent_PolicyOs_Import_w : 215105,
     Agent_PolicyOs_Export_r : 215106,
     Agent_PolicyOs_Log_r : 215107,
 
 
 
     //Customer - 300
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     Customer_Dashboard_Index : 300100,
     Customer_Dashboard_Index_Read_r : 300101,
 
 
     //tbl_Cst_AccessList
     Customer_AccessList : 301100,
     Customer_AccessList_Create_w : 301101,
     Customer_AccessList_Read_r : 301102,
     Customer_AccessList_Update_w : 301103,
     Customer_AccessList_Delete_w : 301104,
     Customer_AccessList_Import_w : 301105,
     Customer_AccessList_Export_r : 301106,
     Customer_AccessList_Log_r : 301107,
 
 
     //tbl_Cst_AllowedIp
     Customer_AllowedIp : 303100,
     Customer_AllowedIp_Create_w : 303101,
     Customer_AllowedIp_Read_r : 303102,
     Customer_AllowedIp_Update_w : 303103,
     Customer_AllowedIp_Delete_w : 303104,
     Customer_AllowedIp_Import_w : 303105,
     Customer_AllowedIp_Export_r : 303106,
     Customer_AllowedIp_Log_r : 303107,
 
 
     //tbl_Cst_AssignToCourier
     Customer_AssignToCourier : 304100,
     Customer_AssignToCourier_Create_w : 304101,
     Customer_AssignToCourier_Read_r : 304102,
     Customer_AssignToCourier_Update_w : 304103,
     Customer_AssignToCourier_Delete_w : 304104,
     Customer_AssignToCourier_Import_w : 304105,
     Customer_AssignToCourier_Export_r : 304106,
     Customer_AssignToCourier_Log_r : 304107,
 
 
     //tbl_Cst_BruteForce
     Customer_BruteForce : 305100,
     Customer_BruteForce_Create_w : 305101,
     Customer_BruteForce_Read_r : 305102,
     Customer_BruteForce_Update_w : 305103,
     Customer_BruteForce_Delete_w : 305104,
     Customer_BruteForce_Import_w : 305105,
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
     Customer_Event_Create_w : 308101,
     Customer_Event_Read_r : 308102,
     Customer_Event_Update_w : 308103,
     Customer_Event_Delete_w : 308104,
     Customer_Event_Import_w : 308105,
     Customer_Event_Export_r : 308106,
     Customer_Event_Log_r : 308107,
 
 
     //tbl_Cst_FailedHistory
     Customer_FailedHistory : 309100,
     Customer_FailedHistory_Create_w : 309101,
     Customer_FailedHistory_Read_r : 309102,
     Customer_FailedHistory_Update_w : 309103,
     Customer_FailedHistory_Delete_w : 309104,
     Customer_FailedHistory_Import_w : 309105,
     Customer_FailedHistory_Export_r : 309106,
     Customer_FailedHistory_Log_r : 309107,
 
 
     //tbl_Cst_Group
     Customer_Group : 311100,
     Customer_Group_Create_w : 311101,
     Customer_Group_Read_r : 311102,
     Customer_Group_Update_w : 311103,
     Customer_Group_Delete_w : 311104,
     Customer_Group_Import_w : 311105,
     Customer_Group_Export_r : 311106,
     Customer_Group_Log_r : 311107,
 
 
     //tbl_Cst_LoginHistory
     Customer_LoginHistory : 312100,
     Customer_LoginHistory_Create_w : 312101,
     Customer_LoginHistory_Read_r : 312102,
     Customer_LoginHistory_Update_w : 312103,
     Customer_LoginHistory_Delete_w : 312104,
     Customer_LoginHistory_Import_w : 312105,
     Customer_LoginHistory_Export_r : 312106,
     Customer_LoginHistory_Log_r : 312107,
 
 
     //tbl_Cst_OnlineCustomer
     Customer_OnlineCustomer : 313100,
     Customer_OnlineCustomer_Create_w : 313101,
     Customer_OnlineCustomer_Read_r : 313102,
     Customer_OnlineCustomer_Update_w : 313103,
     Customer_OnlineCustomer_Delete_w : 313104,
     Customer_OnlineCustomer_Import_w : 313105,
     Customer_OnlineCustomer_Export_r : 313106,
     Customer_OnlineCustomer_Log_r : 313107,
 
 
     //tbl_Cst_PolicyOs
     Customer_PolicyOs : 317100,
     Customer_PolicyOs_Create_w : 317101,
     Customer_PolicyOs_Read_r : 317102,
     Customer_PolicyOs_Update_w : 317103,
     Customer_PolicyOs_Delete_w : 317104,
     Customer_PolicyOs_Import_w : 317105,
     Customer_PolicyOs_Export_r : 317106,
     Customer_PolicyOs_Log_r : 317107,
 
 
 
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
     Definition_AdmissionAccessory : 402100,
     Definition_AdmissionAccessory_Create_w : 402101,
     Definition_AdmissionAccessory_Read_r : 402102,
     Definition_AdmissionAccessory_Update_w : 402103,
     Definition_AdmissionAccessory_Delete_w : 402104,
     Definition_AdmissionAccessory_Import_w : 402105,
     Definition_AdmissionAccessory_Export_r : 402106,
     Definition_AdmissionAccessory_Log_r : 402107,
 
 
     //tbl_Dfn_Area
     Definition_Area : 403100,
     Definition_Area_Create_w : 403101,
     Definition_Area_Read_r : 403102,
     Definition_Area_Update_w : 403103,
     Definition_Area_Delete_w : 403104,
     Definition_Area_Import_w : 403105,
     Definition_Area_Export_r : 403106,
     Definition_Area_Log_r : 403107,
 
 
     //tbl_Dfn_CancellationOfWarranty
     Definition_CancellationOfWarranty : 404100,
     Definition_CancellationOfWarranty_Create_w : 404101,
     Definition_CancellationOfWarranty_Read_r : 404102,
     Definition_CancellationOfWarranty_Update_w : 404103,
     Definition_CancellationOfWarranty_Delete_w : 404104,
     Definition_CancellationOfWarranty_Import_w : 404105,
     Definition_CancellationOfWarranty_Export_r : 404106,
     Definition_CancellationOfWarranty_Log_r : 404107,
 
 
     //tbl_Dfn_City
     Definition_City : 405100,
     Definition_City_Create_w : 405101,
     Definition_City_Read_r : 405102,
     Definition_City_Update_w : 405103,
     Definition_City_Delete_w : 405104,
     Definition_City_Import_w : 405105,
     Definition_City_Export_r : 405106,
     Definition_City_Log_r : 405107,
 
 
     //tbl_Dfn_Company
     Definition_Company : 406100,
     Definition_Company_Create_w : 406101,
     Definition_Company_Read_r : 406102,
     Definition_Company_Update_w : 406103,
     Definition_Company_Delete_w : 406104,
     Definition_Company_Import_w : 406105,
     Definition_Company_Export_r : 406106,
     Definition_Company_Log_r : 406107,
 
 
     //tbl_Dfn_Country
     Definition_Country : 407100,
     Definition_Country_Create_w : 407101,
     Definition_Country_Read_r : 407102,
     Definition_Country_Update_w : 407103,
     Definition_Country_Delete_w : 407104,
     Definition_Country_Import_w : 407105,
     Definition_Country_Export_r : 407106,
     Definition_Country_Log_r : 407107,
 
 
     //tbl_Dfn_Defect
     Definition_Defect : 408100,
     Definition_Defect_Create_w : 408101,
     Definition_Defect_Read_r : 408102,
     Definition_Defect_Update_w : 408103,
     Definition_Defect_Delete_w : 408104,
     Definition_Defect_Import_w : 408105,
     Definition_Defect_Export_r : 408106,
     Definition_Defect_Log_r : 408107,
 
 
     //tbl_Dfn_Device
     Definition_Device : 409100,
     Definition_Device_Create_w : 409101,
     Definition_Device_Read_r : 409102,
     Definition_Device_Update_w : 409103,
     Definition_Device_Delete_w : 409104,
     Definition_Device_Import_w : 409105,
     Definition_Device_Export_r : 409106,
     Definition_Device_Log_r : 409107,
 
 
     //tbl_Dfn_ImportingCompany
     Definition_ImportingCompany : 410100,
     Definition_ImportingCompany_Create_w : 410101,
     Definition_ImportingCompany_Read_r : 410102,
     Definition_ImportingCompany_Update_w : 410103,
     Definition_ImportingCompany_Delete_w : 410104,
     Definition_ImportingCompany_Import_w : 410105,
     Definition_ImportingCompany_Export_r : 410106,
     Definition_ImportingCompany_Log_r : 410107,
 
 
     //tbl_Dfn_InputQualityControl
     Definition_InputQualityControl : 411100,
     Definition_InputQualityControl_Create_w : 411101,
     Definition_InputQualityControl_Read_r : 411102,
     Definition_InputQualityControl_Update_w : 411103,
     Definition_InputQualityControl_Delete_w : 411104,
     Definition_InputQualityControl_Import_w : 411105,
     Definition_InputQualityControl_Export_r : 411106,
     Definition_InputQualityControl_Log_r : 411107,
 
 
     //tbl_Dfn_Model
     Definition_Model : 413100,
     Definition_Model_Create_w : 413101,
     Definition_Model_Read_r : 413102,
     Definition_Model_Update_w : 413103,
     Definition_Model_Delete_w : 413104,
     Definition_Model_Import_w : 413105,
     Definition_Model_Export_r : 413106,
     Definition_Model_Log_r : 413107,
 
 
     //tbl_Dfn_OrganizationalRole
     Definition_OrganizationalRole : 414100,
     Definition_OrganizationalRole_Create_w : 414101,
     Definition_OrganizationalRole_Read_r : 414102,
     Definition_OrganizationalRole_Update_w : 414103,
     Definition_OrganizationalRole_Delete_w : 414104,
     Definition_OrganizationalRole_Import_w : 414105,
     Definition_OrganizationalRole_Export_r : 414106,
     Definition_OrganizationalRole_Log_r : 414107,
 
 
     //tbl_Dfn_OutputQualityControl
     Definition_OutputQualityControl : 415100,
     Definition_OutputQualityControl_Create_w : 415101,
     Definition_OutputQualityControl_Read_r : 415102,
     Definition_OutputQualityControl_Update_w : 415103,
     Definition_OutputQualityControl_Delete_w : 415104,
     Definition_OutputQualityControl_Import_w : 415105,
     Definition_OutputQualityControl_Export_r : 415106,
     Definition_OutputQualityControl_Log_r : 415107,
 
 
     //tbl_Dfn_Part
     Definition_Part : 416100,
     Definition_Part_Create_w : 416101,
     Definition_Part_Read_r : 416102,
     Definition_Part_Update_w : 416103,
     Definition_Part_Delete_w : 416104,
     Definition_Part_Import_w : 416105,
     Definition_Part_Export_r : 416106,
     Definition_Part_Log_r : 416107,
 
 
     //tbl_Dfn_PartGroup
     Definition_PartGroup : 417100,
     Definition_PartGroup_Create_w : 417101,
     Definition_PartGroup_Read_r : 417102,
     Definition_PartGroup_Update_w : 417103,
     Definition_PartGroup_Delete_w : 417104,
     Definition_PartGroup_Import_w : 417105,
     Definition_PartGroup_Export_r : 417106,
     Definition_PartGroup_Log_r : 417107,
 
 
     //tbl_Dfn_Province
     Definition_Province : 418100,
     Definition_Province_Create_w : 418101,
     Definition_Province_Read_r : 418102,
     Definition_Province_Update_w : 418103,
     Definition_Province_Delete_w : 418104,
     Definition_Province_Import_w : 418105,
     Definition_Province_Export_r : 418106,
     Definition_Province_Log_r : 418107,
 
 
     //tbl_Dfn_Quality
     Definition_Quality : 419100,
     Definition_Quality_Create_w : 419101,
     Definition_Quality_Read_r : 419102,
     Definition_Quality_Update_w : 419103,
     Definition_Quality_Delete_w : 419104,
     Definition_Quality_Import_w : 419105,
     Definition_Quality_Export_r : 419106,
     Definition_Quality_Log_r : 419107,
 
 
     //tbl_Dfn_QuestionnaireType
     Definition_QuestionnaireType : 420100,
     Definition_QuestionnaireType_Create_w : 420101,
     Definition_QuestionnaireType_Read_r : 420102,
     Definition_QuestionnaireType_Update_w : 420103,
     Definition_QuestionnaireType_Delete_w : 420104,
     Definition_QuestionnaireType_Import_w : 420105,
     Definition_QuestionnaireType_Export_r : 420106,
     Definition_QuestionnaireType_Log_r : 420107,
 
 
     //tbl_Dfn_RepairsPerformed
     Definition_RepairsPerformed : 421100,
     Definition_RepairsPerformed_Create_w : 421101,
     Definition_RepairsPerformed_Read_r : 421102,
     Definition_RepairsPerformed_Update_w : 421103,
     Definition_RepairsPerformed_Delete_w : 421104,
     Definition_RepairsPerformed_Import_w : 421105,
     Definition_RepairsPerformed_Export_r : 421106,
     Definition_RepairsPerformed_Log_r : 421107,
 
 
     //tbl_Dfn_ReplacementType
     Definition_ReplacementType : 422100,
     Definition_ReplacementType_Create_w : 422101,
     Definition_ReplacementType_Read_r : 422102,
     Definition_ReplacementType_Update_w : 422103,
     Definition_ReplacementType_Delete_w : 422104,
     Definition_ReplacementType_Import_w : 422105,
     Definition_ReplacementType_Export_r : 422106,
     Definition_ReplacementType_Log_r : 422107,
 
 
     //tbl_Dfn_Section
     Definition_Section : 423100,
     Definition_Section_Create_w : 423101,
     Definition_Section_Read_r : 423102,
     Definition_Section_Update_w : 423103,
     Definition_Section_Delete_w : 423104,
     Definition_Section_Import_w : 423105,
     Definition_Section_Export_r : 423106,
     Definition_Section_Log_r : 423107,
 
 
     //tbl_Dfn_SendType
     Definition_SendType : 424100,
     Definition_SendType_Create_w : 424101,
     Definition_SendType_Read_r : 424102,
     Definition_SendType_Update_w : 424103,
     Definition_SendType_Delete_w : 424104,
     Definition_SendType_Import_w : 424105,
     Definition_SendType_Export_r : 424106,
     Definition_SendType_Log_r : 424107,
 
 
     //tbl_Dfn_StatusDeviceEnd
     Definition_StatusDeviceEnd : 425100,
     Definition_StatusDeviceEnd_Create_w : 425101,
     Definition_StatusDeviceEnd_Read_r : 425102,
     Definition_StatusDeviceEnd_Update_w : 425103,
     Definition_StatusDeviceEnd_Delete_w : 425104,
     Definition_StatusDeviceEnd_Import_w : 425105,
     Definition_StatusDeviceEnd_Export_r : 425106,
     Definition_StatusDeviceEnd_Log_r : 425107,
 
 
     //tbl_Dfn_StatusDeviceProgress
     Definition_StatusDeviceProgress : 426100,
     Definition_StatusDeviceProgress_Create_w : 426101,
     Definition_StatusDeviceProgress_Read_r : 426102,
     Definition_StatusDeviceProgress_Update_w : 426103,
     Definition_StatusDeviceProgress_Delete_w : 426104,
     Definition_StatusDeviceProgress_Import_w : 426105,
     Definition_StatusDeviceProgress_Export_r : 426106,
     Definition_StatusDeviceProgress_Log_r : 426107,
 
 
     //tbl_Dfn_StatusDeviceStart
     Definition_StatusDeviceStart : 427100,
     Definition_StatusDeviceStart_Create_w : 427101,
     Definition_StatusDeviceStart_Read_r : 427102,
     Definition_StatusDeviceStart_Update_w : 427103,
     Definition_StatusDeviceStart_Delete_w : 427104,
     Definition_StatusDeviceStart_Import_w : 427105,
     Definition_StatusDeviceStart_Export_r : 427106,
     Definition_StatusDeviceStart_Log_r : 427107,
 
 
     //tbl_Dfn_VehicleType
     Definition_VehicleType : 428100,
     Definition_VehicleType_Create_w : 428101,
     Definition_VehicleType_Read_r : 428102,
     Definition_VehicleType_Update_w : 428103,
     Definition_VehicleType_Delete_w : 428104,
     Definition_VehicleType_Import_w : 428105,
     Definition_VehicleType_Export_r : 428106,
     Definition_VehicleType_Log_r : 428107,
 
 
     //tbl_Dfn_WarrantyType
     Definition_WarrantyType : 429100,
     Definition_WarrantyType_Create_w : 429101,
     Definition_WarrantyType_Read_r : 429102,
     Definition_WarrantyType_Update_w : 429103,
     Definition_WarrantyType_Delete_w : 429104,
     Definition_WarrantyType_Import_w : 429105,
     Definition_WarrantyType_Export_r : 429106,
     Definition_WarrantyType_Log_r : 429107,
 
 
 
     //Business - 900
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     Business_Dashboard_Index : 900100,
     Business_Dashboard_Index_Read_r : 900101,
 
 
     //tbl_Bsn_RegistrationGood
     Business_RegistrationGood : 901100,
     Business_RegistrationGood_Create_w : 901101,
     Business_RegistrationGood_Read_r : 901102,
     Business_RegistrationGood_Update_w : 901103,
     Business_RegistrationGood_Delete_w : 901104,
     Business_RegistrationGood_Import_w : 901105,
     Business_RegistrationGood_Export_r : 901106,
     Business_RegistrationGood_Log_r : 901107,
 
 
 
     //Distribution - 1200
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     Distribution_Dashboard_Index : 1200100,
     Distribution_Dashboard_Index_Read_r : 1200101,
 
 
     //tbl_Dsb_DeliveryRegister
     Distribution_DeliveryRegister : 1201100,
     Distribution_DeliveryRegister_Create_w : 1201101,
     Distribution_DeliveryRegister_Read_r : 1201102,
     Distribution_DeliveryRegister_Update_w : 1201103,
     Distribution_DeliveryRegister_Delete_w : 1201104,
     Distribution_DeliveryRegister_Import_w : 1201105,
     Distribution_DeliveryRegister_Export_r : 1201106,
     Distribution_DeliveryRegister_Log_r : 1201107,
 
 
     //tbl_Dsb_Package
     Distribution_Package : 1202100,
     Distribution_Package_Create_w : 1202101,
     Distribution_Package_Read_r : 1202102,
     Distribution_Package_Update_w : 1202103,
     Distribution_Package_Delete_w : 1202104,
     Distribution_Package_Import_w : 1202105,
     Distribution_Package_Export_r : 1202106,
     Distribution_Package_Log_r : 1202107,
 
 
 
     //AfterSales - 1300
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     AfterSales_Dashboard_Index : 1300100,
     AfterSales_Dashboard_Index_Read_r : 1300101,
 
 
 
     //Survey - 1600
     ////////////////////////////////////////////////////////////
 
     //Dashboard
     Survey_Dashboard_Index : 1600100,
     Survey_Dashboard_Index_Read_r : 1600101,
 
 
     //tbl_Srv_AnswerPage
     Survey_AnswerPage : 1603100,
     Survey_AnswerPage_Create_w : 1603101,
     Survey_AnswerPage_Read_r : 1603102,
     Survey_AnswerPage_Update_w : 1603103,
     Survey_AnswerPage_Delete_w : 1603104,
     Survey_AnswerPage_Import_w : 1603105,
     Survey_AnswerPage_Export_r : 1603106,
     Survey_AnswerPage_Log_r : 1603107,
 
 
     //tbl_Srv_QuestionPage
     Survey_QuestionPage : 1606100,
     Survey_QuestionPage_Create_w : 1606101,
     Survey_QuestionPage_Read_r : 1606102,
     Survey_QuestionPage_Update_w : 1606103,
     Survey_QuestionPage_Delete_w : 1606104,
     Survey_QuestionPage_Import_w : 1606105,
     Survey_QuestionPage_Export_r : 1606106,
     Survey_QuestionPage_Log_r : 1606107,
 
 
 
 
     //Custom
 
}
module.exports={
    enums
}