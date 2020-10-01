# Multi stage builds
This is a simple web API that stores an in memory to-do list. The endpoints for this web API are as follows:
1. GET api/TodoList - Fetch all the to do list items
2. POST api/TodoList - Add a to do list item (the item should be sent in the POST body)
3. GET api/TodoList/{id} - Used to fetch a single to-do list item
4. PUT api/TodoList/{id} - Update an exsisting to-do list item
5. DELETE api/TodoList/{id} - Delete an exsisting to-do list item

## How to run this sample?
1. Clone the project
2. Open the .sln file in Visual Studio 2019
3. Click on run

## What is happening inside the docker file
This docker file makes use of a multi stage builds. As per docker hub
> With multi-stage builds, you use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base, and each of them begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don’t want in the final image.

Let us now look at the docker file stage by stage

### Stage 1 - Set up
```docker
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-nanoserver-1903 AS base
WORKDIR /app
EXPOSE 80
```
In this stage, we pull the ASP .NET Core runtime from [here](https://hub.docker.com/_/microsoft-dotnet-core-aspnet/), set the working directory to "/app" and then we tell docker that our application will be listening on port 80. This will become the base image for our container.

### Stage 2 - Build
```docker
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1903 AS build
WORKDIR /src
COPY ["TodoListWebAPI/TodoListWebAPI.csproj", "TodoListWebAPI/"]
RUN dotnet restore "TodoListWebAPI/TodoListWebAPI.csproj"
COPY . .
WORKDIR "/src/TodoListWebAPI"
RUN dotnet build "TodoListWebAPI.csproj" -c Release -o /app/build
```
In this stage, we pull the ASP .NET Core SDK from [here](https://hub.docker.com/_/microsoft-dotnet-core-sdk/). We set the working to "/src" and copy the csproj file from the host machine to the docker container. After the copy is complete, we run `dotnet restore` to restore the nuget packages. When the package restore is complete, we copy all the source files from the host to the container, use `dotnet build` to build a release version of the application and place the artifact in "/app/build".

In this stage, we have have pulled the SDK, which we won't need after we publish the artifact. Notice that we only use this image (i.e., build) in stage 3 and not stage 4

### Stage 3 - Publish
```docker
FROM build AS publish
RUN dotnet publish "TodoListWebAPI.csproj" -c Release -o /app/publish
```
In this stage we publish the artifact to "/app/publish" using `dotnet publish`

### Stage 4 - Deploy
```docker
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoListWebAPI.dll"]
```
In this stage, we copy the artifact that we published in stage 3 to "/app/publish" and set the entry point for the application. 

Notice that this stage uses the base image (the one we created in stage 1) and not the build image (the one we used for stages 2 and 3). By doing this we have ensured that our final docker image contains only the runtime and the artifact. It does not contain the sdk and the source code making the image lightweight. 