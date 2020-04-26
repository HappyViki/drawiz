const imgUrl = 'https://github.com/HappyViki/drawiz/static/antoine-dautry-05A-kdOH6Hw-unsplash.jpg'
const quiz = [
	{
		id: "questionone",
		name: "Question One",
		base64Data: ""
	},
	{
		id: "questiontwo",
		name: "Question Two",
		base64Data: ""
	},
	{
		id: "questionthree",
		name: "Question Three",
		base64Data: ""
	}
]
let imageReady = true

const quizQuestions = document.getElementById('quizQuestions')
const uploadQuestions = document.getElementById('uploadQuestions')

quizQuestions.innerHTML = quiz.map(
	question => `<div class="quiz-question">${question.name}</div>`
).join("")

uploadQuestions.innerHTML = quiz.map(
	question => `<div class="upload-question">
		<label for="name">
			${question.name}
		</label>
		<input
			type="text"
			name="${question.id}"
			id="${question.id}"
			required
			hidden
		/>
		<img src="" alt="Click here to crop answer" />
	</div>`
).join("")

const croppie = new Croppie(
	document.getElementById('croppie'),
	{
		enableOrientation: true,
		enableExif: true,
		viewport: {
			width: 100,
			height: 100,
		},
		boundary: { width: 300, height: 300 },
		showZoomer: true,
		enableOrientation: true
	}
);
croppie.bind({
		url: imgUrl,
		orientation: 4
});

const selectFile = file => {
	// https://gist.github.com/felixzapata/3684117
	// load an image from an input file into canvas tag
	var reader = new FileReader();
	// Read in the image file as a data URL.
	reader.readAsDataURL(file);
	reader.onload = function(e){
		imageReady = false
		if( e.target.readyState == FileReader.DONE) {
			console.log(e.target.result);
			imageReady = true
			croppie.bind({
			    url: e.target.result,
			    orientation: 4
			});
		}
	}
}

const saveCrop = question => {
	croppie.result(
		{
			type:'base64',
			format:'jpeg'
		})
		.then(
			data => {
				if (!imageReady) return
				question.classList.add("answered")
				question.parentNode.querySelector("input").value = data
				question.parentNode.querySelector("img").src = data
				question.parentNode.querySelector("img").alt = "answer"
			}
		);
}

document.querySelectorAll("#file").forEach(
	question => question.addEventListener(
		'change',
		function() {selectFile(this.files[0])}
	)
)
document.querySelectorAll("#uploadQuestions img").forEach(
	question => question.addEventListener(
		'click',
		() => saveCrop(question)
	)
)
document.querySelector("form").addEventListener(
		'submit',
		function(e) {
			e.preventDefault()
			document.querySelector(".content").innerHTML = "Thank you for submitting your answers!"
		}
	)
