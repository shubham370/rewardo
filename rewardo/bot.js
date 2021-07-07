

const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const download = require('./index.js');
const data = require('./data.json');
const path = require('path');

const client = new Discord.Client();
const prefix = config.prefix;

//connect bot to server
client.login(config.token);

//client.on is called event handler
client.on('ready', readyDiscord);


function readyDiscord(){
    console.log("😃");

}

client.on('message', msg => {
    if (msg.content === '!members') {
        const guild = client.guilds.cache.get('841684300449185793');
        const memberCount = guild.memberCount;
    
        msg.reply(memberCount + " members online");
    }

  });


client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === 'what is my avatar') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
  });




client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	
  if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'plag') {
		if (!args.length) {
			return message.channel.send(`please enter !plag fileId fileName, ${message.author}!`);
		}

    // download file from drive
    
     download.downloadFile(download.drive, args[0], args[1]);

		message.channel.send(`${args[1]} has been downloaded`);
	}
  else if(command === 'upload')
  {
    if(!args.length)
    {
      return message.channel.send(`please enter !upload filePath, ${message.author}!`);
    }

    //upload file to drive

    download.uploadFile(args[0]);

    //display message in chat that the file has been uploaded
    message.channel.send(`${args[0]} file has been uploaded ${message.author}`);


    //get author of message




    //count the number of words in file and the number of pages


    //code ... .. .. .



    //find a way to get message.author in a string form so that you can write
    //data.author.wordcount = "100"; instead of pointed out shubham specifically

    data.shubham.wordcount = "100";
    

    // get date when being uploaded

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    // prints date & time in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);
    data.shubham.LastUploaded = year + "-" + month + "-" + date;


    fs.writeFile('data.json', JSON.stringify(data), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(data));
      console.log('writing to ' + 'data.json');
    });
  }


});