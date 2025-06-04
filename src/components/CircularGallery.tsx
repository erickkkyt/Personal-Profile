import { useRef, useEffect } from 'react'
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl'

import './CircularGallery.css';

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance)
    }
  })
}

function createTextTexture(gl: any, text: string, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")!
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

function createProjectCardTexture(gl: any, projectData: any, textColor = "#ffffff") {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")!

  // 设置画布尺寸
  canvas.width = 800
  canvas.height = 900

  // 创建渐变背景
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, 'rgba(45, 55, 72, 0.95)')
  gradient.addColorStop(0.5, 'rgba(74, 85, 104, 0.9)')
  gradient.addColorStop(1, 'rgba(26, 32, 44, 0.95)')

  // 绘制背景
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  // 添加边框
  context.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  context.lineWidth = 2
  context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

  // 绘制标题
  context.fillStyle = textColor
  context.font = 'bold 42px "DM Sans", sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'top'

  const titleY = 60
  context.fillText(projectData.title, canvas.width / 2, titleY)

  // 绘制描述（改进的多行文本处理）
  context.font = '22px "DM Sans", sans-serif'
  const maxWidth = canvas.width - 120  // 增加更多边距
  const lineHeight = 32
  const maxLines = 10  // 增加最大行数
  let y = titleY + 70

  // 改进的文字换行逻辑 - 逐字符处理，适合中文
  const text = projectData.description
  let line = ''
  let lineCount = 0

  for (let i = 0; i < text.length && lineCount < maxLines; i++) {
    const char = text[i]
    const testLine = line + char
    const metrics = context.measureText(testLine)

    if (metrics.width > maxWidth && line.length > 0) {
      // 当前行已满，绘制当前行
      context.fillText(line, canvas.width / 2, y)
      line = char
      y += lineHeight
      lineCount++
    } else {
      line = testLine
    }
  }

  // 绘制最后一行
  if (line && lineCount < maxLines) {
    context.fillText(line, canvas.width / 2, y)
  }

  // 绘制按钮
  const buttonY = canvas.height - 100
  const buttonWidth = 140
  const buttonHeight = 45
  const buttonSpacing = 30

  // 检查链接是否有效
  const hasDemoUrl = projectData.demoUrl && projectData.demoUrl.trim()
  const hasSourceUrl = projectData.sourceUrl && projectData.sourceUrl.trim()

  // 直达项目按钮
  const button1X = canvas.width / 2 - buttonWidth - buttonSpacing / 2
  if (hasDemoUrl) {
    context.fillStyle = 'rgba(59, 130, 246, 0.9)'
    context.strokeStyle = 'rgba(59, 130, 246, 1)'
  } else {
    context.fillStyle = 'rgba(107, 114, 128, 0.5)'
    context.strokeStyle = 'rgba(107, 114, 128, 0.7)'
  }
  context.fillRect(button1X, buttonY, buttonWidth, buttonHeight)
  context.lineWidth = 2
  context.strokeRect(button1X, buttonY, buttonWidth, buttonHeight)

  context.fillStyle = hasDemoUrl ? textColor : 'rgba(255, 255, 255, 0.5)'
  context.font = 'bold 20px "DM Sans", sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('直达项目', button1X + buttonWidth / 2, buttonY + buttonHeight / 2)

  // Github源码按钮
  const button2X = canvas.width / 2 + buttonSpacing / 2
  if (hasSourceUrl) {
    context.fillStyle = 'rgba(107, 114, 128, 0.9)'
    context.strokeStyle = 'rgba(107, 114, 128, 1)'
  } else {
    context.fillStyle = 'rgba(107, 114, 128, 0.5)'
    context.strokeStyle = 'rgba(107, 114, 128, 0.7)'
  }
  context.fillRect(button2X, buttonY, buttonWidth, buttonHeight)
  context.lineWidth = 2
  context.strokeRect(button2X, buttonY, buttonWidth, buttonHeight)

  context.fillStyle = hasSourceUrl ? textColor : 'rgba(255, 255, 255, 0.5)'
  context.fillText('Github源码', button2X + buttonWidth / 2, buttonY + buttonHeight / 2)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class Title {
  gl: any
  plane: any
  renderer: any
  text: string
  textColor: string
  font: string
  mesh: any

  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }: any) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    )
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

