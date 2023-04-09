<div align="center"> 
<h1>Polynotes</h1>
<p>A place to organize your thoughts and ideas.</p>

  <img src="https://media.tenor.com/BcUevwfD6zUAAAAC/the-wind-rises-writing.gif" alt="the wind rises gif" width="70%" style="border-radius: 5px; box-shadow: 3px 3px 10px black; max-width: 600px; min-width: 300px;">
</div>

## Screenshots

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <div style="padding: 1rem; ">
    <img src="./readme-assets/manifesto.png" alt="Manifesto" style="width: 33%; ">
  </div>
  <div style="padding: 1rem; ">
    <img src="./readme-assets/workspace.png" alt="Workspace" style="width: 33%; ">
  </div>
  <div style="padding: 1rem; ">
    <img src="./readme-assets/page1.png" alt="Page Example" style="width: 33%; ">
  </div>
</div>

## Roadmap

Polynotes is our main school project for the next 3 years. It is made of many itterations this being the first one that we had to do alone in 2 months. We are soon gonna start to work on the second itteration that will be a complete rewrite of the application with a new tech stack and new features and a team of 14 students.

## Environment Variables

To run this project you will need to create 2 .env files, one in the frontend/ folder and one in the backend/ folder.
To help you fill the .env files you can copy the .env.example files and rename them to .env then fill the variables.

