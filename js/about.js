function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	

	// Tweet Dates (2 Points)
	earliest_tweet = tweet_array[0];
	latest_tweet = tweet_array[0];
	for(let i = 1; i < tweet_array.length; i++)
	{
		if(tweet_array[i].time < earliest_tweet.time)
		{
			earliest_tweet = tweet_array[i];
		}

		if(tweet_array[i].time > latest_tweet.time)
		{
			latest_tweet = tweet_array[i];
		}
	}

	let dateFormat =  { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
	document.getElementById('firstDate').innerText = 
		earliest_tweet.time.toLocaleDateString('en-US', dateFormat);
	document.getElementById('lastDate').innerText = 
		latest_tweet.time.toLocaleDateString('en-US', dateFormat);

	// Tweet Category (3 Points)
	let completed_events = 0;
	let live_events = 0;
	let achievements = 0;
	let miscellaneous = 0;

	for(let i = 0; i < tweet_array.length; i++)
	{
		if(tweet_array[i].source === 'completed_event')
		{
			completed_events++;
		}
		else if(tweet_array[i].source === 'live_event')
		{
			live_events++;
		}
		else if(tweet_array[i].source === 'achievement')
		{
			achievements++;
		}
		else{
			miscellaneous++;
		}
	}

	document.getElementsByClassName('completedEvents')[0].innerText = completed_events; 
	document.getElementsByClassName('liveEvents')[0].innerText = live_events; 
	document.getElementsByClassName('achievements')[0].innerText = achievements; 
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous; 

	let completed_percent = (completed_events / tweet_array.length * 100).toFixed(2); 
	let live_percent = (live_events / tweet_array.length * 100).toFixed(2); 
	let achievement_percent = (achievements / tweet_array.length * 100).toFixed(2); 
	let miscellaneous_percent = (miscellaneous / tweet_array.length * 100).toFixed(2); 

	document.getElementsByClassName('completedEventsPct')[0].innerText = completed_percent + "%"; 
	document.getElementsByClassName('liveEventsPct')[0].innerText = live_percent + "%"; 
	document.getElementsByClassName('achievementsPct')[0].innerText = achievement_percent + "%"; 
	document.getElementsByClassName('miscellaneousPct')[0].innerText = miscellaneous_percent + "%"; 

	// User-written tweets (3 points)
	document.getElementsByClassName('completedEvents')[1].innerText = completed_events; 
	
	let user_written = 0; 
	for (let i = 0; i < tweet_array.length; i++) 
	{ 
		if (tweet_array[i].written) 
		{ 
			user_written++;
		}
	}

	document.getElementsByClassName('written')[0].innerText = user_written; 
	
	let written_percent = (user_written / tweet_array.length * 100).toFixed(2); 
	document.getElementsByClassName('writtenPct')[0].innerText = written_percent + "%"; 


}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});