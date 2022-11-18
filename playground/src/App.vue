<script setup lang="ts">
import { getPersonOpacityImage } from '../../src'
const video = ref()
const danmu = ref()
const words = [
  'cxk',
  '我爱篮球',
  '🐼 bro',
  '🥬 bro',
  '水水水水水水水',
  '水水水水水水水水',
  '水水水水水水水水水水水',
]

const setDanmu = (base64: string) => {
  const span = document.createElement('span')
  span.setAttribute('class', 'danmu')
  span.style.top = `${Math.random() * 250}%`
  danmu.value.style['-webkit-mask-image'] = `url(${base64})`
  danmu.value.style['mask-image'] = `url(${base64})`
  span.innerText = words[Math.floor(Math.random() * words.length)]
  setTimeout(() => danmu.value?.removeChild(span), 2900)
  danmu.value?.appendChild(span)
}
onMounted(() => getPersonOpacityImage(video.value, setDanmu))
</script>

<template>
  <div text-center>
    <div relative inline-flex overflow-hidden>
      <video ref="video" muted crossOrigin="anonymous" autoplay width="400" height="400" src="http://vcdnb.huoying666.com/new_video/2020/0227/72df8765bf4f717432dd87ae628883d5/v720/72df8765b1_5078640_hd.mp4" />
      <div ref="danmu" class="danmu-wrapper" absolute w-full h-full top-0 left-0 />
    </div>
  </div>
</template>

<style>
.danmu{
  position: absolute;
  right: 0;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 5px #000;
  animation: danmu 3s linear;
}
.danmu-wrapper{
  -webkit-mask-position:center;
  -webkit-mask-repeat:no-repeat;
  z-index:11;
}
@keyframes danmu {
  0% {
    transform: translateX(100%);
  }
  99% {
    transform: translateX(calc(-100% + -400px));
  }
  100% {
    display: none;
  }
}
</style>
