const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

import * as functions from 'firebase-functions'

// const key = functions.config().espacogourmet
// console.log({ key })

const defaultApp = initializeApp({
  credential: applicationDefault(),
})

const firestore = getFirestore(defaultApp)
const auth = getAuth(defaultApp)

firestore.settings({ timestampsInSnapshots: true })

export { functions, firestore, auth, FieldValue, Timestamp }

