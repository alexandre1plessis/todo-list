import admin from 'firebase-admin'
import credentials from 'src/assets/todo-list-ec37d-firebase-adminsdk-ge8p5-80e8a7d9bf.json'
import { PushNotifications } from '@capacitor/push-notifications'
import { Platform } from 'quasar'

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(credentials))
})

export function ping (token) {
  return app.messaging().send({
    notification: {
      title: 'test',
      body: 'body'
    },
    token
  })
    .then(res => console.log('RES', res))
    .catch(e => console.log('ERR', e))
}

export const FirebaseMessaging = app.messaging()

export async function registerNotifications () {
  try {
    let permStatus = await PushNotifications.checkPermissions()
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions()
    }

    if (permStatus.receive === 'granted') {
      await PushNotifications.register()
    }
  } catch ({ message }) {
    console.warn(message)
  }
}

export function addListeners () {
  return Promise.all([
    PushNotifications.addListener('registration', (token) => {
      try {
        PushNotifications.checkPermissions().then(permStatus => {
          // Feel free to implement it as you wish in my case i've stored the result inside vuex and the local storage + in user database
          console.log(permStatus)
        })
      } catch (e) {
        console.warn(e)
      }
    }),

    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error)
    }),

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification)
    }),

    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue)
    })
  ])
}

export default async () => {
  if (!Platform.is.capacitor) return
  // Run at application boot if userIsLogged
  await addListeners()
  await registerNotifications()
}
