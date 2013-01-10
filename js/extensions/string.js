//	String Extension
// 	Reference: http://www.websanova.com/tutorials/javascript/extending-javascript-the-right-way?utm_source=javascriptweekly&utm_medium=email#.UKnCsYV58vY

if(!String.prototype.pxToInt)
{
    Object.defineProperty(String.prototype, 'pxToInt',
    {
        value: function()
        {
            return parseInt(this.split('px')[0]);
        },
        enumerable: false
    });
}

if(!String.prototype.isHex)
{
    Object.defineProperty(String.prototype, 'isHex',
    {
        value: function()
        {
            return this.substring(0,1) == '#' &amp;&amp;  
                   (this.length == 4 || this.length == 7) &amp;&amp; 
                   /^[0-9a-fA-F]+$/.test(this.slice(1));
        },
        enumerable: false
    });
}

if(!String.prototype.reverse)
{
    Object.defineProperty(String.prototype, 'reverse',
    {
        value: function()
        {
            return this.split( '' ).reverse().join( '' );
        },
        enumerable: false
    });
}

if(!String.prototype.wordCount)
{
    Object.defineProperty(String.prototype, 'wordCount',
    {
        value: function()
        {
            return this.split(' ').length;
        },
        enumerable: false
    });
}

if(!String.prototype.htmlEntities)
{
    Object.defineProperty(String.prototype, 'htmlEntities',
    {
        value: function()
        {
            return String(this).replace(/&amp;/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },
        enumerable: false
    });
}

if(!String.prototype.stripTags)
{
    Object.defineProperty(String.prototype, 'stripTags',
    {
        value: function()
        {
            return this.replace(/<\/?[^>]+>/gi, '');
        },
        enumerable: false
    });
}

if(!String.prototype.trim)
{
    Object.defineProperty(String.prototype, 'trim',
    {
        value: function()
        {
            return this.replace(/^\s*/, "").replace(/\s*$/, "");
        },
        enumerable: false
    });
}

if(!String.prototype.stripNonAlpha)
{
    Object.defineProperty(String.prototype, 'stripNonAlpha',
    {
        value: function()
        {
            return this.replace(/[^A-Za-z ]+/g, "");
        },
        enumerable: false
    });
}

if(!Object.prototype.sizeof)
{
    Object.defineProperty(Object.prototype, 'sizeof',
    {
        value: function()
        {
            var counter = 0;
            for(index in this) counter++;
            
            return counter;
        },
        enumerable: false
    });
}

if(!String.prototype.capitalize)
{
    Object.defineProperty(String.prototype, 'capitalize',
    {
       value: function()
       {
           return this.slice(0,1).toUpperCase() + this.slice(1).toLowerCase();
       },
       enumerable: false
    });
}
