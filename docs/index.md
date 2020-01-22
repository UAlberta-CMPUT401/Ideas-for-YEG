
# Project Overview:
By the words of the client, Ideas for Yeg is a project with the goal of connecting developers/tinkerers/students with interesting project ideas born from their own community. Ideas for Yeg will bring these people together to generate ideas to improve their community/city which can be upvoted, donated to and volunteered for. The system is to be a mobile-friendly open-source project that can be used by any community to host their own fork for themselves.

# Project Glossary
Idea - The name of the entities that users can vote on and donate to. Everything under this category will fall under the umbrella term of idea which will be used synonymously with the word project. Ideas will include the following information: Title, Description, Status, Idea Creator, Date of Creation/Updated, Number of Followers, Backers, Volunteers, and Upvotes, How much of Honorarium is provided

**YEG** - Edmonton Airport Code. Represents the Edmonton Area

**Visitor** - A person who has navigated to the page, can scroll through the list of projects, and view their details.

**Location Admin** - Someone who has access to spin up new location subsites for example /vvr, /yyc that would mimic the Edmonton idea page

**Idea Creator** - A user who has created a new idea. They will have admin access to their idea, can change the idea title, description, or status.

**User** - A visitor who has a registered account with their full name and email. They can upvote, back, or volunteer for an idea.

**Follower** - A user who subscribes to updates to an idea

**Backer** - A user who has donated money to an idea

**Volunteer** - A user who has donated their time to help support an idea

**Donation** - Monetary donation that has been given to an idea to help it grow further

**Site Admin** - A user that manages the maintenance of the entire site to ensure that the site is always available 

# Storyboard

# Use Cases or User Stories
[With Reference to Eugene Chen’s 401 ideas4.co Dev Details Document](https://docs.google.com/spreadsheets/d/1d1UYda6Yri3o0E0bkZSC-bgtwTXizyNDOPyZJkbL7w4/edit?usp=sharing)

The user stories were chosen to meet the requirements because our client has outlined these before our first meeting. As a team, we then modified the stories to help better understand the overall project we were going for and as well added additional ones to tackle some of the details not mentioned in the details document.

1. [ View Ideas ](#view-ideas)
2. [ Sort Ideas ](#sort-ideas)
3. [ Search Ideas ](#search-ideas)
4. [ Select Ideas ](#select-ideas)
5. [ Create Account & Log In ](#create-account-login)
6. [ Upvote Idea ](#upvote-idea)
7. [ Follow an Idea ](#follow-idea) 
8. [ Volunteer for a Project ](#volunteer)
9. [ Donate to a Project ](#donation)
10. [ Contact Idea Creators ](#contact-idea-creator)
11. [ Create New Idea ](#create-idea)
12. [ Honorarium Note ](#honorariam-note)
13. [ Project Message ](#project-message)
14. [ Email Updates ](#email-updates)
15. [ Update Project Details ](#update-project)
16. [ New Website Route for a New City ](#new-city)

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

* Navigate to the idea listings part

* Click a button to sort by date or popularity 

* Resulting idea listing page has been sorted

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

<a name="honorarium-note"></a>
```
US 3.01 - Create New Idea
As an idea creator

I want to add a note about honorariums for the idea

So that other visitors can consider volunteering for the idea

Acceptance Tests

* Idea Creator clicks on "add honorarium note" button on their idea page
* Idea Creator enters input for the notes
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
* Followers and volunteers get a new update 
```

<a name="email-updates"></a>
```
US 3.03 - Send Email Update to Followers and Volunteers
As an idea creator

I want to send messages to notify followers and volunteers via email

So that followers and volunteers will be notified of any updates

Acceptance Tests

* Idea Creator clicks on "add new project message" button on their idea page
* Idea Creator enters input for their message
* Followers and volunteers get a new update 
```

<a name="update-project"></a>
```
US 3.04 - Update Details on Project
As an idea creator

I want to update the project details, including status

So that everyone can see updated details about the project

Acceptance Tests

* Idea Creator clicks on "add new project message" button on their idea page
* Idea Creator enters input for their message
* Followers and volunteers get a new update 
```

<a name="new-city"></a>
```
US 4.01 - Add New City Page On Website
As an location admin

I want to spin up a new website route for a city/town/location

So that I can manage new ideas in a different location page

Acceptance Tests

* Idea Creator clicks on "add new project message" button on their idea page
* Idea Creator enters input for their message
* Followers and volunteers get a new update 
```

<a name="must-have"></a>
## Must Have

<a name="should-have"></a>
## Should Have

<a name="would-have"></a>
## Would Have

<a name="could-have"></a>
## Could Have


# Technical Resources:
## Backend
* [Express (Node.js)](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)

## DevOps
* [Docker](https://www.docker.com/), [Jenkins](https://jenkins.io/)

## Frontend 
* [Vue.js](https://vuejs.org/v2/guide/), [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/), [ES Lint](https://eslint.org/docs/rules/), [Jest](https://jestjs.io/docs/en/getting-started.html)


# Similar Products:
## Reddit
Reddit will be a heavy source of inspiration for many features, as its UI is simple and likely has solved a lot of UX issues that the site previously had years before. Reddit is a site where content can be voted on and viewed, so many of its features parallel that of the proposed site.

## Kickstarter
Kickstarter is a site where users can donate various amounts of money to projects. This feature may be something we want to keep our eye on, as Kickstarter may have a smart system of handling donations and project funding. One feature is that funding can be withheld if a minimum donation threshold is not met. 

<a name="similar-open-source"></a>
# Similar Open Source Projects:
## TODO


<a name="contributors"></a>
***
# Contributors
### Contributed By Christian Lo, Colin Kushniruk, Monica Bui
### Jan 20 2020