interface MediaProps {
  geometry: any
  gl: any
  image?: string
  index: number
  length: number
  renderer: any
  scene: any
  screen: any
  text: string
  viewport: any
  bend: number
  textColor: string
  borderRadius: number
  font: string
  // 新增项目相关属性
  projectData?: {
    title: string
    description: string
    demoUrl: string
    sourceUrl: string
  }
  isTextMode: boolean
}

class Media {
  extra: number = 0
  geometry: any
  gl: any
  image?: string
  index: number
  length: number
  renderer: any
  scene: any
  screen: any
  text: string
  viewport: any
  bend: number
  textColor: string
  borderRadius: number
  font: string
  program: any
  plane: any
  title: any
  scale: number = 0
  padding: number = 0
  width: number = 0
  widthTotal: number = 0
  x: number = 0
  speed: number = 0
  isBefore: boolean = false
  isAfter: boolean = false
  // 新增属性
  projectData?: {
    title: string
    description: string
    demoUrl: string
    sourceUrl: string
  }
  isTextMode: boolean = false
  textCanvas?: HTMLCanvasElement
  buttonsCanvas?: HTMLCanvasElement

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius,
    font,
    projectData,
    isTextMode
  }: MediaProps) {
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.projectData = projectData
    this.isTextMode = isTextMode
    this.createShader()
    this.createMesh()
    if (!this.isTextMode) {
      this.createTitle()
    }
    this.onResize()
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        // Rounded box SDF for UV space
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);

          // Apply rounded corners (assumes vUv in [0,1])
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }

          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    })

    if (this.isTextMode && this.projectData) {
      // 文字模式：创建项目卡片纹理
      const { texture: cardTexture, width, height } = createProjectCardTexture(
        this.gl,
        this.projectData,
        this.textColor
      )
      this.program.uniforms.tMap.value = cardTexture
      this.program.uniforms.uImageSizes.value = [width, height]
    } else if (this.image) {
      // 图片模式：加载图片
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = this.image
      img.onload = () => {
        texture.image = img
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
      }
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.plane.setParent(this.scene)
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    })
  }

  // 检查点击是否在按钮区域内
  checkButtonClick(x: number, y: number, canvasWidth: number, canvasHeight: number) {
    if (!this.isTextMode || !this.projectData) return null

    // 将屏幕坐标转换为画布坐标
    const canvasX = (x / canvasWidth) * 800
    const canvasY = (y / canvasHeight) * 900

    // 更新按钮参数以匹配新的布局
    const buttonY = 900 - 100
    const buttonWidth = 140
    const buttonHeight = 45
    const buttonSpacing = 30

    console.log('点击检测:', {
      x, y, canvasX, canvasY,
      canvasWidth, canvasHeight,
      buttonY, buttonWidth, buttonHeight
    })

    // 直达项目按钮
    const button1X = 800 / 2 - buttonWidth - buttonSpacing / 2
    if (canvasX >= button1X && canvasX <= button1X + buttonWidth &&
        canvasY >= buttonY && canvasY <= buttonY + buttonHeight) {
      console.log('点击了直达项目按钮')
      return 'demo'
    }

    // Github源码按钮
    const button2X = 800 / 2 + buttonSpacing / 2
    if (canvasX >= button2X && canvasX <= button2X + buttonWidth &&
        canvasY >= buttonY && canvasY <= buttonY + buttonHeight) {
      console.log('点击了Github源码按钮')
      return 'source'
    }

    console.log('未点击任何按钮')
    return null
  }

  // 处理按钮点击
  handleButtonClick(buttonType: string) {
    if (!this.projectData) return

    console.log('按钮点击:', buttonType, this.projectData)

    if (buttonType === 'demo' && this.projectData.demoUrl && this.projectData.demoUrl.trim()) {
      console.log('打开演示链接:', this.projectData.demoUrl)
      window.open(this.projectData.demoUrl, '_blank')
    } else if (buttonType === 'source' && this.projectData.sourceUrl && this.projectData.sourceUrl.trim()) {
      console.log('打开源码链接:', this.projectData.sourceUrl)
      window.open(this.projectData.sourceUrl, '_blank')
    } else {
      console.log('链接为空或无效:', buttonType, {
        demoUrl: this.projectData.demoUrl,
        sourceUrl: this.projectData.sourceUrl
      })
    }
  }

  update(scroll: any, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

interface AppProps {
  items?: Array<{
    image?: string;
    text: string;
    projectData?: {
      title: string
      description: string
      demoUrl: string
      sourceUrl: string
    }
  }>
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  isTextMode?: boolean
}

class App {
  container: HTMLElement
  scroll: { ease: number; current: number; target: number; last: number; position?: number }
  onCheckDebounce: any
  renderer: any
  gl: any
  camera: any
  scene: any
  screen: any
  viewport: any
  planeGeometry: any
  mediasImages!: Array<{
    image?: string;
    text: string;
    projectData?: {
      title: string
      description: string
      demoUrl: string
      sourceUrl: string
    }
  }>
  medias!: Media[]
  isDown: boolean = false
  start: number = 0
  raf: number = 0
  boundOnResize: any
  boundOnWheel: any
  boundOnTouchDown: any
  boundOnTouchMove: any
  boundOnTouchUp: any
  boundOnClick: any
  isTextMode: boolean = false

  constructor(container: HTMLElement, { items, bend, textColor = "#ffffff", borderRadius = 0, font = "bold 30px DM Sans", isTextMode = false }: AppProps = {}) {
    document.documentElement.classList.remove('no-js')
    this.container = container
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)
    this.isTextMode = isTextMode
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    })
  }

  createMedias(items?: Array<{ image?: string; text: string; projectData?: any }>, bend = 1, textColor: string = "#ffffff", borderRadius: number = 0, font: string = "bold 30px DM Sans") {
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: "Palm Trees" }
    ]
    const galleryItems = items && items.length ? items : defaultItems
    // 在文字模式下，不重复项目，只显示传入的项目
    this.mediasImages = this.isTextMode ? galleryItems : galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
        projectData: data.projectData,
        isTextMode: this.isTextMode
      })
    })
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * 0.05
    this.scroll.target = this.scroll.position! + distance
  }

  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }

  onClick(e: MouseEvent) {
    if (!this.isTextMode) return

    const rect = this.gl.canvas.getBoundingClientRect()

    // 获取画布的实际显示尺寸和内部分辨率
    const scaleX = this.gl.canvas.width / rect.width
    const scaleY = this.gl.canvas.height / rect.height

    // 计算相对于画布的坐标，考虑缩放
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    // 检查每个媒体项目的点击
    this.medias.forEach(media => {
      if (media.isTextMode && media.projectData) {
        // 检查是否点击在当前可见的卡片上
        const planeX = media.plane.position.x
        const viewportWidth = this.viewport.width

        // 改进的可见性检查 - 检查当前显示的卡片
        const normalizedX = (planeX + viewportWidth / 2) / viewportWidth
        if (normalizedX > -0.1 && normalizedX < 1.1) {  // 在可见范围内
          const buttonType = media.checkButtonClick(x, y, this.gl.canvas.width, this.gl.canvas.height)
          if (buttonType) {
            media.handleButtonClick(buttonType)
            return  // 找到点击的按钮后立即返回
          }
        }
      }
    })
  }

  onWheel() {
    this.scroll.target += 2
    this.onCheckDebounce()
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      )
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    )
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    this.boundOnClick = this.onClick.bind(this)
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('mousewheel', this.boundOnWheel)
    window.addEventListener('wheel', this.boundOnWheel)
    window.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown)
    window.addEventListener('touchmove', this.boundOnTouchMove)
    window.addEventListener('touchend', this.boundOnTouchUp)
    if (this.isTextMode) {
      this.gl.canvas.addEventListener('click', this.boundOnClick)
    }
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    window.removeEventListener('mousewheel', this.boundOnWheel)
    window.removeEventListener('wheel', this.boundOnWheel)
    window.removeEventListener('mousedown', this.boundOnTouchDown)
    window.removeEventListener('mousemove', this.boundOnTouchMove)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    window.removeEventListener('touchstart', this.boundOnTouchDown)
    window.removeEventListener('touchmove', this.boundOnTouchMove)
    window.removeEventListener('touchend', this.boundOnTouchUp)
    if (this.isTextMode && this.boundOnClick) {
      this.gl.canvas.removeEventListener('click', this.boundOnClick)
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

interface CircularGalleryProps {
  items?: Array<{
    image?: string;
    text: string;
    projectData?: {
      title: string
      description: string
      demoUrl: string
      sourceUrl: string
    }
  }>
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  isTextMode?: boolean
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans",
  isTextMode = false
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, isTextMode })
    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font, isTextMode])
  return (
    <div className='circular-gallery' ref={containerRef} />
  )
}
