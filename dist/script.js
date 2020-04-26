const imgUrl = 'https://raw.githubusercontent.com/HappyViki/drawiz/master/static/antoine-dautry-05A-kdOH6Hw-unsplash.jpg'
const quiz = [
	{
		id: "questionone",
		name: "A car averages 27 miles per gallon. If gas costs $4.04 per gallon, which of the following is closest to how much the gas would cost for this car to travel 2,727 typical miles? Show your work.",
	},
	{
		id: "questiontwo",
		name: "What is the value of x when 2x + 3 = 3x – 4? Graph it.",
	},
	{
		id: "questionthree",
		name: "In the standard (x,y) coordinate plane, 3 of the vertices of a rectangle are (-1,-1), (2,1), and (6,-5). What is the 4th vertex of the rectangle?",
	}
]
let imageReady = true

const quizQuestions = document.getElementById('quizQuestions')
const uploadQuestions = document.getElementById('uploadQuestions')

quizQuestions.innerHTML = quiz.map(
	(question, i) => `<p class="quiz-question" style="max-width: 540px;">
	<b>${i+1}.</b> ${question.name}
	</p><hr/>`
).join("")

uploadQuestions.innerHTML = quiz.map(
	(question, i) => `<div class="upload-question card mb-3" style="max-width: 540px;">
		<div class="row no-gutters">
			<div class="col-4 mb-md-0 p-md-4">
				<img src="" alt="Answer" class="card-img"/>
			</div>
			<div class="col-8">
				<div class="card-body">
					<button class="btn btn-warning mb-md-3">Answer with cropped image</button>
					<p class="card-title">
						<label for="name">
							<b>${i+1}.</b> ${question.name}
						</label>
					</p>
					<input
						type="text"
						name="${question.id}"
						id="${question.id}"
						required
						hidden
					/>
				</div>
			</div>
		</div>
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
			imageReady = true
			croppie.bind({
			    url: e.target.result,
			    orientation: 4
			});
		}
	}
}

const saveCrop = (question,index) => {
	croppie.result(
		{
			type:'base64',
			format:'jpeg'
		})
		.then(
			data => {
				if (!imageReady) return
				question.classList.add("answered")
				document.querySelectorAll(".upload-question input")[index].value = data
				document.querySelectorAll(".upload-question img")[index].src = data
				document.querySelectorAll(".upload-question img")[index].alt = "answer"
			}
		);
}

document.querySelector("#file").addEventListener(
		'change',
		function() {
			const file = this.files[0]
			document.querySelector("#fileName").innerText = file.name
			selectFile(file)
		}
	)
document.querySelectorAll(".upload-question .btn").forEach(
	(question,index) => question.addEventListener(
		'click',
		() => saveCrop(question,index)
	)
)
document.querySelector("form").addEventListener(
		'submit',
		function(e) {
			e.preventDefault()
			document.querySelector("#done").innerHTML = "Thank you for filling in your answers!"
		}
	)
