import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../../components/Loading";
import { User } from "../../services/models/User";
import { useSession } from "next-auth/react";
import { Post } from "../../services/models/Post";
import { PostQuery } from "../../services/graphql/queries";
import {
  DeleteMutation,
  PublishMutation,
} from "../../services/graphql/mutations";

function PostPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const postId = useRouter().query.id;
  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(PostQuery, {
    variables: { postId },
  });

  console.log(postId);

  const [publish] = useMutation(PublishMutation);
  const [deletePost] = useMutation(DeleteMutation);

  if (loading || !data) {
    return <></>;
  }
  if (error) {
    console.log("error");
    return <div>Error: {error.message}</div>;
  }

  console.log(`response`, data);

  let title = data.post.title;
  if (!data.post.published) {
    title = `${title} (Draft)`;
  }

  const authorName = data.post.author
    ? data.post.author.name
    : "Unknown author";
  return (
    <Layout user={session.user as User}>
      <div>
        <h2>{title}</h2>
        <p>By {authorName}</p>
        <p>{data.post.content}</p>
        {!data.post.published && (
          <button
            onClick={async (e) => {
              await publish({
                variables: {
                  postId,
                },
              });
              Router.push("/");
            }}
          >
            Publish
          </button>
        )}
        <button
          onClick={async (e) => {
            await deletePost({
              variables: {
                postId,
              },
            });
            Router.push("/");
          }}
        >
          Delete
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default PostPage;
