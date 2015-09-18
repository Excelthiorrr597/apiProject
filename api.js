
window.onload = function() {

	var url = "https://api.github.com/users/",
		apiToken = '?token=a25be8b1a2a72a3bd915a1de0dc16f7befb2cb51'

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

		ulElement.innerHTML = ''
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

	function fetchUserInfo(query) {
		var userParams = {
		url : url + query + apiToken,
		success : userSuccess
		}
		console.log(userParams.url)
		$.ajax(userParams)
	}

	function fetchRepoInfo(query) {
		var repoParams = {
			url : url + query + '/repos' + apiToken,
			success : repoSuccess
		}
		$.ajax(repoParams)
	}

	function getUserQuery(event) {
		if (event.keyCode === 13) {
			var inputEl = event.srcElement,
				query = inputEl.value
			inputEl.value = ''
			location.hash = query
		}
	}

	window.onhashchange = function() {
		var query = location.hash
		query = query.slice(1)
		fetchRepoInfo(query)
		fetchUserInfo(query)
	}
		
	function main() {
		var inputEl = $('input')[0]
		inputEl.onkeypress = getUserQuery
		// var query = location.hash
		// fetchUserInfo(query)
		// fetchRepoInfo(query)
	}

	main()
	



	


}