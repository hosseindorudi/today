const ResultCodeEnum={
    Ok : 0,

    Ip_Unauthorized : 11,
    Ip_Blocked : 12,

    Domain_Invalid : 21,
    Domain_NotExist : 22,
    Domain_InActive : 23,
    Domain_MaxSession : 24,
    Domain_Expired : 25,

    Username_UEmpty : 31,
    Username_PEmpty : 32,
    Username_NotExist : 33,
    Username_SafeMode : 34,
    Username_Password : 35,
    Username_InActive : 36,
    Username_Expired : 37,

    Group_NotExist : 41,
    Group_InActive : 42,
    Group_SafeMode : 43,
    Group_Expired : 44,

    Policy_MaxSession : 51,
    Policy_Os : 52,
    Policy_Ip : 53,
    Policy_Browser : 54,
    Policy_Location : 55,

    Token_Empty : 61,
    Token_Type : 62,
    Token_Unauthorized : 63,
    Token_Expired : 64,

    Unauthorized_Os : 71,
    Unauthorized_Ip : 72,
    Unauthorized_Browser : 73,
    Unauthorized_Location : 74,
    Unauthorized_Access : 75,

    Invalid_Input : 81,
    Invalid_Filter : 82,
    Invalid_SelectedId : 83,

    SafeMode_Main : 91,
    SafeMode_NotAuthorized : 92,

    Record_Undefined : 101,
    Record_NotAuthorized : 102,
            
    Failed_Create : 111,
    Failed_Read : 112,
    Failed_Update : 113,
    Failed_Delete : 114,


    Unknown : 1000
}

module.exports={
    ResultCodeEnum
}