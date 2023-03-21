class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if(this.text.toLowerCase().includes('just completed') || this.text.includes('Just posted'))
        {
            return 'completed_event';
        }

        if(this.text.includes('Live'))
        {
            return 'live_event';
        }

        if(this.text.toLowerCase().includes('achieved') || this.text.toLowerCase().includes('set a goal'))
        {
            return 'achievement';
        }
        
        return 'miscellaneous';
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if(this.text.includes(' - '))
        {
            return true;
        }
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return this.text.substring(this.text.indexOf(' - ') + 3, this.text.indexOf('https:'));
    }

    get fullTweet():string {
        return this.text;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }

        //TODO: parse the activity type from the text of the tweet
        if(this.text.toLowerCase().includes(' ski run '))
        {
            return "ski run";
        }
        if(this.text.toLowerCase().includes(' run '))
        {
            return "run";
        }
        if(this.text.toLowerCase().includes(' walk '))
        {
            return "walk";
        }
        if(this.text.toLowerCase().includes(' freestyle '))
        {
            return "freestyle";
        }
        if(this.text.toLowerCase().includes(' workout '))
        {
            return "workout";
        }
        if(this.text.toLowerCase().includes(' mtn bike '))
        {
            return "mountain bike";
        }  
        if(this.text.toLowerCase().includes(' bike '))
        {
            return "bike";
        }
        if(this.text.toLowerCase().includes(' swim '))
        {
            return "swim";
        }
        if(this.text.toLowerCase().includes(' activity '))
        {
            return "activity";
        }
        if(this.text.toLowerCase().includes(' row '))
        {
            return "row";
        }
        if(this.text.toLowerCase().includes(' snowboard ')) 
        {
            return "snowboard";
        }
        if(this.text.toLowerCase().includes(' chair ride '))
        {
            return "chair ride";
        }
        if(this.text.toLowerCase().includes(' yoga '))
        {
            return "yoga";
        }
        if(this.text.toLowerCase().includes(' skate '))
        {
            return "skate";
        }
        if(this.text.toLowerCase().includes(' hike '))
        {
            return "hike";
        }
        if(this.text.includes(' meditation '))
        {
            return "meditation";
        }

        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        let distance = 0;
        let miles = 0;
        let distance_str = "";
        let miles_str = "";

        if (this.text.toLowerCase().includes('just completed')) {
            if (this.text.toLowerCase().includes(' mi ')) {
                distance_str = this.text.substring(this.text.toLowerCase().indexOf('just completed a ') + 17, this.text.indexOf(' mi '));
                distance = parseFloat(distance_str);
            }
            else if (this.text.toLowerCase().includes(' km ')) {
                distance_str = this.text.substring(this.text.toLowerCase().indexOf('just completed a ') + 17, this.text.indexOf(' km '));
                miles = parseFloat(distance_str);
                miles = miles / 1.609;
                miles_str = miles.toFixed(2);
                distance = parseFloat(miles_str);
            }
        }
        else if (this.text.toLowerCase().includes('just posted')) {
            if (this.text.toLowerCase().includes(' mi ')) {
                distance_str = this.text.substring(this.text.toLowerCase().indexOf('just posted a ') + 14, this.text.indexOf(' mi '));
                distance = parseFloat(distance_str);
            }
            else if (this.text.toLowerCase().includes(' km ')) {
                distance_str = this.text.substring(this.text.toLowerCase().indexOf('just posted a ') + 14, this.text.indexOf(' km '));
                miles = parseFloat(distance_str);
                miles = miles / 1.609;
                miles_str = miles.toFixed(2);
                distance = parseFloat(miles_str);
            }
        }

        return distance;
    }

    get day():string {
        let timeToString = this.time.toString();
        if (timeToString.includes('Sun ')) {
            return "Sun";
        }
        if (timeToString.includes('Mon ')) {
            return "Mon";
        } 
        if (timeToString.includes('Tue ')) {
            return "Tue";
        } 
        if (timeToString.includes('Wed ')) {
            return "Wed";
        } 
        if (timeToString.includes('Thu ')) {
            return "Thu";
        } 
        if (timeToString.includes('Fri ')) {
            return "Fri";
        }  
        if (timeToString.includes('Sat ')) {
            return "Sat";
        } 

        return "";
    }
    
    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        let link_array; 
        let hyperlink = "";
        let link = ""
 
        link_array = this.text.match(/(http|https|ftp):\/\/([^\s]+)/g);
        if (link_array != null) { 
            for (let i = 0; i < link_array.length; i++) { 
                hyperlink += link_array[i].toString(); 
            }
        }
        let anchor_hyperlink = '<a href="' + hyperlink + '">' + hyperlink + '</a>'; 
        link = this.text.replace(hyperlink, anchor_hyperlink);

        return link; 
    }

}