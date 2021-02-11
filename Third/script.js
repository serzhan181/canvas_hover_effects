const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let particles = []

const mouse = {
  x: undefined,
  y: undefined,
  radius: (canvas.width / 90) * (canvas.height / 90),
}

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x
    this.y = y
    this.dirX = dirX
    this.dirY = dirY
    this.size = size
    this.color = color
    this.baseColor = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
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

    const distance = Math.sqrt(
      (mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2
    )

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10
      }

      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10
      }
    }

    this.x += this.dirX
    this.y += this.dirY

    this.draw()
  }
}

function init() {
  particles = []
  for (let i = 0; i < 120; i++) {
    const size = Math.random() * 5 + 1
    const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
    const y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
    const dirX = Math.random() * 5 - 2.5
    const dirY = Math.random() * 5 - 2.5
    particles.push(new Particle(x, y, dirX, dirY, size, '#ccc'))
  }
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const distance = Math.sqrt(
        (particles[a].x - particles[b].x) ** 2 +
          (particles[a].y - particles[b].y) ** 2
      )

      if (distance < mouse.radius) {
        ctx.strokeStyle = `rgba(145,134,143,${1 - distance / 20000})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particles[a].x, particles[a].y)
        ctx.lineTo(particles[b].x, particles[b].y)
        // ctx.lineTo(mouse.x, mouse.y) // Sun

        ctx.stroke()
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach((c) => c.update())

  connect()
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
  mouse.radius = (canvas.width / 90) * (canvas.height / 90)
  init()
})

window.addEventListener('mouseout', () => {
  mouse.x = undefined
  mouse.y = undefined
})
