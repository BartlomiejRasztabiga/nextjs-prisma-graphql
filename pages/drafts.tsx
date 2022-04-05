import Layout from "../components/Layout";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { User } from "../services/models/User";
import { useSession } from "next-auth/react";
import NotAuthorised from "../components/NotAuthorised";
import React from "react";
import { PostCard } from "../components/PostCard";
import PostsList from "../components/PostsList";
import { DraftsQuery } from "../services/graphql/queries";

const Drafts = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(DraftsQuery, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <></>;
  }

  if (!session) {
    return <NotAuthorised />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Drafts</h1>
        </div>
      </header>
      <main className="bg-gray-200 shadow">
        <div className="bg-gray-100 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="layout">
            <main>
              {queryLoading ? <Loading /> : <PostsList posts={data.feed} />}
            </main>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Drafts;
