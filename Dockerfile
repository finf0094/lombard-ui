# Stage 1: Install Node.js dependencies
FROM node:20.4.0-alpine as stage1
WORKDIR /UI
COPY package.json ./
RUN yarn install

# Stage 2: Build the production version of the application
FROM node:20.4.0-alpine as stage2
WORKDIR /UI
COPY . .
COPY --from=stage1 /UI/node_modules ./node_modules
RUN yarn build

# Stage 3: Create the final production image
FROM node:20.4.0-alpine as final
WORKDIR /UI
ENV NODE_ENV production
COPY --from=stage2 /UI/dist ./dist

# Install serve globally to serve the application
RUN yarn global add serve

# Expose the port on which the application will listen (change 5173 if needed)
EXPOSE 5173

# Start the application using serve
CMD ["serve", "-s", "dist", "-p", "5173"]