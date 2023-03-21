function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// Creating dictionary of activities:
	let activity_list = new Object(); 

	activity_list['ski run'] = {count: 0, distance: 0};
	activity_list['run'] = {count: 0, distance: 0};
	activity_list['walk'] = {count: 0, distance: 0};
	activity_list['freestyle'] = {count: 0, distance: 0};
	activity_list['workout'] = {count: 0, distance: 0};
	activity_list['mountain bike'] = {count: 0, distance: 0};
	activity_list['bike'] = {count: 0, distance: 0};
	activity_list['swim'] = {count: 0, distance: 0};
	activity_list['hike'] = {count: 0, distance: 0};
	activity_list['yoga'] = {count: 0, distance: 0};
	activity_list['activity'] = {count: 0, distance: 0};
	activity_list['snowboard'] = {count: 0, distance: 0};
	activity_list['chair ride'] = {count: 0, distance: 0};
	activity_list['row'] = {count: 0, distance: 0};
	activity_list['skate'] = {count: 0, distance: 0};
	activity_list['meditation'] = {count: 0, distance: 0};

	// Outputing # different types:
	document.getElementById('numberActivities').innerText = Object.keys(activity_list).length; 

	// tracking how frequent activities are logged:
	for (let i = 0; i < tweet_array.length; i++) { 
		if (tweet_array[i].activityType == "ski run") { 
			activity_list['ski run'].count++;
			activity_list['ski run'].distance += tweet_array[i].distance; 
		}
		else if (tweet_array[i].activityType == "run") { 
			activity_list['run'].count++; 
			activity_list['run'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "walk") { 
			activity_list['walk'].count++; 
			activity_list['walk'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "freestyle") { 
			activity_list['freestyle'].count++; 
			activity_list['freestyle'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "workout") { 
			activity_list['workout'].count++; 
			activity_list['workout'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "mountain bike") { 
			activity_list['mountain bike'].count++; 
			activity_list['mountain bike'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "bike") { 
			activity_list['bike'].count++; 
			activity_list['bike'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "swim") { 
			activity_list['swim'].count++; 
			activity_list['swim'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "hike") { 
			activity_list['hike'].count++; 
			activity_list['hike'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "yoga") { 
			activity_list['yoga'].count++; 
			activity_list['yoga'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "activity") { 
			activity_list['activity'].count++; 
			activity_list['activity'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "snowboard") { 
			activity_list['snowboard'].count++; 
			activity_list['snowboard'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "chair ride") { 
			activity_list['chair ride'].count++; 
			activity_list['chair ride'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "row") { 
			activity_list['row'].count++; 
			activity_list['row'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "skate") { 
			activity_list['skate'].count++; 
			activity_list['skate'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "meditation") { 
			activity_list['meditation'].count++; 
			activity_list['meditation'].distance += tweet_array[i].distance
		}
	}

	// converting to an array to sort activities by count:
	let activity_array = []
	
	for (let elem in activity_list) {
		activity_array.push({
			activity: elem, 
			count: activity_list[elem].count, 
			distance: activity_list[elem].distance});
	}

	let sorted_activityArr = activity_array.sort(function(a, b){return (a.count > b.count) ? 1: ((b.count > a.count) ? -1 : 0);});
	
	let firstActivity = sorted_activityArr[sorted_activityArr.length - 1];
	let secondActivity = sorted_activityArr[sorted_activityArr.length - 2];
	let thirdActivity = sorted_activityArr[sorted_activityArr.length - 3];

	// printing top 3 activities:
	document.getElementById('firstMost').innerText = firstActivity.activity;
	document.getElementById('secondMost').innerText = secondActivity.activity;
	document.getElementById('thirdMost').innerText = thirdActivity.activity;

	// determinging longest and shorest distances:
	let activityAvg1 = firstActivity.distance / firstActivity.count;
	let activityAvg2 = secondActivity.distance / secondActivity.count;
	let activityAvg3 = thirdActivity.distance / thirdActivity.count;

	let longest_activity = firstActivity;
	let shortest_activity = firstActivity;

	if(activityAvg2 > activityAvg1 && activityAvg2 > activityAvg3)
	{
		longest_activity = secondActivity;
	}
	else if(activityAvg3 > activityAvg1 && activityAvg3 > activityAvg2)
	{
		longest_activity = thirdActivity;
	}

	if(activityAvg2 < activityAvg1 && activityAvg2 < activityAvg3)
	{
		shortest_activity = secondActivity;
	}
	else if(activityAvg3 < activityAvg1 && activityAvg3 < activityAvg2)
	{
		shortest_activity = thirdActivity;
	}

	// printing longest and shortest activities:
	document.getElementById('longestActivityType').innerText = longest_activity.activity;
	document.getElementById('shortestActivityType').innerText = shortest_activity.activity;

	
	// weekdays vs weekends: 
	let weekend = 0;
	let weekday = 0;

	for (let i = 0; i < (tweet_array.length); i++) 
	{
		let tweet = tweet_array[i];
		if (tweet.activityType == longest_activity){
			if (tweet.time.toString().includes("Sat") || (tweet.time.toString().includes("Sun"))){
				weekday++;
			}
			else{
				weekday++;
			}
		}
	}

	if (weekday > weekend)
	{
		document.getElementById('weekdayOrWeekendLonger').innerText = "weekdays";	
	}
	else
	{
		document.getElementById('weekdayOrWeekendLonger').innerText = "weekends";
	}
	
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let graph1 = [];
	let key = ""; 
	for(let elem in activity_list)
	{
		graph1.push({
			'activityType': elem,
			'count': activity_list[elem].count
		})
	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "width": 400,
	  "height": 300,
	  "data": {
	    "values": graph1
	  },
	  "selection": {
		"pts": {"type": "single", "on": "mouseover"}
	  },
	  //TODO: Add mark and encoding
	  "mark": "point", 
	  "encoding": { 
		"x": {
			"field": "activityType", 
			"type": "nominal",
			"sort": "-y"},
		"y": {
			"field": "count", 
			"type": "quantitative", 
			"scale": {"type": "log"}},
		"color": { 
			"condition": {
				"selection": "pts",  
				"type": "quantitative"
			},
			"value": "grey"}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});


	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.

	let graph2 = [];
	for (let i = 0; i < tweet_array.length; i++) { 
		if (tweet_array[i].activityType == firstActivity.activity || 
			tweet_array[i].activityType == secondActivity.activity || 
			tweet_array[i].activityType == thirdActivity.activity) { 
				graph2.push({
					'activityType': tweet_array[i].activityType, 
					'time (day)': tweet_array[i].day, 
					'distance': tweet_array[i].distance});
			}
	}

	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for the three most tweeted-about activities.",
		"width": 400, 
		"height": 300, 
		"data": {
		  "values": graph2
		},
		"mark": "point", 
		"encoding": {
			"x": {
				"field": "time (day)", 
				"type": "nominal", 
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
				"axis": { 
					"labelAngle": 360}},
			"y": {
				"field": "distance", 
				"type": "quantitative"},
			"color": { 
				"field": "activityType",
				"type": "nominal",
				"scale": {
					"domain": ["bike", "run", "walk"]},
				"legend": {"title": "activityType"}}
		}
	  }; 
	  vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	  distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the average of distances by day of the week for the three most tweeted-about activities.",
		"width": 400, 
		"height": 300, 
		"data": {
		  "values": graph2
		},
		"selection": {
		  "pts": {"type": "single", "on": "mouseover"}
		},
		"mark": "point", 
		"encoding": { 
		  "x": {
			"field": "time (day)", 
			"type": "nominal", 
			"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
			"axis": { 
				"labelAngle": 360}},
		  "y": {
			"field": "distance", 
			"type": "quantitative", 
			"aggregate": "average", 
			"title": "mean of distance"},
		  "color": { 
			  "field": "activityType",
			  "type": "nominal",
			  "scale": {
				  "domain": ["bike", "run", "walk"]},
			  "legend": {"title": "activityType"}}
		}
	  };
	  vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);

	// creating the swtich between graphs:
	document.getElementById('distanceVisAggregated').style.display = "none"; 
	document.getElementById('aggregate').onclick = function() {
		let default_graph = document.getElementById('distanceVis');
		let alt_graph = document.getElementById('distanceVisAggregated');
		if (document.getElementById('aggregate').innerText == "Show means") {
			document.getElementById('aggregate').innerText = "Show all activities";
			default_graph.style.display = "none";
			alt_graph.style.display = "block";
		}
		else if (document.getElementById('aggregate').innerText == "Show all activities") { 
			document.getElementById('aggregate').innerText = "Show means";
			alt_graph.style.display = "none";
			default_graph.style.display = "block";
		}
	};
});