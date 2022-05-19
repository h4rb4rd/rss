let language = localStorage.getItem('language') || 'en'

// bg slider =====================================================================/
const body = document.body
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

// set day time
let timesOfDay = ''
let timesOfDayText = ''

updateDayTime()

// initial slides
const slides = []

function initSlides() {
	for (let i = 0; i < 20; i++) {
		if (i < 9) {
			slides.push(
				`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/0${
					i + 1
				}.jpg`
			)
		} else {
			slides.push(
				`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/${
					i + 1
				}.jpg`
			)
		}
	}
}

if (timesOfDay) {
	initSlides()
}

// set active slide
let activeSlide = +localStorage.getItem('activeSlide') || 0

// set random slide on load
function randomValue(arr, lastIdx, type) {
	const idx = Math.floor(Math.random() * arr.length)

	if (idx == lastIdx) {
		return randomValue(arr)
	}

	if (type === 'slide') {
		localStorage.setItem('activeSlide', idx)
	}

	if (type === 'quote') {
		localStorage.setItem('currentQuote', idx)
	}
}

randomValue(slides, activeSlide, 'slide')

// slider controls
function prevSlide() {
	activeSlide--

	if (activeSlide < 0) {
		activeSlide = slides.length - 1
	}

	setBgToBody()
}

function nexSlide() {
	activeSlide++

	if (activeSlide > slides.length - 1) {
		activeSlide = 0
	}

	setBgToBody()
}

// set body bg
function setBgToBody() {
	const img = new Image()
	img.src = slides[activeSlide]

	img.addEventListener('load', () => {
		body.style.backgroundImage = `url(${slides[activeSlide]})`
	})
}

setBgToBody()

leftBtn.addEventListener('click', prevSlide)
rightBtn.addEventListener('click', nexSlide)

// greeting ======================================================================/
const timeField = document.querySelector('.time')
const dateField = document.querySelector('.date')
const nameField = document.querySelector('.name')
const dayTimeField = document.querySelector('.daytime')

// get name from storage
nameField.value = localStorage.getItem('currentName') || ''

// days and month objs
const daysEn = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

const daysRu = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
]

const monthsEn = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

const monthsRu = [
	'Января',
	'Февраля',
	'Марта',
	'Апреля',
	'Мая',
	'Июня',
	'Июля',
	'Августа',
	'Сентября',
	'Октября',
	'Ноября',
	'Декабря',
]

