const apiURL = "http://localhost:8080/messages";
//const messages = [{"ID":"2","USER_ID":"1","MESSAGE":"Hello","TIMESTAMP":"2019-12-18T13:33:23.121Z"}, 
//{"ID":"3","USER_ID":"2","MESSAGE":"hi","TIMESTAMP":"2019-12-18T13:33:23.121Z"}];

Vue.component('message-component', {
  template: `
    <div class="message">
      <div class="content">
        <p>
          <strong>{{message.NAME}}</strong> 
          <small>{{message.TIMESTAMP}}</small>
          <br>
          {{message.MESSAGE}}
        </p>
      </div>
    </div>
    `,
  props: {
    message: Object
  }
});


new Vue({
  el: "#app",
  data: function () {
    return {
      messages: null
    }
  },

  created: function () {
    this.fetchData();
  },
  
  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', apiURL);
      xhr.onload = function () {
        self.messages = JSON.parse(xhr.responseText);
      }
      xhr.send();
    }
      
    
  }
});


