const express = require("express");
const cors = require("cors");

const { v4: uuidv4, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({ error: 'Invalid repository ID'})
  }

  return next();
}

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository ={ id: uuidv4(), title, url, techs, likes:0 };

  repositories.push(repository);

  return response.json(repository);

});

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});



app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

 /* if(!title || !url || !techs){
    return response.status(422).json({ error: 'Empty required field.' });
  }*/

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const likes = repositories[repoIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repoIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repository.likes += 1;

  return response.json(repository);

});

module.exports = app;
