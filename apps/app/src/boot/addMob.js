import { boot } from 'quasar/wrappers'
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob'

export default boot(({ app }) => {
  console.log('app passed')
  // for use inside Vue files (Options API) through this.$axios and this.$api
  AdMob.initialize({
    requestTrackingAuthorization: true,
    testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
    initializeForTesting: true
  })
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export async function banner () {
  // AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
  //   // Subscribe Banner Event Listener
  // })
  //
  // AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size) => {
  //   // Subscribe Change Banner Size
  // })

  // AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
  //   console.log(error)
  // })
  const options = {
    adId: 'ca-app-pub-3940256099942544/6300978111',
    adSize: BannerAdSize.FULL_BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 60
    // isTesting: true
    // npa: true
  }
  AdMob.showBanner(options)
}

export async function interstitial () {
  const options = {
    adId: 'ca-app-pub-3940256099942544/1033173712'
    // isTesting: true
    // npa: true
  }
  await AdMob.prepareInterstitial(options)
  await AdMob.showInterstitial()
}
