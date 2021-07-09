document.getElementById("task").value = 0; // For intitall value setting as 0 
var servers = [];
var tasks = [];
var tasksInProgress = [];
var progBars = [];


function addServer() {
    if (servers.length < 11) {
        var serverDetails = {};
        var serverId = Math.floor((Math.random() * 100) + 1);
        var serverName = `Server${serverId}`;
        serverDetails.id = serverId;
        serverDetails.name = serverName;
        serverDetails.status = "AVAILABLE";
        servers.push(serverDetails);
        if (tasks.length > 0) {
            tasksInProgress = this.assignTaskToServer();
            this.createTaskDiv(tasks);
            this.createServerDiv(servers);
            if (tasksInProgress.length > 0) {
                this.tasksInProgressDiv(tasksInProgress);
            }
        } else {
            this.createServerDiv(servers);
        }
    }
}

function createServerDiv(servers) {
    var serverDiv = document.getElementById("serverList");
    serverDiv.innerHTML = '';
    var availableServers = 0;
    servers.forEach(server => {
        if (server.status === "AVAILABLE") {
            availableServers++;
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("class", `servers`);
            mainDiv.setAttribute("id", `servers${server.id}`);
            var serverName = document.createElement('h4');
            serverName.innerHTML = `${server.name}`;

            mainDiv.appendChild(serverName);

            document.getElementById("serverList").appendChild(mainDiv);
        }
    });
    if (!availableServers) {
        var noServer = document.createElement('h4');
        noServer.innerText = "No server available";
        document.getElementById("serverList").appendChild(noServer);
    }
}

function clearServerList() {
    var serverDiv = document.getElementById("serverList");
    serverDiv.innerHTML = '';
    servers = [];
}

function addTask() {
    var newTask = Number(document.getElementById("task").value);
    document.getElementById("task").value = 0;
    if (newTask) {
        for (var i = 0; i < newTask; i++) {
            var taskDetails = {};
            var taskId = Math.floor((Math.random() * 100) + 1);
            var taskName = `Task${taskId}`;
            taskDetails.id = taskId;
            taskDetails.name = taskName;
            taskDetails.status = "PENDING";
            tasks.push(taskDetails);

        }
        if (servers.length > 0) {
            tasksInProgress = this.assignTaskToServer();
            this.createTaskDiv(tasks);
            this.createServerDiv(servers);
            if (tasksInProgress.length > 0) {
                this.tasksInProgressDiv(tasksInProgress);
            }

        } else {
            this.createTaskDiv(tasks);
        }
    }
}

function createTaskDiv(tasks) {
    var taskDiv = document.getElementById("taskList");
    taskDiv.innerHTML = '';
    tasks.forEach(task => {
        if (task.status === "PENDING") {
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("class", `tasks`);
            mainDiv.setAttribute("id", `tasks${task.id}`);
            var taskName = document.createElement('h4');
            taskName.innerHTML = `${task.name}`;
            mainDiv.appendChild(taskName);
            document.getElementById("taskList").appendChild(mainDiv);
        }
    });
}

function assignTaskToServer() {
    for (var i = 0; i < servers.length; i++) {
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].status === "PENDING" && servers[i].status === "AVAILABLE") {
                servers[i].status = "NOT AVAILABLE";
                tasks[j].status = "PROGRESS";
                var taskInProgressObj = {};
                taskInProgressObj.serverName = servers[i].name;
                taskInProgressObj.serverId = servers[i].id;
                taskInProgressObj.taskName = tasks[j].name;
                taskInProgressObj.taskId = tasks[j].id;
                taskInProgressObj.taskStatus = tasks[j].status;
                tasksInProgress.push(taskInProgressObj);
            }
        }
    }
    return tasksInProgress;
}

function tasksInProgressDiv(inProgTasks) {
    document.getElementById('inProgressDiv').style.display = 'block';
    inProgTasks.forEach(task => {
        if (task.taskStatus === "PROGRESS") {
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("class", `tasksInProgress`);
            mainDiv.setAttribute("id", `tasks${task.taskId}`);
            var taskName = document.createElement('h4');
            taskName.setAttribute("class", `taskName`);
            taskName.innerHTML = `${task.taskName}`;
            var progBackground = document.createElement('div');
            progBackground.setAttribute("class", `progBG`);
            var progressBar = document.createElement('div');
            progressBar.setAttribute("class", `progBar`);
            progBackground.appendChild(progressBar);
            mainDiv.appendChild(taskName);
            mainDiv.appendChild(progBackground);
            document.getElementById("taskInProgressList").appendChild(mainDiv);
            if (task.taskStatus !== "PROG_START") {
                var progBars = document.getElementsByClassName('progBar');
                for (var i = 0; i < progBars.length; i++) {
                    var width = 0;
                    var elem = progBars[i];
                    var newInterval = setInterval(function () {
                        if (width < 100) {
                            task.taskStatus = "PROG_START";
                            width++;
                            elem.style.width = width + "%";
                        } else {
                            clearInterval(newInterval);
                            task.taskStatus = "COMPLETE";
                        }
                    }, 200);
                }
            }
        }
    });
}
