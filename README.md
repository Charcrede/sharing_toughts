# Sharing Thoughts 💙🌸

Un sanctuaire numérique intime pour partager des pensées entre Desti et Sacha.

## 🚀 Configuration

### 1. Firebase Setup

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet
3. Activez Firestore Database
4. Dans les paramètres du projet, ajoutez une application web
5. Copiez la configuration Firebase

### 2. Configuration des credentials

Remplacez les valeurs dans `lib/firebase.ts` avec vos propres credentials Firebase :

```typescript
const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "votre-sender-id",
  appId: "votre-app-id"
};
```

### 3. Règles Firestore

Dans Firebase Console > Firestore Database > Règles, ajoutez :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /thoughts/{document} {
      allow read, write: if true;
    }
  }
}
```

## 🔐 Accès

- **Sacha** : `cheminrose2025`
- **Desti** : `échosbleus2025`

## 💻 Développement

```bash
npm run dev
```

Le site sera disponible sur `http://localhost:3000`

## 🎨 Fonctionnalités

- ✅ Authentification par mot de passe
- ✅ Ajout de pensées avec humeur (emoji)
- ✅ Affichage chronologique avec styles personnalisés
- ✅ Interface responsive et minimaliste
- ✅ Stockage en temps réel avec Firebase
- ✅ Design doux et apaisant

## 📱 Responsive

Le site fonctionne parfaitement sur mobile, tablette et desktop.

---

*Un espace créé avec 💙 pour des moments de partage authentiques.*