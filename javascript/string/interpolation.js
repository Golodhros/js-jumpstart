/**
 * Easy String interpolation
 * @param  {string} s String to interpolate
 * @param  {object} d Hash with values
 * @return {string}   String interpolated
 * @example
 * var build = function(id, href) {
 *     var options = {
 *             id: id,
 *             href: href
 *         };
 *
 *     return t('<div id="tab"><a href="{href}" id="{id}"></div>', options);
 * }
 * @author @thomasfuchs
 */
function t(s, d) {
    for (var p in d) {
        s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
    }
    return s;
}