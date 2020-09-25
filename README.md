<p align="center">
  <h1>BRIPrint</h1><br>
  BRIPrint is an open-source moble app for BRILink agent to print out proof of transfer in Indonesia.
</p>

<p align="center">
    <a href="LICENSE"><img src="https://img.shields.io/github/license/CloudGakkai/BRIPrint.svg?style=flat" alt="LICENSE"></a>
    <a href="https://github.com/CloudGakkai/BRIPrint/stargazers"><img src="https://img.shields.io/github/stars/CloudGakkai/BRIPrint.svg?style=flat" alt="Stars"></a>
    <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat" alt="JS Standard"></a>
    <a href="https://github.com/facebook/react-native"><img src="https://img.shields.io/badge/react--native-0.63.0-blue.svg?style=flat" alt="React Native"></a>
    <a href="https://github.com/OsmiCSX/osmicsx"><img src="https://img.shields.io/badge/osmicsx-0.5.0-orange.svg?style=flat" alt="OsmiCSX"></a>
</p>

---

<p align="center">
  <img src="https://i.imgur.com/tBB9vIE.jpg" width="240px" height="507px;" />
  <img src="https://i.imgur.com/N4wFEs1.jpg" width="240px" height="507px;" />
</p>

## Prerequisites
- Xcode or Android Studio installed and exported on your ~/.bash_profile or similar
- JDK 1.8.x
- Node >= 12.*
- react-native-cli

## Installation
open terminal and change directory to your desired folder, then:
```
$ git clone git@github.com:CloudGakkai/BRIPrint.git YourAppName
$ cd YourAppName
$ npm install
```
## Run Your App
```
$ npx react-native run-android
$ npx react-native run-ios
```
## License
The code is available at [GitHub][home] under the [MIT license][license-url].

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!

## Contributors
Suggestions and contributions are welcome via Pull Requests.
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/8052370" width="100px;"/><br /><sub><b>Rully Ardiansyah</b></sub>](https://github.com/DeVoresyah)<br />[💻](https://github.com/CloudGakkai/BRIPrint/commits?author=DeVoresyah "Code") [📖](https://github.com/CloudGakkai/BRIPrint/commits?author=DeVoresyah "Documentation") [💬](#question-devoresyah "Answering Questions") [👀](#review-devoresyah "Reviewed Pull Requests") [💡](#idea-devoresyah "Idea & Concept") | [<img src="https://avatars3.githubusercontent.com/u/67543151?s=460&u=d1abfe2ce47c9b2d1c8e9721c79a424df68b9b12&v=4" width="100px;"/><br /><sub><b>Rizki Budi</b></sub>](https://github.com/rizbud)<br /> [💻](https://github.com/CloudGakkai/BRIPrint/commits?author=rizbud "Code") [💬](#question-rizbud "Answering Questions") [🎨](#uiux "UI/UX") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

[home]: https://github.com/CloudGakkai/BRIPrint
[license-url]: https://github.com/CloudGakkai/BRIPrint/blob/master/LICENSE
