export type ShortJobInfo = {
    description: string,
    duration: number,
    stageNumber: number,
    jobNumber: number,
    streetAddress: string,
    town: string,
    parish: string,
    jobSummary: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
    ownerId: number,
    ownerFirstName: string,
    ownerLastName: string,
    scheduleDate: Date
}

export type ShortAppointmentInfo = {
    customerId: number,
    customerLastName: string,
    customerFirstName: string,
    appointmentId: number,
    street: string,
    town: string,
    parish: string,
    problemDescription: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
    vehicleId: number,
    scheduleDate: Date,
}