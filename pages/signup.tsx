import React, { useState } from "react";
import Layout from "../components/Layout";
import Router, { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { User } from "../services/models/User";
import Loading from "../components/Loading";
import NotAuthorised from "../components/NotAuthorised";
import { SignupMutation } from "../services/graphql/mutations";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [signup] = useMutation(SignupMutation);

  if (loading) {
    return <Loading />;
  }

  if (!session) {
    return <NotAuthorised />;
  }

  return (
    <Layout user={session.user as User}>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await signup({
              variables: {
                name: name,
                email: email,
              },
            });
            Router.push("/");
          }}
        >
          <h1>Signup user</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address)"
            type="text"
            value={email}
          />
          <input disabled={!name || !email} type="submit" value="Signup" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }

        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default Signup;
