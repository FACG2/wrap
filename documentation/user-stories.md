Roles:
* admin
* member
* mentor
* user
* guest

user stories:
* guest can :
  * login(email, password)
  * signup to use the app
    user can:
  * create project


* mentor is a user who can:

  * view project's sprints
  * view project's tasks
  * view project's logs
  * view project's insights
  * view project's members
  * view project's milestones
  * view project's backlog
  * view tasks' details
  * view tasks' comments
  * comment on a task
  * can receive notifications
  * can watch project logs changing (notified when new log added)


* member is a mentor who can:
  * assign member to a task
  * remove member from a task
  * change task state (eg. from progress to testing)
  * add/edit/remove task labels
  * check acceptance criteria/features in tasks
  * view members' profile page


* admin is a member who can:
  * remove project
  * start new sprint
  * close sprint
  * add backlog tasks
  * define milestones
