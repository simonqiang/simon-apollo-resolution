import React from 'react';
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {Accounts} from "meteor/accounts-base";
import ResolutionForm from "./ResolutionForm";
import GoalForm from "./GoalForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Goal from "./resolutions/Goal";
import {withApollo} from "react-apollo";

const App = ({ loading, resolutions, client, user }) =>
  loading ? null : (
    <div>
      {user._id ? (
        <button onClick={() => {
          Meteor.logout();
          client.resetStore();
        }} >Logout</button>
      ) : (
        <div>
          <RegisterForm client={client}/>
          <LoginForm client={client}/>
        </div>
      )}


      {user._id && <ResolutionForm />}

      {user._id &&
      <ul>{resolutions.map(r => (
        <li key={r._id}>
          <div style={{
            textDecoration: r.completed ? "line-through" : "none"
          }}>
          {r.name}
          </div>
          <ul>
            {r.goals.map(goal => (
              <Goal goal={goal} key={goal._id}/>
            ))}
          </ul>
          <GoalForm resolutionId={r._id} />
        </li>))}
      </ul>}
    </div>
  );

const resolutionsQuery = gql`
 query Resolutions {
    resolutions {
        _id
        name
        completed
        goals {
            _id
            name
            completed
        }
    }
    user {
        _id
    }   
 }
`;

export default graphql(
  resolutionsQuery, {
    props: ({data}) => ({...data})
  }
)(withApollo(App));
