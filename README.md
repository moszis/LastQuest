Building LastQuest

npm init

npm install webpack -g (NOT SURE IF THIS IS NEEDED; Next time will try without it)
npm install webpack --save-dev

npm install babel-core --save-dev
npm install babel-preset-env --save-dev
npm install babel-loader --save-dev

npm install webpack-dev-server --save-dev

npm install express --save 

For React UI:
npm install react --save-dev
npm install react-dom --save-dev
npm install babel-preset-react --save-dev


webpack (to build)

---------------PACKAGES USED------------------
node for webserver
express for server side routing
webpack/babel for converting to ES5
babel-loader to load babel with webpack
webpack-dev-server to update the build on the fly
react for building react components
react-dom for outputing react 
babel-preset-react to compile react to ES5
