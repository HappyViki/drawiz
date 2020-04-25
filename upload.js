const questions = {}
let currentQuestionIndex = 0

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
    url: 'antoine-dautry-05A-kdOH6Hw-unsplash.jpg',
    orientation: 4
});

const save = question => {
	croppie.result(
		{
			type:'base64',
			format:'jpeg'
		})
		.then((data) => {
			const f = document.getElementById("upload")
			const i = document.getElementById("image")
			question.classList.add("answered")
			questions[question.innerText] = data
			i.file = f.files[0]
			const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(i);
		reader.readAsDataURL(f.files[0])
			console.log();
	});
}

document.querySelectorAll("#questions button").forEach(
	question => question.addEventListener('click', () => {
		save(question)
	})
)
