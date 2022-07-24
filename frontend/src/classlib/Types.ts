/**
 * Model User
 * 
 */
 export type User = {
    id: number
    email: string
    firstName: string
    lastName: string
    password?: string
    phoneNumber?: string | null
    roles?: Role[] | null
    vehicles?: Vehicle[]
  }
  
  /**
   * Model Address
   * 
   */
  export type Address = {
    id: number
    streetAddress: string
    town: string
    parish: string
    userId: number
  }
  
  /**
   * Model Role
   * 
   */
  export type Role = {
    id: number
    role: string
  }
  
  /**
   * Model Vehicle
   * 
   */
  export type Vehicle = {
    id: number
    licensePlate?: string | null
    make: string
    model: string
    year: number
    ownerId: number
    owner?: User
    image?: string | null
  }
  
  /**
   * Model Appointment
   * 
   */
  export type Appointment = {
    id: number
    problemDescription: string
    date: Date
    streetAddress: string
    town: string
    parish: string
    customerId: number
    fulfilled: boolean
    assignedMechId: number | null
    vehicleId: number
  }
  
  /**
   * Model Appointment_Image
   * 
   */
  export type Appointment_Image = {
    id: number
    imageUrl: string
    appoinmentId: number
  }
  
  /**
   * Model Job
   * 
   */
  export type Job = {
    jobNumber: number
    startDate: Date
    endDate: Date
    summary: string
    totalCost?: number | null
    isPaid?: boolean
    confirmed?: boolean
    serviceFee: number
    serviceType: string
    streetAddress?: string | null
    town?: string | null
    parish?: string | null
    vehicleId: number
    vehicle?: Vehicle
    assignedMechanicId?: number
    assignedMechanic?: User | null
    createdById?: number
    createdBy?: User
    requiredParts?:  JobPart[]
    // completed: boolean
  }
  
  /**
   * Model JobStage
   * 
   */
  export type JobStage = {
    id: number
    stageNumber: number
    description: string
    date: Date
    duration: number
    jobNumber: number
  }
  
  /**
   * Model JobStage_Image
   * 
   */
  export type JobStage_Image = {
    id: number
    imageUrl: string
    jobId: number
  }
  
  /**
   * Model JobPart
   * 
   */
  export type JobPart = {
    id?: number
    name: string
    price: number
    jobId?: number
  }
  