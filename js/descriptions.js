let written_tweets = []

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: Filter to just the written tweets
	for (let i = 0; i < tweet_array.length; i++) { 
		if (tweet_array[i].written) { 
			written_tweets.push({
				index: i,
				activityType: tweet_array[i].activityType, 
				tweetText: tweet_array[i].fullTweet,
			});
		}
	}
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table

	// default display
	document.getElementById("searchText").innerText = "";
	document.getElementById('searchCount').innerText = 0;

	// with text display 
	document.getElementById("textFilter").addEventListener("keyup", event => {
		
		document.getElementById("searchText").innerText = event.target.value;

		let searchText = document.getElementById('searchText').innerText;
	
		let searched_array = [];

		if (searchText != "") { 
			for (let i = 0; i < written_tweets.length; i++) { 
				if (written_tweets[i].tweetText.toLowerCase().includes(searchText)) {
					searched_array.push(written_tweets[i]);
				}
			}
			
		}

		document.getElementById('searchCount').innerText = searched_array.length;
		
		let table = document.getElementById('tweetTable');

		// updating table for keyword 
		while(table.firstChild) { 
			table.removeChild(table.firstChild);
		}
		if (searchText == "") { 
			while(table.firstChild) { 
				table.removeChild(table.firstChild);
			}
		}

		// table results of keyword
		for (let i = 0; i < searched_array.length; i++) { 
			let tableRow = table.insertRow(); 
			let tweetNum = tableRow.insertCell(0);
			let activityType = tableRow.insertCell(1); 
			let link = tableRow.insertCell(2);
			tweetNum.innerHTML = i + 1;
			activityType.innerHTML = searched_array[i].activityType;
			link.innerHTML = tweet_array[searched_array[i].index].getHTMLTableRow(searched_array[i].index);
		}
	
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});