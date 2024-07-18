import Database from "./app/database";
import ConfigDB from "./app/database/config";

const seed = !!process.argv[2];

const main = async () => {
  const db = new Database(ConfigDB.SQLITE);
  try {
    await db.__init();
    await db.syncDb(seed);
  } catch (error) {
    console.log(error);
  }
};

main();
