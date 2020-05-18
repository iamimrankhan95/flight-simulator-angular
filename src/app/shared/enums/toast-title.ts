export enum ToastTitle {
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning',
    Info = 'Info',
    Primary = 'Primary',
}

export enum UserType {
    student = 1,
    IH = 59,
    USEO = 194,
    PMEAT = 4,
    Admin = 5,
    DEO = 193
}

export enum StudentApplicationStatus {
    Pending = 1,
    RejectedByIH = 2,
    ApprovedByIH = 3,
    ForwardedByIH = 4,
    ForwardedByUSEO = 5,
    RejectedByUSEO = 6,
    ApprovedByPMEAT = 7,
    RejectedByPMEAT = 8
}

export enum InstitutionStatus {
    Pending = 1,
    ApprovedByPMEAT = 2,
    RejectedByPMEAT = 3
}