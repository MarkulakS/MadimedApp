import { Address } from "./address"

export interface Member {
    id: number
    pesel: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    age: number
    email: string
    phone: string
    address: Address[]
  }