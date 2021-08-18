
export async function sleep (sec=1) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000)
  })
}

export function createTimeout (sec) {
  const timeout = { triggered: false }
  sleep(sec)
  .then(() => {
    timeout.triggered = true
  })
  return timeout
}

export function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
