// can you see this
//

// "i" => italics, <i> </i>
// "b" => bold, <b>
// "u" => underline, <u>

// input => "helloyou"
             01234567

// case #1
// formatting => [[0, 3, "i"]]
// output => "<i>hell</i>oyou"

//. case #2
// formatting => [[0, 3, "i"], [2, 6, "u"]]
// output => "<i>he<u>ll</u></i><u>oyo</u>u"
// <u>thing <i> another </u> thing </i>


// Assumptions
// - we support spaces
// - utf-8
// - no too big input

/*
 function getOpenTags(currentIndex, triples) {
  // look through our triples and return those whose ranges contain the currentIndex

 }

 function shouldCloseTag(currentIndex, triples) {
   // case 1: this tag is acutally closing at this index
   // case 2: this tag needs to close because otherwise overlap
 }

 function shouldOpenTag(currentIndex, triples) {
  // case 1: this index is the beginning of any triple
  // case 2: this index opens because there was an unfinished tag before
      //if currentIndex is inside a triple interval, but getOpenTags does give the tag of that interval
 }

 function closeAllOpenTags() {

  }

 function reopenClosed() {

 }
**/

type Triple {
  start: int, end : int, format: string,
}

const tagMap = {
  i: {start: '<i>', end: '</i>'},
  u: {start: '<u>', end: '</u>'},
  b: {start: '<b>', end: '</b>'}
}


function prettyPrint(input : string, formatting: Triples[]): string {
    let result ='';

    for(let i=0; i<input.length; i++) {
      if(shouldOpenTags(i, formatting)) {
        formatting.forEach((format) => {
          if(i > format[0] && i < format[1]) {
            result = result + tagMap[format[3]].start;
          }
        })
      }

      if(shouldCloseTag(i, formatting)) {
        formatting.forEach((format) => {
          if(i === format[1]) {
            result = result + tagMap[format[3]].end;
          }

          if(i > format[0] && i < format[1]) {
            result = result + tagMap[format[3]].end;
          }
        })
      }

      result = result + input[i];
    }

  return result;

}