// add zero to single integer
function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`
	} else {
		return num
	}
}

// set date
function setDate() {
	let value = localStorage.getItem('language') || language
	const date = new Date()
	const seconds = date.getSeconds()
	const minutes = date.getMinutes()
	const hours = date.getHours()
	const day = date.getDay()
	const month = date.getMonth()
	const dayOfMonth = date.getDate()

	let timeValue = `${getZero(hours)} : ${getZero(minutes)} : ${getZero(
		seconds
	)}`
	let dateValueEn = `${daysEn[day]}, ${monthsEn[month]} ${dayOfMonth}`
	let dateValueRu = `${daysRu[day]}, ${dayOfMonth} ${monthsRu[month]}`
	let dayTimeValue = `${timesOfDayText}`

	timeField.innerText = timeValue
	dateField.innerText = value === 'en' ? dateValueEn : dateValueRu
	dayTimeField.innerText = dayTimeValue

	updateDayTime()
}
setInterval(setDate, 1000)
setDate()

// update tymes of day
function updateDayTime() {
	let value = localStorage.getItem('language') || language
	const date = new Date()
	const hours = date.getHours()

	if (hours >= 6 && hours < 12) {
		timesOfDay = 'morning'
		timesOfDayText = value === 'en' ? 'Good morning' : 'Доброе утро'
	} else if (hours >= 12 && hours < 18) {
		timesOfDay = 'afternoon'
		timesOfDayText = value === 'en' ? 'Good afternoon' : 'Добрый день'
	} else if (hours >= 18 && hours < 24) {
		timesOfDay = 'evening'
		timesOfDayText = value === 'en' ? 'Good evening' : 'Добрый вечер'
	} else if (hours >= 0 && hours < 6) {
		timesOfDay = 'night'
		timesOfDayText = value === 'en' ? 'Good night' : 'Доброй ночи'
	}
}

// set name
function setName() {
	let nameValue = this.value
	localStorage.setItem('currentName', nameValue)
}

function setNamePlaceholder() {
	let value = localStorage.getItem('language') || language
	nameField.placeholder = value === 'en' ? '[Enter name]' : '[Введите имя]'
}

nameField.addEventListener('change', setName)

// quotes ========================================================================/
const quoteField = document.querySelector('.quote')
const authorField = document.querySelector('.author')
const changeQuoteBtn = document.querySelector('.change-quote')

// set quotes and quotes arr length
let currentQuote = +localStorage.getItem('currentQuote') || 0
let quotesArrLength = 0

// get quotes from api
getQuotes = async () => {
	let value = localStorage.getItem('language') || language

	let url = `assets/qutoes-${value}.json`
	const res = await fetch(`${url}`)

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
	}
	return await res.json()
}

// set quote from api
setQuote = async () => {
	const res = await getQuotes()
	quotesArrLength = res.length

	randomValue(res, currentQuote, 'quote')

	quoteField.innerText = res[currentQuote].text
	authorField.innerText = res[currentQuote].author
}

setQuote()

// set quote on click
changeQuoteBtn.addEventListener('click', () => {
	let randomNum = Math.floor(Math.random() * quotesArrLength)
	let idx = randomNum

	if (idx == currentQuote) {
		return (idx = randomNum)
	}

	localStorage.setItem('currentQuote', idx)
	currentQuote = idx
	setQuote()
})

// player ========================================================================/
const play = document.querySelector('.play')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')
const playList = document.querySelector('.play-list')
const volumeSlider = document.querySelector('.volume')
const range = document.querySelector('.volume')
const mute = document.querySelector('.mute')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.filled')
const duration = document.querySelector('.duration')
const songName = document.querySelector('.song')
const arrow = document.querySelector('.list-arrow')
const playListBtn = document.querySelector('.list span')
const playlistTxt = document.querySelector('.playlist-lang')

range.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) ${
	range.value * 100
}%, rgba(255, 255, 255, 0.3) ${
	range.value * 100
}%, rgba(255, 255, 255, 0.3) 100%)`

const songs = [
	'Aqua Caelestis',
	'Ennio Morricone',
	'River Flows In You',
	'Summer Wind',
]

let rangeValue = range.value
let mousedown = false
let currentSongId = 0
let audioUrl = `assets/sounds/${songs[currentSongId]}.mp3`

// init song list
function initSongs(arr) {
	arr.map(song => {
		playList.innerHTML += `<li class="play-item">${song}</li>`
	})
}
initSongs(songs)

// init audio
let audio = new Audio(audioUrl)

songName.innerText = songs[currentSongId]
duration.innerText = '00:00'
playList.children[0].classList.add('item-active')

// toggle play
function togglePlay() {
	play.classList.toggle('pause')
	audio.paused ? audio.play() : audio.pause()
	playList.children[currentSongId].classList.add('item-active')
	songName.innerText = songs[currentSongId]
}

// prev next song
function nextSong() {
	currentSongId++
	if (currentSongId == songs.length) {
		currentSongId = 0
	}
	play.classList.add('pause')
	changeSong('next')
}

function prevSong() {
	if (currentSongId == 0) {
		currentSongId = songs.length
	}
	currentSongId--
	play.classList.add('pause')
	changeSong('prev')
}

