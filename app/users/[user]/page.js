import UserPageComponent from "./component";

export async function generateMetadata({ params }) {
  return {
    title: `@${params.user} | OpenChat`,
  };
}

export default function UserPage() {
  return <UserPageComponent />;
}
