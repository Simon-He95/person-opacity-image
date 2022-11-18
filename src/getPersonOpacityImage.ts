import * as bodyPix from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs-backend-webgl'
// 加载模型数据
let net: any
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let video: HTMLVideoElement
function loadBodyPix() {
  return new Promise(resolve => net
    ? resolve(net)
    : bodyPix.load().then(resolve))
}

// 绘制帧数据到canvas
async function drawCanvas(callback: (base64: string) => void) {
  if (!net)
    return
  const segmentation = await net.segmentPerson(video)
  const coloredPartImage = bodyPix.toMask(
    segmentation,
    { r: 0, g: 0, b: 0, a: 255 },
    { r: 0, g: 0, b: 0, a: 0 },
  )
  const imageData = ctx.getImageData(0, 0, 800, 600)
  const size = imageData.width * imageData.height * 4
  for (let i = 0; i < size; i++)
    coloredPartImage.data[i] = coloredPartImage.data[i] === 255 ? 0 : 255
  ctx.putImageData(coloredPartImage, 0, 0, 0, 0, 800, 600)
  callback(canvas.toDataURL('image/png', 0.1))
}

export async function getPersonOpacityImage(_video: HTMLVideoElement, callback: (base64: string) => void, _canvas: HTMLCanvasElement = document.createElement('canvas')) {
  canvas = _canvas
  video = _video
  const mediaStreamConstraints = {
    video: true,
  }
  net = await loadBodyPix()
  if (video.src) {
    video.onloadedmetadata = video.play
    video.addEventListener(
      'play',
      () => {
        initCanvas()
        setInterval(() => drawCanvas(callback), 0)
      }
      , false,
    )
  }
  else {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((stream) => {
        if ('srcObject' in video) {
          video.srcObject = stream
        }
        else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream as any)
        }
        video.onloadedmetadata = video.play
        video.addEventListener('canplay', initCanvas)
        video.addEventListener(
          'play',
          () =>
            setInterval(() => drawCanvas(callback), 0)
          , false,
        )
      })
      .catch((error) => {
        throw error
      })
  }
}

function initCanvas() {
  const { clientWidth, clientHeight } = video
  canvas.width = clientWidth
  canvas.height = clientHeight
  ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, clientWidth, clientHeight)
}
