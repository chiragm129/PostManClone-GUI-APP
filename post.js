console.log("this is project 7");

// utility function 
// 1. utility function to get Dom element from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// initialize No. of paramter
let addedParamCount = 0;

// hide the parametersBox initially 
let parametersBox = document.getElementById("parametersBox")
parametersBox.style.display = 'none';

// if the user clicks on params box, hide the json box 
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})


// if the user clicks on json box, hide the params box 
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// if user clicks on + button, add more paramters 
let addParams = document.getElementById("addParams");
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-row my-3">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="paramterKey ${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="paramterValue ${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                        </div>
                        <button class="btn btn-primary deleteParam">-</button>
                    </div>`;
    // convert the element string to Dom node 
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion(do self this)
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;

})


// if the user click on submit button 
let submit = document.getElementById("submit");
submit.addEventListener('click',()=>{
    // show please wait in the response box to request patience from the user
    // document.getElementById("responseJsonText").value = "please wait...Fetching response...";
    document.getElementById("responsePrism").innerHTML = "please wait...Fetching response...";

    // fetch all the values user has entered 
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used params option instead of json ,collect all the paramter in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }


    // log all the value in console for debugging 
    console.log("URL is ", url);
    console.log("requestType is ", requestType);
    console.log("contentType is ", contentType);
    console.log("data is ", data);

    // if the requestType is postMessage,invoke fetch api to create a post request
    if (requestType == 'GET'){
        fetch(url, {
            method: 'GET',
            // https://randomuser.me/api/ this url we put there
            // https://jsonplaceholder.typicode.com/posts
        })
        .then(response => response.text())
        .then((text) =>{
            // document.getElementById("responseJsonText").value = text;
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll(); //json color highlight ho jayega
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            // https://jsonplaceholder.typicode.com/posts
            // JSON.stringify({
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1
            //   }) 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        .then(response => response.text())
        .then((text) =>{
            // document.getElementById("responseJsonText").value = text;
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        });

    }


})