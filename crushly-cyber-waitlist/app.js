const particleField = document.querySelector('.particles')
const particleCount = matchMedia('(max-width: 800px)').matches ? 14 : 24

for (let i = 0; i < particleCount; i += 1) {
  const particle = document.createElement('span')
  particle.className = 'particle'
  particle.textContent = Math.random() > .25 ? '♥' : '+'
  particle.style.left = `${Math.random() * 100}%`
  particle.style.fontSize = `${8 + Math.random() * 15}px`
  particle.style.setProperty('--duration', `${8 + Math.random() * 10}s`)
  particle.style.setProperty('--delay', `${-Math.random() * 14}s`)
  particleField.append(particle)
}

const statuses = ['SCANNING NEARBY', '10M ORBIT ACTIVE', 'SIGNAL DETECTED', 'IDENTITY HIDDEN']
const status = document.querySelector('#signal-status')
let statusIndex = 0
setInterval(() => {
  statusIndex = (statusIndex + 1) % statuses.length
  status.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400 })
  status.textContent = statuses[statusIndex]
}, 2400)

const modal = document.querySelector('#waitlist-modal')
const frame = modal.querySelector('iframe')
function openWaitlist() {
  if (!frame.src) frame.src = frame.dataset.tallySrc
  if (typeof modal.showModal === 'function') modal.showModal()
  else window.open('https://tally.so/r/vGQ5GQ', '_blank', 'noopener,noreferrer')
}
document.querySelectorAll('[data-open-waitlist]').forEach(button => button.addEventListener('click', openWaitlist))
modal.querySelector('button').addEventListener('click', () => modal.close())
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close()
})

const stage = document.querySelector('.signal-stage')
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', event => {
    const x = (event.clientX / innerWidth - .5) * 10
    const y = (event.clientY / innerHeight - .5) * 10
    stage.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }, { passive: true })
}
