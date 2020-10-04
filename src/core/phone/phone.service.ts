// https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types

import { getUrl } from '../../utils'

export function getPhone(id: string) {
  return fetchJson<PhoneDetail>(getUrl(`phones/${id}.json`))
}

export function getPhoneList() {
  return fetchJson<Phone[]>(getUrl('phones/phones.json'))
}

async function fetchJson<T>(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json() as Promise<T>
}

export interface Phone {
  age: number
  id: string
  imageUrl: string
  name: string
  snippet: string
}

export interface PhoneDetail {
  additionalFeatures: string
  android: Android
  availability?: string[] | null
  battery: Battery
  camera: Camera
  connectivity: Connectivity
  description: string
  display: Display
  hardware: Hardware
  id: string
  images: string[]
  name: string
  sizeAndWeight: SizeAndWeight
  storage: Storage
}
export interface Android {
  os: string
  ui: string
}
export interface Battery {
  standbyTime: string
  talkTime: string
  type: string
}
export interface Camera {
  features: string[]
  primary: string
}
export interface Connectivity {
  bluetooth: string
  cell: string
  gps: boolean
  infrared: boolean
  wifi: string
}
export interface Display {
  screenResolution: string
  screenSize: string
  touchScreen: boolean
}
export interface Hardware {
  accelerometer: boolean
  audioJack: string
  cpu: string
  fmRadio: boolean
  physicalKeyboard: boolean
  usb: string
}
export interface SizeAndWeight {
  dimensions?: string[] | null
  weight: string
}
export interface Storage {
  flash: string
  ram: string
}
