import { isAuthenticated } from '../middleware/auth'

const routes = [
  {
    path: '/',
    children: [
      { path: '', name: 'connexion', component: () => import('pages/ConnexionPage.vue') },
      {
        path: '/home',
        name: 'home',
        beforeEnter: [isAuthenticated],
        component: () => import('pages/HomePage.vue')
      },
      {
        path: '/compte',
        name: 'compte',
        beforeEnter: [isAuthenticated],
        component: () => import('pages/ComptePage.vue')
      },
      { path: '/inscription', name: 'inscription', component: () => import('pages/InscriptionPage.vue') },
      {
        path: '/lists/:id',
        name: 'list-view',
        beforeEnter: [isAuthenticated],
        component: () => import('pages/ListPage.vue')
      },
      {
        path: '/tasks/:id',
        name: 'task-page',
        beforeEnter: [isAuthenticated],
        component: () => import('pages/taskPage.vue')
      },
      {
        path: '/tasks/addEditTask/:idList/:id',
        beforeEnter: [isAuthenticated],
        name: 'add-edit-task',
        component: () => import('pages/AddEditTask.vue')
      },
      {
        path: '/tasks/view-task/:idList/:id',
        beforeEnter: [isAuthenticated],
        name: 'view-task',
        component: () => import('pages/ViewTask.vue')
      }
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
