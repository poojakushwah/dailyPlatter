# Introduction
Daily Platter is an application which helps team to manage day-to-day tasks. Here are some details project related. It’s MEAN SPA application. It has multiple functionality to manage the project and resources. There are functionalities to create account, project, tasks, assign task to different resources, track the status of the task. Track the task for resources. Resource will enter effort data for task. The application has different types of the reports which help management to manage the project, revenue and resources in better way.

# Feature

•	MVC based development
•	Responsive layout which provided support across browser and device 
•	Used AngularJS in front end 
•	Contributed in back end development with Express Node
•	Database structure in mongoDB which may provide solution for all requirements
•	Bootstrap based layout
•	Supported for multiple device/browser

# Objective of the Project

Here we can do following activities
•	Create Account
•	Create Project under any account
•	Create task for any project
•	Create resources
•	Assign task to users
•	Track the progress of the task.
•	Track resources utilization
•	Check user availability
•	Different type of reports
o	Daily status
o	Project status
o	Resources leaves
o	Resource availblity
o	Code repository location
o	Effort spent on the task/project/account 


# Technologies Used:

•	HTML5
•	CSS3
•	Bootstrap
•	JavaScript
•	AngularJS
•	NodeJS
•	Express
•	MongoDB

# Directory Structure

The boiler plate for the project is provide by Express Generator.

•	bin [Entry point for http server]
o	www
•	config [All authentication related files]
o	authentication.js
o	passport.js
•	models [All mongoose schema files]
o	Account.js
o	Project.js
o	Task.js
o	Timesheet.js
o	User.js
•	node_modules [All module/ dependencies which required for the application]
•	public [All files of the front-end development]
o	fonts
o	images
o	javascripts
	angularApp.js [Startup file for angular, all module, state, factory etc defined there]
	assignmentControllers.js [All controllers related with assignment module]
	directives.js [All  custom directive defined there]
	projectControllers.js [All controllers related with assignment module]
	taskControllers.js [All controllers related with assignment module]
	timesheetControllers.js [All controllers related with assignment module]
	userControllers.js [All controllers related with assignment module]
o	partials [All html partial files used in angular views/router]
o	stylesheets [All stylesheet used in the project]
•	routes [All routes defined in node]
o	api.js 
o	index.js
•	views [All views which calls from node]
o	error.ejs
o	index.ejs
•	app.js [express related codes]
•	package.json [Entry point of the project]



