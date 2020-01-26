
# Project Overview
By the words of the client, Ideas for YEG is a project with the goal of connecting developers/tinkerers/students with interesting project ideas born from their own community. Ideas for YEG will bring these people together to generate ideas to improve their community/city which can be upvoted, donated to and volunteered for. The system is to be a mobile-friendly open-source project that can be used by any community to host their own fork for themselves.

# Project Glossary
**Idea** - The name of the entities that users can vote on and donate to. Everything under this category will fall under the umbrella term of idea which will be used synonymously with the word project. Ideas will include the following information: Title, Description, Status, Idea Creator, Date of Creation/Updated, Number of Followers, Backers, Volunteers, and Upvotes, How much of Honorarium is provided

**YEG** - Edmonton Airport Code. Represents the Edmonton Area

**Visitor** - A person who has navigated to the page, can scroll through the list of projects, and view project details.

**Location Admin** - A user who has access to spin up new location subsites for example /vvr, /yyc that would mimic the Edmonton idea page. Can update the content of their own respective location page.

**Idea Creator** - A user who has created a new idea. They will have full admin access to their idea and can change the idea title, description, or status. Can invite more users to be Idea Admins.

**Idea Admin** - A user who has access to edit the content of an idea but cannot add new admins.

**User** - A visitor who has a registered account with their full name and email. They can upvote, back, or volunteer for an idea.

**Follower** - A user who subscribes to a project to receive updates

**Backer** - A user who has donated money to a project

**Volunteer** - A user who supports the project through other non-monetary means

**Donation** - Monetary donation that has been given to an idea to help it grow further

**Site Admin** - A user that maintains the entire site. They can also add users to be Location Admins.

# Storyboarding
The following is a complete flowchart of the desktop web UI, compressed so that it fits this document:
![Desktop Flowchart](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Desktop_Downsized.png)

The uncompressed flowchart can be found [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Desktop.jpg).

