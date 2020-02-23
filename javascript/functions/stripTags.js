function stripTags(htmlstr) {
    var div = document.createElement("div");

    div.innerHTML = htmlstr;

    return div.textContent;
}
