//"A" to "B" Conversion
function transformTypedChar(charStr) 
{
    return charStr == "a" ? "b" : charStr == "b" ? "a" : charStr;
    //The first charStr is comparing the a to b value but the second charStr is doing the exact opposite of the b to a to have only variable switch around
}

function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

function offsetToRangeCharacterMove(el, offset) {
    return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
}

function setInputSelection(el, startOffset, endOffset) {
    el.focus();
    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        el.selectionStart = startOffset;
        el.selectionEnd = endOffset;
    } else {
        var range = el.createTextRange();
        var startCharMove = offsetToRangeCharacterMove(el, startOffset);
        range.collapse(true);
        if (startOffset == endOffset) {
            range.move("character", startCharMove);
        } else {
            range.moveEnd("character", offsetToRangeCharacterMove(el, endOffset));
            range.moveStart("character", startCharMove);
        }
        range.select();
    }
}

$("#foo").keypress(function(evt) 
{
    if (evt.which) 
	{
        var charStr = String.fromCharCode(evt.which);
        var transformedChar = transformTypedChar(charStr);
        if (transformedChar != charStr) 
	{
            var sel = getInputSelection(this), val = this.value;
            this.value = val.slice(0, sel.start) + transformedChar + val.slice(sel.end);

            // Move the caret
            setInputSelection(this, sel.start + 1, sel.start + 1);
            return false;
        }
    }
});

//Active Log
$('body').keyup(function(e){
    if(e.keyCode == 8){
        // user has pressed backspace
        array.pop();
    }
    if(e.keyCode == 32){
        // user has pressed space
        array.push('');
    }
 });