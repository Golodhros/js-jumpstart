var TplManager = {
    templates: {}
};

TplManager.templates.userProfile = [
    '<h3> <%= name %> </h3>',
    '<img src="<%= avatar %>" />'
].join('\n');

TplManager.templates.userLogin = [
    '<ul>',
    '<li>Username: <input type="text" /></li>',
    '</ul>'
].join('\n');