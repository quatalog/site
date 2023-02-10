const search_helper = function() {
        const input = document.getElementById("search").value;
        console.log(input);
/*
        const courseCodeInput = elem.value.replace(" ", "").replace("-", "");
        const subCode = courseCodeInput.substring(0,4).toUpperCase();
        const courseNum = courseCodeInput.substring(courseCodeInput.length-4,courseCodeInput.length);
        if(`${subCode}-${courseNum}` in catalog){
            // course exists
            window.location.href = "./coursedisplay.html?course="+subCode+"-"+courseNum;
        } else {
            // course doesn't exist
            window.location.href = "./search.html?search="+encodeURIComponent(elem.value);
            showSearchResults();
        }*/
}
