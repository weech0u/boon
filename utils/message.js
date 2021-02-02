/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-02 15:12:14
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-02 15:34:16
 */
function sendMessage(socket, type, msg) {
  socket.emit(type, msg)
}
module.exports = {
  sendMessage
}