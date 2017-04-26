/* global Vue, $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      errors: [],
      newPersonName: "",
      newPersonBio: "",
      nameFilter: "",
      bioFilter: ""
    },
    computed: {
      filteredPeople: function() {
        var lowerNameFilter = this.nameFilter.toLowerCase();
        var lowerBioFilter = this.bioFilter.toLowerCase();
        var filtered = this.people.filter(function(person) {
          var lowerName = person.name.toLowerCase();
          var lowerBio = person.bio.toLowerCase();
          return lowerName.indexOf(lowerNameFilter) !== -1 && lowerBio.indexOf(lowerBioFilter) !== -1;
        });
        return filtered;
      }
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
