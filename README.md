![CI/CD](https://github.com/nazar-cmd/radency-task-3/workflows/CI/CD/badge.svg)

#Radency task 3
##REST API for notes app via node.js

***

###Start

* `npm start` - start a server
* `npm test` - run endpoints tests

###Endpoints

* `GET /notes` - get all notes list
* `GET /notes/:id` - get one note
* `GET /notes/stats` - get array of categories with archived and active quantity
* `POST /notes` - creates a new note. Returns created note.
* `PATCH /notes/:id` - update note. Is used for editing/archiving note. Returns edited note.
* `DELETE /notes/:id` - delete note. Returns deleted note.