// change song url
function changeSong(type) {
	removeActiveSongStyle()
	audio.pause()
	if (type === 'next') {
		audio.src = `assets/sounds/${songs[currentSongId]}.mp3`
		songName.innerText = songs[currentSongId]
		playList.children[currentSongId].classList.add('item-active')
	} else if (type === 'prev') {
		audio.src = `assets/sounds/${songs[currentSongId]}.mp3`
		playList.children[currentSongId].classList.add('item-active')
		songName.innerText = songs[currentSongId]
	}
	audio.load()
	audio.play()
}

// remove song active style
function removeActiveSongStyle() {
	for (let i = 0; i < playList.children.length; i++) {
		playList.children[i].classList.remove('item-active')
	}
}

// add play song on click
function playSongOnclick() {
	if (playList.children) {
		for (let i = 0; i < playList.children.length; i++) {
			playList.children[i].addEventListener('click', () => {
				if (currentSongId !== i) {
					currentSongId = i
					play.classList.remove('pause')
					audio.pause()
					removeActiveSongStyle()
					audio.src = `assets/sounds/${songs[i]}.mp3`
					playList.children[i].classList.add('item-active')
					audio.load()
					audio.play()
					play.classList.add('pause')
					songName.innerText = songs[currentSongId]
				} else if (audio.paused) {
					audio.play()
					play.classList.add('pause')
				} else {
					audio.pause()
					play.classList.remove('pause')
				}
			})
		}
	}
}
playSongOnclick()

// update volume level
function handleRangeUpdate(e) {
	if (this.value >= 0 && this.value <= 1) {
		rangeValue = this.value
		audio.volume = this.value
		value = this.value * 100
	}
	updateMuteIcon()
}

// update volume track
function volumeRange() {
	const value = this.value * 100
	this.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.8)  0%, rgba(255, 255, 255, 0.8)  ${value}%, rgba(255, 255, 255, 0.3) ${value}%, rgba(255, 255, 255, 0.3) 100%)`
}

// update mute icon
function updateMuteIcon() {
	if (audio.volume === 0) {
		mute.classList.add('muted')
	} else if (audio.volume > 0) {
		mute.classList.remove('muted')
	}
}

// mute volume
function muted() {
	if (audio.volume > 0) {
		audio.volume = 0
		range.value = 0
		range.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.8)  0%, rgba(255, 255, 255, 0.8)  0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)`
	} else {
		audio.volume = rangeValue
		range.value = rangeValue
		range.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0.8)  0%, rgba(255, 255, 255, 0.8)  ${
			range.value * 100
		}%, rgba(255, 255, 255, 0.3) ${
			range.value * 100
		}%, rgba(255, 255, 255, 0.3) 100%)`
	}
	updateMuteIcon()
}

// progress on action
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration
	audio.currentTime = scrubTime
}

// handle audio progress
function handleProgress() {
	let currTime = Math.floor(audio.currentTime).toString()
	const percent = (audio.currentTime / audio.duration) * 100
	progressBar.style.flexBasis = `${percent}%`
	duration.innerText = formatSecondsAsTime(currTime)
}

// format duration time
function formatSecondsAsTime(secs, format) {
	let hr = Math.floor(secs / 3600)
	let min = Math.floor((secs - hr * 3600) / 60)
	let sec = Math.floor(secs - hr * 3600 - min * 60)

	if (min < 10) {
		min = '0' + min
	}
	if (sec < 10) {
		sec = '0' + sec
	}

	return min + ':' + sec
}

// show playlist
function showPlaylist() {
	playlistTxt.classList.toggle('show')
	playList.classList.toggle('show')
}

function setPlayerLang() {
	let value = localStorage.getItem('language') || language
	playlistTxt.innerText = value === 'en' ? 'Playlist' : 'Плейлист'
}

// next song after prev end
audio.addEventListener('ended', nextSong)

play.addEventListener('click', togglePlay)

playPrev.addEventListener('click', prevSong)
playNext.addEventListener('click', nextSong)

range.addEventListener('change', handleRangeUpdate)
range.addEventListener('mousemove', handleRangeUpdate)
range.addEventListener('touchmove', handleRangeUpdate)
range.addEventListener('input', volumeRange)
mute.addEventListener('click', muted)

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
audio.addEventListener('timeupdate', handleProgress)

playListBtn.addEventListener('click', showPlaylist)

// weather =======================================================================/
const cityField = document.querySelector('.city')
const errorField = document.querySelector('.weather-error')
const tempField = document.querySelector('.temperature')
const weatherDescField = document.querySelector('.weather-description')
const windField = document.querySelector('.wind')
const humidityField = document.querySelector('.humidity')
const weatherIcon = document.querySelector('.weather-icon')

const apiKey = 'e868941e844d5aab555ef12c92b80fc4'
let cityName = localStorage.getItem('currentCity') || 'Minsk'
let temp
let weatherType
let weatherDesc
let windSpeed
let humidity

cityField.value = localStorage.getItem('currentCity') || 'Minsk'

// get weather from api res
getWeather = async city => {
	let lang = localStorage.getItem('language') || language
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${apiKey}&units=metric`

	const res = await fetch(url)
	if (!res.ok) {
		errorField.innerText = `Error! city not found for ${city}!`
	}
	return await res.json()
}

