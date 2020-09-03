FROM mongo

COPY projects.json /projects.json
COPY todos.json /todos.json
CMD mongoimport --host mongo --db todos-api --collection projects --type json --file /projects.json --jsonArray && mongoimport --host mongo --db todos-api --collection todos --type json --file /todos.json --jsonArray
