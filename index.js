import FlatfileImporter from "@flatfile/adapter";
import $ from "jquery";

var LICENSE_KEY = "4dd48047-b639-405e-847d-b4d3f6745af8";

const robotImporter = new FlatfileImporter(LICENSE_KEY, {
  type: "Users",
  fields: [
    {
      label: "First Name",
      key: "first_name",
      validators: [{ validate: "required" }]
    },
    {
      label: "Last Name",
      key: "last_name",
      validators: [{ validate: "required" }]
    },
    {
      label: "Email Address",
      key: "email",
      validators: [
        { validate: "required" },
        {
          validate: "regex_matches",
          regex:
            "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
          error: "Must be in email format"
        }
      ]
    }
  ]
});

robotImporter.setCustomer({
  userId: 1,
  email: "john@doe.com",
  name: "John Doe",
  companyName: "Acme Inc.",
  companyId: 9394
});

// Demo - Initialize with data
$("#launch").click(function () {
  if (LICENSE_KEY === "LICENSE_KEY_HERE") {
    alert(
      "Before you begin, you need a valid license key. Put your license key on line 4. If you need a license key, sign up for your 14 day free trial at app.flatfile.io/signup"
    );
  } else {
    robotImporter
      .requestDataFromUser()
      .then(handleFlatfileResponse)
      .catch(function (error) {
        console.info(error || "window close");
      });
  }
});

var TEST_ERROR = false;
function handleFlatfileResponse(results) {
  if (TEST_ERROR) {
    robotImporter
      .requestCorrectionsFromUser("An error occured")
      .then(handleFlatfileResponse);
  } else {
    robotImporter.displaySuccess("Success!");
    $("#raw_output").text(JSON.stringify(results.data, " ", 2));
  }
}

if (LICENSE_KEY !== "LICENSE_KEY_HERE") {
  document.getElementById("no-license").style.display = "none";
  document.getElementById("launch").classList.remove("disabled");
  document.getElementById("launch").removeAttribute("disabled");
}
