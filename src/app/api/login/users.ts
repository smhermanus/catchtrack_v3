// ** Fake user data and data type

// ** Please remove below user data and data type in production and verify user with Real Database
export type UserTable = {
  id: number
  name: string
  email: string
  image: string
  password: string
}

// =============== Fake Data ============================

export const users: UserTable[] = [
  {
    id: 1,
    name: 'Nazmie Daniels',
    password: 'admin',
    email: 'nazmie@catchtrack.co.za',
    image: '/images/avatars/1.png'
  }
]
