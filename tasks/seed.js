const data = require("../data/uploadData.js");
const users = require("../data/users.js");

async function main() {
  let rtitle = "";
  let ringredients = "";
  let rsteps = "";
  let rimagename = "";
  let rmimetype = "";
  let rimagepath = "";


  rtitle = 'Chicken Parmesan';
  ringredients = '1. 4 skinless, boneless chicken breast halves\r\n2. salt and freshly ground black pepper to taste\r\n3. 2 eggs\r\n4.1 cup panko bread crumbs, or more as needed\r\n5.1/2 cup grated Parmesan cheese\r\n6.2 tablespoons all-purpose flour, or more if needed\r\n7. 1 cup olive oil for frying\r\n8. 1/2 cup prepared tomato sauce\r\n9.1/4 cup fresh mozzarella, cut into small cubes\r\n10.1/4 cup chopped fresh basil\r\n11.1/2 cup grated provolone cheese\r\n12. 1/4 cup grated Parmesan cheese\r\n13.1 tablespoon olive oil\r\n14.Add all ingredients to list';
  rsteps = '1.Preheat an oven to 450 degrees F (230 degrees C).\r\n2.Place chicken breasts between two sheets of heavy plastic (resealable freezer bags work well) on a solid, level surface. Firmly pound chicken with the smooth side of a meat mallet to a thickness of 1/2-inch. Season chicken thoroughly with salt and pepper.\r\n3.Beat eggs in a shallow bowl and set aside. \r\n4.Mix bread crumbs and 1/2 cup Parmesan cheesein a separate bowl, set aside. \r\n5.Place flour in a sifter or strainer; sprinkle over chicken breasts, evenly coating both sides. \r\n6.Dip flour coated chicken breast in beaten eggs. Transfer breast to breadcrumb mixture, pressing the crumbs into both sides. Repeat for each breast. Set aside breaded chicken breasts for about 15 minutes. \r\n7.Heat 1 cup olive oil in a large skillet on medium-high heat until it begins to shimmer. Cook chicken until golden, about 2 minutes on each side. The chicken will finish cooking in the oven. \r\n8.Place chicken in a baking dish and top each breast with about 1/3 cup of tomato sauce. Layer each chicken breast with equal amounts of mozzarella cheese, fresh basil, and provolone cheese. Sprinkle 1 to 2 tablespoons of Parmesan cheese on top and drizzle with 1 tablespoon olive oil. \r\n9.Bake in thepreheated oven until cheese is browned and bubbly, and chicken breasts are no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).';
  rimagename = 'Chicken Parmesan.jpeg';
  rmimetype = 'image/jpeg';
  rcomments = {};
  rimagepath = 'public/uploads/recipeImages/2018-12-16T22_03_02.942ZChicken Parmesan.jpeg';
  data.addrecipeData(rtitle, ringredients, rsteps, rimagename, rmimetype, rimagepath);

  rtitle = 'Cookie';
  rimagename = 'Cookie.mp4';
  rmimetype = 'video/mp4';
  rcomments = {},
  rvideopath = 'public/uploads/recipeVideos/2018-12-16T22_11_38.175ZCookie.mp4';
  data.addrecipeVideo(rtitle, rimagename, rmimetype, rvideopath);

  users.addUsers('patrick', 'hill', 'Patrick', 'Hill', 'phill@stevens.edu');

  console.log("Wait for 8 - 13 seconds untill the data is added properly. After that use command (ctrl + c)");

}

main();