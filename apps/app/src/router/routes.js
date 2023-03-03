
const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/tuto', component: () => import('pages/TutoPage.vue') },
      { path: '/lists/:id', name: 'list-page', component: () => import('pages/ListPage.vue') },
      { path: '/tasks/:id', name: 'task-page', component: () => import('pages/taskPage.vue') },
      { path: '/tasks/addEditTask/:id', name: 'add-edit-task', component: () => import('pages/AddEditTask.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
