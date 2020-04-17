const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
  })
})

const db = admin.firestore()

exports.add = async name => {
  const userRef = await db
  .collection('users').doc(name)

  let user = await userRef.get()
  if(user.exists){
    return false
  }

  userRef.set({
    username: name,
    rockPoints: 0,
    popPoints: 0,
    motownPoints: 0,
    festivalPoints: 0,
})
return true
}

exports.login = async name => {
  let doc = await db
  .collection('users')
  .doc(name)
  .get()

  return doc.data()
}

exports.updateScore = async (name, score) => {
  const userRef = db.collection('users').doc(name)
  userRef
    .get()
    .then(doc => doc.data())
    .then(doc =>
    userRef.set(
    {
      festivalPoints: doc.festivalPoints + score,
    },
      { merge: true }
    )
  )
    console.log(doc)
  return
}

exports.fetchUserScores = async (names) => {

}
