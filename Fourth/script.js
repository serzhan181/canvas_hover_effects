const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let particles = []

const mouse = {
  x: undefined,
  y: undefined,
  radius: (canvas.width / 80) * (canvas.height / 80),
}

class Particle {
  constructor(x, y, size, dirX, dirY) {
    this.x = x
    this.y = y
    this.size = size
    this.dirX = dirX
    this.dirY = dirY
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = '#ccc'
    ctx.fill()
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.dirX = -this.dirX
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.dirY = -this.dirY
    }

    const distance = Math.sqrt(
      (mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2
    )

    if (distance < mouse.radius + this.size) {
      ctx.strokeStyle = `rgba(145,134,143,1)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(mouse.x, mouse.y)

      ctx.stroke()
    }

    this.x += this.dirX
    this.y += this.dirY
  }
}

function init() {
  particles = []

  for (let i = 0; i < 200; i++) {
    const size = Math.random() * 5 + 3
    const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    const y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2

    const dirX = Math.random() * 5 - 2.5
    const dirY = Math.random() * 5 - 2.5

    particles.push(new Particle(x, y, size, dirX, dirY))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach((c) => {
    c.update()
    c.draw()
  })
}

init()
animate()

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

setInterval(() => {
  mouse.x = undefined
  mouse.y = undefined
}, 2000)
