const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({path: __dirname + '/.env'})
const request = require('request');
const http = require('http')
const token_tg = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token_tg, {polling: true});

function createKeyboardOpts(list, elementsPerSubArray, args) {
    let list1 = listToMatrix(list, elementsPerSubArray);
    if (args) {
        list1.push(args);
    }
    const opts = {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            resize_keyboard: true,
            inline_keyboard: list1
        })
    };
    return opts;
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }

    return matrix;
}


bot.onText(/\/start/, (msg) => {
        request('http://localhost:8989/search/groups', function (error, response, body) {
        let arr = JSON.parse(body)
        console.log(arr)
        let keyboard = createKeyboardOpts(arr.map(group => {
            return {
                text: group,
                callback_data: "group:" + group
            }
        }), 1, [{text: "Продовжити 💾", callback_data: "save_groups"}]);
        bot.sendMessage(msg.chat.id, "Виберіть групи", keyboard)
    });
})

function getDepartment(msg){
    request('http://localhost:8989/search/departmentsNumberMap', function (error, response, body) {
        let map = new Map(Object.entries(JSON.parse(body))),
            array = Array.from(map,([key,value]) => ({key,value}))
        let keyboard = createKeyboardOpts(array.map(obj => {
            return {
                text: obj.key,
                callback_data: "dep:" + obj.value + ":" + obj.key
            }
        }), 1, [{text: "Продовжити 💾", callback_data: "save_dep"},{text: "Пропустити 💾", callback_data: "continue_dep"}]);
        bot.sendMessage(msg, "Виберіть кафедри", keyboard)
    });
}

function selectGroupKeyboard(msg,reply,chat){
    let groupsForUser = []

    let userClickData = reply.split(":")[1];

    msg.message.reply_markup.inline_keyboard.map(arr => {
        if(arr[0].text.startsWith("✅| ")){
            groupsForUser.push(arr[0].text.split(" ")[1])
        }
    })

    if(reply === "save_groups"){
        return groupsForUser
    }

    if(!groupsForUser.includes(userClickData)){
        groupsForUser.push(userClickData);
        bot.editMessageText('Виберіть групи',{
            chat_id: chat,
            message_id: msg.message.message_id,
            reply_markup: JSON.stringify({
                inline_keyboard: msg.message.reply_markup.inline_keyboard.map(arr => {
                    if (arr[0].callback_data.includes(reply)) {
                        arr[0].text = "✅| " + arr[0].text
                    }
                    return arr;
                })
            })
        })
    }else{
        groupsForUser.filter(group => group !== userClickData)
        bot.editMessageText("Виберіть групи", {
            chat_id: chat,
            message_id: msg.message.message_id,
            reply_markup: JSON.stringify({
                inline_keyboard: msg.message.reply_markup.inline_keyboard.map(arr => {
                    if (arr[0].callback_data.includes(reply)) {
                        arr[0].text = arr[0].text.replace("✅| ", "");
                    }
                    return arr
                })
            })
        })
    }
}

bot.on('callback_query', (msg) => {
    let chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    let reply = msg.data;
    let answ = reply.split(":")[0]
    switch (answ){
        case "group":{
            selectGroupKeyboard(msg, reply, chat);
            break
        }
        case "save_groups":{
            let continueGroup = selectGroupKeyboard(msg,reply,chat)
            getDepartment(chat)
            break
        }

    }
})



