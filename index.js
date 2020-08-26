const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("pogchamp");
});

var conversations = {};



client.on('message', msg => {
    if (msg.content === 'o.open' && msg.channel.type !== 'dm') {
        if (Object.keys(conversations).includes(msg.author.id)) {
            msg.author.send("Please finish your previous request");
        } else {
            msg.author.send("So I see you want an osu! overlay. First off what is the username to your channel. Please use the correct cases you want. For example, ninjastar1104 will be put in the overlay as ninjastar1104, not Ninjastar1104").then(() => {
                conversations[msg.author.id] = {
                    data: {},
                    stage: 0
                };
            }).catch(() => {
                console.warn("It didn't work. Now that is very SadChamp");
            });
        }
        msg.delete();       
    } else if (msg.channel.type === 'dm' && Object.keys(conversations).includes(msg.author.id)) {
        let conversation = conversations[msg.author.id];
        switch (conversation.stage){
            case 0:
                conversation.data.twitchUsername = msg.content;
                msg.author.send("What color scheme would you like the overlay to be?");
                conversation.stage++;
                break;
            case 1:
                conversation.data.colorScheme = msg.content;
                msg.author.send("How many webcam slots would you like? (0-2)");
                conversation.stage++;
                break;
            case 2:
                conversation.data.webcamSlots = msg.content;
                msg.author.send("Would you like a waifu on the overlay? If so, who? If no, just respond with no.");
                conversation.stage++;
                break;
            case 3:
                conversation.data.waifu = msg.content;
                msg.author.send("Would you like a spot for a pp counter?");
                conversation.stage++;
                break;
            case 4:
                conversation.data.ppCounter = msg.content;
                msg.author.send("Would you like a spot for chat in the overlay?");
                conversation.stage++;
                break;
            case 5:
                conversation.data.chat = msg.content;
                msg.author.send("What extras would you like? (Maximum of 3) `Recent Follower` `Recent Sub` `Recent Donator` `Recent Cheer` `Now Playing`");
                conversation.stage++;
                break;
            case 6:
                conversation.data.extras = msg.content;
                client.users.fetch('367449617056530442').then(user => {
                    user.send(
                        `**User:** ${msg.author}\n` +
                        `**Twitch Username:** ${conversation.data.twitchUsername}\n` +
                        `**Color Scheme:** ${conversation.data.colorScheme}\n` +
                        `**Webcam Slots:** ${conversation.data.webcamSlots}\n` +
                        `**Waifu:** ${conversation.data.waifu}\n` +
                        `**PP Counter:** ${conversation.data.ppCounter}\n` +
                        `**Chat:** ${conversation.data.chat}\n` +
                        `**Extras:** ${conversation.data.extras}\n`
                    ).then(() => {
                        msg.author.send("Thank you for your response. It will be finished as soon as possible ^.^");
                        delete conversations[msg.author.id];
                    }).catch(() => {
                        console.warn("Hey that didn't'n't work");
                    });
                }).catch(err => {
                    console.warn("Hey that didn't work", err);
                });
                break;    
        }
    }
})

client.login(process.env.TOKEN);

const app = require('express')();
app.get('/', (req, res) => res.send("stay up"));
app.listen(3000, () => console.log("listening on port 3000"));