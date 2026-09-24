# SG ENTERPRISE Website

Mobile-first company website + Firebase Realtime Database + Firebase Authentication admin panel.

## Structure

- `index.html` — public website
- `style.css` — public styling
- `script.js` — public Firebase/contact/project loading
- `firebase-config.js` — Firebase configuration
- `admin/index.html` — admin login
- `admin/dashboard.html` — admin dashboard
- `admin/admin.js` — authentication, projects and messages
- `admin/admin.css` — admin styling

## Firebase setup

1. Create the Firebase Web App.
2. Enable Authentication → Email/Password.
3. Create your admin user.
4. Enable Realtime Database.
5. Configure Realtime Database Security Rules before production deployment.
6. Optional: enable Storage when image uploads are added.

## Important

The Firebase web configuration is not a password. However, database/authentication/security rules must be configured correctly. Do not put an admin password, service-account key, or private API credential in frontend files.

## Local preview

Because ES modules and Firebase requests work best over HTTP(S), preview/deploy through a web server rather than opening the HTML file directly with `file://`.
