var el = document.getElementById('homework');
var el2 = document.getElementById('review');
var vanilla = new Croppie(el, {
		enableOrientation: true,
		enableExif: true,
    viewport: {
			width: 100,
			height: 100,
		},
    boundary: { width: 300, height: 300 },
    showZoomer: true,
    enableOrientation: true
});
vanilla.bind({
    url: 'antoine-dautry-05A-kdOH6Hw-unsplash.jpg',
    orientation: 4
});
//on button click
vanilla.result('base64').then(function(data) {
    el2.src = data;
});
