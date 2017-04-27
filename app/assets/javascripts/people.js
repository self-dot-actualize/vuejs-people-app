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
      bioFilter: "",
      sortAttribute: "name",
      sortAscending: true
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
        var sorted = filtered.sort(function(person1, person2) {
          if (this.sortAscending) {
            // return person1[this.sortAttribute] > person2[this.sortAttribute];
            return person1[this.sortAttribute].localeCompare(person2[this.sortAttribute]);
          } else {
            // return person1[this.sortAttribute] < person2[this.sortAttribute];
            return person2[this.sortAttribute].localeCompare(person1[this.sortAttribute]);
          }
        }.bind(this));
        return sorted;
      }
    },
    mounted: function() {
      $.get("/api/v1/people", function(responseData) {
        this.people = responseData;
      }.bind(this));
    },
    methods: {
      setSortAttribute: function(inputAttribute) {
        if (inputAttribute === this.sortAttribute) {
          this.sortAscending = !this.sortAscending;
        } else {
          this.sortAscending = true;
        }
        this.sortAttribute = inputAttribute;
      },
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
