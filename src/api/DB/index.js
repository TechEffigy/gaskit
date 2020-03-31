import { GeoFire } from "geofire";

export default class {
  constructor(firebaseApp) {
    this.database = firebaseApp.database();
  }

  getQuestion(id) {
    return new Promise((res, rej) => {
      this.database
        .ref(`questions/${id}`)
        .once("value")
        .then(snapshot => {
          res({ id: snapshot.key, question: snapshot.val().question });
        })
        .catch(err => rej(err));
    });
  }

  subscribeToQuestions(location, radius, cbFunc) {
    const geoRef = this.database.ref("geofire");
    const geoFire = new GeoFire(geoRef);

    let geoQ = geoFire.query({
      center: location,
      radius: radius
    });

    const unsubscribe = geoQ.on("key_entered", (id, loc, dist) => {
      this.getQuestion(id)
        .then(question => cbFunc(question))
        .catch(err => {
          throw new Error(err);
        });
    });

    return unsubscribe._cancelCallback;
  }

  async storeQuestion(question, location) {
    const geoRef = this.database.ref("geofire");
    const geoFire = new GeoFire(geoRef);
    try {
      const newQuestionRef = this.database.ref("questions").push();
      await newQuestionRef.set({ timestamp: Date.now(), question: question });
      await geoFire.set(newQuestionRef.key, location);
    } catch (err) {
      throw new Error(err);
    }
  }

  async storeReply(questionId, reply) {
    try {
      const newReplyRef = this.database.ref(`replies/${questionId}`).push();
      await newReplyRef.set({ timestamp: Date.now(), reply: reply });
    } catch (err) {
      console.log(err);
    }
  }

  getReplies(questionId, cbfunc) {
    const dbRef = this.database
      .ref(`replies/${questionId}`)
      .orderByChild("timestamp")
      .limitToLast(4);
    dbRef.on("value", snapshot => {
      let data = [];
      snapshot.forEach(item => {
        data = [{ id: item.key, reply: item.val().reply }, ...data];
      });

      cbfunc(data);
    });
    return () => dbRef.off();
  }
}
