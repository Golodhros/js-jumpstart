/* jshint ignore:start */

// Form Related
toBeChecked()
    only for tags that have checked attribute
    e.g. expect($('<input type="checkbox" checked="checked"/>')).toBeChecked()

toBeDisabled()
    e.g. expect('<input type="submit" disabled="disabled"/>').toBeDisabled()

toBeEmpty()
    Checks for child DOM elements or text.

toBeFocused()
    e.g. expect($('<input type="text" />').focus()).toBeFocused()

toBeSelected()
    only for tags that have selected attribute
    e.g. expect($('<option selected="selected"></option>')).toBeSelected()

toHaveValue(value)
    only for elements on which val can be called (input, textarea, etc)
    e.g. expect($('<input type="text" value="some text"/>')).toHaveValue('some text')


// Events Related
toHandle(eventName)
    e.g. expect($form).toHandle("submit")

toHandleWith(eventName, eventHandler)
    e.g. expect($form).toHandleWith("submit", yourSubmitCallback)

toHaveBeenTriggeredOn(selector)
    if event has been triggered on selector (see "Event Spies", below)

toHaveBeenTriggered()
    if event has been triggered on selector (see "Event Spies", below)

toHaveBeenTriggeredOnAndWith(selector, extraParameters)
    if event has been triggered on selector and with extraParameters

toHaveBeenPreventedOn(selector)
    if event has been prevented on selector (see "Event Spies", below)

toHaveBeenPrevented()
    if event has been prevented on selector (see "Event Spies", below)


// DOM
toHaveClass(className)
    e.g. expect($('<div class="some-class"></div>')).toHaveClass("some-class")

toHaveCss(css)
    e.g. expect($('<div style="display: none; margin: 10px;"></div>')).toHaveCss({display: "none", margin: "10px"})
    e.g. expect($('<div style="display: none; margin: 10px;"></div>')).toHaveCss({margin: "10px"})

toHaveData(key, value)
    value is optional, if omitted it will check only if an entry for that key exists

toHaveHtml(string)
    e.g. expect($('<div><span></span></div>')).toHaveHtml('<span></span>')

toHaveId(id)
    e.g. expect($('<div id="some-id"></div>')).toHaveId("some-id")

toHaveLength(value)
    e.g. expect($('ul > li')).toHaveLength(3)

toHaveProp(propertyName, propertyValue)
    property value is optional, if omitted it will check only if property exists

toHaveText(string)
    accepts a String or regular expression
    e.g. expect($('<div>some text</div>')).toHaveText('some text')

toBeHidden() Elements can be considered hidden for several reasons:
    They have a CSS display value of none.
    They are form elements with type equal to hidden.
    Their width and height are explicitly set to 0.
    An ancestor element is hidden, so the element is not shown on the page.

toBeVisible()
    Elements are considered visible if they consume space in the document. Visible elements have a width or height that is greater than zero.

toBeInDOM()
    Checks to see if the matched element is attached to the DOM
    e.g. expect($('#id-name')[0]).toBeInDOM()

toExist()
    true if element exists in or out of the dom

toBeMatchedBy(jQuerySelector)
    Check to see if the set of matched elements matches the given selector
    e.g. expect($('<span></span>').addClass('js-something')).toBeMatchedBy('.js-something')
    true if the dom contains the element

toContainElement(jQuerySelector)
    e.g. expect($('<div><span class="some-class"></span></div>')).toContainElement('span.some-class')

toContainHtml(string)
    e.g. expect($('<div><ul></ul><h1>header</h1></div>')).toContainHtml('<ul></ul>')

toContainText(string)
    e.g. expect($('<div><ul></ul><h1>header</h1></div>')).toContainText('header')

toEqual(jQuerySelector)
    e.g. expect($('<div id="some-id"></div>')).toEqual('div')
    e.g. expect($('<div id="some-id"></div>')).toEqual('div#some-id')

toHaveAttr(attributeName, attributeValue)
    attribute value is optional, if omitted it will check only if attribute exists

/* jshint ignore:end */
