// ==UserScript==
// @name       Redmine: Fast Assign
// @namespace  https://github.com/styx/redmine_fast_assign
// @version    0.1
// @description  assign and start issue in one click
// @match      https://redmine.devnet.by/projects/*/issues*
// @copyright  2013+, Mikhail S. Pobolovets
// ==/UserScript==

var redmineAssign = {
    userID: 53, // Define your user ID here
    status: 5,  // Define status ID you wish to set

    prepare: function() {
        if(window.jQuery === undefined
           || window.jQuery.fn.jquery < MIN_JQUERY_VERSION)
        {
            loadJQuery();
        }
        redmineAssign.init();

        function loadJQuery() {
            var done = false;
            var script = document.createElement("script");
            script.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js";
            script.onload = script.onreadystatechange = function() {
                if(!done && (!this.readyState || this.readyState === "loaded"
                             || this.readyState == "complete"))
                {
                    $.noConflict();
                    done = true;
                }
            };

            document.getElementsByTagName("head")[0].appendChild(script);
        }
    },

    assign: function(e) {
        id = e.target.id
        url = '/issues/bulk_update?ids[]=' + id +
            '&issue[assigned_to_id]=' + redmineAssign.userID +
            '&issue[status_id]=' + redmineAssign.status +
            '&back_url=' + location.href;

        $.ajax({
            url: url,
            type: 'post'
        }).always(function() {
            location.reload();
        });
    },

    init: function(e) {
        var ids = $.map($('.list.issues .id a'), function(e, i){ return $(e).text(); });
        var assigned_tos = $('.list.issues .assigned_to');
        jQuery.each(assigned_tos, function(i, e){

            $e = $(e)
            $e.append('<br />')
            $e.append(jQuery('<a>', { href: 'javascript:void(0);',
                                     text: 'GO',
                                     click: redmineAssign.assign,
                                     id: ids[i]
                                    }));
        });
    }
};

redmineAssign.prepare();
