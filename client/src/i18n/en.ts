export default {
    navbar: {
        title: "TypeScript Fullstack Template",
        home: "Home",
        trades: "Trades",
        search: "Search...",
        searchBtn: "Search",
        login: "Login",
        register: "Register",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
    },
    common: {
        
        error: "Error",
        success: "Success",
        loading: "Loading...",
        update: "Update",
        updating: "Updating...",
        save: "Save",
        saving: "Saving...",
        cancel: "Cancel",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
    },
    connection: {
        connected: "Connection to server established",
        disconnected: "Connection to server lost",
        reconnecting: "Reconnecting to server... (Attempt {attempt})",
        reconnected: "Connection restored",
        reconnectionFailed: "Failed to reconnect to server",
        disconnectedMessage: "The connection to the server has been lost. We are trying to reconnect automatically. Please wait or try to reconnect manually.",
        reconnectingMessage: "Attempting to restore connection to the server. Please wait a moment...",
        connectedMessage: "Your connection has been successfully restored. You can continue using the application.",
        tryReconnect: "Try to reconnect",
        continue: "Continue"
    },
    auth: {
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        forgotPassword: "Forgot Password?",
        loginButton: "Login",
        registerButton: "Register",
        noAccount: "Don't have an account?",
        alreadyAccount: "Already have an account?",

        loginTitle: "Login",
        loginSubtitle: "Sign in to access your account",
        emailPlaceholder: "Enter your email address",
        passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me",
        orContinueWith: "Or continue with",
        registerHere: "Register here",
        loginHere: "Login here",

        registerTitle: "Create an Account",
        registerSubtitle: "Join template today",
        username: "Username",
        usernamePlaceholder: "Enter your username",
        confirmPasswordPlaceholder: "Confirm your password",
        passwordRequirements: "Password must be at least 8 characters long",
        agreeToTerms: "I agree to the",
        termsOfService: "Terms of Service",
        and: "and",
        privacyPolicy: "Privacy Policy",

        registrationSuccessful: "Registration successful! Please check your email to activate your account.",
    },
    home: {
        welcome: "Welcome to the TypeScript Fullstack Template",
        intro: "A modern, scalable foundation for your web applications with Vue 3, Express, and Prisma.",
        getStarted: "Get Started",
        guessTheNumberTitle: "Guess the Number",
        guessTheNumberDescription: "Try to guess the number between 1 and 100!",
        submitGuess: "Submit Guess",
        resetGame: "Reset Game",
        tooLow: "Too low! Try again.",
        tooHigh: "Too high! Try again.",
        congratulations: "Congratulations! You guessed the number!",
        enterNumber: "Please enter a number!"
    },
    profile: {
        title: "User Profile",
        personalInfo: "Personal Information",
        address: "Address",
        contactInfo: "Contact Information",
        changePassword: "Change Password",

        firstName: "First Name",
        lastName: "Last Name",
        username: "Username",
        birthDate: "Birth Date",

        street: "Street",
        city: "City",
        state: "State", // Added missing state field
        zipCode: "ZIP Code",
        country: "Country",

        email: "Email",
        phone: "Phone",
        verified: "Verified",
        notVerified: "Not Verified",
        resendVerification: "Resend verification email",
        sendVerificationCode: "Send verification code",

        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        passwordsDoNotMatch: "Passwords do not match",

        personalInfoUpdated: "Personal information updated successfully",
        addressUpdated: "Address updated successfully",
        contactInfoUpdated: "Contact information updated successfully",
        passwordUpdated: "Password updated successfully",

        errorUpdatingPersonalInfo: "Error updating personal information",
        errorUpdatingAddress: "Error updating address",
        errorUpdatingContactInfo: "Error updating contact information",
        errorUpdatingPassword: "Error updating password",

        verificationEmailSent: "Verification email sent",
        verificationCodeSent: "Verification code sent via SMS",
        errorSendingVerificationEmail: "Error sending verification email",
        errorSendingVerificationCode: "Error sending verification code",

        notAuthenticated: "You need to be logged in to access this page",
        errorLoadingData: "Error loading profile data",
    },
    notFound: {
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        backToHome: "Back to Home",
    },
    footer: {
        allRightsReserved: "All rights reserved",
    },
    errors: {
        general: {
            default: "An error occurred. Please try again later.",
            networkError: "Network connection error. Please check your connection.",
            serverError: "Server error. Please try again later.",
            unauthorized: "Unauthorized access. Please log in again.",
            forbidden: "You don't have permission to access this resource.",
            notFound: "The requested resource was not found.",
            validationError: "Please check your input data and try again.",
            timeout: "The request timed out. Please try again.",
            unexpectedError: "An unexpected error occurred. Please try again."
        },
        auth: {
            invalidCredentials: "Invalid email or password.",
            accountLocked: "Your account has been locked. Please contact support.",
            accountNotVerified: "Please verify your email before logging in.",
            registrationFailed: "Registration failed. Please try again.",
            emailAlreadyExists: "A user with this email already exists.",
            usernameAlreadyExists: "This username is already taken.",
            passwordResetFailed: "Password reset failed. Please try again.",
            tokenExpired: "Your session has expired. Please log in again.",
            invalidToken: "Invalid authentication token.",
            passwordStrength: "Password is too weak. Please use a stronger password."
        },
        profile: {
            updateFailed: "Failed to update your profile. Please try again.",
            imageSizeTooLarge: "Image size is too large. Maximum size is 5MB.",
            invalidImageFormat: "Invalid image format. Please use JPG, PNG or GIF.",
            verificationFailed: "Verification failed. Please try again.",
            notSaved: "Changes could not be saved. Please try again."
        },
        data: {
            fetchError: "Failed to fetch data. Please try again.",
            saveError: "Failed to save data. Please try again.",
            deleteError: "Failed to delete data. Please try again.",
            uploadError: "Failed to upload file. Please try again.",
            downloadError: "Failed to download file. Please try again."
        },
        form: {
            requiredField: "This field is required.",
            invalidEmail: "Please enter a valid email address.",
            invalidPassword: "Password must be at least 8 characters long.",
            passwordMismatch: "Passwords do not match.",
            invalidDate: "Please enter a valid date.",
            invalidNumber: "Please enter a valid number."
        },
        connection: {
            socketError: "Connection to server failed. Retrying...",
            apiError: "API request failed. Please try again."
        }
    }
};
