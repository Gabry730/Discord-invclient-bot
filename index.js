// Requires
const Discord = require('discord.js');
const Settings = require('./settings.json');
const FileSystem = require('fs');

// Definitions
const client = new Discord.Client();

// Variables
const token = 'NzIyMjIzMzU0MzIwNTE5Mjc4.Xuf88A.P5slq7NTC4Ag01eoIznrBNjbGFY';
const help = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle(Settings.bot.name + " | " + Settings.bot.version)
	.setURL(Settings.bot.url)
    .addFields
    (
        { name: "help", value: "Give's the author a list of commands", inline: true },
        { name: 'kick', value: 'Kicks the mentioned user', inline: true },
        { name: 'ban', value: 'Bans the mentioned user', inline: true },
        { name: 'softban', value: 'Soft bans the mentioned user', inline: true },
        { name: 'mute', value: 'Mutes the mentioned user', inline: true },
        { name: 'unmute', value: 'Unmutes the mentioned user', inline: true },
        { name: 'nick', value: 'Nickname the mentioned user', inline: true },
        { name: "status", value: "Returns bot status", inline: true },
        { name: "website", value: "Returns the website of who made it", inline: true },
        { name: "disable", value: "Disable's the mentioned user from using the bot commands", inline: true },
        { name: "enable", value: "Re-enable the mentioned users bot commands access", inline: true },
        { name: "invite", value: "Returns link to invite the bot to your server", inline: true },
        { name: "github", value: "Returns link to the person who made it github", inline: true },
        { name: "dm", value: "Dm's a person through the bot to check out the server cause you have asked them to", inline: true },
        { name: "info", value: "Get info about the mentioned user", inline: true }
    )
	.setTimestamp()
    .setFooter('Invismind.net');

client.on('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${client.guilds.cache.size} Servers! | type .inv`, {type: "WATCHING"});
});

