const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')

function start() {
	setScore(getScore())
	setImage()
}

function setScore(score) {
	localStorage.setItem('score', score)
	$score.textContent = score
}

function getScore() {
	return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
	setScore(getScore() + 1)
	setImage()
}

function setImage() {
	if (getScore() >= 50) {
		$circle.setAttribute('src', './assets/lizzard.png')
	}
}

$circle.addEventListener('click', function () {
	const rect = $circle.getBoundingClientRect()

	const offsetX = event.clientX - rect.left - rect.width / 2
	const offsetY = event.clientX - rect.top - rect.height / 2

	const DEG = 10

	const titlX = (offsetY / rect.height) * DEG
	const titlY = (offsetY / rect.width) * -DEG

	$circle.style.setProperty('--titlX', `${titlX}deg`)
	$circle.style.setProperty('--titlY', `${titlY}deg`)

	setTimeout(() => {
		$circle.style.setProperty('--titlX', `0deg`)
		$circle.style.setProperty('--titlY', `0deg`)
	}, 300)

	const plusOne = document.createElement('div')
	plusOne.classList.add('plus-one')
	plusOne.textContent = '+1'
	plusOne.style.left = `${event.clientX - rect.left}px`
	plusOne.style.top = `${event.clientY - rect.top}px`

	$circle.parentElement.appendChild(plusOne)

	addOne()

	setTimeout(() => {
		plusOne.remove()
	}, 2000)
})

start()
