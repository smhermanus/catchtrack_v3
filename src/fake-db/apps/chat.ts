// Type Imports
import type { ChatDataType } from '@/types/apps/chatTypes'

const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2)

export const db: ChatDataType = {
  profileUser: {
    id: 1,
    avatar: '/images/avatars/1.png',
    fullName: 'John Doe',
    role: 'Admin',
    permit: 'Catch IR Nearshore',
    about: 'My name is John Doe and I work for Premier',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 2,
      fullName: 'Felecia Rower',
      role: 'Admin',
      permit: 'Catch IR Offshore',
      about: 'Cake pie jelly jelly beans.',
      avatar: '/images/avatars/2.png',
      status: 'offline'
    },
    {
      id: 3,
      fullName: 'Adalberto Granzin',
      role: 'Monitor',
      permit: 'Export Frozen',
      avatarColor: 'primary',
      about: 'Toffee caramels jelly-o tart gummi bears',
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Joaquina Weisenborn',
      role: 'Outlet',
      permit: 'Export Frozen',
      about: 'Soufflé soufflé caramels sweet roll.',
      avatar: '/images/avatars/8.png',
      status: 'busy'
    },
    {
      id: 5,
      fullName: 'Margot Henschke',
      role: 'Driver',
      permit: 'Catch IR Nearshore',
      avatarColor: 'success',
      about: 'Cake pie jelly jelly beans.',
      status: 'busy'
    },
    {
      id: 6,
      avatarColor: 'warning',
      fullName: 'Bridgett Omohundro',
      role: 'Designer, television/film set',
      permit: 'Catch Offshore',
      about:
        'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
      status: 'offline'
    },
    {
      id: 7,
      fullName: 'Sal Piggee',
      role: 'Marketing executive',
      permit: 'Export Live',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatarColor: 'info',
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Miguel Guelff',
      role: 'Special educational needs teacher',
      permit: 'Catch Offshore',
      about:
        'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
      avatar: '/images/avatars/7.png',
      status: 'online'
    },
    {
      id: 9,
      fullName: 'Mauro Elenbaas',
      role: 'Advertising copywriter',
      permit: 'Catch IR Nearshore',
      about:
        'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
      avatarColor: 'success',
      status: 'away'
    },
    {
      id: 10,
      avatarColor: 'error',
      fullName: 'Zenia Jacobs',
      role: 'Outlet',
      permit: 'Export Live',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      status: 'away'
    },
    {
      id: 11,
      fullName: 'Ramonita Veras',
      role: 'Outlet',
      permit: 'Catch Nearshore',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: '/images/avatars/4.png',
      status: 'online'
    },
    {
      id: 12,
      fullName: 'Lashawna Gotschall',
      role: 'Driver',
      permit: 'Transport License',
      about:
        'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.',
      avatarColor: 'info',
      status: 'online'
    },
    {
      id: 13,
      fullName: 'Rosalva Uyetake',
      role: 'Admin',
      permit: 'Catch Nearshore',
      about:
        'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
      avatar: '/images/avatars/6.png',
      status: 'offline'
    },
    {
      id: 14,
      fullName: 'Jack Shockey',
      role: 'Skipper',
      permit: 'Vessel License',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatarColor: 'secondary',
      status: 'busy'
    },
    {
      id: 15,
      fullName: 'Harriett Duropan',
      role: 'Therapist, sports',
      permit: 'Catch IR Nearshore',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: '/images/avatars/5.png',
      status: 'online'
    },
    {
      id: 16,
      fullName: 'Lauran Starner',
      role: 'Driver',
      permit: 'Transport License',
      about:
        'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.',
      avatarColor: 'warning',
      status: 'online'
    },
    {
      id: 17,
      fullName: 'Verla Morgano',
      role: 'Data scientist',
      permit: 'Vessel License',
      about:
        'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
      avatar: '/images/avatars/3.png',
      status: 'online'
    }
  ],
  chats: [
    {
      id: 1,
      userId: 2,
      unseenMsgs: 1,
      chat: [
        {
          message: "How can we help? We're here for you!",
          time: 'Mon Dec 10 2023 07:45:00 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message:
            'Hey John, I am looking for the best outlet provider in Cape Town. Could you please help me to find one?',
          time: 'Mon Dec 10 2023 07:45:23 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'It should be affordable and close to Paarden Island',
          time: 'Mon Dec 10 2023 07:45:55 GMT+0000 (GMT)',
          senderId: 2,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2023 07:46:00 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'We have a fish retailer outlet close to Paarden island!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Their Fish is clean and fresh. 😍',
          time: 'Mon Dec 10 2023 07:46:23 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: "It's perfect for my me.",
          time: 'Mon Dec 10 2023 07:46:33 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'How can I purchase it?',
          time: 'Mon Dec 10 2023 07:46:43 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'Thanks, From our official site  😇',
          time: 'Mon Dec 10 2023 07:46:53 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'I will get it for sure. 👍',
          time: previousDay,
          senderId: 2
        }
      ]
    },
    {
      id: 2,
      userId: 3,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2023 07:45:00 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2023 07:45:15 GMT+0000 (GMT)',
          senderId: 3
        },
        {
          message: 'Can I get details of my last transaction I made last month? 🤔',
          time: 'Mon Dec 11 2023 07:46:10 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2023 07:45:15 GMT+0000 (GMT)',
          senderId: 3
        },
        {
          message: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2023 07:46:15 GMT+0000 (GMT)',
          senderId: 3
        },
        {
          message: 'If it takes long you can mail me at my mail address.',
          time: dayBeforePreviousDay,
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: false,
            isSeen: false
          }
        }
      ]
    },
    {
      id: 3,
      userId: 10,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hello, I am a building surveyor and I would like to schedule a survey for your building.',
          time: 'Mon Dec 13 2023 11:00:00 GMT+0000 (GMT)',
          senderId: 10
        },
        {
          message: 'Sure, could you please provide more details about the survey?',
          time: 'Mon Dec 13 2023 11:01:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message:
            'The survey will include a thorough inspection of the building to assess its condition and identify any potential issues.',
          time: 'Mon Dec 13 2023 11:02:00 GMT+0000 (GMT)',
          senderId: 10
        },
        {
          message: 'Okay, when do you plan to conduct the survey?',
          time: 'Mon Dec 13 2023 11:03:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'I am available to conduct the survey next week. Does that work for you?',
          time: 'Mon Dec 13 2023 11:04:00 GMT+0000 (GMT)',
          senderId: 10
        },
        {
          message: "Yes, that works for me. Let's schedule it for next Wednesday.",
          time: 'Mon Dec 13 2023 11:05:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Great. I will send you a confirmation email with the details.',
          time: 'Mon Dec 13 2023 11:06:00 GMT+0000 (GMT)',
          senderId: 10
        },
        {
          message: 'Thank you, looking forward to it.',
          time: 'Mon Dec 13 2023 11:07:00 GMT+0000 (GMT)',
          senderId: 1
        }
      ]
    },
    {
      id: 4,
      userId: 8,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hello, I would like to arrange a professional meeting.',
          time: 'Mon Dec 10 2023 07:45:00 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Sure, could you please provide more details about the meeting?',
          time: 'Mon Dec 11 2023 07:45:15 GMT+0000 (GMT)',
          senderId: 8
        },
        {
          message: 'The meeting is about our next project plan.',
          time: 'Mon Dec 11 2023 07:46:10 GMT+0000 (GMT)',
          senderId: 1,
          msgStatus: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Okay, I will prepare the necessary documents for the meeting.',
          time: 'Mon Dec 11 2023 07:45:15 GMT+0000 (GMT)',
          senderId: 8
        },
        {
          message: 'Thank you, looking forward to it.',
          time: 'Mon Dec 11 2023 07:46:15 GMT+0000 (GMT)',
          senderId: 1
        }
      ]
    },
    {
      id: 5,
      userId: 16,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hey, have you heard about the department (DAFF) new compliance regulation?',
          time: 'Mon Dec 13 2023 09:00:00 GMT+0000 (GMT)',
          senderId: 16
        },
        {
          message: "No, I haven't. What's new about it?",
          time: 'Mon Dec 13 2023 09:01:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Not sure. Just hear it came out yesterday.',
          time: 'Mon Dec 13 2023 09:02:00 GMT+0000 (GMT)',
          senderId: 16
        },
        {
          message: "ok. I'll have to check it out.",
          time: 'Mon Dec 13 2023 09:03:00 GMT+0000 (GMT)',
          senderId: 1
        }
      ]
    },
    {
      id: 6,
      userId: 11,
      unseenMsgs: 1,
      chat: [
        {
          message: "Hey, have you thought about our company's future plans?",
          time: 'Mon Dec 13 2023 10:00:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Yes, I have been thinking about it.',
          time: 'Mon Dec 13 2023 10:01:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message:
            'I agree. These technologies are the future. We should also consider investing in a system for our company.',
          time: 'Mon Dec 13 2023 10:02:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely. Cloud computing will give us the flexibility and scalability we need.',
          time: 'Mon Dec 13 2023 10:03:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'We should also think about expanding our team. We will need more talent to achieve our goals.',
          time: 'Mon Dec 13 2023 10:04:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message:
            'Yes, hiring the right people is crucial. We should start looking for candidates as soon as possible.',
          time: 'Mon Dec 13 2023 10:05:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: "Great. Let's start working on a plan then.",
          time: 'Mon Dec 13 2023 10:06:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: "Sounds good. Let's do it.",
          time: 'Mon Dec 13 2023 10:07:00 GMT+0000 (GMT)',
          senderId: 11
        }
      ]
    },
    {
      id: 7,
      userId: 17,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hello, as admin, I have been analyzing our user data and found some interesting patterns.',
          time: 'Mon Dec 13 2023 12:00:00 GMT+0000 (GMT)',
          senderId: 17
        },
        {
          message: 'That sounds interesting. Could you please share more details?',
          time: 'Mon Dec 13 2023 12:01:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Sure, our users are most active during the evening hours and they mostly use our app on weekends.',
          time: 'Mon Dec 13 2023 12:02:00 GMT+0000 (GMT)',
          senderId: 17
        },
        {
          message: "That's valuable information. We can use this to schedule our app updates and maintenance work.",
          time: 'Mon Dec 13 2023 12:03:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Exactly. We can also use this information to target our marketing campaigns.',
          time: 'Mon Dec 13 2023 12:04:00 GMT+0000 (GMT)',
          senderId: 17
        },
        {
          message: 'Great work. Keep it up.',
          time: 'Mon Dec 13 2023 12:05:00 GMT+0000 (GMT)',
          senderId: 1
        }
      ]
    },
    {
      id: 8,
      userId: 14,
      unseenMsgs: 1,
      chat: [
        {
          message:
            'Hello, as a administrator, I have been monitoring our databases and I noticed a significant increase in the load.',
          time: 'Mon Dec 13 2023 13:00:00 GMT+0000 (GMT)',
          senderId: 14
        },
        {
          message: "That's concerning. Do you have any idea what might be causing this?",
          time: 'Mon Dec 13 2023 13:01:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message:
            'I suspect it might be due to the recent increase in user registrations. I will investigate further and optimize our databases accordingly.',
          time: 'Mon Dec 13 2023 13:02:00 GMT+0000 (GMT)',
          senderId: 14
        },
        {
          message: 'That sounds like a good plan. Let me know if you need any help.',
          time: 'Mon Dec 13 2023 13:03:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Will do. I will keep you updated on the progress.',
          time: 'Mon Dec 13 2023 13:04:00 GMT+0000 (GMT)',
          senderId: 14
        },
        {
          message: 'Thank you, I appreciate your efforts.',
          time: 'Mon Dec 13 2023 13:05:00 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Your Welcome!😊',
          time: 'Mon Dec 13 2023 13:06:00 GMT+0000 (GMT)',
          senderId: 14
        }
      ]
    }
  ]
}
