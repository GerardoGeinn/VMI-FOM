const data = {
    Id: 10,
    Name: "Jack Doe",
    Age: 97,
    "Created at": new Date(),
  };
  
  // Add one line to the sheet
  fetch("https://sheet.best/api/sheets/cf969697-682a-40e3-bad4-d54803eeeacf", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((data) => {
      // The response comes here
      console.log(data);
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
    });
  