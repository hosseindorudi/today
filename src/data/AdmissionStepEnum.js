const AdmissionStepEnum={
    Registered : 1,
    SendToCompany : 2,
    Admission : 3,
    InputQualityControl : 4,
    AssignToTechnician : 5,
    Repair : 6,
    OutputQualityControl : 7,
    Replacement : 8,
    TakeBack : 9,
    DeliveryInPerson : 10,
    Courier : 12,
    PostToAgent : 12,
    PostToCustomer : 13,
    Archive : 14,
}

module.exports={
    AdmissionStepEnum
}