//API Request Test
var tasks;
var portfolio;
toggleTables('tasks');

//Retrieves the user token, returns user token
async function getUserToken(username, password) {
    try {
        let response = await fetch("https://edocsapi.azurewebsites.net/Auth/api/Login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Digest username="xikxafatwae" realm="_root_" password=""`
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        let data = await response.json();
        let tokenValue = await data.Result.auth.token;
        return tokenValue;
    } catch (err) {
        alert(err);
        console.log(err);
    }
}

//Function to check if the user token is valid, returns true or false.
async function testToken(password) {
    try {
        let fString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        let response = await fetch("https://edocsapi.azurewebsites.net/Auth/api/Test", {
            method: 'POST',
            headers: {
                'Authorization': fString
            }
        })
        let data = await response.json();
        let tokenValue = await data.Result.auth.token;
        return tokenValue;
    } catch (err) {
        alert(err);
        console.log(err);
    }
}

//Function to retrieve portfolio, returns data from Portfolio
async function getUserPortfolio(password) {
    try {
        let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        let response = await fetch("https://edocsapi.azurewebsites.net/Core6/api/Portfolio/ByUserId", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': formatedString
            }
        });
        let data = await response.json();

        portfolio = await data.Result.sites;
        let temp = "";

        //For Body
        //For loop to grab data and display it in a Bootstrap table
        portfolio.forEach((u) => {
            temp += `<tr>`;
            temp += "<td>" + u.name + "</td>";
            temp += `<td>` + u.id + `</td>`;
            temp += "<td>" + u.address + "</td>";
            temp += "<td>" + u.postcode + "</td>";
            temp += "<td>" + u.projects.length + "</td>";
            temp += `</tr>`;
        })
        document.getElementById("portfolioBody").innerHTML = temp;
        console.log(portfolio);

    } catch (err) {
        alert(err);
        console.log(err);
    }
}

async function getReportProjects(password, projectid) {
    try {
        let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        let response = await fetch(`https://edocsapi.azurewebsites.net/Core6/api/Reports/ByProjectId/${projectid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': formatedString
            }
        });
        let data = await response.json();
    } catch (err) {
        alert(err);
        console.log(err);
    }
}


async function getTasksByUser(password) {
    try {
        let formatedString = `Digest username="xikxafatwae" realm="_root_" password="${password}"`
        let response = await fetch(`https://edocsapi.azurewebsites.net/Core6/api/Tasks/ByUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': formatedString
            }
        });
        let data = await response.json();
        tasks = await data.Result.tasks;

        let temp = "";

        //For Body
        //For loop to grab data and display it in a Bootstrap table
        tasks.forEach((u) => {
            temp += `<tr>`;
            temp += `<td>` + u.documentId + `</td>`
            temp += "<td>" + u.subject + "</td>"
            temp += "<td>" + u.createdDate + "</td>"
            temp += "<td>" + u.dueDate + "</td>"
            temp += "<td>" + u.taskMessages[0].body + "</td>"
            temp += `</tr>`
        })
        //Inserts data into table
        document.getElementById("tasksBody").innerHTML = temp;
    } catch (err) {
        alert(err);
        console.log(err);
    }

}


//Based off https://www.w3schools.com/howto/howto_js_filter_table.asp
function tableSearch(inputID, tableIndex, tableType) {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputID);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableType);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[tableIndex];
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
function toggleTables(variable) {
    let x = document.getElementById("tasksTable");
    let y = document.getElementById("portfolioTable");

    switch (variable) {
        case 'tasks':
            y.style.display = "none";
            x.style.display = "block";
            break;
        case 'portfolio':
            x.style.display = "none";
            y.style.display = "block";
            break;
    }

}

//Grabs user login value
async function login() {
    try {
        let usernameVal = document.getElementById("username").value;
        let passwordVal = document.getElementById("password").value;

        return {
            username: usernameVal,
            password: passwordVal
        }
    } catch (err) {
        alert(err);
        console.log(err);
    }


}

async function main() {
    //Generates a user token that can be used
    try {
        let loginDetails = await login()
        let userToken = await getUserToken(loginDetails.username, loginDetails.password);
        let tasksByUser = await getTasksByUser(userToken);
        let portfolioByUser = await getUserPortfolio(userToken);
    } catch (err) {
        alert(err);
        console.log(err);
    }


}
