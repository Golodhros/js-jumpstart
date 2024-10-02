// Template manager object with caching for compiled templates
// It will need error management if used on production
var TplManager = {
    templates: {},
    cachedTemplates: {},

    // Returns compiled template
    getCachedTemplate: function(tplName){
        // If compiled template already exists, return that
        if(this.cachedTemplates.hasOwnProperty(tplName)) {
            return this.cachedTemplates[tplName];
        }

        if(this.templates.hasOwnProperty(tplName)) {
            // Compile and store the template functions
            this.cachedTemplates[tplName] = _.template(this.templates[tplName]);
        }

        return this.cachedTemplates[tplName];
    }
};

// Example
TplManager.getCachedTemplate('userProfile');