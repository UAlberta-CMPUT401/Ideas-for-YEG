
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
The following complete downsized flowchart of the desktop web UI  can be found [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Desktop_Downsized.png)

The uncompressed desktop flowchart can be found [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Desktop.jpg).

The following complete downsized flowchart of the mobile web UI  can be found [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Mobile_Downsized.png)

The uncompressed mobile flowchart can be found [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Mobile.jpg).

Individual storyboard slides can be found for desktop [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Desktop_Frames.pdf) and for mobile [here](https://github.com/UAlberta-CMPUT401/Ideas-for-YEG/blob/master/docs/Storyboard_Mobile_Frames.pdf)
# Project Management Document
The team is split half way, with half of our team focusing primarily on back-end work (Csaba, Colin, Louis) and half our team focusing primarily on front-end work (Monica, Rehab, Christian). 

We created a GANTT chart outlining the tasks for each sprint and assignees. The blue tasks are back-end tasks, the red tasks are front-end tasks, and grey tasks are either documentation (most of sprint 1) or un-assigned tasks (sprint 3 and 4). 

GANTT chart:

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
* If there is at least one idea on the page, I can view a listing of ideas that I can scroll through
* If there are no existing ideas, I can view a page that
shows a message stating "No Ideas Have Been Created" and will
suggest that I can create the first idea on the page if I have
an existing account or can direct me to create a new account

```

<a name="sort-ideas"></a>
```
US 1.02 - Sort Ideas
As a Visitor

I want to sort the projects by the number of upvotes or date

So that I can see what new or popular projects exist

Acceptance Tests

* Navigate to the idea listings page based on a selected location
* Click a button to sort by date or popularity 
* Resulting idea listing page has been sorted by specified metric if there are ideas that match the filter
* If no ideas match the filter, a message is shown to the user to try a different filter 
* If the idea list was empty to begin with before filtering occurred, the view
shows a message stating "No Ideas Have Been Created" and will
suggest that I can create theo first idea on the page if I have
an existing account or can direct me to create a new account

```

<a name="search-ideas"></a>
```
US 1.03 - Search Ideas
As a Visitor

I want to fill in a search bar with an idea/project in mind

So that I can find a specific idea/project or see if one already exists

Acceptance Tests

* Input some text into a search bar
* Resulting idea listing page has been filtered by the text indicating if the 
search term is found within the title or description
* If listing page is empty, I see a warning message saying that there are no ideas
of that search term found and to try a different search instead

```

<a name="select-ideas"></a>
```
US 1.04 - Select Ideas
As a Visitor

I want to select a project

So that I can see more details about the project

Acceptance Tests

* Click on a project
* Navigate to a new page that shows more details about a project such 
as the title, description,status, name of the Idea Creator, date of creation/updated, number of followers, backers, volunteers, and upvotes, and how much of honorarium is provided

```

<a name="create-account-login"></a>
```
US 1.05 - Create an account and log in
As a Visitor

I want to create an account and log in

So that I can do more, like upvote, back, or follow a project

Acceptance Tests

* Visitor clicks a sign-up button
* Visitor enters their required information like full name, email, and password
* Visitor clicks confirm sign-up button
* Account information is saved in some database
* Visitor then checks their email account to verify their account
* Visitor confirms their account by hitting a confirm account button within the email
* Visitor gets re-directed to the home page asking them to log into their account
* Visitor enters their email and password and if done so correctly, will be redirected to the home page to choose a location otherwise they will get an error message to try entering their info again

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
* The user is no longer able to upvote the idea as it can only happen once per unique idea

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
* Number of followers metric gets incremented by one for the project
* For any new idea updates, the user will get a notification on the webpage via the navigation bar where they can select the notification to read more about the update

```

<a name="volunteer"></a>
```
US 2.03 - Volunteer for a Project
As a logged in user

I want to volunteer for a project

So that I can show and provide support for the project

Acceptance Tests

* Click on a volunteer button on the project details page
* User inputs details on what aspect of the project they'd like to volunteer for, their strengths/preferences, and time commitments into a form
* User clicks submit volunteer interest button
* Idea Creator gets notified of new volunteer and sends out email for more info on volunteering
* Number of volunteers metric gets incremented by one for the project

```

<a name="donate"></a>
```
US 2.04 - Donate to a Project
As a logged in user

I want to donate to a project

So that I can support a project I agree with financially

Acceptance Tests

* Click on a donate button on the project details page
* User gets redirected to a 3rd party site like Paypal to enter their payment information securely
* Project's backer count metric gets updated
* Project's number of money donated metric gets updated
* Idea Creator gets notification that someone has donated money to specified idea

```

<a name="contact-idea-creator"></a>
```
US 2.05 - Contact Idea Creator
As a logged in user

I want to contact the creator and/or leads of the project

So that I can ask questions or help support it in some other way

Acceptance Tests

* User views the idea creator's email on the project details page
* User can send an email with the idea creator's email
* Idea Creator and/or Idea Admin receives an email from the user and can reply back to it
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
* User sees a message saying that the idea has been successfully created given the information input in the previous step
* Idea starts off with 0 upvotes, backers, volunteers, honorarium notes, updates
* Idea listings page gets updated to show the idea for the given location
```

<a name="email-digest"></a>
```
US 2.07 - Email Digest
As a logged in user

I want to receive updates from all the projects I've followed in a digest format

So that I don't get spammed with many separate emails

Acceptance Tests

* User follows 2 or more projects
* User receives one email containing updates for those projects
* If user just follows 1 project, they will still get one email
```

<a name="honorarium-note"></a>
```
US 3.01 - Add Honorarium
As an idea creator

I want to add a note about honorariums for the idea

So that other visitors can consider volunteering for the idea

Acceptance Tests

* Idea Creator clicks on "add honorarium note" button on their idea page
* Idea Creator enters text input for the note
* Idea details page gets successfully updated with the new note
```

<a name="project-message"></a>
```
US 3.02 - Post New Message on Project
As an idea creator

I want to put up a message on the project

So that followers and volunteers will be notified of any updates

Acceptance Tests

* Idea Creator clicks on "add new project message" button on their idea page if there is at least one or more followers and volunteers otherwise the button is disabled
* Idea Creator enters text input for their message
* Followers and volunteers get a new notification on the website regarding the new message to check out
```

<a name="email-updates"></a>
```
US 3.03 - Send Email Update to Followers and Volunteers
As an idea creator

I want to send messages to notify followers and volunteers via email

So that followers and volunteers will be notified of any updates

Acceptance Tests

* Idea Creator clicks on "send email update" button on their project page if
there is at least one or more followers and volunteers otherwise the button is disabled
* Idea Creator types in text input for a subject
* Idea Creator types in text input which will be shown as is in the email body
* Optionally the Idea Creator can attach pictures or links of external resources to the email
* Website sends an email given this input
* All followers and volunteers associated with the idea can view the email
```

<a name="update-project"></a>
```
US 3.04 - Update Details on Project
As an idea creator

I want to update the project details, including status

So that everyone can see updated details about the project

Acceptance Tests

* Idea Creator clicks on "update idea" button on their project page
* Idea Creator enters input to change all or some of the fields such as title, description, status
* Idea page gets updated with the changed info
* If user decides to cancel updating the idea, the resulting idea page will reflect no changes
```

<a name="add-idea-admin"></a>
```
US 3.05 - Add Idea Admins
As an idea creator

I want to invite others to be idea admins

So that I get more support to help maintain the page with others

Acceptance Tests

* Idea Creator navigates to the idea settings page
* Idea Creator can then add one or more users to be idea admins if there are other users in the system besides themselves
* New Idea Admins are notified that they have been added as admins to specified idea
* Idea Admins can do everything an Idea Creator can but not add new admins
* If there are no other users, Idea Creator will be shown with an empty menu stating that there is no one to select from and can try again when there are more registered users
```

<a name="new-location"></a>
```
US 4.01 - Add New Location Page On Website
As an location admin

I want to spin up a new website route for a city/town/location

So that I can manage new ideas in a different location page

Acceptance Tests

* Location admin clicks on a "new location" button
* Enters the city location the page is for and the new route name if it does not exist otherwise an error message is shown stating that a different location name and/or route name must be used
* Home page is updated to add the new location and a new page is spun up for it with a default splash screen indicating the location name
```

<a name="edit-location"></a>
```
US 4.02 - Edit Location Page Content
As an location admin

I want to edit the content on a location page

So that I can add or remove ideas, and update content on a specific location page

Acceptance Tests

* Location admin navigates to a location settings page
* Location admin changes the content of the location page
by either adding new ideas, removing ideas if ideas exist, and/or updating general content of the page
* Resulting pages are updated successfully
* If the operation is cancelled, no changes are reflected
```

<a name="edit-website"></a>
```
US 4.03 - Edit Website Content
As a site or location admin

I want to edit the content on the website outside of a location page

So that I can add a FAQ, About, and Splash pages

Acceptance Tests

* Site or Location admin navigates to a site/location admin's settings page
* Admin can edit, add, or delete the content of a specific page such as FAQ,
Contact Site/Location Owners, About, and Splash pages
* Resulting pages are updated, deleted, or added successfully
* If the operation is cancelled, no changes are reflected
```

<a name="add-location-admin"></a>
```
US 4.04 - Add Location Admins
As a site admin

I want to add new location admins

So that I can allow other admins to delegate their own location pages

Acceptance Tests

* Site admin navigates to an site admin's settings page
* Site admin can add new users to be location admins if there are registered users in the system
* Location admins can now edit the content of their location page but not the site
* If there are no other users, Site admin will be shown with an empty menu stating that there is no one to select from and can try again when there are more registered users
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
* [Send Grid](https://sendgrid.com/)
* [Paypal](https://developer.paypal.com/)

## DevOps
* [Docker](https://www.docker.com/)
* [Jenkins](https://jenkins.io/)
* [Cybera](https://www.cybera.ca/services/rapid-access-cloud/)

## Frontend 
* [Vue.js](https://vuejs.org/v2/guide/)
* [Vuex](https://vuex.vuejs.org/guide/)
* [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
* [ES Lint](https://eslint.org/docs/rules/)
* [Jest](https://jestjs.io/docs/en/getting-started.html)
* [Sass](https://sass-lang.com/)
* [NPM](https://www.npmjs.com/)
* [Prettier](https://prettier.io/)
* [Vuetify (Material for Vue)](https://vuetifyjs.com/en/components/api-explorer)
* [Cypress](https://www.cypress.io/)


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
* Jan 26 2020
