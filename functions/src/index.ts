import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";
import renderAcceptanceEmail from "./AdmittedEmail";
import renderReminderEmail from "./ReminderEmail";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp(functions.config().firebase);

export const sendConfirmationEmail = functions.firestore
  .document("users/{userId}")
  .onWrite((change, context) => {
    return admin
      .auth()
      .getUser(context.params.userId)
      .then(user => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const timestampInAfter = afterData && "submitTimestamp" in afterData;
        const timestampInBefore = beforeData && "submitTimestamp" in beforeData;
        if (timestampInAfter && !timestampInBefore) {
          const apiKey = functions.config().sendgrid.key;
          sgMail.setApiKey(apiKey);
          const msg = {
            to: user.email,
            from: "confirm@hacknyu.org",
            subject: "Confirming Your Submission!",
            text:
              "Congratulations on submitting your application for HackNYU 2019! We hope to see you there!",
            html:
              "Congratulations on submitting your application for <strong> HackNYU 2019! " +
              "</strong> We hope to see you there!"
          };
          return sgMail.send(msg);
        }
        return undefined;
      })
      .then(() => console.log("SENT!"))
      .catch(err => console.error(err));
  });

export const sendAcceptanceEmail = functions.firestore
  .document("admitted/{userId}")
  .onCreate((snapshot, context) => {
    return admin
      .auth()
      .getUser(context.params.userId)
      .then(user => {
        const apiKey = functions.config().sendgrid.key;
        sgMail.setApiKey(apiKey);
        const html = renderAcceptanceEmail(user.displayName);
        const msg = {
          to: user.email,
          from: "confirm@hacknyu.org",
          subject: "[ACTION REQUIRED] You're in! Welcome to HackNYU 2019",
          text: "You've been accepted to HackNYU 2019!",
          html
        };
        return sgMail.send(msg);
      })
      .then(() => console.log("SENT!"))
      .catch(err => console.error(err));
  });

export const sendReminderEmail = functions.https.onRequest(() => {
  const db = admin.firestore();
  const auth = admin.auth();
  const admittedUsers = [];
  return db
    .collection("admitted")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        admittedUsers.push(doc.id);
      });
      return Promise.all(admittedUsers.map(id => auth.getUser(id)));
    })
    .then(users => {
      /*users.forEach(user => {
        console.log(user.email);*/
      const apiKey = functions.config().sendgrid.key;
      sgMail.setApiKey(apiKey);
      const html = renderReminderEmail();
      const msg = {
        to: "nick@nicholasyang.com",
        from: "confirm@hacknyu.org",
        subject: "Confirmation Closing Soon!",
        text: "Please confirm your spot at HackNYU 2019",
        html
      };
      return sgMail.send(msg);
      //});
    })
    .catch(err => console.error(err))
    .then(() => console.log("SENT"));
});

export const getApplicationStats = functions.https.onCall(() => {
  const db = admin.firestore();
  let nyuCount = 0;
  let totalCount = 0;
  let submittedCount = 0;
  let postGradCount = 0;
  let under18Count = 0;
  let confirmedCount = 0;
  let goingCount = 0;
  let nyuGoingCount = 0;
  let nyuSchoolsCount = {};
  return db
    .collection("users")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.school === "New York University") {
          nyuCount = nyuCount + 1;
          if (data.nyuSchool && data.nyuSchool !== "") {
            // If the map doesn't have the school
            if (data.nyuSchool in nyuSchoolsCount) {
              const count = nyuSchoolsCount[data.nyuSchool];
              nyuSchoolsCount[data.nyuSchool] = count + 1;
            } else {
              nyuSchoolsCount[data.nyuSchool] = 1;
            }
          }
        }
        const age = getAge(data.birthDate);
        if (age < 18) {
          under18Count = under18Count + 1;
        }
        if (data.confirmTimestamp) {
          confirmedCount = confirmedCount + 1;
          if (
            data.confirmData &&
            data.confirmData.location !== "cannot-attend"
          ) {
            goingCount = goingCount + 1;
            if (data.school === "New York University") {
              nyuGoingCount = nyuGoingCount + 1;
            }
          }
        }
        if (data.yearOfStudy === "post-grad") {
          postGradCount = postGradCount + 1;
        }
        totalCount = totalCount + 1;
        if (data.submitTimestamp) {
          submittedCount = submittedCount + 1;
        }
      });
      return {
        nyuGoingCount,
        goingCount,
        nyuCount,
        totalCount,
        submittedCount,
        nyuSchoolsCount,
        postGradCount,
        under18Count,
        confirmedCount
      };
    });
});

const getAge = birthDate => {
  const birthDateTime = new Date(birthDate).getTime();
  const ageDiffMs = Date.now() - birthDateTime;
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
