jQuery(function($) {
  
  var webSocket
  
  $('form').submit(function() {
    if(webSocket) {
      webSocket.send($('input').val())
      $('input').val('')
    } else {
      var nickname = $('input').val()

      webSocket = new WebSocket('ws://'+location.hostname+':8888/chat');
      
      webSocket.onopen = function(event) {
        console.log('web socket opened')
        webSocket.send(nickname);
        $('textarea').show()
        $('label').hide()
        $('textarea, input').val('')
      }
      
      webSocket.onmessage = function(event) {
        $('textarea').val($('textarea').val() + event.data)
      }
      
      webSocket.onclose = function(event) {
        console.log('web socket closed')
        $('textarea').hide()
        $('label').show()
        webSocket = null
      }
      
    }
    return false
  })
})