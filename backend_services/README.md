## Run Development Environment and Routes

```bash
$ npm run dev

# Usage
1) Ensure the .env file is in your backend_services folder. (Ensure the file is named .env)

2) Create a post request to localhost:1311/email/:id where id is the idea id.
{
	"user_group":"donators",
	"subject":"Subject",
	"body":"Body"
}
"user_group" can be : "donators", "volunteers", "followers"

3) Create a post request to localhost:1311/email_volunteer
{
	"email":"test@example.com",
	"idea_title":"A nice idea",
	"volunteer":"JimmyJim"
}
