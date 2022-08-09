import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config();
const supabase = createClient(process.env["SUPABASE_URL"], process.env["SUPABASE_KEY"]);
const POST = async ({ request }) => {
  const body = await request.json();
  const network = body.network.toLowerCase();
  const address = body.address.toLowerCase();
  const name = body.name;
  let record = {
    network,
    address,
    name,
    hits: 1
  };
  let { data, error } = await supabase.from("leaderboard").select().eq("network", network).eq("address", address);
  if (error) {
    console.error(error);
  }
  if (data && data.length) {
    record = data[0];
    record.hits += 1;
  }
  ({ data, error } = await supabase.from("leaderboard").upsert(record));
  if (error) {
    console.error(error);
  }
  return {
    body: "OK"
  };
};
const GET = async ({ url }) => {
  let data;
  let error;
  if (url.searchParams.get("ranked")) {
    ({ data, error } = await supabase.from("leaderboard").select().order("hits", { ascending: false }).limit(10));
  } else {
    ({ data, error } = await supabase.from("leaderboard").select().order("updated_at", { ascending: false }).limit(10));
  }
  if (error) {
    console.error(error);
  }
  let diamonds = [];
  if (data && data.length) {
    diamonds = data;
  }
  return {
    body: {
      diamonds
    }
  };
};
export {
  GET,
  POST
};
