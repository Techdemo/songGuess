const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccount.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

exports.add = async name => {
  const userRef = await db
  .collection('users').doc(name)

  let user = await userRef.get()
  if(user.exists){
    console.log("user already exists")
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