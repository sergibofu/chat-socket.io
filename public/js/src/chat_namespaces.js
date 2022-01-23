exports.chatInfra= (io,  $) => {
    chatInfra = io.connect('/chat_infra')
    console.log('hello there')
}

exports.chatCom = (io,  $) => {
    chatInfra = io.connect('/chat_com')
    console.log('yes, hi')
}