// set weather from api res
setWeather = async city => {
	errorField.innerText = ''
	let value = localStorage.getItem('language') || language
	const res = await getWeather(city)

	if (res.cod === 200) {
		errorField.innerText = ''
		cityField.value = res.name
		localStorage.setItem('currentCity', res.name)

		temp = Math.floor(res.main.temp)
		weatherType = res.weather[0].main
		weatherDesc = res.weather[0].description
		windSpeed = Math.floor(res.wind.speed)
		humidity = res.main.humidity

		tempField.innerText = `${temp}°C`
		weatherDescField.innerText = weatherDesc
		windField.innerText = `${
			value === 'en' ? 'Wind speed' : 'Скорость ветра'
		}: ${windSpeed} m/s`
		humidityField.innerText = `${
			value === 'en' ? 'Humidity' : 'Влажность'
		}: ${humidity}%`

		setWeatherIcon(weatherIcon, weatherType, weatherDesc)
	} else {
		weatherIcon.classList.value = 'weather-icon owf'
		tempField.innerText = ''
		weatherDescField.innerText = ''
		windField.innerText = ''
		humidityField.innerText = ''
	}
}

setWeather(cityName)

// set city
function setCity() {
	let cityValue = this.value
	localStorage.setItem('currentCity', cityValue)
	setWeather(cityValue)
}

