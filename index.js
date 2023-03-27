const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()",
};

const length_range = document.querySelector("#length_range");
const length_number = document.querySelector("#length_number");
const uppercase = document.querySelector("#uppercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const options = [length_range, length_number, uppercase, numbers, symbols];
let characters_list = [characters.lowercase];
let password_length = 10;
// console.log(characters_list);
options.forEach((option) => {
  option.addEventListener("input", (event) => {
    // console.log(characters_list);
    if (event.target.checked) {
      // console.log(password_length);
      characters_list.push(characters[event.target.id]);
      const characters_string = characters_list.join("");
      update_password(
        password_length,
        characters_string.length,
        characters_string
      );
    } else {
      for (index in characters_list) {
        if (characters_list[index] === characters[event.target.id]) {
          characters_list.splice(index, 1);
          const characters_string = characters_list.join("");
          update_password(
            password_length,
            characters_string.length,
            characters_string
          );
        }
      }
    }
    if (
      event.target.id === "length_range" ||
      event.target.id === "length_number"
    ) {
      password_length = Number(event.target.value);
      const characters_string = characters_list.join("");
      update_password(
        password_length,
        characters_string.length,
        characters_string
      );
    }
  });
});

function update_password(length, max, characters) {
  const generated_password = generate_password(length, max, characters);
  add_password(generated_password);
  update_password_length(generated_password.length);
}
const display_password = document.querySelector(".display_password");
function add_password(password) {
  display_password.textContent = `${password}`;
}

function update_password_length(length) {
  length_number.value = length;
  length_range.value = length;
}

function generate_password(length, max, characters) {
  const password = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * max);
    password.push(characters[randomIndex]);
  }
  return password.join("");
}

const default_password = update_password(
  password_length,
  characters.lowercase.length,
  characters.lowercase
);

window.addEventListener("load", () => {
  update_password(
    password_length,
    characters.lowercase.length,
    characters.lowercase
  );
});

const refresh_button = document.querySelector(".refresh_button");
refresh_button.addEventListener("click", () => {
  characters_list = [characters.lowercase];
  const chekced_list = [uppercase, numbers, symbols];
  chekced_list.forEach((each) => (each.checked = false));
  password_length = 10;
  update_password(
    password_length,
    characters.lowercase.length,
    characters.lowercase
  );
});

const copy_button = document.querySelector(".copy_button");
copy_button.addEventListener("click", copy_password);
async function copy_password() {
  console.log(display_password.textContent);
  const clip_text = await navigator.clipboard.writeText(
    display_password.textContent
  );
  try {
    const paste_text = await navigator.clipboard.readText(clip_text);
    console.log(paste_text);
  } catch (error) {
    console.log(error);
  }
}
