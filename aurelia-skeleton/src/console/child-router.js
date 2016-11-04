export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',       moduleId: 'console/welcome',       nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',         moduleId: 'console/users',         nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router',  moduleId: 'console/child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
