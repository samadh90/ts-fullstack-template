export default {
    navbar: {
        title: "TypeScript Fullstack Template",
        home: "Accueil",
        trades: "Transactions",
        search: "Rechercher...",
        searchBtn: "Rechercher",
        login: "Connexion",
        register: "Inscription",
        profile: "Profil",
        settings: "Paramètres",
        logout: "Déconnexion",
    },
    common: {
        
        error: "Erreur",
        success: "Succès",
        loading: "Chargement...",
        update: "Mettre à jour",
        updating: "Mise à jour...",
        save: "Enregistrer",
        saving: "Enregistrement...",
        cancel: "Annuler",
        confirm: "Confirmer",
        delete: "Supprimer",
        edit: "Modifier",
    },
    connection: {
        connected: "Connexion au serveur établie",
        disconnected: "Connexion au serveur perdue",
        reconnecting: "Reconnexion au serveur... (Tentative {attempt})",
        reconnected: "Connexion rétablie",
        reconnectionFailed: "Échec de la reconnexion au serveur",
        disconnectedMessage: "La connexion au serveur a été perdue. Nous essayons de nous reconnecter automatiquement. Veuillez patienter ou essayer de vous reconnecter manuellement.",
        reconnectingMessage: "Tentative de rétablissement de la connexion au serveur. Veuillez patienter un moment...",
        connectedMessage: "Votre connexion a été rétablie avec succès. Vous pouvez continuer à utiliser l'application.",
        tryReconnect: "Essayer de reconnecter",
        continue: "Continuer"
    },
    auth: {
        email: "Email",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        forgotPassword: "Mot de passe oublié?",
        loginButton: "Se connecter",
        registerButton: "S'inscrire",
        noAccount: "Pas encore de compte?",
        alreadyAccount: "Vous avez déjà un compte?",

        loginTitle: "Connexion",
        loginSubtitle: "Connectez-vous pour accéder à votre compte",
        emailPlaceholder: "Entrez votre adresse email",
        passwordPlaceholder: "Entrez votre mot de passe",
        rememberMe: "Se souvenir de moi",
        orContinueWith: "Ou continuer avec",
        registerHere: "S'inscrire ici",
        loginHere: "Se connecter ici",

        registerTitle: "Créer un compte",
        registerSubtitle: "Rejoignez Template dès aujourd'hui",
        username: "Nom d'utilisateur",
        usernamePlaceholder: "Entrez votre nom d'utilisateur",
        confirmPasswordPlaceholder: "Confirmez votre mot de passe",
        passwordRequirements: "Le mot de passe doit contenir au moins 8 caractères",
        agreeToTerms: "J'accepte les",
        termsOfService: "Conditions d'utilisation",
        and: "et la",
        privacyPolicy: "Politique de confidentialité",

        registrationSuccessful: "Inscription réussie! Veuillez vérifier votre email pour activer votre compte.",
    },
    home: {
        welcome: "Bienvenue sur ce TypeScript Fullstack Template",
        intro: "Une base moderne et évolutive pour vos applications web avec Vue 3, Express et Prisma.",
        getStarted: "Commencer",
        guessTheNumberTitle: "Devinez le nombre",
        guessTheNumberDescription: "Essayez de deviner le nombre entre 1 et 100!",
        submitGuess: "Soumettre la supposition",
        resetGame: "Réinitialiser le jeu",
        tooLow: "Trop bas! Réessayez.",
        tooHigh: "Trop haut! Réessayez.",
        congratulations: "Félicitations! Vous avez deviné le nombre!",
        enterNumber: "Veuillez entrer un nombre!"
    },
    profile: {
        title: "Profil Utilisateur",
        personalInfo: "Informations personnelles",
        address: "Adresse",
        contactInfo: "Informations de contact",
        changePassword: "Changer de mot de passe",

        firstName: "Prénom",
        lastName: "Nom",
        username: "Nom d'utilisateur",
        birthDate: "Date de naissance",

        street: "Rue",
        city: "Ville",
        state: "État", // Added missing state field
        zipCode: "Code postal",
        country: "Pays",

        email: "Email",
        phone: "Téléphone",
        verified: "Vérifié",
        notVerified: "Non vérifié",
        resendVerification: "Renvoyer l'email de vérification",
        sendVerificationCode: "Envoyer un code de vérification",

        currentPassword: "Mot de passe actuel",
        newPassword: "Nouveau mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        passwordsDoNotMatch: "Les mots de passe ne correspondent pas",

        personalInfoUpdated: "Informations personnelles mises à jour avec succès",
        addressUpdated: "Adresse mise à jour avec succès",
        contactInfoUpdated: "Informations de contact mises à jour avec succès",
        passwordUpdated: "Mot de passe mis à jour avec succès",

        errorUpdatingPersonalInfo: "Erreur lors de la mise à jour des informations personnelles",
        errorUpdatingAddress: "Erreur lors de la mise à jour de l'adresse",
        errorUpdatingContactInfo: "Erreur lors de la mise à jour des informations de contact",
        errorUpdatingPassword: "Erreur lors de la mise à jour du mot de passe",

        verificationEmailSent: "Email de vérification envoyé",
        verificationCodeSent: "Code de vérification envoyé par SMS",
        errorSendingVerificationEmail: "Erreur lors de l'envoi de l'email de vérification",
        errorSendingVerificationCode: "Erreur lors de l'envoi du code de vérification",

        notAuthenticated: "Vous devez être connecté pour accéder à cette page",
        errorLoadingData: "Erreur lors du chargement des données du profil",
    },
    
    notFound: {
        title: "Page non trouvée",
        message: "La page que vous recherchez n'existe pas.",
        backToHome: "Retour à l'accueil",
    },
    footer: {
        allRightsReserved: "Tous droits réservés",
    },
    errors: {
        general: {
            default: "Une erreur est survenue. Veuillez réessayer plus tard.",
            networkError: "Erreur de connexion réseau. Veuillez vérifier votre connexion.",
            serverError: "Erreur serveur. Veuillez réessayer plus tard.",
            unauthorized: "Accès non autorisé. Veuillez vous reconnecter.",
            forbidden: "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.",
            notFound: "La ressource demandée n'a pas été trouvée.",
            validationError: "Veuillez vérifier vos données et réessayer.",
            timeout: "La requête a expiré. Veuillez réessayer.",
            unexpectedError: "Une erreur inattendue est survenue. Veuillez réessayer."
        },
        auth: {
            invalidCredentials: "Email ou mot de passe invalide.",
            accountLocked: "Votre compte a été verrouillé. Veuillez contacter le support.",
            accountNotVerified: "Veuillez vérifier votre email avant de vous connecter.",
            registrationFailed: "L'inscription a échoué. Veuillez réessayer.",
            emailAlreadyExists: "Un utilisateur avec cet email existe déjà.",
            usernameAlreadyExists: "Ce nom d'utilisateur est déjà pris.",
            passwordResetFailed: "La réinitialisation du mot de passe a échoué. Veuillez réessayer.",
            tokenExpired: "Votre session a expiré. Veuillez vous reconnecter.",
            invalidToken: "Jeton d'authentification invalide.",
            passwordStrength: "Le mot de passe est trop faible. Veuillez utiliser un mot de passe plus fort."
        },
        profile: {
            updateFailed: "Échec de la mise à jour de votre profil. Veuillez réessayer.",
            imageSizeTooLarge: "La taille de l'image est trop grande. La taille maximale est de 5 Mo.",
            invalidImageFormat: "Format d'image invalide. Veuillez utiliser JPG, PNG ou GIF.",
            verificationFailed: "La vérification a échoué. Veuillez réessayer.",
            notSaved: "Les modifications n'ont pas pu être enregistrées. Veuillez réessayer."
        },
        data: {
            fetchError: "Échec de récupération des données. Veuillez réessayer.",
            saveError: "Échec de l'enregistrement des données. Veuillez réessayer.",
            deleteError: "Échec de la suppression des données. Veuillez réessayer.",
            uploadError: "Échec du téléversement du fichier. Veuillez réessayer.",
            downloadError: "Échec du téléchargement du fichier. Veuillez réessayer."
        },
        form: {
            requiredField: "Ce champ est obligatoire.",
            invalidEmail: "Veuillez entrer une adresse email valide.",
            invalidPassword: "Le mot de passe doit comporter au moins 8 caractères.",
            passwordMismatch: "Les mots de passe ne correspondent pas.",
            invalidDate: "Veuillez entrer une date valide.",
            invalidNumber: "Veuillez entrer un nombre valide."
        },
        connection: {
            socketError: "La connexion au serveur a échoué. Nouvelle tentative...",
            apiError: "La requête API a échoué. Veuillez réessayer."
        }
    }
};
