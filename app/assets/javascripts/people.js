/* global Vue, $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      errors: [],
      newPersonName: "",
      newPersonBio: ""
    },
    mounted: function() {
      $.get("/api/v1/people", function(responseData) {
        this.people = responseData;
      }.bind(this));
    },
    methods: {
      toggleBio: function(inputPerson) {
        inputPerson.bioVisible = !inputPerson.bioVisible;
      },
      addPerson: function() {
        this.errors = [];
        var params = {name: this.newPersonName, bio: this.newPersonBio};
        $.post("/api/v1/people", params, function(responseData) {
          this.people.push(responseData);
          this.newPersonName = "";
          this.newPersonBio = "";
        }.bind(this)).fail(function(response) {
          this.errors = response.responseJSON.errors;
        }.bind(this));
      },
      deletePerson: function(inputPerson) {
        var index = this.people.indexOf(inputPerson);
        this.people.splice(index, 1);
      }
    }
  });
});
