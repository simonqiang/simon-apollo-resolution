export default {
  Query: {
    user(obj, args, {user}) {
      return user || {};
    }
  },
  User: {
    email: (user) => {
      return user.emails[0].address;
    }
  }
};
