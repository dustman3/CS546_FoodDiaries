const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;


async function main() {
  const db = await dbConnection();
  await db.dropDatabase();
  
  
  const up = await users.addUser("masterdetective123","$2b$16$Ad4yCtJXDNx3HmG4U8HStuztRxvMblOS5f289DKsfw9plFC3iDgZG","Sherlock","holmes","abc@.com");
  const addi = await users.addUser("lemon","$2b$16$rPdUEZ/PJXSqDJXL1gWbbeTkC4FYVy8G6vwC7Bk97j96TVv8a.Vyu","Elizabeth","Lemon","123@.com");
  const addi2 = await users.addUser("theboywholived","$2b$16$Fu4OlBoejagHYDwldfVQfOkzXY0F5GhwUfpL9.CKf8VP022mbsm/u","Harry","Potter","222@.com")
  //console.log(up);
  //console.log(addi);
  //console.log(addi2);
  
  const All = await users.getAllUsers();
  console.log(All);
  

  console.log("Done seeding database");
  await db.serverConfig.close();
}

main();
