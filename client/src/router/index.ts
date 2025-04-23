import { createRouter, createWebHistory } from 'vue-router';
import { authApi } from '../services/api';

// Routes de l'application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/trades',
    name: 'Trades',
    component: () => import('../views/Trades.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true }
  },
  // Route 404 pour les URLs qui n'existent pas
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard pour la vérification d'authentification
router.beforeEach(async (to, from, next) => {
  // Vérifier à la fois localStorage et sessionStorage pour le token
  const hasToken = localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null;
  
  if (to.meta.requiresAuth) {
    if (!hasToken) {
      // Pas de token, rediriger vers la page de connexion
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
      try {
        // Vérifier si le token est valide en appelant l'API
        const userData = await authApi.checkAuth();
        if (userData) {
          // Token valide, continuer vers la page demandée
          next();
        } else {
          // Token invalide, rediriger vers la page de connexion
          next({ name: 'Login', query: { redirect: to.fullPath } });
        }
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error);
        // En cas d'erreur, rediriger vers la page de connexion
        next({ name: 'Login', query: { redirect: to.fullPath } });
      }
    }
  } else {
    // Route ne nécessitant pas d'authentification, continuer normalement
    next();
  }
});

export default router;