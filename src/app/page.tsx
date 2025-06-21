import Image from "next/image";
import { db } from "@/db/db";
import { users } from "@/db/schema";


export default function Home() {

  const user = db.select().from(users).all();
  console.log(user);
  return (
    <div>foo
    </div>
  );
}
