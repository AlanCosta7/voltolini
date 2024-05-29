
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'about', component: () => import('pages/About.vue') },
      { path: 'contact', name: 'contact', component: () => import('pages/Contact.vue') },
      { path: 'gallery', name: 'gallery', component: () => import('pages/Gallery.vue') },
      { path: 'gallery/:id', name: 'listaimg', component: () => import('pages/ListaImg.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', name:'auth', component: () => import('pages/admin/auth.vue') },
      { path: '/index', name:'admin', component: () => import('pages/admin/Admin.vue') },

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