// set weather icon
function setWeatherIcon(icon, type, desc) {
	switch (type) {
		case 'Thunderstorm':
			switch (desc) {
				case 'thunderstorm with light rain':
					icon.classList.value = 'weather-icon owf owf-200'
					break
				case 'thunderstorm with rain':
					icon.classList.value = 'weather-icon owf owf-201'
					break
				case 'thunderstorm with heavy rain':
					icon.classList.value = 'weather-icon owf owf-202'
					break
				case 'light thunderstorm':
					icon.classList.value = 'weather-icon owf owf-210'
					break
				case 'thunderstorm':
					icon.classList.value = 'weather-icon owf owf-211'
					break
				case 'heavy thunderstorm':
					icon.classList.value = 'weather-icon owf owf-212'
					break
				case 'ragged thunderstorm':
					icon.classList.value = 'weather-icon owf owf-221'
					break
				case 'thunderstorm with light drizzle':
					icon.classList.value = 'weather-icon owf owf-230'
					break
				case 'thunderstorm with drizzle':
					icon.classList.value = 'weather-icon owf owf-231'
					break
				case 'thunderstorm with heavy drizzle':
					icon.classList.value = 'weather-icon owf owf-232'
					break
			}
		case 'Drizzle':
			switch (desc) {
				case 'light intensity drizzle':
					icon.classList.value = 'weather-icon owf owf-300'
					break
				case 'drizzle':
					icon.classList.value = 'weather-icon owf owf-301'
					break
				case 'heavy intensity drizzle':
					icon.classList.value = 'weather-icon owf owf-302'
					break
				case 'light intensity drizzle rain':
					icon.classList.value = 'weather-icon owf owf-310'
					break
				case 'drizzle rain':
					icon.classList.value = 'weather-icon owf owf-311'
					break
				case 'heavy intensity drizzle rain':
					icon.classList.value = 'weather-icon owf owf-312'
					break
				case 'shower rain and drizzle':
					icon.classList.value = 'weather-icon owf owf-313'
					break
				case 'heavy shower rain and drizzle':
					icon.classList.value = 'weather-icon owf owf-314'
					break
				case 'shower drizzle':
					icon.classList.value = 'weather-icon owf owf-321'
					break
			}
		case 'Rain':
			switch (desc) {
				case 'light rain':
					icon.classList.value = 'weather-icon owf owf-500'
					break
				case 'moderate rain':
					icon.classList.value = 'weather-icon owf owf-501'
					break
				case 'heavy intensity rain':
					icon.classList.value = 'weather-icon owf owf-502'
					break
				case 'very heavy rain':
					icon.classList.value = 'weather-icon owf owf-503'
					break
				case 'extreme rain':
					icon.classList.value = 'weather-icon owf owf-504'
					break
				case 'freezing rain':
					icon.classList.value = 'weather-icon owf owf-511'
					break
				case 'light intensity shower rain':
					icon.classList.value = 'weather-icon owf owf-520'
					break
				case 'shower rain':
					icon.classList.value = 'weather-icon owf owf-521'
					break
				case 'heavy intensity shower rain':
					icon.classList.value = 'weather-icon owf owf-522'
					break
				case 'ragged shower rain':
					icon.classList.value = 'weather-icon owf owf-531'
					break
			}
		case 'Snow':
			switch (desc) {
				case 'light snow':
					icon.classList.value = 'weather-icon owf owf-600'
					break
				case 'snow':
					icon.classList.value = 'weather-icon owf owf-601'
					break
				case 'heavy snow':
					icon.classList.value = 'weather-icon owf owf-602'
					break
				case 'sleet':
					icon.classList.value = 'weather-icon owf owf-611'
					break
				case 'shower sleet':
					icon.classList.value = 'weather-icon owf owf-612'
					break
				case 'light rain and snow':
					icon.classList.value = 'weather-icon owf owf-615'
					break
				case 'rain and snow':
					icon.classList.value = 'weather-icon owf owf-616'
					break
				case 'light shower snow':
					icon.classList.value = 'weather-icon owf owf-620'
					break
				case 'shower snow':
					icon.classList.value = 'weather-icon owf owf-621'
					break
				case 'heavy shower snow':
					icon.classList.value = 'weather-icon owf owf-622'
					break
			}
		case 'Atmosphere':
			switch (desc) {
				case 'mist':
					icon.classList.value = 'weather-icon owf owf-701'
					break
				case 'smoke':
					icon.classList.value = 'weather-icon owf owf-711'
					break
				case 'haze':
					icon.classList.value = 'weather-icon owf owf-721'
					break
				case 'sand/dust whirls':
					icon.classList.value = 'weather-icon owf owf-731'
					break
				case 'fog':
					icon.classList.value = 'weather-icon owf owf-741'
					break
				case 'sand':
					icon.classList.value = 'weather-icon owf owf-751'
					break
				case 'dust':
					icon.classList.value = 'weather-icon owf owf-761'
					break
				case 'volcanic ash':
					icon.classList.value = 'weather-icon owf owf-761'
					break
				case 'squalls':
					icon.classList.value = 'weather-icon owf owf-771'
					break
				case 'tornado':
					icon.classList.value = 'weather-icon owf owf-781'
					break
			}
		case 'Clouds':
			switch (desc) {
				case 'few clouds':
					icon.classList.value = 'weather-icon owf owf-801'
					break
				case 'scattered clouds':
					icon.classList.value = 'weather-icon owf owf-802'
					break
				case 'broken clouds':
					icon.classList.value = 'weather-icon owf owf-803'
					break
				case 'overcast clouds':
					icon.classList.value = 'weather-icon owf owf-804'
					break
			}
		case 'Extreme':
			switch (desc) {
				case 'tornado':
					icon.classList.value = 'weather-icon owf owf-900'
					break
				case 'tropical storm':
					icon.classList.value = 'weather-icon owf owf-901'
					break
				case 'hurricane':
					icon.classList.value = 'weather-icon owf owf-902'
					break
				case 'cold':
					icon.classList.value = 'weather-icon owf owf-903'
					break
				case 'hot':
					icon.classList.value = 'weather-icon owf owf-904'
					break
				case 'windy':
					icon.classList.value = 'weather-icon owf owf-905'
					break
				case 'hail':
					icon.classList.value = 'weather-icon owf owf-906'
					break
			}
		case 'Additional':
			switch (desc) {
				case 'Light breeze':
					icon.classList.value = 'weather-icon owf owf-952'
					break
				case 'Gentle Breeze':
					icon.classList.value = 'weather-icon owf owf-953'
					break
				case 'Moderate breeze':
					icon.classList.value = 'weather-icon owf owf-954'
					break
				case 'Fresh Breeze':
					icon.classList.value = 'weather-icon owf owf-955'
					break
				case 'Strong  Breeze':
					icon.classList.value = 'weather-icon owf owf-956'
					break
				case 'High wind, near gale':
					icon.classList.value = 'weather-icon owf owf-957'
					break
				case 'Gale':
					icon.classList.value = 'weather-icon owf owf-958'
					break
				case 'Severe Gale':
					icon.classList.value = 'weather-icon owf owf-959'
					break
				case 'Storm':
					icon.classList.value = 'weather-icon owf owf-960'
					break
				case 'Violent Storm':
					icon.classList.value = 'weather-icon owf owf-961'
					break
				case 'Hurricane':
					icon.classList.value = 'weather-icon owf owf-962'
					break
			}
		case 'Clear':
			switch (desc) {
				case 'clear sky':
					icon.classList.value = 'weather-icon owf owf-800'
					break
			}
	}
}

