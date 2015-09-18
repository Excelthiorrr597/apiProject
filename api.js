
window.onload = function() {

	var urlUser = "https://api.github.com/users/Excelthiorrr597?token=",
		urlRepo = "https://api.github.com/users/Excelthiorrr597/repos?token=",
		apiKey = '77497b06bfcb3d6df0ba1bb944de5f7c466da157'


	function putInto(property, element, responseData, image) {
		if (image === 1) {
			$(element)[0].src = responseData[property]
		}
		else $(element)[0].innerHTML = responseData[property]
	}

	function userSuccess(responseData) {
		console.log('got it')
		console.log(responseData)
		putInto("avatar_url","#avatar", responseData, 1)
		putInto("name","#name", responseData)
		putInto("login","#userName", responseData)
		putInto("location","#location", responseData)
		putInto("email","#email", responseData)
		putInto("blog","#blog", responseData)
	}



	function listRepos(repoArray) {
		var ulElement = $('#repoList')[0]

		repoArray.forEach(function(repo) {
			repoName = repo.name 
			var newRepo = document.createElement('li')
			newRepo.innerHTML = repoName
			ulElement.appendChild(newRepo)

		})
	}


	function repoSuccess(responseData) {
		console.log('me too')
		console.log(responseData)
		window.responseData = responseData
		var repoArray = responseData

		listRepos(repoArray)

	}






		



	var userParams = {
		url : urlUser + apiKey,
		success : userSuccess

	}

	var repoParams = {
		url : urlRepo + apiKey,
		success : repoSuccess

	}

	$.ajax(userParams)
	$.ajax(repoParams)


}