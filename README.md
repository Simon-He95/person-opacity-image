## person-opacity-image
实时获取视频中人物的透明base64图片

https://user-images.githubusercontent.com/57086651/202853837-7ccb3a8a-ea90-42e5-9aef-904b0091d5a0.mov


## Install
```bash
npm install @simon_he/person-opacity-image
```

## Usage
```js
import PersonOpacityImage from '@simon_he/person-opacity-image'
onMounted(() => getPersonOpacityImage(video.value, (base64) => {
  console.log(base64)
}))
```

# License
MIT

# Powered by
- [tensorflow.js](https://github.com/tensorflow/tfjs-models)

## :coffee: 
<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

<span><div align="center">![sponsors](https://www.hejian.club/images/sponsors.jpg)</div></span>