cityField.addEventListener('change', setCity)

// todo ==========================================================================/
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
const card = document.querySelector('.card')
const cardBtn = document.querySelectorAll('.totodo')
const toListbtn = document.querySelector('.to-list')
const toGreetingsBtn = document.querySelector('.to-greetings')
const todoTitle = document.querySelector('.todo-title')
const allOption = document.querySelector('.all')
const completedOption = document.querySelector('.completed')
const uncompletedOption = document.querySelector('.uncompleted')

//Functions
function addTodo(e) {
	//Prevent natural behaviour
	e.preventDefault()
	if (todoInput.value) {
		//Create todo div
		const todoDiv = document.createElement('div')
		todoDiv.classList.add('todo')
		//Create list
		const newTodo = document.createElement('li')
		newTodo.innerText = todoInput.value
		//Save to local - do this last
		//Save to local
		saveLocalTodos(todoInput.value)
		//
		newTodo.classList.add('todo-item')
		todoDiv.appendChild(newTodo)
		todoInput.value = ''
		//Create Completed Button
		const completedButton = document.createElement('button')
		completedButton.innerHTML = `<i class="fas fa-check"></i>`
		completedButton.classList.add('complete-btn')
		todoDiv.appendChild(completedButton)
		//Create trash button
		const trashButton = document.createElement('button')
		trashButton.innerHTML = `<i class="fas fa-trash"></i>`
		trashButton.classList.add('trash-btn')
		todoDiv.appendChild(trashButton)
		//attach final Todo
		todoList.appendChild(todoDiv)
	}
}

