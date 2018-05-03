# WebRTC PoC

## Usage
- Clone the repository, run `npm install`.
- For iOS, run the project on Xcode.
- For Android, run `react-native run-android` in the directory.
- Set `apiUrl` and `callUrl` in `/config/config.json`
- For testing calls test server `https://react-native-webrtc.herokuapp.com/` could be used. Simply pass it as callUrl value

## NOTE
- Don't run it on iOS simulator, or change to `navigator.getUserMedia({"audio": true, "video": false})` to test audio only.
