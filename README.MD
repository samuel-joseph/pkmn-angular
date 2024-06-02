Backend routes:
router.post("/", register);
router.post("/login", login);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

Url
https://the-pokemon-stadium-battle.web.app/

To deploy webapp to production

- merge changes to master all files except for cached files
- checkout to production branch
- pull from master branch
- firebase logout
- firebase login
- in terminal run ng build
- check angular.json line 23 make sure it's still "outputPath": "dist",
- firebase deploy

Enjoy!!!
