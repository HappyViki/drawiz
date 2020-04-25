const dataKeys = Object.keys(data)
document.getElementById('preview').innerHTML = dataKeys.map(
	key => `<div><p>${key}</p><img src="${data[key]}"/></div>`
).join('')
