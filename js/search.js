// parses URL params
const params = window
	.location
	.search
	.slice(1)
	.split("&")
	.map(p => p.split("="))
	.reduce((obj,[key,value]) =>
		({ ...obj, [key]: decodeURIComponent(value) }),
		{}
	);

const search_term = params["search"];

const getSVG = function(name) {
        return '<svg><use href="./icons.svg#'+name+'"></use></svg>';
}

const fuzzy_search_config = {
        limit: 25,
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true,
        threshold: 0.01,
        keys: [
                {
                        name: 'code',
                        weight: 0.1
                },
                {
                        name: 'description',
                        weight: 0.1
                },
                {
                        name: 'name',
                        weight: 0.8
                }
        ]
}

const attr_to_icon = {
        'CI': 'message',
        'HInq': 'magnifying',
        'PDII': 'briefcase',
        'WI': 'pencil',
        'CulmExp': 'cubes'
}

const display_search_results = function(searchable_catalog) {
        const fuse = new Fuse(searchable_catalog,fuzzy_search_config);
        console.log("Searching for " + search_term + "...");
        const results = fuse.search(search_term,{limit:fuzzy_search_config.limit});
        const table = document.getElementById("searchResultsContainer");
        results.forEach(function(search_entry) {
                const entry = search_entry.item;
                const tr = table.insertRow(-1);
                var elemInnerHtml = '<a href="courses/'
                        + entry.code + '">'
                        + '<h3><div><span class="courseName">'
                        + entry.name
                        + '</span><span class="courseCode">'
                        + entry.code + '</span><span class="pill">'
                        + entry.credits + "</span>";
                if(entry.attributes)
                entry.attributes.forEach(function(attr) {
                        elemInnerHtml += '<span class="pill ' + attr + '-pill">' 
                                + attr + '<svg><use href="./icons.svg#' + attr_to_icon[attr] + '"></use></svg></span>';
                });
                elemInnerHtml += "</div></h3><p>" + entry.description + "</p></a>" + '\n';
                tr.innerHTML = elemInnerHtml;
        });
}

window.onload = function() {
        // smart quotes
        document.getElementById("searchTerm").innerHTML = "&#8220;" + search_term + "&#8221;";
        fetch("json/searchable_catalog.json")
                .then(r => r.json())
                .then(display_search_results);
}
