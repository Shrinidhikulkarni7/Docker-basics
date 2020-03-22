FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-nanoserver-1903 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1903 AS build
WORKDIR /src
COPY ["TodoListWebAPI/TodoListWebAPI.csproj", "TodoListWebAPI/"]
RUN dotnet restore "TodoListWebAPI/TodoListWebAPI.csproj"
COPY . .
WORKDIR "/src/TodoListWebAPI"
RUN dotnet build "TodoListWebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TodoListWebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoListWebAPI.dll"]