function deleteTodo(e) {
	const item = e.target

	if (item.classList[0] === 'trash-btn') {
		// e.target.parentElement.remove();
		const todo = item.parentElement
		todo.classList.add('fall')
		//at the end
		removeLocalTodos(todo)
		todo.addEventListener('transitionend', e => {
			todo.remove()
		})
	}
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement
		todo.classList.toggle('completed')
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex'
				break
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
		}
	})
}

function saveLocalTodos(todo) {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.push(todo)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalTodos(todo) {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	const todoIndex = todo.children[0].innerText
	todos.splice(todos.indexOf(todoIndex), 1)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.forEach(function (todo) {
		//Create todo div
		const todoDiv = document.createElement('div')
		todoDiv.classList.add('todo')
		//Create list
		const newTodo = document.createElement('li')
		newTodo.innerText = todo
		newTodo.classList.add('todo-item')
		todoDiv.appendChild(newTodo)
		todoInput.value = ''
		//Create Completed Button
		const completedButton = document.createElement('button')
		completedButton.innerHTML = `<i class="fas fa-check"></i>`
		completedButton.classList.add('complete-btn')
		todoDiv.appendChild(completedButton)
		//Create trash button
		const trashButton = document.createElement('button')
		trashButton.innerHTML = `<i class="fas fa-trash"></i>`
		trashButton.classList.add('trash-btn')
		todoDiv.appendChild(trashButton)
		//attach final Todo
		todoList.appendChild(todoDiv)
	})
}

function rotateCard() {
	card.classList.toggle('rotate')
}

function setTodoLang() {
	let value = localStorage.getItem('language') || language
	toListbtn.innerText = value === 'en' ? 'Todo List' : 'Список дел'
	toGreetingsBtn.innerText = value === 'en' ? 'Greetings' : 'Приветствие'
	todoTitle.innerText = value === 'en' ? 'Todo List' : 'Список дел'
	allOption.innerText = value === 'en' ? 'All' : 'Все'
	completedOption.innerText = value === 'en' ? 'Completed' : 'Завершенные'
	uncompletedOption.innerText = value === 'en' ? 'Uncompleted' : 'Незавершенные'
}

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)
filterOption.addEventListener('click', filterTodo)
cardBtn.forEach(btn => {
	btn.addEventListener('click', rotateCard)
})

// language && settings ======================================================================/
const settingsContent = document.querySelector('.settings-content')
const settingsBtn = document.querySelector('.settings-icon')
const ruBtn = document.querySelector('.ru')
const enBtn = document.querySelector('.en')
const showPlayerBtn = document.querySelector('.show-player ')
const showWeatherBtn = document.querySelector('.show-weather')
const showGreetingsBtn = document.querySelector('.show-greetings')
const showQuotesBtn = document.querySelector('.show-quotes')
const greetingBlock = document.querySelector('.card')
const playerBlock = document.querySelector('.player')
const weatherBlock = document.querySelector('.weather')
const quotesBlock = document.querySelector('.quotes')
const langTitle = document.querySelector('.lang-title')

// show / hide settings
function showSettings() {
	settingsContent.classList.toggle('show-settings')
}

function clickOutsideSettings(e) {
	if (
		!e.target.closest('.settings-content') &&
		!e.target.closest('.settings-icon')
	) {
		settingsContent.classList.remove('show-settings')
	}
}

// change language
language === 'en' ? setEnLang() : setRuLang()

function setRuLang() {
	ruBtn.classList.add('chosen')
	enBtn.classList.remove('chosen')
	localStorage.setItem('language', 'ru')
	setLang()
}

function setEnLang() {
	enBtn.classList.add('chosen')
	ruBtn.classList.remove('chosen')
	localStorage.setItem('language', 'en')
	setLang()
}

