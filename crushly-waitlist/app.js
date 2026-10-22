const modal = document.querySelector('#waitlist-modal')
const tallyFrame = modal.querySelector('iframe')

function loadTally() {
  if (!tallyFrame.src) tallyFrame.src = tallyFrame.dataset.tallySrc
}

function openWaitlist() {
  loadTally()
  if (typeof modal.showModal === 'function') modal.showModal()
  else window.open('https://tally.so/r/vGQ5GQ', '_blank', 'noopener,noreferrer')
  localStorage.setItem('crushly_waitlist_opened', new Date().toISOString())
}

document.querySelectorAll('[data-open-waitlist]').forEach(button => {
  button.addEventListener('click', openWaitlist)
})

modal.querySelector('.close-modal').addEventListener('click', () => modal.close())
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect()
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
  if (!inside) modal.close()
})

window.addEventListener('message', event => {
  if (typeof event.data !== 'string' || !event.data.includes('Tally.FormSubmitted')) return
  localStorage.setItem('crushly_waitlist_joined', new Date().toISOString())
})
