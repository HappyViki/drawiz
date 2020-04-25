document.querySelector(".questionsList").innerHTML = exam.map(
	q => '<button class="question">' + q + '</button>'
).join('')

function handleQuestion () {
	document.querySelector("div.question").innerHTML = this.innerHTML
}

const questions = document.querySelectorAll("button.question")

questions.forEach(
	q => q.addEventListener("click",handleQuestion)
)