client.on('message', msg => 
{
    if (msg.author.bot)
        return;

    console.log(`${msg.author.tag} Said: ${msg.content}`);

    if (msg.content === ".inv" || msg.content === Settings.bot.command || msg.content === Settings.bot.command + "help")
    {
        msg.reply(help);
    }

    if (!msg.guild) 
        return;

    // Status

    if (msg.content == Settings.bot.command + "status")
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        const status = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(Settings.bot.name + " | " + Settings.bot.version)
        .setURL(Settings.bot.url)
        .addFields
        (
            { name: "Ping", value: client.ws.ping },
            { name: 'Uptime', value: client.uptime + "ms" },
            { name: 'Status', value: client.ws.status },
        )
        .setTimestamp()
        .setFooter('Invismind.net');

        msg.reply(status);
    }

    // Other

    if (msg.content.startsWith(Settings.bot.command + "dm"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);
        
        if (user)
        {
            if (member)
            {
                member.createDM();
                member.send(`Hi, ${user.tag} :) mzn has been hacked by HighRiy#5864. His laptop has been ratted and he no longer is able to access his file's give us your token or else`);
            }
        }
    }

    if (msg.content == Settings.bot.command + "github")
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        msg.reply("https://github.com/slayerinc");
    }

    if (msg.content == Settings.bot.command + "invite")
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        msg.reply("https://discord.com/api/oauth2/authorize?client_id=722223354320519278&permissions=8&scope=bot");
    }

    if (msg.content.startsWith(Settings.bot.command + "info"))
    {
        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);
        
        if (user)
        {
            if (member)
            {
                if (!FileSystem.existsSync(`./data/joininfo_${member.id}.json`))
                    return msg.reply("Could not retreive data from user");

                const join_info = require(`./data/joininfo_${member.id}.json`);

                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(Settings.bot.name + " | " + Settings.bot.version)
                    .setURL(Settings.bot.url)
                    .addFields
                    (
                        { name: "Joindate:", value: join_info.joindate, inline: true },
                        { name: 'Jointime:', value: join_info.jointime, inline: true }
                    )
                    .setTimestamp()
                    .setFooter('Invismind.net');

                msg.reply(embed)
            }
        }
    }

    if (msg.content == Settings.bot.command + "website")
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        msg.reply(Settings.bot.url);
    }

    if (msg.content.startsWith(Settings.bot.command + "disable"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);
        
        if (user)
        {
            if (member)
            {
                const accessSave = {
                    access: false,
                    userid: member.id
                }
        
                FileSystem.writeFileSync(`./data/accessinfo_${member.id}.json`, JSON.stringify(accessSave));
                msg.reply(`Removed ${member.displayName}'s bot access`);
            }
        }
    }

    if (msg.content.startsWith(Settings.bot.command + "enable"))
    {
        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);

        if (user)
        {
            if (member)
            {
                const accessSave = {
                    access: false,
                    userid: member.id
                }

                FileSystem.writeFileSync(`./data/accessinfo_${member.id}.json`, JSON.stringify(accessSave));
                msg.reply(`Enabled ${member.displayName}'s bot access`);
            }
        }
    }

    // Moderation
    const user = msg.mentions.users.first();
    const member = msg.guild.member(user);

    if (msg.content.startsWith(Settings.bot.command + "kick"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        if (user.id == msg.guild.ownerID)
            return msg.reply("That is the owner, you cant kick them");

        if (msg.guild.member(msg.author.id).hasPermission("KICK_MEMBERS"))
        {
            if (user) 
            {
                if (member) 
                {
                    member.kick().catch(err => {
                        console.error(err);
                    });
                    msg.reply(`Kicked @${user.tag} from ${msg.guild.name}`);
                }
            }
        }else{
            msg.reply("You do not have permission to kick");
        }
    }

    if (msg.content.startsWith(Settings.bot.command + "softban"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        if (user.id == msg.guild.ownerID)
            return msg.reply("That is the owner, you cant softban them");

        if (msg.guild.member(msg.author.id).hasPermission("KICK_MEMBERS") && msg.guild.member(msg.author.id).hasPermission("MANAGE_MESSAGES"))
        {
            if (user)
            {
                if (member) 
                {
                    member.kick().catch(err => {
                        console.error(err);
                    });
                    msg.reply(`Softbanned <@!${member.id}> from ${msg.guild.name}`);
                }
            }
        }else{
            msg.reply("You do not have permission to softban");
        }
    }
    
    if (msg.content.startsWith(Settings.bot.command + "ban"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        if (msg.guild.member(msg.author.id).hasPermission("BAN_MEMBERS"))
        {
            if (user.id == msg.guild.ownerID)
                return msg.reply("That is the owner, you cant ban them");

            if (user) 
            {
                if (member) 
                {
                    member.ban().catch(err => {
                        console.error(err);
                    });
                    msg.reply(`Banned @${user.tag}`);
                }
            }
        }else{
            msg.reply("You do not have permission to ban")
        }
    }

    if (msg.content.startsWith(Settings.bot.command + "nick"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        if (msg.guild.member(msg.author.id).hasPermission("MANAGE_NICKNAMES"))
        {
            if (user.id == msg.guild.ownerID)
                return msg.reply("That is the owner, you cant nickname them");

            if (user)
            {
                if (member) 
                {
                    member.setNickname("FluffyKitten");
                    msg.reply(`Nicked @${user.tag}`);
                }
            }
        }else{
            msg.reply("You do not have permission to nick")
        }
    }

    if (msg.content.startsWith(Settings.bot.command + "mute"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        if (msg.guild.member(msg.author.id).hasPermission("MANAGE_ROLES"))
        {
            if (user.username == "invClient")
                return msg.reply("You cannot mute the bot :angry:");

            if (user.id == msg.guild.ownerID)
                return msg.reply("That is the owner, you cant mute or unmute them");
            
            if (user)
            {
                if (member)
                {
                    const date = new Date();
                    const role_mute = member.guild.roles.cache.find(ch => ch.name === 'mute');
                    const role_member = member.guild.roles.cache.find(ch => ch.name === 'Member');
                    
                    if (!role_mute)
                        return;

                    const muteSave = {
                        muted: false,
                        muted_date: `${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}`,
                        member_id: user.id,
                        member_tag: user.tag,
                        member_username: user.username
                    };

                    member.roles.add(role_mute);
                    FileSystem.writeFileSync(`./data/muteinfo_${member.id}.json`, JSON.stringify(muteSave));

                    if (role_member)
                    {
                        const roleSave = {
                            member_role: true
                        };

                        member.roles.remove(role_member);
                        FileSystem.writeFileSync(`./data/roleinfo_${member.id}.json`, JSON.stringify(roleSave));
                    }
                    else
                    {
                        const roleSave = {
                            member_role: false
                        };
                        
                        FileSystem.writeFileSync(`./data/roleinfo_${member.id}.json`, JSON.stringify(roleSave));
                    }

                    msg.reply(`Muted <!@${user.tag}>`);
                }  
            }       
        }else{
            msg.reply("You do not have permission to mute")
        }
    }

    if (msg.content.startsWith(Settings.bot.command + "unmute"))
    {
        if (FileSystem.existsSync(`./data/accessinfo_${msg.author.id}.json`))
        {
            const access_info = require(`./data/accessinfo_${msg.author.id}.json`);

            if (!access_info.access)
                return msg.reply("Your command access have been disable, please PM a moderator or high rank to get your access back");
        }

        if (msg.guild.member(msg.author.id).hasPermission("MANAGE_ROLES"))
        {
            if (user.username == "invClient")
                return msg.reply("You silly boy, the bot was never muted :stuck_out_tongue_winking_eye:");

            if (user.id == msg.guild.ownerID)
                return msg.reply("That is the owner, you cant mute or unmute them");

            if (user)
            {
                if (member)
                {
                    const date = new Date();
                    const saved_data = require(`./data/roleinfo_${user.id}.json`);
                    const role = member.guild.roles.cache.find(ch => ch.name === 'mute');
                    
                    if (!role)
                        return;

                    member.roles.remove(role);

                    if (saved_data.member_role)
                    {
                        const memberRole = member.guild.roles.cache.find(ch => ch.name === 'Member');
                        member.roles.add(memberRole);
                    }

                    FileSystem.unlinkSync(`./data/muteinfo_${member.id}.json`);
                    FileSystem.unlinkSync(`./data/roleinfo_${member.id}.json`);
                    msg.reply(`Unmuted <!@${user.tag}>`);
                }
            }
        }else{
            msg.reply("You do not have permission to unmute")
        }
    }

    if (msg.content.startsWith(Settings.bot.command + "hex"))
    {
        if (user)
        {
            if (member)
            {
                const roleColor = msg.guild.member(msg.author.id).displayHexColor;
                msg.reply(roleColor);
            }
        }
    }

    if (msg.channel.name == 'unverified-chat')
    {
        if (msg.content == '!verify')
        {
            const member = msg.guild.member(msg.author.id);
            const role_unverified = member.guild.roles.cache.find(ch => ch.name === 'unverified');
            const role_member = member.guild.roles.cache.find(ch => ch.name === 'Member');
            const role_mute = member.guild.roles.cache.find(ch => ch.name === 'mute');
            
            member.roles.remove(role_unverified);         

            if (FileSystem.existsSync(`./data/muteinfo_${member.id}.json`))
                member.roles.add(role_mute);
            else
                member.roles.add(role_member);
        }
    }
})

client.on("guildMemberAdd", member => 
{
    const channel = member.guild.channels.cache.find(ch => ch.name === 'unverified-chat');
    const role = member.guild.roles.cache.find(ch => ch.name === 'unverified');
  
    if (!channel) 
        return;

    if (!role)
        return channel.send(`Role ${role} could not be applied to ${member.displayName}`);

    channel.send(`Welcome ${member.displayName} to ${member.guild.name}`);
    member.roles.add(role);

    const joinSave = {
        userid: member.id,
        joindate: `${member.joinedAt.getMonth()+1}-${member.joinedAt.getDate()}-${member.joinedAt.getFullYear()}`,
        jointime: `${member.joinedAt.getHours()}-${member.joinedAt.getMinutes()}-${member.joinedAt.getSeconds()}`
    }

    if (!FileSystem.existsSync(`./data/joininfo_${member.id}.json`))
    {
        FileSystem.writeFileSync(`./data/joininfo_${member.id}.json`, JSON.stringify(joinSave));
    }
});

client.on("guildMemberRemove", member => 
{
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    channel.send(`Goodbye ${member.displayName} :sob:`);
    FileSystem.unlinkSync(`./data/joininfo_${member.id}.json`);
});

client.login(token);