To deploy webapp to production

- merge changes to master all files except for cached files
- checkout to production branch
- firebase logout
- firebase login
- in terminal run ng build
- check angular.json line 23 make sure it's still "outputPath": "dist",
- firebase deploy

Enjoy!