## Run Locally

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [.env files](#environment-variables)

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

| Status | Feature                | Description                                                                                                                       |
| :----: | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
|   ✅   | Pages and Folders      | Create hierarchical structure of notes                                                                                            |
|   ✅   | One or Two Columns     | Choose between one or two columns for notes                                                                                       |
|   ✅   | Text Blocks            | Headers (h1, h2, h3), lists (bullet and ordered), and paragraphs for note content                                                 |
|   ✅   | Image Block            | Add images to notes via URL                                                                                                       |
|   ✅   | Gif picker Block       | Add Gif to notes via a gif picker component like the discord one                                                                  |
|   ✅   | Database               | Properties include Rich/plain text, Checkbox, Date & Time, Single Select, and Number. Views include Table and Kanban              |
|   ✅   | Sharing Content        | Share notes with anonymous users via generated link. Choose between Read-only or Read-write access                                |
|   ✅   | Manifesto              | Manifesto landpage with nice effects                                                                                              |
|   ✅   | Login and signup       | Signup and login with mail validation                                                                                             |
|   ✅   | CGU                    | Minimal CGU                                                                                                                       |
|   ✅   | Form validation        | basic form validation in front and backend                                                                                        |
|   ✅   | Profile                | only name and a logout button                                                                                                     |
|   ✅   | Recent open documents  | Tiles of recent open documents                                                                                                    |
|   ✅   | File Explorer          | minimal version - at least name, size, creation/last updated                                                                      |
|   ✅   | My workspace           | Workspace with all the documents and folders                                                                                      |
|   ✅   | CI/CD                  | Continuously integrated and deployed using Github action and arcod, more details in the [Infrastructure](#infrastructure) section |
|   ✅   | Deployment             | Deployed on an online server. Instructions for deploying on your own server available in the repository.                          |
|   ✅   | Rich Text              | Rich text like **bold** _italic_ ~~strike-throught~~                                                                              |
|   ❌   | Search                 | Search notes by title or content                                                                                                  |
|   ❌   | Realtime collaboration | Collaborate with other users on notes in real-time                                                                                |
|   ❌   | Page and folder delete | For the moment you can't delete a page or a folder from the client                                                                |

## Swagger API Documentation

Here is the link to the swagger documentation of the API: [Swagger Link](https://polynotes.cluster-2022-6.dopolytech.fr/api/swagger)

## Infrastructure

For this project and the following ones we decided with [@sylvain-pierrot](https://www.github.com/sylvain-pierrot) and [@charley04310](https://github.com/charley04310) to connect our k3s clusters into a single one. This way we can share the same infrastructure and deploy our applications on the same server allowing us in the future to have a fully scalable and secure infrastructure.

### CI/CD

To deploy a new version of the application you just need to merge it on the main branch and it will be automatically deployed on the server.

![CI logo](./readme-assets/ci.png)

#### Explanations

Basically what happens is that, when you merge a pull request on the main branch, a Github action is triggered. This workflow will perform multiple actions.

**1. Update the deployment charts**
First they will edit the backend and frontend helm charts to update the image tag with the new version. This version is built from the commit sha.

**2. Build and push the new images to dockerhub**
Then, the github action will build and push the new docker images to dockerhub. During the docker build you will see that the backend doens't use any .env file. This is because the nodejs server allows us to use environment variables directly from the container. This way we can use the helm values to pass down the environment variables to the container. The sensible values are passed down as secrets using a common terraform repo for our cluster. The frontend on the other hand needs to be provided with the .env variables on build, especially the tenor api key which is sensible.
This is why in the CI we use a github secret to pass down the tenor api key to the frontend. The frontend is then built and pushed to dockerhub.

**3. Commit on the main branch**
Then when the github action is done it will commit on the main branch the new helm charts with the new image tag. This will trigger argocd to deploy the new version of the application. It will perform a blue/green deployment so that the application is always available.

### Secret management

We use a common terraform repo to manage our secrets. This repo is used to create the secrets on the cluster in the correct namespaces. This terraform repo is also used to create our argocd projects without having to configure them from the web application. It was great to use terraform because it allows us to have a common infrastructure for all our projects. It was also a great introduction to terraform in general.

## Tech Stack

**Client:**
| Tech Stack | Logo |
| --- | --- |
| Frontend | <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="react logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="redux logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="Typescript logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="./readme-assets/tiptap_logo.png" alt="Tiptap logo" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://mui.com/static/logo.png" alt="MUI logo" width="50" /> | |
| Backend / DB | <img src="https://user-images.githubusercontent.com/13108166/32161516-25ee8a3c-bd56-11e7-9d49-76faed577e1a.png" alt="nestjs logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="Typescript logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cdn.iconscout.com/icon/free/png-256/mongodb-3629020-3030245.png" alt="Mongodb logo" width="50" /> |
| Infrastructure | <img src="https://www.wescale.fr/hs-fs/hubfs/argo-icon-color.png?width=300&height=300&name=argo-icon-color.png" alt="argocd logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://kubernetes.io/images/favicon.png" alt="kubernetes logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cncf-branding.netlify.app/img/projects/helm/icon/color/helm-icon-color.png" alt="Helm logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://seeklogo.com/images/G/github-actions-logo-031704BDC6-seeklogo.com.png" alt="Github action logo" width="50"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://gitlab.com/uploads/-/system/project/avatar/22180576/dockerhub.png" alt="Dockerhub logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://ww1.freelogovectors.net/wp-content/uploads/2022/01/terra-form-logo-freelogovectors.net_.png?lossy=1&w=2560&ssl=1" alt="Terraform logo" width="50" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Grafana_logo.svg/1200px-Grafana_logo.svg.png" alt="Grafana logo" width="50" />|

### Choices

In this section I will explain the choices I made for the tech stack and why I chose them. I will also explain the difficulties I encountered and how I solved them.

#### Frontend

<img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="react logo" width="50" /> **React**

React was imposed as a requirement for the project. I had already used it for a small project but didn't have a big background with it. It was honestly harder than vue js, especially in the state and reactivity management. When using react I feel like I have to think more about the state management and the reactivity to optimize rendering and avoid unnecessary re-renders. Another thing I didn't appreciate was the way to manage the jsx html code. Things like conditional rendering or loops aren't as easy to read as in other frameworks like vue js or svelte.

<img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="Typescript logo" width="50" /> **Typescript**

I used Typescript to have a better development experience and to have a better code quality. I never used Typescript before but I had a good experience with it. I used it for the backend as well. Overall, I had some troubles with typing especially for an app like Polynotes where you don't know how the final data will look like. I also had some troubles with the types of the libraries I used. I had to use a lot of `as` to cast the types.

<img src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="redux logo" width="50" /> **Redux**

I used Redux to manage the state of the application. It was the first time I worked with stores and I had some trouble at first understanding how it worked. Looking back at it, I should have been using the [create api](https://redux-toolkit.js.org/rtk-query/api/createApi) to manage the API calls. I made a `utils/` folder with a small infrastructure to manage the API calls.

<img src="https://mui.com/static/logo.png" alt="MUI logo" width="50" /> **MUI**

I used MUI for the UI components. It was honestly great and also the first time I used a component library. My code isn't amazing sometimes since I didn't know if it was better to style the component with the `sx` prop or to use a separate stylesheet but overall I had a good experience with it.

<img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite logo" width="50" /> **Vite**

I used Vite for the build tool. I was already using Vite in my Vue projects and had good experiences with it. Usually, I was using [create-react-app](https://github.com/facebook/create-react-app) for React app build, but I read some news about it being deprecated right before starting this project.

<img src="./readme-assets/tiptap_logo.png" alt="Tiptap logo" width="100" /> **Tiptap**

To create the editor, I tried [react-contenteditable](https://www.npmjs.com/package/react-contenteditable) and [lexical](https://github.dev/facebook/lexical). The first one was great but wasn't designed for rich text. The second one was a bit too complex for my needs and I was having a lot of trouble configuring it the right way. I then found [tiptap](https://tiptap.dev/) which was exactly what I needed.

---

#### Backend

<img src="https://user-images.githubusercontent.com/13108166/32161516-25ee8a3c-bd56-11e7-9d49-76faed577e1a.png" alt="nestjs logo" width="50" /> **NestJS**

I didn't want to use Express once again so I decided to try NestJS since I had heard a lot of good things about it. The first hours were a bit hard to understand how it worked but after a while, when you understand the structure of a NestJS project, it's really easy to use. I noticed that the documentation was great and that it was really easy to find what I needed. Nest is great when having to code things that are not directly related to the business logic. Things like mail sending, authentication, swaggers, mongo connection, etc. are really easy to implement with Nest. The development experience was overall very smooth and fun.

<img src="https://cdn.iconscout.com/icon/free/png-256/mongodb-3629020-3030245.png" alt="Mongodb logo" width="50" /> **Mongodb**

A document oriented database was I think one of the best choices for this kind of project. Whenever pages don't have strong relations between them, or when it's important to write fast, a document oriented database is a great choice.Even thought I am proud of the database structure, I think it could have been better. I feel like some parts are looking a bit like a relational database but for a first time it was a good introduction to practice what I learned in the mongo DB course.

---

#### Infrastructure

<img src="https://www.wescale.fr/hs-fs/hubfs/argo-icon-color.png?width=300&height=300&name=argo-icon-color.png" alt="argocd logo" width="50" />**ArgoCD**

I used ArgoCD to manage the deployment of the application. I knew about it since we use it in my compagny but never tried it before. Thanks to sylvain who told me to try it and helped me with the configuration I managed to setup a basic argocd environment on my own cluster before we merged our clusters. It was great to understand how it worked and to see how it could be used in a real project. We used a app of apps pattern to manage the different environments and be able to reuse the same configuration for the following projects.

<img src="https://cncf-branding.netlify.app/img/projects/helm/icon/color/helm-icon-color.png" alt="Helm logo" width="50" />**Helm**

I used helm to write the kubernetes manifests. I was already using basic helm charts in my previous projects by helm installing them but never wrote one from scratch. Since I wrote my manifest by hand, during my [last project](https://github.com/thomas-mauran/Polypedia) I knew how charts worked and how to use them. It was very handy to write clean and reusable manifests using values loops and conditions. I know understand way more how helm works and how to use it.

<img src="https://seeklogo.com/images/G/github-actions-logo-031704BDC6-seeklogo.com.png" alt="Github action logo" width="50"/>**Github actions**

I love github actions. I used them a lot in my [previous projects](https://github.com/SphinxQuiz/Sphinx-Frontend/actions) and I think they are a great tool to automate tasks. I used them to build and push the docker images to the registry and to modify the image number in the manifests. What I would have like to do is to use them to check the linting but I didn't have the time to do it.

<img src="https://ww1.freelogovectors.net/wp-content/uploads/2022/01/terra-form-logo-freelogovectors.net_.png?lossy=1&w=2560&ssl=1" alt="Terraform logo" width="50" />**Terraform**

We used terraform with sylvain and charley to manage our cluster infrastructure as explained in the [secret management](#secret-management) section. I still need to gain some experience with terraform but I think it's a great tool to manage infrastructure.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Grafana_logo.svg/1200px-Grafana_logo.svg.png" alt="Grafana logo" width="50" /> **Grafana**

We setup a grafana dashboard to monitor the cluster. I used the same [kube prometheus stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) that I used on my personal cluster. I think it's a great tool to monitor the cluster and to be able to see what's going on and understand where you can optimize ressources, either by upscalling or improving the codebase. I wanted to try adding a custom ELK stack to monitor the frontend logs and especially the localisation of the users to create a map in the admin dashboard but I didn't have the time to do it.

**Admin console dashboard example: **
  <img src="./readme-assets/grafana.png" alt="Grafana admin console" >



## PostMortem

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badges

[![wakatime](https://wakatime.com/badge/user/385a7930-8af1-4967-9bb9-881eafcf79a6/project/04c974ff-1e8b-4749-afd6-6feae9f68f86.svg)](https://wakatime.com/badge/user/385a7930-8af1-4967-9bb9-881eafcf79a6/project/04c974ff-1e8b-4749-afd6-6feae9f68f86)

## Authors

- [@thomas-mauran](https://www.github.com/thomas-mauran)
