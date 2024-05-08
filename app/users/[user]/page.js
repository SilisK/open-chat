import UserPageComponent from "./component";

export async function generateMetadata({ params }) {
  return {
    title: `@${params.user} | OpenChat`,
    description: `See posts by ${params.user} on OpenChat and join the conversation.`,
  };
}

export default function UserPage() {
  return <UserPageComponent />;
}
