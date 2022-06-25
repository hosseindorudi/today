 const enums = {
         //Custom
         Module_Operator :100,
         Module_Agent : 200,
         Module_Customer : 300,
         Module_Definition : 400,
         //Module_HumanResource = 500,
         //Module_Financial = 600,
         //Module_Inventory = 700,
         //Module_Treasury = 800,
         Module_Business : 900,
         //Module_SupplyChain = 1000,
         //Module_Store = 1100,
         Module_Distribution : 1200,
         Module_AfterSales : 1300,
         //Module_CustomerRelationshipManagement = 1400,
         //Module_Club = 1500,
         //Module_Survey = 1600,
         //Module_BalancedScorecard = 1700,
         //Module_BusinessIntelligence = 1800,
         //Module_Setting = 9900,
         //Module_System = 10000,

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

    AfterSales_New_Admission : 1300120,
    AfterSales_New_Admission_Create_w : 1300121,
    AfterSales_New_Admission_Read_r : 1300122,
    AfterSales_New_Admission_Update_w : 1300123,
    AfterSales_New_Admission_Delete_w : 1300124,
    AfterSales_New_Admission_Import_w : 1300125,
    AfterSales_New_Admission_Export_r : 1300126,
    AfterSales_New_Admission_Log_r : 1300127,

    AfterSales_New_InputQualityControl : 1300130,
    AfterSales_New_InputQualityControl_Create_w : 1300131,
    AfterSales_New_InputQualityControl_Read_r : 1300132,
    AfterSales_New_InputQualityControl_Update_w : 1300133,
    AfterSales_New_InputQualityControl_Delete_w : 1300134,
    AfterSales_New_InputQualityControl_Import_w : 1300135,
    AfterSales_New_InputQualityControl_Export_r : 1300136,
    AfterSales_New_InputQualityControl_Log_r : 1300137,

    AfterSales_New_AssignToTechnician : 1300140,
    AfterSales_New_AssignToTechnician_Create_w : 1300141,
    AfterSales_New_AssignToTechnician_Read_r : 1300142,
    AfterSales_New_AssignToTechnician_Update_w : 1300143,
    AfterSales_New_AssignToTechnician_Delete_w : 1300144,
    AfterSales_New_AssignToTechnician_Import_w : 1300145,
    AfterSales_New_AssignToTechnician_Export_r : 1300146,
    AfterSales_New_AssignToTechnician_Log_r : 1300147,

    AfterSales_New_Technician : 1300150,
    AfterSales_New_Technician_Create_w : 1300151,
    AfterSales_New_Technician_Read_r : 1300152,
    AfterSales_New_Technician_Update_w : 1300153,
    AfterSales_New_Technician_Delete_w : 1300154,
    AfterSales_New_Technician_Import_w : 1300155,
    AfterSales_New_Technician_Export_r : 1300156,
    AfterSales_New_Technician_Log_r : 1300157,

    AfterSales_New_OutputQualityControl : 1300160,
    AfterSales_New_OutputQualityControl_Create_w : 1300161,
    AfterSales_New_OutputQualityControl_Read_r : 1300162,
    AfterSales_New_OutputQualityControl_Update_w : 1300163,
    AfterSales_New_OutputQualityControl_Delete_w : 1300164,
    AfterSales_New_OutputQualityControl_Import_w : 1300165,
    AfterSales_New_OutputQualityControl_Export_r : 1300166,
    AfterSales_New_OutputQualityControl_Log_r : 1300167,

    AfterSales_New_Replacement : 1300170,
    AfterSales_New_Replacement_Create_w : 1300171,
    AfterSales_New_Replacement_Read_r : 1300172,
    AfterSales_New_Replacement_Update_w : 1300173,
    AfterSales_New_Replacement_Delete_w : 1300174,
    AfterSales_New_Replacement_Import_w : 1300175,
    AfterSales_New_Replacement_Export_r : 1300176,
    AfterSales_New_Replacement_Log_r : 1300177,

    AfterSales_New_DeliveryInPerson : 1300180,
    AfterSales_New_DeliveryInPerson_Create_w : 1300181,
    AfterSales_New_DeliveryInPerson_Read_r : 1300182,
    AfterSales_New_DeliveryInPerson_Update_w : 1300183,
    AfterSales_New_DeliveryInPerson_Delete_w : 1300184,
    AfterSales_New_DeliveryInPerson_Import_w : 1300185,
    AfterSales_New_DeliveryInPerson_Export_r : 1300186,
    AfterSales_New_DeliveryInPerson_Log_r : 1300187,

    AfterSales_New_Courier : 1300190,
    AfterSales_New_Courier_Create_w : 1300191,
    AfterSales_New_Courier_Read_r : 1300192,
    AfterSales_New_Courier_Update_w : 1300193,
    AfterSales_New_Courier_Delete_w : 1300194,
    AfterSales_New_Courier_Import_w : 1300195,
    AfterSales_New_Courier_Export_r : 1300196,
    AfterSales_New_Courier_Log_r : 1300197,

    AfterSales_New_PostToAgent : 1300200,
    AfterSales_New_PostToAgent_Create_w : 1300201,
    AfterSales_New_PostToAgent_Read_r : 1300202,
    AfterSales_New_PostToAgent_Update_w : 1300203,
    AfterSales_New_PostToAgent_Delete_w : 1300204,
    AfterSales_New_PostToAgent_Import_w : 1300205,
    AfterSales_New_PostToAgent_Export_r : 1300206,
    AfterSales_New_PostToAgent_Log_r : 1300207,

    AfterSales_New_PostToCustomer : 1300210,
    AfterSales_New_PostToCustomer_Create_w : 1300211,
    AfterSales_New_PostToCustomer_Read_r : 1300212,
    AfterSales_New_PostToCustomer_Update_w : 1300213,
    AfterSales_New_PostToCustomer_Delete_w : 1300214,
    AfterSales_New_PostToCustomer_Import_w : 1300215,
    AfterSales_New_PostToCustomer_Export_r : 1300216,
    AfterSales_New_PostToCustomer_Log_r : 1300217,

    AfterSales_New_Archive : 1300220,
    AfterSales_New_Archive_Read_r : 1300222,
    AfterSales_New_Archive_Update_w : 1300223,
    AfterSales_New_Archive_Export_r : 1300226,
    AfterSales_New_Archive_Log_r : 1300227,




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
    //Operator_AccessList_Etc_w : 101108


    //tbl_Opr_AllowedIp
    Operator_AllowedIp : 102100,
    Operator_AllowedIp_Create_w : 102101,
    Operator_AllowedIp_Read_r : 102102,
    Operator_AllowedIp_Update_w : 102103,
    Operator_AllowedIp_Delete_w : 102104,
    Operator_AllowedIp_Import_w : 102105,
    Operator_AllowedIp_Export_r : 102106,
    Operator_AllowedIp_Log_r : 102107,
    //Operator_AllowedIp_Etc_w : 102108


    //tbl_Opr_BruteForce
    Operator_BruteForce : 103100,
    Operator_BruteForce_Create_w : 103101,
    Operator_BruteForce_Read_r : 103102,
    Operator_BruteForce_Update_w : 103103,
    Operator_BruteForce_Delete_w : 103104,
    Operator_BruteForce_Import_w : 103105,
    Operator_BruteForce_Export_r : 103106,
    Operator_BruteForce_Log_r : 103107,
    //Operator_BruteForce_Etc_w : 103108


    //tbl_Opr_Event
    Operator_Event : 104100,
    Operator_Event_Create_w : 104101,
    Operator_Event_Read_r : 104102,
    Operator_Event_Update_w : 104103,
    Operator_Event_Delete_w : 104104,
    Operator_Event_Import_w : 104105,
    Operator_Event_Export_r : 104106,
    Operator_Event_Log_r : 104107,
    //Operator_Event_Etc_w : 104108


    //tbl_Opr_FailedHistory
    Operator_FailedHistory : 105100,
    Operator_FailedHistory_Create_w : 105101,
    Operator_FailedHistory_Read_r : 105102,
    Operator_FailedHistory_Update_w : 105103,
    Operator_FailedHistory_Delete_w : 105104,
    Operator_FailedHistory_Import_w : 105105,
    Operator_FailedHistory_Export_r : 105106,
    Operator_FailedHistory_Log_r : 105107,
    //Operator_FailedHistory_Etc_w : 105108


    //tbl_Opr_Group
    Operator_Group : 107100,
    Operator_Group_Create_w : 107101,
    Operator_Group_Read_r : 107102,
    Operator_Group_Update_w : 107103,
    Operator_Group_Delete_w : 107104,
    Operator_Group_Import_w : 107105,
    Operator_Group_Export_r : 107106,
    Operator_Group_Log_r : 107107,
    //Operator_Group_Etc_w : 107108


    //tbl_Opr_LoginHistory
    Operator_LoginHistory : 108100,
    Operator_LoginHistory_Create_w : 108101,
    Operator_LoginHistory_Read_r : 108102,
    Operator_LoginHistory_Update_w : 108103,
    Operator_LoginHistory_Delete_w : 108104,
    Operator_LoginHistory_Import_w : 108105,
    Operator_LoginHistory_Export_r : 108106,
    Operator_LoginHistory_Log_r : 108107,
    //Operator_LoginHistory_Etc_w : 108108


    //tbl_Opr_OnlineOperator
    Operator_OnlineOperator : 109100,
    Operator_OnlineOperator_Create_w : 109101,
    Operator_OnlineOperator_Read_r : 109102,
    Operator_OnlineOperator_Update_w : 109103,
    Operator_OnlineOperator_Delete_w : 109104,
    Operator_OnlineOperator_Import_w : 109105,
    Operator_OnlineOperator_Export_r : 109106,
    Operator_OnlineOperator_Log_r : 109107,
    //Operator_OnlineOperator_Etc_w : 109108


    //tbl_Opr_Operator
    Operator_Operator : 110100,
    Operator_Operator_Create_w : 110101,
    Operator_Operator_Read_r : 110102,
    Operator_Operator_Update_w : 110103,
    Operator_Operator_Delete_w : 110104,
    Operator_Operator_Import_w : 110105,
    Operator_Operator_Export_r : 110106,
    Operator_Operator_Log_r : 110107,
   
    //Operator_Operator_Etc_w : 110108



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
    //Agent_AccessList_Etc_w : 201108


    //tbl_Agn_Agent
    Agent_Agent : 202100,
    Agent_Agent_Create_w : 202101,
    Agent_Agent_Read_r : 202102,
    Agent_Agent_Update_w : 202103,
    Agent_Agent_Delete_w : 202104,
    Agent_Agent_Import_w : 202105,
    Agent_Agent_Export_r : 202106,
    Agent_Agent_Log_r : 202107,
    //Agent_Agent_Etc_w : 202108


    //tbl_Agn_AllowedIp
    Agent_AllowedIp : 203100,
    Agent_AllowedIp_Create_w : 203101,
    Agent_AllowedIp_Read_r : 203102,
    Agent_AllowedIp_Update_w : 203103,
    Agent_AllowedIp_Delete_w : 203104,
    Agent_AllowedIp_Import_w : 203105,
    Agent_AllowedIp_Export_r : 203106,
    Agent_AllowedIp_Log_r : 203107,
    //Agent_AllowedIp_Etc_w : 203108


    //tbl_Agn_BruteForce
    Agent_BruteForce : 204100,
    Agent_BruteForce_Create_w : 204101,
    Agent_BruteForce_Read_r : 204102,
    Agent_BruteForce_Update_w : 204103,
    Agent_BruteForce_Delete_w : 204104,
    Agent_BruteForce_Import_w : 204105,
    Agent_BruteForce_Export_r : 204106,
    Agent_BruteForce_Log_r : 204107,
    //Agent_BruteForce_Etc_w : 204108


    //tbl_Agn_Event
    Agent_Event : 205100,
    Agent_Event_Create_w : 205101,
    Agent_Event_Read_r : 205102,
    Agent_Event_Update_w : 205103,
    Agent_Event_Delete_w : 205104,
    Agent_Event_Import_w : 205105,
    Agent_Event_Export_r : 205106,
    Agent_Event_Log_r : 205107,
    //Agent_Event_Etc_w : 205108


    //tbl_Agn_FailedHistory
    Agent_FailedHistory : 206100,
    Agent_FailedHistory_Create_w : 206101,
    Agent_FailedHistory_Read_r : 206102,
    Agent_FailedHistory_Update_w : 206103,
    Agent_FailedHistory_Delete_w : 206104,
    Agent_FailedHistory_Import_w : 206105,
    Agent_FailedHistory_Export_r : 206106,
    Agent_FailedHistory_Log_r : 206107,
    //Agent_FailedHistory_Etc_w : 206108


    //tbl_Agn_Group
    Agent_Group : 208100,
    Agent_Group_Create_w : 208101,
    Agent_Group_Read_r : 208102,
    Agent_Group_Update_w : 208103,
    Agent_Group_Delete_w : 208104,
    Agent_Group_Import_w : 208105,
    Agent_Group_Export_r : 208106,
    Agent_Group_Log_r : 208107,
    //Agent_Group_Etc_w : 208108


    //tbl_Agn_LoginHistory
    Agent_LoginHistory : 209100,
    Agent_LoginHistory_Create_w : 209101,
    Agent_LoginHistory_Read_r : 209102,
    Agent_LoginHistory_Update_w : 209103,
    Agent_LoginHistory_Delete_w : 209104,
    Agent_LoginHistory_Import_w : 209105,
    Agent_LoginHistory_Export_r : 209106,
    Agent_LoginHistory_Log_r : 209107,
    //Agent_LoginHistory_Etc_w : 209108


    //tbl_Agn_OnlineAgent
    Agent_OnlineAgent : 210100,
    Agent_OnlineAgent_Create_w : 210101,
    Agent_OnlineAgent_Read_r : 210102,
    Agent_OnlineAgent_Update_w : 210103,
    Agent_OnlineAgent_Delete_w : 210104,
    Agent_OnlineAgent_Import_w : 210105,
    Agent_OnlineAgent_Export_r : 210106,
    Agent_OnlineAgent_Log_r : 210107,
    //Agent_OnlineAgent_Etc_w : 210108



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
    //Customer_AccessList_Etc_w : 301108


    //tbl_Cst_AllowedIp
    Customer_AllowedIp : 303100,
    Customer_AllowedIp_Create_w : 303101,
    Customer_AllowedIp_Read_r : 303102,
    Customer_AllowedIp_Update_w : 303103,
    Customer_AllowedIp_Delete_w : 303104,
    Customer_AllowedIp_Import_w : 303105,
    Customer_AllowedIp_Export_r : 303106,
    Customer_AllowedIp_Log_r : 303107,
    //Customer_AllowedIp_Etc_w : 303108


    //tbl_Cst_BruteForce
    Customer_BruteForce : 304100,
    Customer_BruteForce_Create_w : 304101,
    Customer_BruteForce_Read_r : 304102,
    Customer_BruteForce_Update_w : 304103,
    Customer_BruteForce_Delete_w : 304104,
    Customer_BruteForce_Import_w : 304105,
    Customer_BruteForce_Export_r : 304106,
    Customer_BruteForce_Log_r : 304107,
    //Customer_BruteForce_Etc_w : 304108


    //tbl_Cst_Customer
    Customer_Customer : 305100,
    Customer_Customer_Create_w : 305101,
    Customer_Customer_Read_r : 305102,
    Customer_Customer_Update_w : 305103,
    Customer_Customer_Delete_w : 305104,
    Customer_Customer_Import_w : 305105,
    Customer_Customer_Export_r : 305106,
    Customer_Customer_Log_r : 305107,
    //Customer_Customer_Etc_w : 305108


    //tbl_Cst_Event
    Customer_Event : 306100,
    Customer_Event_Create_w : 306101,
    Customer_Event_Read_r : 306102,
    Customer_Event_Update_w : 306103,
    Customer_Event_Delete_w : 306104,
    Customer_Event_Import_w : 306105,
    Customer_Event_Export_r : 306106,
    Customer_Event_Log_r : 306107,
    //Customer_Event_Etc_w : 306108


    //tbl_Cst_FailedHistory
    Customer_FailedHistory : 307100,
    Customer_FailedHistory_Create_w : 307101,
    Customer_FailedHistory_Read_r : 307102,
    Customer_FailedHistory_Update_w : 307103,
    Customer_FailedHistory_Delete_w : 307104,
    Customer_FailedHistory_Import_w : 307105,
    Customer_FailedHistory_Export_r : 307106,
    Customer_FailedHistory_Log_r : 307107,
    //Customer_FailedHistory_Etc_w : 307108


    //tbl_Cst_Group
    Customer_Group : 309100,
    Customer_Group_Create_w : 309101,
    Customer_Group_Read_r : 309102,
    Customer_Group_Update_w : 309103,
    Customer_Group_Delete_w : 309104,
    Customer_Group_Import_w : 309105,
    Customer_Group_Export_r : 309106,
    Customer_Group_Log_r : 309107,
    //Customer_Group_Etc_w : 309108


    //tbl_Cst_LoginHistory
    Customer_LoginHistory : 310100,
    Customer_LoginHistory_Create_w : 310101,
    Customer_LoginHistory_Read_r : 310102,
    Customer_LoginHistory_Update_w : 310103,
    Customer_LoginHistory_Delete_w : 310104,
    Customer_LoginHistory_Import_w : 310105,
    Customer_LoginHistory_Export_r : 310106,
    Customer_LoginHistory_Log_r : 310107,
    //Customer_LoginHistory_Etc_w : 310108


    //tbl_Cst_OnlineCustomer
    Customer_OnlineCustomer : 311100,
    Customer_OnlineCustomer_Create_w : 311101,
    Customer_OnlineCustomer_Read_r : 311102,
    Customer_OnlineCustomer_Update_w : 311103,
    Customer_OnlineCustomer_Delete_w : 311104,
    Customer_OnlineCustomer_Import_w : 311105,
    Customer_OnlineCustomer_Export_r : 311106,
    Customer_OnlineCustomer_Log_r : 311107,
    //Customer_OnlineCustomer_Etc_w : 311108



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
    //Definition_AdditionalService_Etc_w : 401108


    //tbl_Dfn_AdmissionAccessory
    Definition_AdmissionAccessory : 402100,
    Definition_AdmissionAccessory_Create_w : 402101,
    Definition_AdmissionAccessory_Read_r : 402102,
    Definition_AdmissionAccessory_Update_w : 402103,
    Definition_AdmissionAccessory_Delete_w : 402104,
    Definition_AdmissionAccessory_Import_w : 402105,
    Definition_AdmissionAccessory_Export_r : 402106,
    Definition_AdmissionAccessory_Log_r : 402107,
    //Definition_AdmissionAccessory_Etc_w : 402108


    //tbl_Dfn_AdmissionChecklist
    Definition_AdmissionChecklist : 403100,
    Definition_AdmissionChecklist_Create_w : 403101,
    Definition_AdmissionChecklist_Read_r : 403102,
    Definition_AdmissionChecklist_Update_w : 403103,
    Definition_AdmissionChecklist_Delete_w : 403104,
    Definition_AdmissionChecklist_Import_w : 403105,
    Definition_AdmissionChecklist_Export_r : 403106,
    Definition_AdmissionChecklist_Log_r : 403107,
    //Definition_AdmissionChecklist_Etc_w : 403108


    //tbl_Dfn_AgentRanking
    Definition_AgentRanking : 404100,
    Definition_AgentRanking_Create_w : 404101,
    Definition_AgentRanking_Read_r : 404102,
    Definition_AgentRanking_Update_w : 404103,
    Definition_AgentRanking_Delete_w : 404104,
    Definition_AgentRanking_Import_w : 404105,
    Definition_AgentRanking_Export_r : 404106,
    Definition_AgentRanking_Log_r : 404107,
    //Definition_AgentRanking_Etc_w : 404108


    //tbl_Dfn_Area
    Definition_Area : 405100,
    Definition_Area_Create_w : 405101,
    Definition_Area_Read_r : 405102,
    Definition_Area_Update_w : 405103,
    Definition_Area_Delete_w : 405104,
    Definition_Area_Import_w : 405105,
    Definition_Area_Export_r : 405106,
    Definition_Area_Log_r : 405107,
    //Definition_Area_Etc_w : 405108


    //tbl_Dfn_City
    Definition_City : 406100,
    Definition_City_Create_w : 406101,
    Definition_City_Read_r : 406102,
    Definition_City_Update_w : 406103,
    Definition_City_Delete_w : 406104,
    Definition_City_Import_w : 406105,
    Definition_City_Export_r : 406106,
    Definition_City_Log_r : 406107,
    //Definition_City_Etc_w : 406108


    //tbl_Dfn_Country
    Definition_Country : 407100,
    Definition_Country_Create_w : 407101,
    Definition_Country_Read_r : 407102,
    Definition_Country_Update_w : 407103,
    Definition_Country_Delete_w : 407104,
    Definition_Country_Import_w : 407105,
    Definition_Country_Export_r : 407106,
    Definition_Country_Log_r : 407107,
    //Definition_Country_Etc_w : 407108


    //tbl_Dfn_Defect
    Definition_Defect : 408100,
    Definition_Defect_Create_w : 408101,
    Definition_Defect_Read_r : 408102,
    Definition_Defect_Update_w : 408103,
    Definition_Defect_Delete_w : 408104,
    Definition_Defect_Import_w : 408105,
    Definition_Defect_Export_r : 408106,
    Definition_Defect_Log_r : 408107,
    //Definition_Defect_Etc_w : 408108


    //tbl_Dfn_InputQualityControl
    Definition_InputQualityControl : 409100,
    Definition_InputQualityControl_Create_w : 409101,
    Definition_InputQualityControl_Read_r : 409102,
    Definition_InputQualityControl_Update_w : 409103,
    Definition_InputQualityControl_Delete_w : 409104,
    Definition_InputQualityControl_Import_w : 409105,
    Definition_InputQualityControl_Export_r : 409106,
    Definition_InputQualityControl_Log_r : 409107,
    //Definition_InputQualityControl_Etc_w : 409108


    //tbl_Dfn_OutputQualityControl
    Definition_OutputQualityControl : 411100,
    Definition_OutputQualityControl_Create_w : 411101,
    Definition_OutputQualityControl_Read_r : 411102,
    Definition_OutputQualityControl_Update_w : 411103,
    Definition_OutputQualityControl_Delete_w : 411104,
    Definition_OutputQualityControl_Import_w : 411105,
    Definition_OutputQualityControl_Export_r : 411106,
    Definition_OutputQualityControl_Log_r : 411107,
    //Definition_OutputQualityControl_Etc_w : 411108


    //tbl_Dfn_Part
    Definition_Part : 412100,
    Definition_Part_Create_w : 412101,
    Definition_Part_Read_r : 412102,
    Definition_Part_Update_w : 412103,
    Definition_Part_Delete_w : 412104,
    Definition_Part_Import_w : 412105,
    Definition_Part_Export_r : 412106,
    Definition_Part_Log_r : 412107,
    //Definition_Part_Etc_w : 412108


    //tbl_Dfn_Product
    Definition_Product : 413100,
    Definition_Product_Create_w : 413101,
    Definition_Product_Read_r : 413102,
    Definition_Product_Update_w : 413103,
    Definition_Product_Delete_w : 413104,
    Definition_Product_Import_w : 413105,
    Definition_Product_Export_r : 413106,
    Definition_Product_Log_r : 413107,
    //Definition_Product_Etc_w : 413108


    //tbl_Dfn_ProductGroup
    Definition_ProductGroup : 414100,
    Definition_ProductGroup_Create_w : 414101,
    Definition_ProductGroup_Read_r : 414102,
    Definition_ProductGroup_Update_w : 414103,
    Definition_ProductGroup_Delete_w : 414104,
    Definition_ProductGroup_Import_w : 414105,
    Definition_ProductGroup_Export_r : 414106,
    Definition_ProductGroup_Log_r : 414107,
    //Definition_ProductGroup_Etc_w : 414108


    //tbl_Dfn_Province
    Definition_Province : 415100,
    Definition_Province_Create_w : 415101,
    Definition_Province_Read_r : 415102,
    Definition_Province_Update_w : 415103,
    Definition_Province_Delete_w : 415104,
    Definition_Province_Import_w : 415105,
    Definition_Province_Export_r : 415106,
    Definition_Province_Log_r : 415107,
    //Definition_Province_Etc_w : 415108


    //tbl_Dfn_ReasonForCancellationOfWarranty
    Definition_ReasonForCancellationOfWarranty : 416100,
    Definition_ReasonForCancellationOfWarranty_Create_w : 416101,
    Definition_ReasonForCancellationOfWarranty_Read_r : 416102,
    Definition_ReasonForCancellationOfWarranty_Update_w : 416103,
    Definition_ReasonForCancellationOfWarranty_Delete_w : 416104,
    Definition_ReasonForCancellationOfWarranty_Import_w : 416105,
    Definition_ReasonForCancellationOfWarranty_Export_r : 416106,
    Definition_ReasonForCancellationOfWarranty_Log_r : 416107,
    //Definition_ReasonForCancellationOfWarranty_Etc_w : 416108


    //tbl_Dfn_RepairsPerformed
    Definition_RepairsPerformed : 417100,
    Definition_RepairsPerformed_Create_w : 417101,
    Definition_RepairsPerformed_Read_r : 417102,
    Definition_RepairsPerformed_Update_w : 417103,
    Definition_RepairsPerformed_Delete_w : 417104,
    Definition_RepairsPerformed_Import_w : 417105,
    Definition_RepairsPerformed_Export_r : 417106,
    Definition_RepairsPerformed_Log_r : 417107,
    //Definition_RepairsPerformed_Etc_w : 417108


    //tbl_Dfn_RequestTypeFromWarehouse
    Definition_RequestTypeFromWarehouse : 418100,
    Definition_RequestTypeFromWarehouse_Create_w : 418101,
    Definition_RequestTypeFromWarehouse_Read_r : 418102,
    Definition_RequestTypeFromWarehouse_Update_w : 418103,
    Definition_RequestTypeFromWarehouse_Delete_w : 418104,
    Definition_RequestTypeFromWarehouse_Import_w : 418105,
    Definition_RequestTypeFromWarehouse_Export_r : 418106,
    Definition_RequestTypeFromWarehouse_Log_r : 418107,
    //Definition_RequestTypeFromWarehouse_Etc_w : 418108


    //tbl_Dfn_Role
    Definition_Role : 419100,
    Definition_Role_Create_w : 419101,
    Definition_Role_Read_r : 419102,
    Definition_Role_Update_w : 419103,
    Definition_Role_Delete_w : 419104,
    Definition_Role_Import_w : 419105,
    Definition_Role_Export_r : 419106,
    Definition_Role_Log_r : 419107,
    //Definition_Role_Etc_w : 419108


    //tbl_Dfn_Section
    Definition_Section : 420100,
    Definition_Section_Create_w : 420101,
    Definition_Section_Read_r : 420102,
    Definition_Section_Update_w : 420103,
    Definition_Section_Delete_w : 420104,
    Definition_Section_Import_w : 420105,
    Definition_Section_Export_r : 420106,
    Definition_Section_Log_r : 420107,
    //Definition_Section_Etc_w : 420108


    //tbl_Dfn_StatusDeviceEnd
    Definition_StatusDeviceEnd : 421100,
    Definition_StatusDeviceEnd_Create_w : 421101,
    Definition_StatusDeviceEnd_Read_r : 421102,
    Definition_StatusDeviceEnd_Update_w : 421103,
    Definition_StatusDeviceEnd_Delete_w : 421104,
    Definition_StatusDeviceEnd_Import_w : 421105,
    Definition_StatusDeviceEnd_Export_r : 421106,
    Definition_StatusDeviceEnd_Log_r : 421107,
    //Definition_StatusDeviceEnd_Etc_w : 421108


    //tbl_Dfn_StatusDeviceProgress
    Definition_StatusDeviceProgress : 422100,
    Definition_StatusDeviceProgress_Create_w : 422101,
    Definition_StatusDeviceProgress_Read_r : 422102,
    Definition_StatusDeviceProgress_Update_w : 422103,
    Definition_StatusDeviceProgress_Delete_w : 422104,
    Definition_StatusDeviceProgress_Import_w : 422105,
    Definition_StatusDeviceProgress_Export_r : 422106,
    Definition_StatusDeviceProgress_Log_r : 422107,
    //Definition_StatusDeviceProgress_Etc_w : 422108


    //tbl_Dfn_StatusDeviceStart
    Definition_StatusDeviceStart : 423100,
    Definition_StatusDeviceStart_Create_w : 423101,
    Definition_StatusDeviceStart_Read_r : 423102,
    Definition_StatusDeviceStart_Update_w : 423103,
    Definition_StatusDeviceStart_Delete_w : 423104,
    Definition_StatusDeviceStart_Import_w : 423105,
    Definition_StatusDeviceStart_Export_r : 423106,
    Definition_StatusDeviceStart_Log_r : 423107,
    //Definition_StatusDeviceStart_Etc_w : 423108


    //tbl_Dfn_Technician
    Definition_Technician : 424100,
    Definition_Technician_Create_w : 424101,
    Definition_Technician_Read_r : 424102,
    Definition_Technician_Update_w : 424103,
    Definition_Technician_Delete_w : 424104,
    Definition_Technician_Import_w : 424105,
    Definition_Technician_Export_r : 424106,
    Definition_Technician_Log_r : 424107,
    //Definition_Technician_Etc_w : 424108


    //tbl_Dfn_TechnicianRating
    Definition_TechnicianRating : 425100,
    Definition_TechnicianRating_Create_w : 425101,
    Definition_TechnicianRating_Read_r : 425102,
    Definition_TechnicianRating_Update_w : 425103,
    Definition_TechnicianRating_Delete_w : 425104,
    Definition_TechnicianRating_Import_w : 425105,
    Definition_TechnicianRating_Export_r : 425106,
    Definition_TechnicianRating_Log_r : 425107,
    //Definition_TechnicianRating_Etc_w : 425108


    //tbl_Dfn_TypeOfReceivedCustomerMessage
    Definition_TypeOfReceivedCustomerMessage : 426100,
    Definition_TypeOfReceivedCustomerMessage_Create_w : 426101,
    Definition_TypeOfReceivedCustomerMessage_Read_r : 426102,
    Definition_TypeOfReceivedCustomerMessage_Update_w : 426103,
    Definition_TypeOfReceivedCustomerMessage_Delete_w : 426104,
    Definition_TypeOfReceivedCustomerMessage_Import_w : 426105,
    Definition_TypeOfReceivedCustomerMessage_Export_r : 426106,
    Definition_TypeOfReceivedCustomerMessage_Log_r : 426107,
    //Definition_TypeOfReceivedCustomerMessage_Etc_w : 426108


    //tbl_Dfn_TypeOfSentCustomerMessage
    Definition_TypeOfSentCustomerMessage : 427100,
    Definition_TypeOfSentCustomerMessage_Create_w : 427101,
    Definition_TypeOfSentCustomerMessage_Read_r : 427102,
    Definition_TypeOfSentCustomerMessage_Update_w : 427103,
    Definition_TypeOfSentCustomerMessage_Delete_w : 427104,
    Definition_TypeOfSentCustomerMessage_Import_w : 427105,
    Definition_TypeOfSentCustomerMessage_Export_r : 427106,
    Definition_TypeOfSentCustomerMessage_Log_r : 427107,
    //Definition_TypeOfSentCustomerMessage_Etc_w : 427108


    //tbl_Dfn_TypeOfSystemMessage
    Definition_TypeOfSystemMessage : 428100,
    Definition_TypeOfSystemMessage_Create_w : 428101,
    Definition_TypeOfSystemMessage_Read_r : 428102,
    Definition_TypeOfSystemMessage_Update_w : 428103,
    Definition_TypeOfSystemMessage_Delete_w : 428104,
    Definition_TypeOfSystemMessage_Import_w : 428105,
    Definition_TypeOfSystemMessage_Export_r : 428106,
    Definition_TypeOfSystemMessage_Log_r : 428107,
    //Definition_TypeOfSystemMessage_Etc_w : 428108


    //tbl_Dfn_WarehouseType
    Definition_WarehouseType : 429100,
    Definition_WarehouseType_Create_w : 429101,
    Definition_WarehouseType_Read_r : 429102,
    Definition_WarehouseType_Update_w : 429103,
    Definition_WarehouseType_Delete_w : 429104,
    Definition_WarehouseType_Import_w : 429105,
    Definition_WarehouseType_Export_r : 429106,
    Definition_WarehouseType_Log_r : 429107,
    //Definition_WarehouseType_Etc_w : 429108


    //tbl_Dfn_WarrantyType
    Definition_WarrantyType : 430100,
    Definition_WarrantyType_Create_w : 430101,
    Definition_WarrantyType_Read_r : 430102,
    Definition_WarrantyType_Update_w : 430103,
    Definition_WarrantyType_Delete_w : 430104,
    Definition_WarrantyType_Import_w : 430105,
    Definition_WarrantyType_Export_r : 430106,
    Definition_WarrantyType_Log_r : 430107,
    //Definition_WarrantyType_Etc_w : 430108



    //AfterSales - 1300
    ////////////////////////////////////////////////////////////

    //Dashboard
    AfterSales_Dashboard_Index : 1300100,
    AfterSales_Dashboard_Index_Read_r : 1300101,
}
module.exports={
    enums
}