# Sprint Progress Charts
* [Sprint 1](https://ualberta-cmput401.github.io/Ideas-for-YEG/Gantt_Chart_Sprint1.pdf)

# Use Cases or User Stories
[With Reference to Eugene Chen’s 401 ideas4.co Dev Details Document](https://docs.google.com/spreadsheets/d/1d1UYda6Yri3o0E0bkZSC-bgtwTXizyNDOPyZJkbL7w4/edit?usp=sharing), user story
and feature requrirements have been extracted from this file and been extended further to meet the overall goal of the project.

The user stories were chosen to meet the requirements because our client has outlined these before our first meeting. As a team, we then modified the stories to help better understand the overall goal we were going for and as well added additional ones to tackle some of the details not mentioned in the details document.

1. [ View Ideas ](#view-ideas)
2. [ Sort Ideas ](#sort-ideas)
3. [ Search Ideas ](#search-ideas)
4. [ Select Ideas ](#select-ideas)
5. [ Create Account & Log In ](#create-account-login)
6. [ App View Responsiveness ](#responsiveness)
7. [ Upvote Idea ](#upvote-idea)
8. [ Follow an Idea ](#follow-idea) 
9. [ Volunteer for a Project ](#volunteer) 
10. [ Donate to a Project ](#donation)
11. [ Contact Idea Creators ](#contact-idea-creator)
12. [ Email Digest ](#email-digest)
13. [ Create New Idea ](#create-idea)
14. [ Honorarium Note ](#honorariam-note)
15. [ Project Message ](#project-message)
16. [ Email Updates ](#email-updates)
17. [ Update Project Details ](#update-project)
18. [ Add Idea Admins ](#add-idea-admin)
19. [ New Website Route for a New Location ](#new-location)
20. [ Edit Location Page Content ](#edit-location)
21. [ Edit Website Content ](#edit-website)
22. [ Add Location Admins ](#add-location-admin)

<a name="view-ideas"></a>
```
US 1.01 - View Ideas
As a Visitor

I want to see a listing of projects

So that I can see what ideas/projects exist for my community

Acceptance Tests

* Navigate to the web page

* See a listing of ideas that I can scroll through

```

<a name="sort-ideas"></a>
```
US 1.02 - Sort Ideas
As a Visitor

I want to sort the projects by the number of upvotes or date

So that I can see what new or popular projects exist

Acceptance Tests

* Navigate to the idea listings page

* Click a button to sort by date or popularity 

* Resulting idea listing page has been sorted by specified metric

```

<a name="search-ideas"></a>
```
US 1.03 - Search Ideas
As a Visitor

I want to fill in a search bar with an idea/project in mind

So that I can find a specific idea/project or see if one already exists

Acceptance Tests

* Input some text into a search bar

* Resulting idea listing page has been filtered by the text

```

<a name="select-ideas"></a>
```
US 1.04 - Select Ideas
As a Visitor

I want to select a project

So that I can see more details about the project

Acceptance Tests

* Click on a project
* Bring up a page that shows more details about a project

```

<a name="create-account-login"></a>
```
US 1.05 - Create an account and log in
As a Visitor

I want to create an account and log in

So that I can do more, like upvote, back, or follow a project

Acceptance Tests

* Visitor clicks a sign-up button
* Visitor enters their required information like full name and email
* Visitor clicks confirm sign-up button
* Account information is saved in some database
* Visitor gets re-directed to the home page signed into their account

```

<a name="responsiveness"></a>
```
US 1.06 - App View Responsiveness
As a Visitor

I want to view the page on mobile

So that I can access the page anywhere on any device screen size

Acceptance Tests

* Visitor can view the page on desktop
* Visitor can view the page on a mobile screen size
* Visitor can view the page on a tablet screen size

```

<a name="upvote-idea"></a>
```
US 2.01 - Upvote Idea
As a logged in user

I want to upvote a project

So that other visitors and users can see that there is interest in the project

Acceptance Tests

* Click on an upvote button beside the project idea
* Upvote count gets incremented by one for the respective idea

```

<a name="follow-idea"></a>
```
US 2.02 - Follow an Idea
As a logged in user

I want to "follow" a project by signing up for notifications

So that I can find out about announced progress for the project

Acceptance Tests

* Click on a "follow for notifications" button on the project details page
* User sees a successful message on screen that they are now successfully following the project

```

<a name="volunteer"></a>
```
US 2.03 - Volunteer for a Project
As a logged in user

I want to volunteer for a project

So that I can show and provide support for the project

Acceptance Tests

* Click on a volunteer button on the project details page
* Idea Creator gets notified of new volunteer and sends out email for more info on volunteering

```

<a name="donate"></a>
```
US 2.04 - Donate to a Project
As a logged in user

I want to donate to a project

So that I can support a project I agree with financially

Acceptance Tests

* Click on a donate button on the project details page
* User gets redirected to a 3rd party site like Paypal, Stripe etc. to enter their info and complete the transaction
* Project detail's backer and money donated info gets updated

```

<a name="contact-idea-creator"></a>
```
US 2.05 - Contact Idea Creator
As a logged in user

I want to contact the creator and/or leads of the project

So that I can ask questions or help support it in some other way

Acceptance Tests

* User views the idea creator's email on the project details page
```

<a name="create-idea"></a>
```
US 2.06 - Create New Idea
As a logged in user

I want to create an idea/project

So that I can obtain support and interest from the community and the community can see that I need help with an idea

Acceptance Tests

* User clicks on a "Create Idea" button
* User fills out info such as title, description, and status of the project
* User sees a message saying that the idea has been successfully created
```

<a name="email-digest"></a>
```
US 2.07 - Email Digest
As a logged in user

I want to receive updates from all the projects I've followed in a digest format

So that I don't get spammed with many seperate emails

Acceptance Tests

* User follows 2 or more projects
* User receives one email containing updates for those projexts
```

<a name="honorarium-note"></a>
```
US 3.01 - Add Honorarium
As an idea creator

I want to add a note about honorariums for the idea

So that other visitors can consider volunteering for the idea

Acceptance Tests

* Idea Creator clicks on "add honorarium note" button on their idea page
* Idea Creator enters input for the note
* Idea details page gets successfully updated with the new note
```

<a name="project-message"></a>
```
US 3.02 - Post New Message on Project
As an idea creator

I want to put up a message on the project

So that followers and volunteers will be notified of any updates

Acceptance Tests

* Idea Creator clicks on "add new project message" button on their idea page
* Idea Creator enters input for their message
* Followers and volunteers get a new notification on the website regarding the new message
```

<a name="email-updates"></a>
```
US 3.03 - Send Email Update to Followers and Volunteers
As an idea creator

I want to send messages to notify followers and volunteers via email

So that followers and volunteers will be notified of any updates

Acceptance Tests

* Idea Creator clicks on "send email update" button on their project page
* Idea Creator types in input
* Website sends an email given previous input
```

<a name="update-project"></a>
```
US 3.04 - Update Details on Project
As an idea creator

I want to update the project details, including status

So that everyone can see updated details about the project

Acceptance Tests

* Idea Creator clicks on "update idea" on their project page
* Idea Creator enters input to change all of some of the fields such as title, description, status
* Idea page gets updated
```

<a name="add-idea-admin"></a>
```
US 3.05 - Add Idea Admins
As an idea creator

I want to invite others to be idea admins

So that I get more support to help maintain the page with others

Acceptance Tests

* Idea Creator navigates to idea settings page
* Idea Creator can then add one or more users to be idea admins
* Idea Admins can do everything an Idea Creator can but not add new admins
```

<a name="new-location"></a>
```
US 4.01 - Add New Location Page On Website
As an location admin

I want to spin up a new website route for a city/town/location

So that I can manage new ideas in a different location page

Acceptance Tests

* Location admin clicks on a "new location" button
* Enters the city the page is for and the new route name
* Home page is updated to add the new location and a new page is spun up for it
```

<a name="edit-location"></a>
```
US 4.02 - Edit Location Page Content
As an location admin

I want to edit the content on a location page

So that I can add or remove ideas, and update content on a specific location page

Acceptance Tests

* Location admin navigates to a location settings page
* Admin changes the content of the page
```

<a name="edit-website"></a>
```
US 4.03 - Edit Website Content
As a site or location admin

I want to edit the content on the website outside of a location page

So that I can add a FAQ, About, and Splash pages

Acceptance Tests

* Site or Location admin navigates to an idea admin's settings page
* Admin can edit the content of a specific page 
```

<a name="add-location-admin"></a>
```
US 4.04 - Add Location Admins
As a site admin

I want to add new location admins

So that I can allow other admins to delegate their own location pages

Acceptance Tests

* Site admin navigates to an idea admin's settings page
* Site admin can add new users to be location admins
* Location admin can now edit the content of their location page but not the site
```

<a name="must-have"></a>
## Must Have
* US 1.01 - View Ideas
* US 1.04 - Select Ideas
* US 1.05 - Create an account and log in
* US 1.06 - App View Responsiveness
* US 2.01 - Upvote Idea
* US 2.02 - Follow an Idea
* US 2.03 - Volunteer for a Project
* US 2.06 - Create New Idea
* US 3.04 - Update Details on Project

<a name="should-have"></a>
## Should Have
* US 1.02 - Sort Ideas
* US 1.03 - Search Ideas
* US 2.05 - Contact Idea Creator
* US 3.02 - Post New Message on Project
* US 4.01 - Add New Location Page on Website
* US 4.02 - Edit Location Page Content
* US 4.03 - Edit Website Content
* US 4.04 - Add Location Admins

<a name="would-have"></a>
## Would Have
* US 2.04 - Donate to a Project
* US 3.01 - Add Honorarium
* US 3.03 - Send Email Update to Followers and Volunteers
* US 3.05 - Add Idea Admins

<a name="could-have"></a>
## Could Have
* US 2.07 - Email Digest

# Technical Resources
## Backend
* [Express (Node.js)](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Strapi](https://strapi.io/)

## DevOps
* [Docker](https://www.docker.com/)
* [Jenkins](https://jenkins.io/)

## Frontend 
* [Vue.js](https://vuejs.org/v2/guide/)
* [Vuex](https://vuex.vuejs.org/guide/)
* [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
* [ES Lint](https://eslint.org/docs/rules/)
* [Jest](https://jestjs.io/docs/en/getting-started.html)
* [Sass](https://sass-lang.com/)
* [NPM](https://www.npmjs.com/)


# Similar Products:
## [Reddit](https://www.reddit.com/)
Reddit will be a heavy source of inspiration for many features, as its UI is simple and likely has solved a lot of UX issues that the site previously had years before. Reddit is a site where content can be voted on and viewed, so many of its features parallel that of the proposed site.

## [Kickstarter](https://www.kickstarter.com/)
Kickstarter is a site where users can donate various amounts of money to projects. This feature may be something we want to keep our eye on, as Kickstarter may have a smart system of handling donations and project funding. One feature is that funding can be withheld if a minimum donation threshold is not met. 

<a name="similar-open-source"></a>
# Similar Open Source Projects
## [Reddit: Slide for reddit](https://github.com/ccrama/Slide)
Slide for reddit is an open sourced and ad free Reddit browser for Android. Some aspects of the eventual user interface and features of #ideas4YEG align with those of slide for reddit. 

<a name="contributors"></a>
# Contributors
* Contributed By Christian Lo, Colin Kushniruk, Monica Bui, Rehab El-Hajj
* Jan 20 2020
