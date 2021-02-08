const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const change_theme_btn = document.getElementById('btn')
let CURRENT_THEME = 'light'

ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

const particleArr = []
let colors = ['#1BE7FF', '#E4FF1A', '#6EEB83', '#E8AA14']

const mouse = {
  x: null,
  y: null,
}

const MAX_SIZE = 40
const MIN_SIZE = 0
const RADIUS = 90

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x
    this.y = y
    this.dirX = dirX
    this.dirY = dirY
    this.size = size
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 360, false)
    // ctx.fillRect(this.x, this.y, this.size, this.size) // rectangle
    ctx.fillStyle = CURRENT_THEME === 'dark' ? '#000' : this.color
    ctx.fill()

    if (CURRENT_THEME === 'dark') {
      ctx.strokeStyle = '#fff'
      ctx.stroke()
    }
  }

  update() {
    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
      this.dirX = -this.dirX
    }

    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
      this.dirY = -this.dirY
    }
    this.x += this.dirX
    this.y += this.dirY

    if (
      mouse.x - this.x < RADIUS &&
      mouse.x - this.x > -RADIUS &&
      mouse.y - this.y < RADIUS &&
      mouse.y - this.y > -RADIUS
    ) {
      if (this.size < MAX_SIZE) {
        this.size += 3
      }
    } else if (this.size > MIN_SIZE) {
      this.size -= 0.5
    }
    if (this.size < 0) {
      this.size = 0
    }
    this.draw()
  }
}

function init() {
  for (let i = 0; i < 500; i++) {
    const size = 0
    const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    const y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
    const dirX = Math.random() * 0.2 - 0.1
    const dirY = Math.random() * 0.2 - 0.1
    const color = colors[Math.floor(Math.random() * colors.length)]
    particleArr.push(new Particle(x, y, dirX, dirY, size, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  particleArr.forEach((c) => c.update())
}

init()
animate()
determineTheme()

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

setInterval(() => {
  ;(mouse.x = undefined), (mouse.y = undefined)
}, 1000)

change_theme_btn.addEventListener('click', () => {
  if (CURRENT_THEME === 'dark') CURRENT_THEME = 'light'
  else CURRENT_THEME = 'dark'

  determineTheme()
})

function determineTheme() {
  if (CURRENT_THEME === 'dark') {
    canvas.style.background = '#000'
    change_theme_btn.style.border = '2px solid #fff'
    change_theme_btn.style.backgroundColor = '#000'
    change_theme_btn.style.color = '#fff'
  } else {
    canvas.style.background = 'linear-gradient(#a8f55b, #78e16f, #1a331e)'
    change_theme_btn.style.border = '2px solid #000'
    change_theme_btn.style.backgroundColor = '#fff'
    change_theme_btn.style.color = '#000'
  }
}
