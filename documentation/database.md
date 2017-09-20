* users
  - id (primary key , serial)
  - username (varchar(100) NOT NULL)
  - githubname (varchar(100) NOT NULL)
  - email (varchar(100) NOT NULL)
  - password (varchar(200) NOT NULL)
  - avatar (varchar(100) DEFAULT defurl)

* projects
  - id (primary key , serial)
  - title(varchar(100) NOT NULL)
  - description(text DEFAULT no description)
  - finished(varchar(100) DEFAULT False)//closed or not
  - progress (varchar(100) DEFAULT 0)

* user-project
  - user_id (FK(users(id)))
  - project_id (FK(projects(id)))
  - role (varchar(100) DEFAULT user)

* tasks
  - id (primary key , serial)
  - title(varchar(100) NOT NULL)
  - description(text DEFAULT no description)
  - priority(varchar(100) NOT NULL)
  - assigned_id(FK(users(id)))
  - progress (varchar(100) DEFAULT 0)
  - deadline(varchar(100))
  - sprint_id(integer DEFAULT -1)
  - project_id (FK(projects(id)))
  - state (varchar(100) DEFAULT 'backlog')
  - order(varchar(100) NOT NULL)

* sprints
  - id (primary key , serial)
  - title(varchar(100) NOT NULL)
  - progress (varchar(100) DEFAULT 0)
  - startingdate (varchar(100) NOT NULL)
  - duration (varchar(100) NOT NULL)
  - closed (varchar(100) DEFAULT false)
  - project_id(FK(projects(id)))

* features == acceptance criteria
  - id (primary key , serial)
  - title(varchar(100) NOT NULL)
  - finished(varchar(100) DEFAULT false)
  - task_id(FK(tasks(id)))

* milestones
  - id (primary key , serial)
  - task_id(FK(tasks(id)))

* comments
  - id (primary key , serial)
  - task_id(FK(tasks(id)))
  - user_id(FK(user(id)))
  - context(text DEFAULT no context)
  - date(timestamp)

* logs
  - id (primary key , serial)
  - user_id(FK(user(id)))
  - context(text DEFAULT no context)
  - date(timestamp)
  - project_id(FK(project(id)))

* notifications
  - id (primary key , serial)
  - user_id(FK(user(id)))
  - context(text DEFAULT no context)
  - link(varchar(100) NOT NULL)
  - seen((varchar(100) DEFAULT false))

* labels
  - id (primary key , serial)
  - project_id(FK(project(id)))
  - title(varchar(100) NOT NULL)
  - color(varchar(100) NOT NULL)
* label-task
- id (primary key , serial)
- task_id(FK(task(id)))
- label_id(FK(label(id)))


* invites
  - id (primary key , serial)
  - sender_id(FK(user(id)))
  - email(varchar(100) NOT NULL)
  - date(timestamp(now))
  - project_id(FK(project(id)))
