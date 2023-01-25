// Require the necessary discord.js classes
const { Client, Intents, MessageManager, ClientUser } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Stores all the EZ replacements
const replacements = [
    "Doin a bamboozle fren.",
    "I need help, teach me how to play!",
    "Let's be friends instead of fighting okay?",
    "I had something to say, then I forgot it.",
    "ILY<3",
    "I enjoy long walks on the beach and playing Hypixel",
    "Hello everyone! I'm an innocent player who loves everything Hypixel.",
    "Can you paint with all the colors of the wind",
    "When I saw the guy with a potion I knew there was trouble brewing.",
    "Sometimes I sing soppy love songs in the car.",
    "Blue is greener than purple for sure",
    "What happens if I add chocolate milk to macaroni and cheese?",
    "Anybody else really like Rick Astley?",
    "You're a great person! Do you want to play some Hypixel games with me?",
    "I love the way your hair glistens in the light.",
    "In my free time I like to watch cat videos on youtube",
    "Wait... This isn't what I typed!",
    "If the world in Minecraft is infinite....how can the sun revolve around it?",
    "When nothing is right, go left.",
    "I need help, teach me how to play!",
    "Hey Helper, how play game?",
    "Your personality shines brighter than the sun.",
    "Behold, the great and powerful, my magnificent and almighty nemesis!",
    "Please go easy on me, this is my first game!",
    "Your Clicks per second are godly. :eek:",
    "I sometimes try to say bad things and then this happens :(",
    "I like pineapple on my pizza",
    "Why can't the Ender Dragon read a book? Because he always starts at the End.",
    "I heard you like minecraft, so I built a computer so you can minecraft, while minecrafting in your minecraft.",
    "You are very good at this game friend.",
    "Pineapple doesn't go on pizza!",
    "I have really enjoyed playing with you! <3",
    "I like Minecraft pvp but you are truly better than me!",
    "Pls give me doggo memes!",
    "Maybe we can have a rematch?",
    "I like to eat pasta, do you prefer nachos?",
    "With great power... comes a great electricity bill!"
]

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {
    console.log("Found a message!");
    for (i = 0; i < message.content.length; i++)
    {
        if (message.content.startsWith('ez', i) || message.content.startsWith('EZ', i) || message.content.startsWith('Ez', i))
        {
	   // Pulls all webhooks 
           let webhook = await message.channel.fetchWebhooks();
           webhook = webhook.find(x => x.name === "Hypixel E.Z Bot");

           // Creates the initial webhook 
	   if(!webhook) {
                webhook = await message.channel.createWebhook(`Hypixel E.Z Bot`, {
                    avatar: client.user.displayAvatarURL({dynamic: true})
                });
            }

	    // Edits the character before sending it
            await webhook.edit({
                name: message.member.nickname ? message.member.nickname : message.author.username,
                avatar: message.author.displayAvatarURL({dynamic: true})
            })

	    // Deletes the original message with ezz in it. 
            message.delete().catch(m => {})

	    // Picks a random EZ message to send and sends it	
            webhook.send(replacements[Math.floor(Math.random() * replacements.length) + 1]).catch( m => {});

            // Edits webhook back to original bot user
	    await webhook.edit({
                name: `Hypixel E.Z Bot`,
                avatar: client.user.displayAvatarURL({dynamic:true})
            })
                }
            }
});

// Login to Discord with your client's token
client.login(token);