function setSettingsLang() {
	let value = localStorage.getItem('language') || language
	showPlayerBtn.innerText = value === 'en' ? 'Player' : 'Плеер'
	showWeatherBtn.innerText = value === 'en' ? 'Weather' : 'Погода'
	showGreetingsBtn.innerText = value === 'en' ? 'Greeting' : 'Приветствие'
	showQuotesBtn.innerText = value === 'en' ? 'Quotes' : 'Цитаты'
	langTitle.innerText = value === 'en' ? 'Language' : 'Язык'
	ruBtn.innerText = value === 'en' ? 'Ru' : 'Рус'
	enBtn.innerText = value === 'en' ? 'En' : 'Анг'
}

function setLang() {
	setPlayerLang()
	setWeather(cityName)
	setTodoLang()
	setDate()
	setNamePlaceholder()
	setQuote()
	setSettingsLang()
}

setPlayerLang()

// show / hide sections
function showPlayer() {
	if (localStorage.getItem('isPlayer') === 'hidden') {
		showPlayerBtn.classList.add('show-el')
		playerBlock.classList.remove('hidden')
		localStorage.removeItem('isPlayer')
	} else {
		showPlayerBtn.classList.remove('show-el')
		playerBlock.classList.add('hidden')
		localStorage.setItem('isPlayer', 'hidden')
	}
}

function showWeather() {
	if (localStorage.getItem('isWeather') === 'hidden') {
		showWeatherBtn.classList.add('show-el')
		weatherBlock.classList.remove('hidden')
		localStorage.removeItem('isWeather')
	} else {
		showWeatherBtn.classList.remove('show-el')
		weatherBlock.classList.add('hidden')
		localStorage.setItem('isWeather', 'hidden')
	}
}

function showGreetings() {
	if (localStorage.getItem('isGreetings') === 'hidden') {
		showGreetingsBtn.classList.add('show-el')
		greetingBlock.classList.remove('hidden')
		localStorage.removeItem('isGreetings')
	} else {
		showGreetingsBtn.classList.remove('show-el')
		greetingBlock.classList.add('hidden')
		localStorage.setItem('isGreetings', 'hidden')
	}
}

function showQuotes() {
	if (localStorage.getItem('isQuotes') === 'hidden') {
		showQuotesBtn.classList.add('show-el')
		quotesBlock.classList.remove('hidden')
		localStorage.removeItem('isQuotes')
	} else {
		showQuotesBtn.classList.remove('show-el')
		quotesBlock.classList.add('hidden')
		localStorage.setItem('isQuotes', 'hidden')
	}
}

function checkVisibility() {
	if (localStorage.getItem('isPlayer') === 'hidden') {
		showPlayerBtn.classList.remove('show-el')
		playerBlock.classList.add('hidden')
	} else {
		showPlayerBtn.classList.add('show-el')
		playerBlock.classList.remove('hidden')
	}

	if (localStorage.getItem('isWeather') === 'hidden') {
		showWeatherBtn.classList.remove('show-el')
		weatherBlock.classList.add('hidden')
	} else {
		showWeatherBtn.classList.add('show-el')
		weatherBlock.classList.remove('hidden')
	}
	if (localStorage.getItem('isGreetings') === 'hidden') {
		showGreetingsBtn.classList.remove('show-el')
		greetingBlock.classList.add('hidden')
	} else {
		showGreetingsBtn.classList.add('show-el')
		greetingBlock.classList.remove('hidden')
	}
	if (localStorage.getItem('isQuotes') === 'hidden') {
		showQuotesBtn.classList.remove('show-el')
		quotesBlock.classList.add('hidden')
	} else {
		showQuotesBtn.classList.add('show-el')
		quotesBlock.classList.remove('hidden')
	}
}

checkVisibility()
settingsBtn.addEventListener('click', showSettings)
ruBtn.addEventListener('click', setRuLang)
enBtn.addEventListener('click', setEnLang)

showPlayerBtn.addEventListener('click', showPlayer)
showWeatherBtn.addEventListener('click', showWeather)
showGreetingsBtn.addEventListener('click', showGreetings)
showQuotesBtn.addEventListener('click', showQuotes)

document.addEventListener('click', e => clickOutsideSettings(e))
