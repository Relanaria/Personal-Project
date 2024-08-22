function validateRegisterInput(userData) {
  let errors = {};

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
  const passwordRegex = /^[0-9-a-zA-Z]{3,16}$/;

  if (!userData.email) {
    errors.email = "Email field is required";
  } else if (!emailRegex.test(userData.email)) {
    errors.email =
      "Email must contain letters and/or numbers only.\n Followed by a @/letters.letters.\n Example: test123@domain.org";
  }

  if (!userData.username) {
    errors.username = "Username field is required";
  } else if (!usernameRegex.test(userData.username)) {
    errors.username =
      "Username length must be between 3 and 16 chars contain letters and numbers!";
  }

  if (!userData.password) {
    errors.password = "Password field is required";
  } else if (!passwordRegex.test(errors.password)) {
    errors.password =
      "Password length must be between 3 and 16 chars contain letters and numbers!";
  } else if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

function validateLoginInput(email, password) {
  let errors = {};

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  const passwordRegex = /^[0-9-a-zA-Z]{3,16}$/;

  if (!email) {
    errors.email = "Email field is required!";
  } else if (!emailRegex.test(email)) {
    errors.email =
      "Email must contain letters and/or numbers only.\n Followed by a @/letters.letters.\n Example: test123@domain.org";
  }

  if (!password) {
    errors.password = "Password field is required!";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password length must be between 3 and 16 chars contain letters and numbers!";
  }

  return errors;
}

function validateCreateEditInputs(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.author) {
    errors.author = "Author is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if(!values.genre || values.genre == 'Select genre') {
    errors.genre = "Genre is required";
  }

  if (!values.imgUrl) {
    errors.imgUrl = "Image URL is required";
  }

  if (!values.volume) {
    errors.volume = "Volume is required";
  } else if (isNaN(values.volume)) {
    errors.volume = "Volume must be a positive number";
  }

  if (!values.state) {
    errors.state = "State is required";
  }

  if (!values.price) {
    errors.price = "Price is required";
  } else if (isNaN(values.price) || values.price <= 0) {
    errors.price = "Price must be a positive number";
  }

  return errors;
}


function validateCreateCatalogInputs(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.author) {
    errors.author = "Author is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if(!values.genre || values.genre == 'Select genre') {
    errors.genre = "Genre is required";
  }

  if (!values.imgUrl) {
    errors.imgUrl = "Image URL is required";
  }

  if (!values.volume) {
    errors.volume = "Volume is required";
  } else if (isNaN(values.volume)) {
    errors.volume = "Volume must be a positive number";
  }

  if (!values.state) {
    errors.state = "State is required";
  }

  return errors;
}

function validateComment(commentInput){
  let errors = {};

  if(!commentInput.comment){
    errors.comment = "Comment can't be a empty sting!"; 
  };

  return errors;
}

function validateCatalogEditInputs(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.author) {
    errors.author = "Author is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if(!values.genre || values.genre == 'Select genre') {
    errors.genre = "Genre is required";
  }

  if (!values.imgUrl) {
    errors.imgUrl = "Image URL is required";
  }

  if (!values.volume) {
    errors.volume = "Volume is required";
  } else if (isNaN(values.volume)) {
    errors.volume = "Volume must be a positive number";
  }


  return errors;
}


function validateContactUs(contactData){
  let errors = {};
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  if (!contactData.email) {
    errors.email = "Email field is required";
  } else if (!emailRegex.test(contactData.email)) {
    errors.email ="Email must contain letters and/or numbers only.\n Followed by a @/letters.letters.\n Example: test123@domain.org";
  }

  if(!contactData.name){
    errors.name = "Name is required!"
  };

  if(!contactData.message){
    errors.message = "Message is required!"
  }

  return errors;
}

const valitadeInputs = {
  validateRegisterInput,
  validateLoginInput,
  validateCreateEditInputs,
  validateComment,
  validateContactUs,
  validateCatalogEditInputs,
  validateCreateCatalogInputs
};

export default valitadeInputs;
