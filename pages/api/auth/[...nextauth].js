import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,

  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const jwtClaims = {
        sub: token.id || token.sub,
        name: token.name,
        email: token.email,
        image: token.picture || token.image,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.id || token.sub,
        },
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const decodedToken = jwt.verify(token, secret, { algorithm: "HS256" });
      return decodedToken;
    },
  },
  callbacks: {
    async session(session, user) {
      const encodedToken = jwt.sign(user, process.env.SECRET, {
        algorithm: "HS256",
      });
      session.id = user.sub;
      session.user.image = user.image;
      session.token = encodedToken;
      return Promise.resolve(session);
    },
    async jwt(token, user, account, profile, isNewUser) {
      const isUserSignedIn = user ? true : false;

      if (isUserSignedIn) {
        token.id = user.id.toString();

        // check if user alread in database
        const query = `query findUser { users(where: {id: {_eq: "${user.id}"}}) { id } }`;
        const { data } = await fetch(process.env.GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          },
          body: JSON.stringify({ query }),
        })
          .then((user) => user.json())
          .catch((error) => console.log(error));

        // if doesnt, add to db
        if (!data.users.length) {
          const mutation = `mutation insertUser {
            insert_users_one(object: {id: "${user.id}", name: "${user.name}", image: "${user.image}", email: "${user.email}"}) {
              id
              name
              email
              image
            }
          }`;

          const { data } = await fetch(process.env.GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
              "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
            },
            body: JSON.stringify({ query: mutation }),
          })
            .then((user) => user.json())
            .catch((error) => console.log(error));
        }
      }
      return Promise.resolve(token);
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: false,
});
