BEGIN;
DROP TABLE IF EXISTS users , projects ,user_project, tasks,sprints,features, milestones,comments,logs,notifications,labels,invites,task_label CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(100) UNIQUE NOT NULL,
githubname VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
avatar VARCHAR(100) DEFAULT 'http://www.cheap-accountants-in-london.co.uk/wp-content/uploads/2015/07/User-Avatar.png'
);

CREATE TABLE projects(
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
wDay INTEGER NOT NULL,
wHour INTEGER NOT NULL,
description TEXT DEFAULT 'No description',
finished BOOLEAN DEFAULT False,
progress NUMERIC DEFAULT 0
);

CREATE TABLE user_project(
user_id INTEGER REFERENCES users(id),
project_id INTEGER REFERENCES projects(id),
watch BOOLEAN DEFAULT False,
project_nav BOOLEAN DEFAULT False,
role VARCHAR(100) DEFAULT 'user'
);

CREATE TABLE sprints(
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
progress NUMERIC DEFAULT 0,
startingdate date DEFAULT now(),
duration INTEGER NOT NULL,
closed BOOLEAN DEFAULT False,
project_id INTEGER REFERENCES projects(id)
);

CREATE TABLE state(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE,
sprint_id  INTEGER REFERENCES sprints(id),
project_id INTEGER REFERENCES projects(id)
);
ALTER TABLE state ADD CONSTRAINT states_name_sprintid_key UNIQUE (sprint_id, name);



CREATE TABLE tasks(
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
description TEXT DEFAULT 'No description',
priority INTEGER DEFAULT -1,
progress NUMERIC DEFAULT 0,
deadline VARCHAR(100) DEFAULT 'Not specified',
duration INTEGER DEFAULT -1,
sprint_id INTEGER REFERENCES sprints(id),
project_id INTEGER REFERENCES projects(id),
assigned_id INTEGER REFERENCES users(id),
state_id  INTEGER REFERENCES state(id),
orders INTEGER NOT NULL
);

CREATE TABLE features(
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
finished BOOLEAN DEFAULT False,
task_id INTEGER REFERENCES tasks(id)
);

CREATE TABLE milestones(
id SERIAL PRIMARY KEY,
task_id INTEGER REFERENCES tasks(id)
);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
task_id INTEGER REFERENCES tasks(id),
user_id INTEGER REFERENCES users(id),
context TEXT DEFAULT 'no context',
date TIMESTAMP DEFAULT now()
);

CREATE TABLE logs(
id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES projects(id),
username VARCHAR(100) REFERENCES users(username),
context TEXT DEFAULT 'no context',
mdate TIMESTAMP DEFAULT now(),
type VARCHAR(100) NOT NULL,
link VARCHAR(100) NOT NULL,
action_id INTEGER NOT NULL
);

CREATE TABLE notifications(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
context TEXT DEFAULT 'no context',
seen BOOLEAN DEFAULT False,
link VARCHAR(100) NOT NULL,
mdate TIMESTAMP DEFAULT now(),

);

CREATE TABLE labels(
id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES projects(id),
title VARCHAR(100) NOT NULL,
color VARCHAR(100) NOT NULL
);

CREATE TABLE invites(
id SERIAL PRIMARY KEY,
sender_id INTEGER REFERENCES users(id),
email VARCHAR(100) NOT NULL,
project_id INTEGER REFERENCES projects(id),
date TIMESTAMP DEFAULT now()
);

CREATE TABLE task_label(
id SERIAL PRIMARY KEY,
task_id INTEGER REFERENCES tasks(id),
label_id INTEGER REFERENCES labels(id)
);

COMMIT;
