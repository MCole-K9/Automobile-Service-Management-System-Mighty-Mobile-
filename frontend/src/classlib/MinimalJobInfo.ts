export type MinimumJobInfoItem = {
    jobNumber: number,
    clientFirstName: string,
    clientLastName: string,
    clientId: number
}

export type MinimumJobInfoList = {
    items: MinimumJobInfoItem[]
}