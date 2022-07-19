const ResultCodeEnum={
    Ok : 0,

    Ip_Unauthorized : 11,
    Ip_Blocked : 12,

    Username_UEmpty : 21,
    Username_PEmpty : 22,
    Username_NotExist : 23,
    Username_Password : 24,
    Username_InActive : 25,
    Username_Expired : 26,

    Group_Empty : 31,
    Group_NotExist : 32,
    Group_InActive : 33,
    Group_Expired : 34,

    Policy_MaxSession : 41,
    Policy_Os : 42,
    Policy_Ip : 43,
    Policy_Browser : 44,
    Policy_Location : 45,

    Token_Empty : 51,
    Token_Type : 52,
    Token_Unauthorized : 53,
    Token_Expired : 54,

    Unauthorized_Os : 61,
    Unauthorized_Ip : 62,
    Unauthorized_Browser : 63,
    Unauthorized_Location : 64,
    Unauthorized_Access : 65,

    Error_Data : 71,
    Error_Database : 72,


    Failed : 1000
}

module.exports={
    ResultCodeEnum
}