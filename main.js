//API Request Test
var tasks;
var portfolio;
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

//Function to retrieve portfolio, returns data from Portfolio
async function getUserPortfolio(password){
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
    
    portfolio = await data.Result.sites;
    let temp = "";
    
    //For Body
        //For loop to grab data and display it in a Bootstrap table
        portfolio.forEach((u) =>{
            temp += `<tr>`;
            temp += "<td>"+u.id+"</td>";
            temp += `<td>`+u.address+`</td>`;
            temp += "<td>"+u.name+"</td>";
            temp += "<td>"+u.siteId+"</td>";
            temp += "<td>"+u.isClosed+"</td>";
            temp += `</tr>`;
        })
            
        document.getElementById("portfolioBody").innerHTML = temp;
        console.log(portfolio)
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
        tasks = await data.Result.tasks;
        
        let tempHead = "";
        let temp = "";
        
        //For Body
        //For loop to grab data and display it in a Bootstrap table
        tasks.forEach((u) =>{
            temp += `<tr>`;
            temp += `<td>`+u.documentId+`</td>`
            temp += "<td>"+u.dueDate+"</td>"
            temp += "<td>"+u.Id+"</td>"
            temp += "<td>"+u.siteId+"</td>"
            temp += "<td>"+u.isClosed+"</td>"
            temp += `</tr>`
        })
        
        //Inserts data into table
//        document.getElementById("tasksHead").innerHTML = tempHead;
        document.getElementById("tasksBody").innerHTML = temp;
        console.log(tasks)
        

        }
    catch (err)
        {
            console.log(err);
        }
    
}


//Based off https://www.w3schools.com/howto/howto_js_filter_table.asp
function tableSearch(){
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
    
}

//Shows and hides tables for searching
function toggleTables(variable){
    let x = document.getElementById("myTable");
    let y = document.getElementById("myTable2");

    
    switch(variable){
        case 'tasks':
            console.log("Tasks are displayed");
            y.style.display = "none";
            x.style.display = "block";
            break;
        case 'portfolio':
            console.log("Portfolio is displayed")
            x.style.display = "none";
            y.style.display = "block"

            break;
    }
    
}

async function main(){
    
    //Generates a user token that can be used
    let userToken = await getUserToken("testuser1@edocuments.co.uk","20DemoPass20");
    
    let test = await getTasksByUser(userToken);
    
    let getUserIDJSON = await getUserPortfolio(userToken);
//    let retrieveProjectJSON = await getReportProjects(userToken, "565c19a3-aab1-4e02-a640-ac8331708831");
    
}

//Catches errors for the main async function
main().catch(console.log);








