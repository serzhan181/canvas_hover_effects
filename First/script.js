const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
const CIRCLE_COUNT = 75

let particleArr

// create constructor

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
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.dirX = -this.dirX
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.dirY = -this.dirY
    }

    this.x += this.dirX
    this.y -= this.dirY

    this.draw()
  }
}

function init() {
  particleArr = []
  for (let i = 0; i < CIRCLE_COUNT; i++) {
    let size = Math.random() * 20 + 5
    let x = Math.random() * (innerWidth - size * 2)
    let y = Math.random() * (innerHeight - size * 2)
    let dirX = Math.random() * 0.7 - 0.2
    let dirY = Math.random() * 0.7 - 0.2
    let color = `hsl(${Math.floor(Math.random() * 350)}, ${Math.floor(
      Math.random() * 99
    )}%, ${Math.floor(Math.random() * 99)}%)`

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

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})
