//	De Morgan’s laws.
//	They are two ways to rewrite a boolean expression into an equivalent one:
//		1) not (a or b or c) ⇔ (not a) and (not b) and (not c)
//		2) not (a and b and c) ⇔ (not a) or (not b) or (not c)

//	If you have trouble remembering these laws, a simple summary is “Distribute the not and switch and/or.” (Or going the other way, you “factor out the not.”)
//	You can sometimes use these laws to make a boolean expression more readable. For instance, if your code is:

	if (!(file_exists && !is_protected)) Error("Sorry, could not read file.");

//	It can be rewritten to:

	if (!file_exists || is_protected) Error("Sorry, could not read file.");
