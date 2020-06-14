import React, { Component, useState } from 'react';
import $ from 'jquery';
import bsCustomFileInput from 'bs-custom-file-input'
import { useAppContext } from "./contextLib";

function ImageUpload() {
    const { idToken } = useAppContext();
    const [file, setFile] = useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    bsCustomFileInput.init()

    async function handleUpload(event) {
        event.preventDefault();
        console.log(idToken);
        const fileToConvert = document.querySelector('#customFile').files[0];
        var filename = fileToConvert.name.replace(/C:\\fakepath\\/, '');
        // var fileName = document.querySelector("#customFile").files[0].fileName;
        setFile(filename);
        // setFile(fileName);
        var b64 = await toBase64(fileToConvert);
        b64 = (b64.split(",")[1]);
        // console.log(b64);

        var json = JSON.stringify({"name":file, "file":b64});

        // Create AJAX
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', idToken);
            }
        });
        $.ajax({
            method:"POST",
            url:"https://yr4b7rndbk.execute-api.us-east-1.amazonaws.com/new/test3",
            data:JSON.stringify({"name":filename, "file":b64}),
            success:function(data)
            {
                // data = JSON.parse(data);
                console.log(data.url);
                if(!data.message)
                {
                    document.getElementById("urlPlaceholder").innerHTML = '<a href="'+data.url+'">'+data.url+'</a>';
                    if (data.tags.length > 0)
                    {
                        var elem = "<ul>";
                        for(var i = 0 ; i < data.tags.length ; i++)
                        {
                            elem += "<li>"+data.tags[i]+"</li>";
                        }
                        elem += "</ul>";
                        document.getElementById("tagsPlaceholder").innerHTML = elem;
                    }
                    else document.getElementById("tagsPlaceholder").innerHTML = "No tags were identified.";
                    document.getElementById("resultsRow").classList.remove('d-none');
                }
            }
        })
        // console.log(await toBase64(file));
    }
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <h3>Select an image:</h3>
                    </div>
                </div>
                <form onSubmit={handleUpload}>
                    <div className="row">
                        <div className="col-12 col-md-9 mt-3">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customFile" onChange={(e) => setFile(e.target.value)} />
                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 mt-3">
                            <button type="submit" className="btn btn-primary btn-block">Upload</button>
                        </div>
                    </div>
                </form>
                <hr />
                <div className="row d-none" id="resultsRow">
                    <div className="col-12">
                        <p>Your image is at: <span id="urlPlaceholder"></span></p>
                        <p>The tags for this image are:</p>
                        <div id="tagsPlaceholder"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ImageUpload;