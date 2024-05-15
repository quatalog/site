"use strict";
const search_helper = async function(event,from_course_page = true) {
        event.preventDefault();
        // "a     b   cde 12" => "a b cde 12"
        const input = document.getElementById("search").value.split(" ").join(" ");

        var course_code = false;
        if(input.length == 8) {
                // "abcd1345" => ["abcd","1345"] 
                course_code = input.match(/.{1,4}/g)
        } else if(input.replace(/ |-/g,"").length == 8) {
                // "abcd - 1345" => ["abcd","1345"]
                const arr = input.split(/(?:-| )+/);
                if(arr.length == 2) course_code = arr;
        }
        
        // only do this logic if the string might be a course code
        // avoid having to fetch the courses_list if it definitely isn't one
        if(course_code) {
                // ["abcd","1345"] => "ABCD-1345"
                course_code[0] = course_code[0].toUpperCase();
                const code_str = course_code.join("-");

                // check if "ABCD-1345" is a real course code
                const course_exists = await fetch(
                                from_course_page ? "../json/courses_list.json" : "json/courses_list.json"
                        )
                        .then(list => list.json())
                        .then(list => list.includes(code_str));
                
                // if it is, redirect to it
                if(course_exists) {
                        if(from_course_page) {
                                location.href = code_str;
                        } else {
                                location.href = "courses/" + code_str;
                        }
                        return;
                }
        }

        if(from_course_page) {
                location.href = "../search?search=" + encodeURIComponent(input);
        } else {
                location.href = "search?search=" + encodeURIComponent(input);
        }
}
