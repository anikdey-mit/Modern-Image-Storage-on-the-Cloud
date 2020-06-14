import React, { Component } from 'react';
import $ from 'jquery';
import { useAppContext } from "./contextLib";

function SearchByTags() {
    const { idToken } = useAppContext();

    function addAnother() {
        var id = parseInt($("#tagsBlock").find("input").last().attr('id').split("_")[1]) + 1;
        var elem = "<div class=\"col-12 col-md-2\"><label for=\"tag_" + id + "\">Tag: </label></div><div class=\"col-12 col-md-10\"><input id=\"tag_" + id + "\" name=\"tags[]\" class=\"form-control\"></div>";
        $("#tagsBlock").append(elem);
    }
    function handleSubmit(event) {
        console.log(idToken);
        event.preventDefault();
        var tags = [];
        for (var i = 0; i < $("#searchForm").find('input').length; i++) {
            if ($.trim($("#searchForm").find('input').eq(i).val()) != '')
                tags.push($("#searchForm").find('input').eq(i).val().toLowerCase());
        }
        var query = {"objects":tags};
        // console.log(JSON.stringify(query));
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', idToken);
            }
        });
        $.ajax({
            url:'https://igi38i99gg.execute-api.us-east-1.amazonaws.com/query/objects',
            method:'POST',
            data:JSON.stringify(query),
            success:function(data){
                $("#resultsBody").empty();
                if(data.links.length > 0) {
                    for(var i = 0 ; i < data.links.length ; i++)
                    {
                        $("#resultsBody").append("<tr><td>"+(i+1)+"</td><td><a href='"+data.links[i]+"' target='_blank'>"+data.links[i]+"</a></td></tr>");
                    }
                }
                else {
                    $("#resultsBody").append("<tr><td colspan='2'>No results found!</td></tr>");
                }
                $("#resultsRow").removeClass('d-none');
            }
        })

    }

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <h3>Enter Tags:</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit} id="searchForm">
                    <div className="row" id="tagsBlock">
                        <div className="col-12 col-md-2">
                            <label htmlFor="tag_1">Tag: </label>
                        </div>
                        <div className="col-12 col-md-10">
                            <input id="tag_1" name="tags[]" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-info" type="button" onClick={() => addAnother()}>Add another tag</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>
                <hr />
                <div className="row d-none" id="resultsRow">
                    <div className="col-12">
                        <h3>Results:</h3>
                    </div>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody id="resultsBody"></tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default SearchByTags;