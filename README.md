<div align="center"> 
<h1>Polynote</h1>

  <img src="https://media.tenor.com/J-KhzX59ytAAAAAC/studio-ghibli-the-wind-rises.gif" alt="the wind rises gif" width="40%">
</div>

## Badges

[![wakatime](https://wakatime.com/badge/user/385a7930-8af1-4967-9bb9-881eafcf79a6/project/04c974ff-1e8b-4749-afd6-6feae9f68f86.svg)](https://wakatime.com/badge/user/385a7930-8af1-4967-9bb9-881eafcf79a6/project/04c974ff-1e8b-4749-afd6-6feae9f68f86)

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Environment Variables

To run this project you will need to create 2 .env files, one in the frontend/ folder and one in the backend/ folder.
To help you fill the .env files you can copy the .env.example files and rename them to .env then fill the variables.

## Run Locally

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [.env files](##Environment_Variables)

:warning: **Warning** :warning: : The mail service might not work locally, if you are not receiving the mail you can connect to the mongo database and change the emailVerified to true in the users collection.

**Clone the project**

```bash
  git clone git@github.com:thomas-mauran/Polynotes.git
```

**Go to the project directory**

```bash
  cd Polynotes
```

**Run the docker compose**

```bash
  docker-compose up
```


## Features

| Status | Feature               | Description                                                                                                                       |
| :----: | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
|   ✅   | Pages and Folders     | Create hierarchical structure of notes                                                                                            |
|   ✅   | One or Two Columns    | Choose between one or two columns for notes                                                                                       |
|   ✅   | Text Blocks           | Headers (h1, h2, h3), lists (bullet and ordered), and paragraphs for note content                                                 |
|   ✅   | Image Block           | Add images to notes via URL                                                                                                       |
|   ✅   | Gif picker Block      | Add Gif to notes via a gif picker component like the discord one                                                                  |
|   ✅   | Database              | Properties include Rich/plain text, Checkbox, Date & Time, Single Select, and Number. Views include Table and Kanban              |
|   ✅   | Sharing Content       | Share notes with anonymous users via generated link. Choose between Read-only or Read-write access                                |
|   ✅   | Manifesto             | Manifesto landpage with nice effects                                                                                              |
|   ✅   | Login and signup      | Signup and login with mail validation                                                                                             |
|   ✅   | CGU                   | Minimal CGU                                                                                                                       |
|   ✅   | Form validation       | basic form validation in front and backend                                                                                        |
|   ✅   | Profile               | only name and a logout button                                                                                                     |
|   ✅   | Recent open documents | Tiles of recent open documents                                                                                                    |
|   ✅   | File Explorer         | minimal version - at least name, size, creation/last updated                                                                      |
|   ✅   | My workspace          | Workspace with all the documents and folders                                                                                      |
|   ✅   | CI/CD                 | Continuously integrated and deployed using Github acton and arcod, more details in the [Infrastructure](##Infrastructure) section |
|   ✅   | Deployment            | Deployed on an online server. Instructions for deploying on your own server available in the repository.                          |
|   ✅   | Rich Text             | Rich text like **bold** _italic_ ~~strike-throught~~                                                                              |
|   ❌   | Search                | Search notes by title or content                                                                                                  |
|   ❌   | Collaboration         | Collaborate with other users on notes in real-time                                                                                |

## Swagger

Here is the link to the swagger documentation of the API: [Swagger Link](https://polynotes.cluster-2022-6.dopolytech.fr/api/swagger)



## Infrastructure




### CI/CD
To deploy a new version of the application ypu just need to merge it on the main branch and it will be automatically deployed on the server.


## Roadmap

- Additional browser support

- Add more integrations

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@thomas-mauran](https://www.github.com/thomas-mauran)
