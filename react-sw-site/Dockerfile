# Stage 1: Build the React app
FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-stage
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN dotnet restore
RUN dotnet publish -c Release -o out

# Stage 2: Create the final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

# Set the environment variables for the database connection
ENV SERVER_NAME=$SERVER_NAME
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_USERNAME=$DATABASE_USERNAME
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD

# Copy published files from build stage
COPY --from=build-stage /app/out .

# Specify the entrypoint with HTTP configuration
ENTRYPOINT ["dotnet", "react-sw-site.dll", "--urls", "http://0.0.0.0:9211"]
