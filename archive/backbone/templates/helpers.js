// Instead of
<% if(typeof(avatar) === 'undefined') %>
     <img src="<%= avatar %>" />
   <% } else { %>
     <img src="images/default_avatar.png" />
<% } %>


// A cleaner template
var tplString = '<img src="<%= getAvatar(avatar) %>" />';
var data = this.model.getJSON();
var html = _.template(tplString, _.extend(data, {
    // A template helper function to be merged with data
    getAvatar: function(avatar){
        return avatar || "images/default_avatar.png";
    }
}));