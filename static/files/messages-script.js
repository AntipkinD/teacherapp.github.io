(function(){

    var chat = {
      messageToSend: '',
      messageResponses: [
        'Пон'
      ],
      init: function() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
      },
      cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
        this.$button = $('button');
        this.$textarea = $('#message-to-send');
        this.$chatHistoryList =  this.$chatHistory.find('ul');
      },
      bindEvents: function() {
        this.$button.on('click', this.addMessage.bind(this));
        this.$textarea.on('keyup', this.addMessageEnter.bind(this));
      },
      render: function() {
        this.scrollToBottom();
        if (this.messageToSend.trim() !== '') {
          var template = Handlebars.compile( $("#message-template").html());
          var context = {
            messageOutput: this.messageToSend,
            time: this.getCurrentTime()
          };

          this.$chatHistoryList.append(template(context));
          this.scrollToBottom();
          this.$textarea.val('');

          // responses
          var templateResponse = Handlebars.compile( $("#message-response-template").html());
          var contextResponse = {
            response: this.getRandomItem(this.messageResponses),
            time: this.getCurrentTime()
          };

          setTimeout(function() {
            this.$chatHistoryList.append(templateResponse(contextResponse));
            this.scrollToBottom();
          }.bind(this), 1500);

        }

      },

      addMessage: function() {
        this.messageToSend = this.$textarea.val()
        this.render();
      },
      addMessageEnter: function(event) {
          // enter was pressed
          if (event.keyCode === 13) {
            this.addMessage();
          }
      },
      scrollToBottom: function() {
         this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
      },
      getCurrentTime: function() {
        return new Date().toLocaleTimeString().
                replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      },
      getRandomItem: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
      }

    };

    chat.init();

    var searchFilter = {
      options: { valueNames: ['name'] },
      init: function() {
        var userList = new List('people-list', this.options);
        var noItems = $('<li id="no-items-found">No items found</li>');

        userList.on('updated', function(list) {
          if (list.matchingItems.length === 0) {
            $(list.list).append(noItems);
          } else {
            noItems.detach();
          }
        });
      }
    };

    searchFilter.init();

})();

// Ссылка на сервер для отправки и получения сообщений
const serverUrl = 'http://localhost:8080/api/v1/message';
const userId = 'yourUserId';
const groupId = 'group123';

// Функция для отправки запросов на сервер
async function sendRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Функция для загрузки сообщений с сервера по id группы
async function loadMessages(groupId) {
    const data = { groupId };
    const messages = await sendRequest(`${serverUrl}/messages`, data);
    // Обработка полученных сообщений
    return messages;
}

// Функция для отправки нового сообщения на сервер
async function sendMessage(userId, groupId, text) {
    const data = { userId, groupId, text };
    await sendRequest(`${serverUrl}/send-message`, data);
}

// Пример использования функций
loadMessages(groupId)
    .then(messages => {
        // Отображение полученных сообщений

        // Отображение сообщений пользователя в другом углу чата
        const userMessages = messages.filter(message => message.userId === userId);
        // Отображение остальных сообщений
        const otherMessages = messages.filter(message => message.userId !== userId);
    });

// Обработчик нажатия на кнопку отправки сообщения
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', async () => {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText) {
        // Отправка нового сообщения
        await sendMessage(userId, groupId, messageText);
        // Очистка поля ввода после отправки сообщения
        messageInput.value = '';
    }
});