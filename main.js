//API Request Test


//Retrieving Username and Password information from the web page
function getUsername(){
    let form = document.getElementById("login");
    
    let username = form.elements[0].value;
    let password = form.elements[1].value;
    
    console.log(username)
    console.log(password)
}


//To retrieve the user token, returns user token
async function getUserToken(username, password)
{
    try{
        
        let response = await fetch("https://edocsapi.azurewebsites.net/Auth/api/Login",{
         method:'POST',
         headers : {
             'Content-Type' : 'application/json',
             'Authorization' : `Digest username="xikxafatwae" realm="_root_" password=""` 
         },
         body : JSON.stringify({ "username" : "testuser1@edocuments.co.uk", "password" : "20DemoPass20"})
         })
        let data = await response.json();
        let tokenValue = await data.Result.auth.token;
        return tokenValue;
    }
    catch (err)
    {
        console.log(err)
    }
}

//Function to check if the user token is valid, returns true or false.
async function testToken(password){
        try{
        let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        
        let response = await fetch("https://edocsapi.azurewebsites.net/Auth/api/Test",{
         method:'POST',
         headers : {
             'Authorization' : formatedString
         }
         })
        let data = await response.json();
        console.log(data)
        let tokenValue = await data.Result.auth.token;
        return tokenValue;
    }
    catch (err)
    {
        console.log(err)
    }
}

async function getUserID(password){
    try
        {
    let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
    let response = await fetch("https://edocsapi.azurewebsites.net/Core6/api/Portfolio/ByUserId",{
     method:'GET',
     headers : {
         'Content-Type' : 'application/json',
         'Authorization' : formatedString
     }});
    let data = await response.json();  
    console.log(data)
        }
    catch (err)
        {
            console.log(err);
        }
}

async function getReportProjects(password,projectid)
{
    try {
        let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        let response = await fetch(`https://edocsapi.azurewebsites.net/Core6/api/Reports/ByProjectId/${projectid}`,{
         method:'GET',
         headers : {
             'Content-Type' : 'application/json',
             'Authorization' : formatedString
         }});
        let data = await response.json();  
        console.log(data)
        }
    catch (err)
        {
            console.log(err);
        }
}

async function getTasksByUser(password){
    try {
        let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        let response = await fetch(`https://edocsapi.azurewebsites.net/Core6/api/Tasks/ByUser`,{
         method:'GET',
         headers : {
             'Content-Type' : 'application/json',
             'Authorization' : formatedString
         }});
        let data = await response.json();  
        let tasks = await data.Result.tasks;
        
        let temp = "";
        
        tasks.forEach((u) =>{
            temp += "<tr>";
            temp += "<td>"+u.documentId+"</td>"
            temp += "<td>"+u.dueDate+"</td>"
            temp += "<td>"+u.Id+"</td>"
            temp += "<td>"+u.siteId+"</td>"
            temp += "<td>"+u.isClosed+"</td>"
        })
        
        document.getElementById("data").innerHTML = temp;
        
        }
    catch (err)
        {
            console.log(err);
        }
    
}


async function main(){
    
    //Generates a user token that can be used
    let userToken = await getUserToken("testuser1@edocuments.co.uk","20DemoPass20");
    
    let test = await getTasksByUser(userToken);
    
//    let getUserIDJSON = await getUserID(userToken);
//    let retrieveProjectJSON = await getReportProjects(userToken, "565c19a3-aab1-4e02-a640-ac8331708831");
    
}

//Catches errors for the main async function
main().catch(console.log);








