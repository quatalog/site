"use strict";
const search_helper = function(event) {
        event.preventDefault();
        // "a     b   cde 12" => "a b cde 12"
        const input = document.getElementById("search").value.split(" ").join(" ");
        console.log(input);

        var course_code = false;
        if(input.length == 8) {
                // "abcd1345" => ["abcd","1345"] 
                course_code = input.match(/.{1,4}/g)
        } else if(input.length == 9) {
                // "abcd - 1345" => ["abcd","1345"]
                course_code = input.split(/(?:,| )+/);
        }
        // only do this logic if the string might be a course code
        if(course_code) {
                // ["abcd","1345"] => "ABCD-1345"
                course_code[0] = course_code[0].toUpperCase();
                const code_str = course_code.join("-");

                // check if "ABCD-1345" is a real course code
                const course_exists = fetch("../courses_list.json")
                        .then(list => list.json())
                        .then(list => code_str in list);
                
                // if it is, redirect to it
                if(course_exists) {
                        const loc = window.location.pathname;
                        // handle both homepage and courses pages
                        if(loc.substring(0,loc.lastIndexOf('/')) != "/courses") {
                                location.href = "courses/"+code_str;
                        } else {
                                location.href = code_str;
                        }
                        return;
                }
        }

        location.href = "../search?search=" + encodeURIComponent(input);
}
