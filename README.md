# Introduction
Daily Platter is an application which helps team to manage day-to-day tasks. It’s MEAN(Mongo Express Angular NodeJS) based SPA(Single Page Application) application. It has multiple functionality to manage the project and resources. There are functionalities to create account, project, tasks, assign task to different resources, track the status of the task. Track the task for resources. Resource can enter effort data for task. The application has different types of the reports which help management to manage the project, revenue and resources in better way.

# Feature

•	MVC based development<br/>
•	Responsive layout which provided support across browser and device<br/>
•	Used AngularJS in front end <br/>
•	Back end development with Express Node<br/>
•	Database structure in mongoDB which may provide solution for all requirements<br/>
•	Bootstrap based layout<br/>
•	Supported for multiple device/browser<br/>

# Objective of the Project

Here we can do following activities<br/>
•	Create Account<br/>
•	Create Project under any account<br/>
•	Create task for any project<br/>
•	Create resources<br/>
•	Assign task to users<br/>
•	Track the progress of the task<br/>
•	Track resources utilization<br/>
•	Check user availability<br/>
•	Different type of reports<br/>
  &nbsp;&nbsp; o	Daily status<br/>
  &nbsp;&nbsp; o	Project status<br/>
  &nbsp;&nbsp; o	Resources leaves<br/>
  &nbsp;&nbsp; o	Resource availblity<br/>
  &nbsp;&nbsp; o	Code repository location<br/>
  &nbsp;&nbsp; o	Effort spent on the task/project/account<br/>


# Technologies Used:

•	HTML5<br/>
•	CSS3<br/>
•	Bootstrap<br/>
•	JavaScript<br/>
•	AngularJS<br/>
•	NodeJS<br/>
•	Express<br/>
•	MongoDB<br/>

# Directory Structure

The boiler plate for the project is provide by Express Generator.<br/><br/>

•	bin [Entry point for http server] <br/>
&nbsp;&nbsp; o	www<br/>
•	config [All authentication related files] <br/>
&nbsp;&nbsp; o	authentication.js <br/>
&nbsp;&nbsp; o	passport.js <br/>
•	models [All mongoose schema files] <br/>
&nbsp;&nbsp; o	Account.js <br/>
&nbsp;&nbsp; o	Project.js <br/>
&nbsp;&nbsp; o	Task.js <br/>
&nbsp;&nbsp; o	Timesheet.js <br/>
&nbsp;&nbsp; o	User.js <br/>
•	node_modules [All module/ dependencies which required for the application]<br/>
•	public [All files of the front-end development]<br/>
&nbsp;&nbsp; o	fonts <br/>
&nbsp;&nbsp; o	images <br/>
&nbsp;&nbsp; o	javascripts <br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	angularApp.js [Startup file for angular, all module, state, factory etc defined there]<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	assignmentControllers.js [All controllers related with assignment module]<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	directives.js [All  custom directive defined there] <br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	projectControllers.js [All controllers related with assignment module] <br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	taskControllers.js [All controllers related with assignment module] <br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	timesheetControllers.js [All controllers related with assignment module] <br/>
&nbsp;&nbsp;&nbsp;&nbsp; 	userControllers.js [All controllers related with assignment module] <br/>
&nbsp;&nbsp; o	partials [All html partial files used in angular views/router] <br/>
&nbsp;&nbsp; o	stylesheets [All stylesheet used in the project] <br/>
•	routes [All routes defined in node] <br/>
&nbsp;&nbsp; o	api.js <br/>
&nbsp;&nbsp; o	index.js <br/>
•	views [All views which calls from node] <br/>
&nbsp;&nbsp; o	error.ejs <br/>
&nbsp;&nbsp; o	index.ejs <br/>
•	app.js [express related codes] <br/>
•	package.json [Entry point of the project] <br/>



