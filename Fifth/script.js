const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

let hue = 0

// GLOBAl VARIABLES THAT YOU CAN PLAY WITH AND SEE WHAT HAPPENS

const LINE_WIDTH = 0.5
const NUMBER_OF_PARTICLES = 1
const SIZE_PARTICLES = 5 // not always 5, gets random value from 5 to 5 * 3
const COLOR_CHANGING_SPEED = 1
const WITH_EFFECT = false

// END OF GLOBAL VARIABLES

const mouse = {
  x: undefined,
  y: undefined,
}

let particles = []

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * SIZE_PARTICLES * 3 + SIZE_PARTICLES
    this.speedX = Math.random() * 5 - 2.5
    this.speedY = Math.random() * 5 - 2.5
    this.color = `hsl(${hue}, 100%, 50%)`
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= 0.1
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()

    for (let k = i; k < particles.length; k++) {
      const distance = Math.sqrt(
        (particles[i].x - particles[k].x) ** 2 +
          (particles[i].y - particles[k].y) ** 2
      )

      if (distance < 60) {
        ctx.beginPath()
        ctx.strokeStyle = particles[i].color
        ctx.lineWidth = LINE_WIDTH
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[k].x, particles[k].y)
        ctx.stroke()
      }
    }

    if (particles[i].size <= 0.3) {
      particles.splice(i, 1)
      i--
    }
  }
}

function animate() {
  if (WITH_EFFECT) {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  handleParticles()
  hue += COLOR_CHANGING_SPEED
  requestAnimationFrame(animate)
}

window.addEventListener('click', (e) => {
  mouse.x = e.x
  mouse.y = e.y

  for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
    particles.push(new Particle())
  }
})

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y

  for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
    particles.push(new Particle())
  }
})

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

animate()
