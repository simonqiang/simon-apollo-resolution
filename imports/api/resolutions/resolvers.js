import Resolutions from "./resolution";
import Goals from "../goals/goals";


export default {
  Query: {
    resolutions(obj, args, {userId}) {
      console.log(userId);
      console.log("resolutions haha");
      return Resolutions.find({
        userId
      }).fetch();
    }
  },

  Resolution: {
    goals: resolution =>
      Goals.find({
        resolutionId: resolution._id
      }).fetch(),
    completed: resolution => {
      const goals = Goals.find({
        resolutionId: resolution._id,
      }).fetch();
      if(goals.length === 0) return false;
      const completedGoals = goals.filter(goal => goal.completed);
      return goals.length === completedGoals.length;
    }
  },

  Mutation: {
    createResolution(obj, {name}, {userId}) {
      if(!userId) {
        throw new Error("Unautherizaed");
      }
      const id = Resolutions.insert({
        name,
        userId
      });
      return Resolutions.findOne(id);
    }
  }
};
