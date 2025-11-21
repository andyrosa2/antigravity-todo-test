Barebones notes app deployed to Render
Node.js, Express, PostgreSQL.
No css.
It allows you to add a new note to a list of notes.

Local Development:
1. Install PostgreSQL and create database: `cloud_todo`
2. Run `npm install`
3. Run `.\start-local.ps1` (sets DATABASE_URL and starts server)
4. Open http://localhost:3000

Cloud Deployment:
Push to github
Create Render account at [render.com](https://render.com) 
connect your GitHub account

From Render dashboard:
- Click **New +** → **Blueprint**
- Select repository: `andyrosa2/antigravity-todo-test`
- Click **Apply**

Launch:
https://?.onrender.com
