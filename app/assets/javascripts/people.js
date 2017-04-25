/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [
        {name: "Bob", bio: "Small batch salvia Marfa chillwave delectus", bioVisible: false},
        {name: "Alice", bio: "Tattooed letterpress gluten-free ugh", bioVisible: false},
        {name: "Tibor", bio: "Incididunt photo booth ethical reprehenderit adipisicing", bioVisible: false},
        {name: "Ziva", bio: "Excepteur shabby chic semiotics Marfa", bioVisible: false}
      ],
      newPersonName: "",
      newPersonBio: ""
    },
    methods: {
      toggleBio: function(inputPerson) {
        inputPerson.bioVisible = !inputPerson.bioVisible;
      },
      addPerson: function() {
        this.people.push({name: this.newPersonName, bio: this.newPersonBio, bioVisible: false});
        this.newPersonName = "";
        this.newPersonBio = "";
      },
      deletePerson: function(inputPerson) {
        var index = this.people.indexOf(inputPerson);
        this.people.splice(index, 1);
      }
    }
  });
});
