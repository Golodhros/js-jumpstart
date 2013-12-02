/**
 * Toggle of checkboxes
 * @param sId container id
 * @method toggle_checkboxes
 * Ref: snipplr.com/view/743/togglecheckboxes/
 */
function toggle_checkboxes(sId) {
    if (!document.getElementById){ return; }
    if (!document.getElementsByTagName){ return; }

    var aInputs = document.getElementById(sId).getElementsByTagName("input"),
		nLength = aInputs.length,
		i 		= 0;

	for(; i < nLength; i++) {
        if (aInputs[i].type == 'checkbox'){
            aInputs[i].checked = !aInputs[i].checked;
        }
    }
}
