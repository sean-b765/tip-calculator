const textBill = document.getElementById('textBill')
const textPeople = document.getElementById('textPeople')

const labelStatus = document.getElementById('textStatus')
const labelTipPer = document.getElementById('spanTipPer')
const labelTotalPer = document.getElementById('spanTotalPer')

const buttonReset = document.getElementById('buttonReset')

const buttonTips = document.getElementsByClassName('buttonSelectTip')
const buttonTipCustom = document.getElementById('textCustom')

/**
 * GLOBAL VARIABLES
 */
let bill = 0,
	people = 1,
	tipAmount = 0

const validKeysBill = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const validKeysPeople = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

/**
 * Only allow the numeric keys for the input
 * @param {KeyboardEvent} e
 * @param {Array} validKeys
 */
const onlyAllowValidKeys = (e, validKeys, maxValue, minValue) => {
	const new_val = parseFloat(`${e.target.value}${e.key}`)
	console.log(new_val)
	if (new_val > maxValue || new_val < minValue) {
		e.preventDefault()
		throw new RangeError(`Value must be between ${minValue} and ${maxValue}`)
	}
	if (!validKeys.includes(e.key)) {
		e.preventDefault()
		throw new TypeError('Only numerical values allowed.')
	}
}

/**
 * Set the bill
 * @param {InputEvent} e
 */
const setBill = (e) => {
	const { value } = e.target

	bill = value

	textBill.setAttribute('value', bill)

	updatePreview()
}

/**
 * Number People
 * @param {InputEvent} e
 */
const setPeople = (e) => {
	const { value } = e.target

	people = parseInt(value)

	textPeople.setAttribute('value', people)

	if (people > 100 || people === 0) {
		if (people > 100) setStatusTextPeople('100 people maximum.')
		if (people === 0) setStatusTextPeople("Can't be zero.")
	} else {
		clearStatusTextPeople()
	}

	updatePreview()
}

/**
 * Tip amount
 * @param {InputEvent} e
 */
const setTipAmount = (e) => {
	const { value } = e.target

	value > 100 && e.preventDefault()

	tipAmount = value <= 100 && value >= 0 ? value : 0

	buttonTipCustom.setAttribute('value', tipAmount)

	for (let i = 0; i < buttonTips.length; i++) {
		buttonTips[i].classList.remove('active')
	}

	updatePreview()
}

/**
 * Set the tip via clicking the given buttons
 * @param {string} val
 */
const setTip = (e, val) => {
	for (let i = 0; i < buttonTips.length; i++) {
		buttonTips[i].classList.remove('active')
	}
	e.target.classList.add('active')

	tipAmount = parseFloat(val)
	buttonTipCustom.setAttribute('value', '')
	buttonTipCustom.value = ''

	updatePreview()
}

/**
 * Set status
 * @param {string} text
 */
const setStatusTextPeople = (text) => {
	labelStatus.innerHTML = text
	textPeople.classList.add('error')
}
const clearStatusTextPeople = () => {
	labelStatus.innerHTML = ''
	textPeople.classList.remove('error')
}

/**
 * Update preview panel
 */
const updatePreview = () => {
	const totalTip = (tipAmount / 100) * bill
	const total = parseFloat(parseFloat(bill) + totalTip)

	const tipAmtPer = parseFloat(totalTip / people).toFixed(2)
	labelTipPer.innerText = `$${tipAmtPer}`

	const totalPer = parseFloat(total / people).toFixed(2)
	labelTotalPer.innerText = `$${totalPer}`
}

/*
  Event listeners
*/
textBill.addEventListener('input', setBill)
textBill.addEventListener('keypress', (e) => {
	try {
		onlyAllowValidKeys(e, validKeysBill, 10000, 1)
	} catch (err) {
		console.log(err.message)
	}
})

textPeople.addEventListener('input', setPeople)
textPeople.addEventListener('keypress', (e) => {
	try {
		onlyAllowValidKeys(e, validKeysPeople, 100, 1)
	} catch (err) {
		console.log(err.message)
	}
})

buttonTipCustom.addEventListener('input', setTipAmount)
buttonTipCustom.addEventListener('keypress', (e) => {
	try {
		onlyAllowValidKeys(e, validKeysPeople, 100, 0)
	} catch (err) {
		console.log(err.message)
	}
})

for (let i = 0; i < buttonTips.length; i++) {
	const btn = buttonTips[i]
	btn.addEventListener('mousedown', (e) => {
		setTip(e, btn.getAttribute('value'))
	})
}

buttonReset.addEventListener('mousedown', (e) => {
	people = 1
	textPeople.value = 1
	textPeople.setAttribute('value', 1)

	bill = 0
	textBill.value = 0
	textBill.setAttribute('value', 0)

	tipAmount = 0
	buttonTipCustom.setAttribute('value', '')
	buttonTipCustom.value = ''
	for (let i = 0; i < buttonTips.length; i++) {
		buttonTips[i].classList.remove('active')
	}

	labelTipPer.innerText = '$0.00'
	labelTotalPer.innerText = '$0.00'

	clearStatusTextPeople()
})
