// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: UserDataType[] = [
  {
    title: 'New Applications',
    stats: '9',
    avatarIcon: 'ri-group-line',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '6%',
    subtitle: 'Within Last week'
  },
  {
    title: 'Pending Applications',
    stats: '5',
    avatarIcon: 'ri-user-add-line',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '5%',
    subtitle: 'Within Last week'
  },
  {
    title: 'Approved Applications',
    stats: '19',
    avatarIcon: 'ri-user-follow-line',
    avatarColor: 'success',
    trend: 'negative',
    trendNumber: '10%',
    subtitle: 'Within Last week'
  },
  {
    title: 'Denied Application',
    stats: '4',
    avatarIcon: 'ri-user-search-line',
    avatarColor: 'warning',
    trend: 'positive',
    trendNumber: '12%',
    subtitle: 'Within Last week'
  }
]

const UserListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
